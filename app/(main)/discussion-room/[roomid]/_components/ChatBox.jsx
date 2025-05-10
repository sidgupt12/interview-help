import React from 'react';

function ChatBox({conversation}) {
    return (
        <div>
            <div className='h-[60vh] bg-secondary border rounded-xl flex flex-col relative p-4 overflow-auto'>
                {/* <div > */}
                    {conversation.map((item,index)=>(
                        <div className = {`flex ${item.role=='user'?'justify-end':'justify-start'}`}>
                            {item.role=='assistant'?
                            <h2 className='p-1 px-2 text-white inline-block rounded-md mt-3 max-w-[70%]' 
                            style={{ backgroundColor: '#5434DC' }}>{item?.content}</h2>
                            :
                            <h2 className='p-1 px-2 bg-gray-200 text-black mt-3 inline-block rounded-md max-w-[70%]' 
                            >{item?.content}</h2>
                        }

                        </div>
                    ))}
                {/* </div> */}
            </div>
            <h2 className='mt-5 text-gray-400 text-sm'>
                At the end of your conversation we will generate feedback automatically
            </h2>
        </div>
    );
}

export default ChatBox;