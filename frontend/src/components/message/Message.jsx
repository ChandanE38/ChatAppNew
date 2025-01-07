import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img
                    alt='Tailwind CSS chat bubble component'
                    src={
                        "https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp"

                    }
                />
            </div>
        </div>

        <div className={'chat-bubble text-white bg-blue-500'}>
              Hi Whats up
              <time className="text-xs opacity-50">12:45</time>
        </div>
       
    </div>
  )
}

export default Message