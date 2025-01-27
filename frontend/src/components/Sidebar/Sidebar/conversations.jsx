import React from 'react'
import Conversation from './conversation.jsx';
import useGetConversations from '../../../hooks/useGetConversation.js';
import { getRandomEmoji } from '../../../utils/emoji.js';

const Conversations = () => {
  const {loading,conversations}=useGetConversations();
  console.log("CONVERSATIONS:",conversations);
  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {conversations.map((conversation,idx)=>(
        <Conversation
           key={conversation._id}
           conversation={conversation}
           emoji={getRandomEmoji()}

          // We use this bcz at last conversation we does not have 
           lastIdx={idx == conversation.length-1}
        
        />
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
   
        
    </div>
  )
}

export default Conversations;


// import React from 'react'
// import Conversation from './conversation.jsx';

// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//         <Conversation/>
//         <Conversation/> 
//         <Conversation/>
//         <Conversation/>
   
        
//     </div>
//   )
// }

// export default Conversations;