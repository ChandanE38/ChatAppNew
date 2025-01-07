import React from 'react'
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'

const MessageContainer = () => {
  return (
    <div className='md:min-w-[450px] flex flex-col w-1800px'>
        <> 
            <div>  
                <span className='label-text'></span>
                <span className='text-gray-900 font-bold'>Rohan</span>
            </div>

            <Messages />
            <MessageInput />
        </>
    </div>
  )
}

export default MessageContainer