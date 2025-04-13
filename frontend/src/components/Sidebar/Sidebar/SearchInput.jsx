import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import useConversation from '../../../zustand/useConversation';
import useGetConversation from '../../../hooks/useGetConversation';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // ✅ Make sure this is imported

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const navigate = useNavigate(); // ✅ THIS LINE WAS MISSING

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
      {/* Triple Dot Button to navigate to profile */}
      <button 
        type='button' 
        className='text-2xl font-bold px-2 hover:bg-gray-200 rounded-full'
        // onClick={() => navigate('/profile')}
        onClick={() => {
          console.log("Navigating to profile...");
          navigate('/profile');
        }}
        
      >
        ⋮
      </button>

      {/* Search Input */}
      <input 
        type='text' 
        placeholder="Search.." 
        className='input input-bordered rounded-full' 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      {/* Search Button */}
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <CiSearch className='w-6 h-6 outline-none'/>
      </button>
    </form>
  );
};

export default SearchInput;
