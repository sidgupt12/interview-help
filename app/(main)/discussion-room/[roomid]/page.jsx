"use client";
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { AIModel, getToken } from '@/services/GlobalServices';
import { CoachingExpert } from '@/services/Options';
import { UserButton } from '@stackframe/stack';
import { RealtimeTranscriber } from 'assemblyai';
import { useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ChatBox from './_components/ChatBox';

function DiscussionRoom() {
    const { roomid } = useParams();
    const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
    const [expert, setExpert] = useState();
    const [enableMic, setEnableMic] = useState(false);
    const recorder = useRef(null);
    const realtimeTranscriber = useRef(null);
    const [transcribe, setTranscribe] = useState();
    const [conversation, setConversation] = useState([
        {
            role: 'assistant',
            content: 'hi'
        },
        {
            role: 'user',
            content: 'hello'
        }
    ]);
    const [loading, setLoading] = useState(false);
    let silenceTimeout;
    let texts = {}

    useEffect(() => {
        if (DiscussionRoomData) {
            const Expert = CoachingExpert.find(item => item.name === DiscussionRoomData.expertName);
            console.log(Expert);
            setExpert(Expert);
        }
    }, [DiscussionRoomData]);

    const connectToServer = async () => {

        console.log('connect clicked');
        setEnableMic(true);
        setLoading(true);

        try {
            const token = await getToken();
            console.log('Retrieved token:', token);
            if (!token) {
                throw new Error('No token retrieved');
            }

            realtimeTranscriber.current = new RealtimeTranscriber({
                token: token,
                sampleRate: 16000,
            });

            realtimeTranscriber.current.on('open', ({ sessionId }) => {
                console.log(`Session opened with ID: ${sessionId}`);
            });

            realtimeTranscriber.current.on('transcript', async (transcript) => {
                //console.log('Transcript:', transcript);
                let msg =''

                if (transcript.message_type=='FinalTranscript')
                {
                    setConversation(prev=>[...prev,{
                        role:'user',
                        content:transcript.text
                    }]);

                    const lastMessage = conversation.slice(-2);
                    //calling AI model to generate response
                    const aiResponse = await AIModel(
                        DiscussionRoomData.topic,
                        DiscussionRoomData.coachingOption,
                        lastMessage
                    );
                    console.log(aiResponse);
                    setConversation(prev=>[...prev,aiResponse])
                    
                    
                }

                texts[transcript.audio_start] = transcript?.text;
                const keys = Object.keys(texts);
                keys.sort((a,b)=>a-b);

                for (const key of keys){
                    if (texts[key]){
                        msg += `${texts[key]}`;
                    }
                }
                setTranscribe(msg);
            });

            realtimeTranscriber.current.on('error', (error) => {
                console.error('Transcriber error:', error);
            });

            realtimeTranscriber.current.on('close', (code, reason) => {
                console.log('Connection closed:', code, reason);
            });

            console.log('Connecting to AssemblyAI...');
            await realtimeTranscriber.current.connect();
            setLoading(false);

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new AudioContext({ sampleRate: 16000 });
            const source = audioContext.createMediaStreamSource(stream);
            const processor = audioContext.createScriptProcessor(4096, 1, 1);

            processor.onaudioprocess = (event) => {
                const inputData = event.inputBuffer.getChannelData(0);
                const pcmData = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                    pcmData[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32767));
                }
                const buffer = pcmData.buffer;
                if (realtimeTranscriber.current) {
                    clearTimeout(silenceTimeout);
                    //console.log('PCM sample:', pcmData.slice(0, 10)); // Log to verify data
                    realtimeTranscriber.current.sendAudio(buffer);
                    silenceTimeout = setTimeout(() => {
                        console.log('User stopped talking');
                    }, 2000);
                }
            };

            source.connect(processor);
            processor.connect(audioContext.destination);

            recorder.current = { stream, audioContext, source, processor };
        } catch (error) {
            console.error('Error in connectToServer:', error);
            setEnableMic(false);
        }
    };

    const disconnect = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (realtimeTranscriber.current) {
                await realtimeTranscriber.current.close();
            }
            if (recorder.current) {
                recorder.current.stream.getTracks().forEach(track => track.stop());
                await recorder.current.audioContext.close();
                recorder.current = null;
            }
            setEnableMic(false);
            setLoading(false);
        } catch (error) {
            console.error('Error in disconnect:', error);
        }
    };

    return (
        <div className='-mt-12'>
            <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
            <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
                <div className='lg:col-span-2'>
                    <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
                        <Image
                            src={expert?.avatar}
                            alt='avatar'
                            width={200}
                            height={200}
                            className='h-[80px] w-[80px] rounded-full object-cover animate-pulse'
                        />
                        <h2 className='text-gray-500'>{expert?.name}</h2>
                        <div className='p-5 bg-gray-200 px-10 rounded-xl absolute bottom-5 right-6'>
                            <UserButton />
                        </div>
                    </div>
                    <div className='mt-5 flex items-center justify-center'>
                        {!enableMic ? (
                            <Button className='bg-[#5434dc] hover:bg-indigo-500' onClick={connectToServer} disabled={loading}>
                                {loading&&<Loader2Icon className='w-4 h-4 animate-spin'/>}Connect
                            </Button>
                        ) : (
                            <Button variant="destructive" onClick={disconnect} disabled={loading}>
                                {loading&&<Loader2Icon className='w-4 h-4 animate-spin'/>}Disconnect
                            </Button>
                        )}
                    </div>
                </div>
                <div>
                        <ChatBox conversation={conversation}/>
                </div>
            </div>
            <div>
                <h2>{transcribe}</h2>
            </div>
        </div>
    ); 
}

export default DiscussionRoom;