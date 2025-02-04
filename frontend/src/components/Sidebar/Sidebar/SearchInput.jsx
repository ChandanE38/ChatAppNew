import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import useConversation from '../../../zustand/useConversation';
import useGetConversation from '../../../hooks/useGetConversation';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long');
    }

    if (!conversations || conversations.length === 0) {
      return toast.error("No conversations available.");
    }

    const conversation = conversations.find((c) => 
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input 
        type='text' 
        placeholder="Search.." 
        className='input input-bordered rounded-full' 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <CiSearch className='w-6 h-6 outline-none'/>
      </button>
    </form>
  );
};

export default SearchInput;


// import React, { useState } from 'react'
// import { CiSearch } from "react-icons/ci";
// import useConversation from '../../../zustand/useConversation';
// import useGetConversation from '../../../hooks/useGetConversation';
// import toast from 'react-hot-toast';

// const SearchInput = () => {
//   const [search,setSearch] = useState("");
//   const  {setSelectedConversation} =useConversation();
//   const {conversations} = useGetConversation();

//   const handleSubmit=(e)=>{
//     e.preventDefault();
//     if(!search) return;
//     if(search.length<3){
//       return toast.error('Search term must be atleast 3 charcters long')
//     }

//     //In this we search and which we find same and we get firstly that things then we will return that algorithum.
//     const conversation = conversations.find((c)=> c.fullName.toLowerCase().includes(search.toLowerCase()));

//     //If conversation present then we will update our state.
//     if(conversation){
//       setSelectedConversation(conversation);

//       //Update search with empty string after searching done.
//       setSearch('');
//     }
//     else{
//       //If search which is not present in data base.
//       toast.error("No such user found!");
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className='flex items-center gap-2'>
//         <input type='text' placeholder="Search.." className='input input-bordered rounded-full' />
//         <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
//              <CiSearch className='w-6 h-6 outline-none'/>
//         </button>
//     </form>
//   )
// }

// export default SearchInput;



// import React from 'react'
// import { CiSearch } from "react-icons/ci";

// const SearchInput = () => {
//   return (
//     <form className='flex items-center gap-2'>
//         <input type='text' placeholder="Search.." className='input input-bordered rounded-full' />
//         <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
//              <CiSearch className='w-6 h-6 outline-none'/>
//         </button>
//     </form>
//   )
// }

// export default SearchInput