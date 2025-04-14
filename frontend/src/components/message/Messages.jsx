// import React, { useEffect, useRef } from 'react'
// import useGetMessages from '../../hooks/useGetMessages.js';
// import MessageSkeleton from '../skeletons/MessageSkeleton.jsx';
// import Message from './Message.jsx';
// import useListenMessages from '../../hooks/useListenMessages.js';

// const Messages = () => {
//   const { messages, loading } = useGetMessages();
//   useListenMessages();

//   const lastMessageRef = useRef();

//   useEffect(() => {
//     console.log('Messages updated:', messages); // Check messages state
    
//     setTimeout(() => {
//       if (lastMessageRef.current) {
//         lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     }, 100);
//   }, [messages]);

//   return (
//     <div className='px-4 flex-1 overflow-auto'>
//       {!loading && messages.length > 0 && messages.map((message, idx) => (
//         <div key={message._id || idx} ref={idx === messages.length - 1 ? lastMessageRef : null}>
//           <Message message={message} /> {/* Fix typo in message prop */}
//         </div>
//       ))}
      
//       {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

//       {loading && messages.length === 0 && (
//         <p className='text-center'>Send a message to start the conversation</p>
//       )}
//     </div>
//   );
// };

// export default Messages;




// import React from 'react'
// import Message from './Message.jsx'
// import useGetMessages from '../../hooks/useGetMessages.js'

// const Messages = () => {
//   //Here useGetMessages return us message and loading state.
//   const {messages,loading} = useGetMessages();

//   //We can console log syntax and value using the comma i.e ,
//   console.log("message=",messages);
//   return (
//     <div className='px-4 flex-1 overflow-auto'>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>

//     </div>
//   )
// }

// export default Messages


import React, { useEffect, useRef } from 'react';
import useGetMessages from '../../hooks/useGetMessages.js';
import MessageSkeleton from '../skeletons/MessageSkeleton.jsx';
import Message from './Message.jsx';
import useListenMessages from '../../hooks/useListenMessages.js';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  const lastMessageRef = useRef();

  useEffect(() => {
    console.log('Messages updated:', messages); // Check messages state
    
    if (lastMessageRef.current) {
      setTimeout(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {/* Show loading skeletons while loading */}
      {loading ? (
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : (
        <>
          {/* Show message list */}
          {messages.length > 0 ? (
            messages.map((message, idx) => (
              <div
                key={message._id} // Make sure to use a unique identifier for key
                ref={idx === messages.length - 1 ? lastMessageRef : null}
              >
                <Message message={message} />
              </div>
            ))
          ) : (
            <p className='text-center'>Send a message to start the conversation</p>
          )}
        </>
      )}
    </div>
  );
};

export default Messages;
