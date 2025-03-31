// "use client"
// import { Button } from '@/components/ui/button';
// import { api } from '@/convex/_generated/api';
// import { getToken } from '@/services/GlobalServices';
// import { CoachingExpert } from '@/services/Options';
// import { UserButton } from '@stackframe/stack';
// import { RealtimeTranscriber } from 'assemblyai';
// import { useQuery } from 'convex/react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation'
// import React, { useEffect, useRef, useState } from 'react'
// import RecordRTC from 'recordrtc';
// //const RecordRTC = dynamic(()=> import("recordrtc"), {ssr:false});

// function DiscussionRoom() {
//     const {roomid}=useParams();
//     const DiscussionRoomData=useQuery(api.DiscussionRoom.GetDiscussionRoom,{id:roomid});
//     const [expert,setExpert]=useState();
//     const [enableMic,SetEnableMic]=useState(false);
//     const recorder=useRef(null)
//     const realtimeTranscriber=useRef(null);
//     let silenceTimeout;

//     useEffect(()=>{
//         if(DiscussionRoomData)
//         {
//             const Expert = CoachingExpert.find(item=>item.name==DiscussionRoomData.expertName);
//             console.log(Expert);
//             setExpert(Expert);
//         }
//     },[DiscussionRoomData]);

//     const connectToServer=async()=>{
//         console.log('connect clicked');
//         SetEnableMic(true);

//         const token = await getToken();
//         if (!token) {
//             console.error('Failed to get token');
//             return;
//         }

//         //Init Assembly AI
//         realtimeTranscriber.current = new RealtimeTranscriber({
//             token: token,
//             sampleRate:16000,
//         });
//         console.log('RealtimeTranscriber initialized:', realtimeTranscriber.current);

//         realtimeTranscriber.current.on('open', ({ sessionId }) => {
//             console.log(`Session opened with ID: ${sessionId}`);
//         });

//         realtimeTranscriber.current.on('transcript', async(transcript)=>{
//             console.log(transcript);
//         })

//         await realtimeTranscriber.current.connect()             
        

//         if (typeof window !== "undefined" && typeof navigator !== "undefined") {
//             navigator.mediaDevices.getUserMedia({ audio: true })       
//                 .then((stream) => {        
//                     recorder.current = new RecordRTC(stream, {        
//                         type: 'audio',        
//                         mimeType: 'audio/webm;codecs=pcm',        
//                         recorderType: RecordRTC.StereoAudioRecorder,        
//                         timeSlice: 250,        
//                         desiredSampRate: 16000,        
//                         numberOfAudioChannels: 1,
//                         bufferSize: 4096,        
//                         audioBitsPerSecond: 128000,       
//                         ondataavailable: async (blob) => {        
//                             if (!realtimeTranscriber.current) return;
//                             // Reset the silence detection timer on audio input      
//                             clearTimeout(silenceTimeout);       
//                             const buffer = await blob.arrayBuffer();       
//                             console.log(buffer)
//                             realtimeTranscriber.current.sendAudio(buffer);
//                             // Restart the silence detection timer
//                             silenceTimeout = setTimeout(() => {        
//                                 console.log('User stopped talking');
//                                 // Handle user stopped talking (e.g., send final transcript, stop recording, etc.)        
//                             }, 2000);        
//                         },        
//                     });       
//                     recorder.current.startRecording();
//                 })
//                 .catch((err) => console.error(err));
//         }        
//     }

//     const disconnect=async(e)=>{
//         e.preventDefault();
//         await realtimeTranscriber.current.close();
//         await realtimeTranscriber.current.close();
//         recorder.current.pauseRecording();
//         recorder.current=null;
//         SetEnableMic(false);
//     }

//     return (
//         <div className='-mt-12'>
//             <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
//             <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
//                 <div className='lg:col-span-2'>
//                     <div className='h-[60vh] bg-secondary border rounded-4xl
//                     flex flex-col items-center justify-center relative
//                     '>
//                         <Image src={expert?.avatar}  alt='avatar' width={200} height={200}
//                             className='h-[80px] w-[80px] rounded-full object-cover animate-pulse '
//                         />
//                         <h2 className='text-gray-500'>{expert?.name}</h2>
//                         <div className='p-5 bg-gray-200 px-10 rounded-xl absolute bottom-5 right-6'>
//                             <UserButton/>
//                         </div>
//                     </div>
//                     <div className='mt-5 flex items-center justify-center'>
//                         {!enableMic?<Button className='bg-[#5434dc] hover:bg-indigo-500' 
//                         onClick={connectToServer}
//                         >
//                             Connect
//                         </Button>
//                         :
//                         <Button variant="destructive" onClick={disconnect}>Disconnect</Button>
//                         }
//                     </div>
//                 </div>
//                 <div>
//                     <div className='h-[60vh] bg-secondary border rounded-4xl
//                     flex flex-col items-center justify-center relative
//                     '>
//                         <h2>Chat Section</h2>
//                     </div>
//                     <h2 className='mt-5 text-gray-400 text-sm'>At the end of your conversation we will generate feedback automatically</h2>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DiscussionRoom

// "use client";
// import { Button } from '@/components/ui/button';
// import { api } from '@/convex/_generated/api';
// import { getToken } from '@/services/GlobalServices';
// import { CoachingExpert } from '@/services/Options';
// import { UserButton } from '@stackframe/stack';
// import { RealtimeTranscriber } from 'assemblyai';
// import { useQuery } from 'convex/react';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useRef, useState } from 'react';

// function DiscussionRoom() {
//     const { roomid } = useParams();
//     const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
//     const [expert, setExpert] = useState();
//     const [enableMic, setEnableMic] = useState(false);
//     const recorder = useRef(null);
//     const realtimeTranscriber = useRef(null);
//     let silenceTimeout;

//     useEffect(() => {
//         if (DiscussionRoomData) {
//             const Expert = CoachingExpert.find(item => item.name === DiscussionRoomData.expertName);
//             console.log(Expert);
//             setExpert(Expert);
//         }
//     }, [DiscussionRoomData]);

//     const connectToServer = async () => {
//         console.log('connect clicked');
//         setEnableMic(true);

//         try {
//             const token = await getToken();
//             console.log('Retrieved token:', token);
//             if (!token) {
//                 throw new Error('No token retrieved');
//             }

//             realtimeTranscriber.current = new RealtimeTranscriber({
//                 token: token,
//                 sampleRate: 16000,
//             });

//             realtimeTranscriber.current.on('open', ({ sessionId }) => {
//                 console.log(`Session opened with ID: ${sessionId}`);
//             });

//             realtimeTranscriber.current.on('transcript', (transcript) => {
//                 console.log('Transcript:', transcript);
//             });

//             realtimeTranscriber.current.on('error', (error) => {
//                 console.error('Transcriber error:', error);
//             });

//             realtimeTranscriber.current.on('close', (code, reason) => {
//                 console.log('Connection closed:', code, reason);
//             });

//             console.log('Connecting to AssemblyAI...');
//             await realtimeTranscriber.current.connect();

//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             const audioContext = new AudioContext({ sampleRate: 16000 });
//             const source = audioContext.createMediaStreamSource(stream);
//             const processor = audioContext.createScriptProcessor(4096, 1, 1);

//             processor.onaudioprocess = (event) => {
//                 const inputData = event.inputBuffer.getChannelData(0);
//                 const buffer = new Float32Array(inputData).buffer;
//                 if (realtimeTranscriber.current) {
//                     clearTimeout(silenceTimeout);
//                     realtimeTranscriber.current.sendAudio(buffer);
//                     silenceTimeout = setTimeout(() => {
//                         console.log('User stopped talking');
//                     }, 2000);
//                 }
//             };

//             source.connect(processor);
//             processor.connect(audioContext.destination);

//             recorder.current = { stream, audioContext, source, processor };
//         } catch (error) {
//             console.error('Error in connectToServer:', error);
//             setEnableMic(false);
//         }
//     };

//     const disconnect = async (e) => {
//         e.preventDefault();
//         try {
//             if (realtimeTranscriber.current) {
//                 await realtimeTranscriber.current.close();
//             }
//             if (recorder.current) {
//                 recorder.current.stream.getTracks().forEach(track => track.stop());
//                 await recorder.current.audioContext.close();
//                 recorder.current = null;
//             }
//             setEnableMic(false);
//         } catch (error) {
//             console.error('Error in disconnect:', error);
//         }
//     };

//     return (
//         <div className='-mt-12'>
//             <h2 className='text-lg font-bold'>{DiscussionRoomData?.coachingOption}</h2>
//             <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
//                 <div className='lg:col-span-2'>
//                     <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
//                         <Image
//                             src={expert?.avatar}
//                             alt='avatar'
//                             width={200}
//                             height={200}
//                             className='h-[80px] w-[80px] rounded-full object-cover animate-pulse'
//                         />
//                         <h2 className='text-gray-500'>{expert?.name}</h2>
//                         <div className='p-5 bg-gray-200 px-10 rounded-xl absolute bottom-5 right-6'>
//                             <UserButton />
//                         </div>
//                     </div>
//                     <div className='mt-5 flex items-center justify-center'>
//                         {!enableMic ? (
//                             <Button className='bg-[#5434dc] hover:bg-indigo-500' onClick={connectToServer}>
//                                 Connect
//                             </Button>
//                         ) : (
//                             <Button variant="destructive" onClick={disconnect}>
//                                 Disconnect
//                             </Button>
//                         )}
//                     </div>
//                 </div>
//                 <div>
//                     <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
//                         <h2>Chat Section</h2>
//                     </div>
//                     <h2 className='mt-5 text-gray-400 text-sm'>
//                         At the end of your conversation we will generate feedback automatically
//                     </h2>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DiscussionRoom;


"use client";
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { getToken } from '@/services/GlobalServices';
import { CoachingExpert } from '@/services/Options';
import { UserButton } from '@stackframe/stack';
import { RealtimeTranscriber } from 'assemblyai';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

function DiscussionRoom() {
    const { roomid } = useParams();
    const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });
    const [expert, setExpert] = useState();
    const [enableMic, setEnableMic] = useState(false);
    const recorder = useRef(null);
    const realtimeTranscriber = useRef(null);
    const [transcribe, setTranscribe] = useState();
    const [conversation, setConversation] = useState([]);
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

            realtimeTranscriber.current.on('transcript', (transcript) => {
                console.log('Transcript:', transcript);
                let msg =''

                if (transcript.message_type=='FinalTranscript')
                {
                    setConversation(prev=>[...prev,{
                        role:'user',
                        content:transcript.text
                    }])
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
                    console.log('PCM sample:', pcmData.slice(0, 10)); // Log to verify data
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
                            <Button className='bg-[#5434dc] hover:bg-indigo-500' onClick={connectToServer}>
                                Connect
                            </Button>
                        ) : (
                            <Button variant="destructive" onClick={disconnect}>
                                Disconnect
                            </Button>
                        )}
                    </div>
                </div>
                <div>
                    <div className='h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
                        <h2>Chat Section</h2>
                    </div>
                    <h2 className='mt-5 text-gray-400 text-sm'>
                        At the end of your conversation we will generate feedback automatically
                    </h2>
                </div>
            </div>
            <div>
                <h2>{transcribe}</h2>
            </div>
        </div>
    ); 
}

export default DiscussionRoom;