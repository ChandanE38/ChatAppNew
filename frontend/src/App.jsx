
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/home.jsx';
import Login from './pages/Login/login.jsx';
import SignUp from './pages/Signup/Signup.jsx';
import { Toaster } from 'react-hot-toast';

function App(){
  return (
      //here "h-screen" means height is equal to full screen
      <div className="p-4 h-screen flex items-center justify-center"> 
            {/* <SignUp/> */}
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
            </Routes>
            <Toaster/>
      </div>
  )
}

export default App;
