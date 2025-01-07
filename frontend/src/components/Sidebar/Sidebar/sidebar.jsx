import React from 'react'
import SearchInput from './SearchInput.jsx';
import Conversations from './conversations.jsx';
import LogoutButton from './LogoutButton.jsx';

const Sidebar = () => {
  return (
    <div className='m-2 border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput />
        <div className='divider px-3'></div> 
        <Conversations />
        <LogoutButton />
    </div>
  )
}

export default Sidebar;