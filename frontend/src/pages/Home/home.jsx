import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar/sidebar.jsx';
import MessageContainer from '../../components/message/MessageContainer.jsx';

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding
    backdrop-filter background-blue-lg bg-opicity-0'>
      {/* <div>Welcome to Home Page</div> */}
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home;