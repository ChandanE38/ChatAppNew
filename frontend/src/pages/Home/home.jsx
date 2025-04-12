import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar/sidebar.jsx';
import MessageContainer from '../../components/message/MessageContainer.jsx';

const Home = () => {
  return (
    <div className='flex h-screen w-screen rounded-none overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;


