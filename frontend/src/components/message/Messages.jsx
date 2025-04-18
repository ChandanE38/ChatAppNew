import React, { useEffect, useRef } from 'react';
import useGetMessages from '../../hooks/useGetMessages.js';
import MessageSkeleton from '../skeletons/MessageSkeleton.jsx';
import Message from './Message.jsx';
import useListenMessages from '../../hooks/useListenMessages.js';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();  // Ensure this hook listens for new messages

  const lastMessageRef = useRef();

  useEffect(() => {
    console.log('Messages updated:', messages);

    // Safe scroll into view after messages update
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [messages]);  // Re-run when messages change

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {/* Show loading skeletons while loading */}
      {loading ? (
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : (
        <>
          {/* Show message list */}
          {messages.length > 0 ? (
            messages.map((message, idx) => {
              const isLastMessage = idx === messages.length - 1;
              return (
                <div
                  key={message._id || `message-${idx}`} // Fallback key
                  ref={isLastMessage ? lastMessageRef : null}
                >
                  <Message message={message} />
                </div>
              );
            })
          ) : (
            <p className='text-center'>Send a message to start the conversation</p>
          )}
        </>
      )}
    </div>
  );
};

export default Messages;
