
// import { Navigate, Route, Routes } from 'react-router-dom';
// import './App.css'
// import Home from './pages/Home/home.jsx';
// import Login from './pages/Login/login.jsx';
// import SignUp from './pages/Signup/Signup.jsx';
// import { Toaster } from 'react-hot-toast';
// import { useAuthContext } from './context/AuthContext.jsx';

// function App(){
//   const { authUser }= useAuthContext();
//   return (
//       //here "h-screen" means height is equal to full screen
//       <div className="p-4 h-screen flex items-center justify-center"> 
//             {/* <SignUp/> */}
//             <Routes>
//               <Route path="/" element={authUser ? <Home/> : <Navigate to={"/Login"} /> } />
//               <Route path="/login" element={authUser ? <Login/> : <Navigate to='/'/> } />
//               {/* <Route path='/signup' element={authUser ?  <SignUp/> : <Navigate to= '/' /> } /> */}
//               <Route path='/signup' element={authUser ? <Navigate to= '/' /> : <SignUp/> } />
//             </Routes>
//             <Toaster/>
//       </div>
//   )
// }

// export default App;


import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/home.jsx';
import Login from './pages/Login/login.jsx';
import SignUp from './pages/Signup/Signup.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';

function App() {
    const { authUser } = useAuthContext();

    console.log("authUser is present:", authUser);  // Log the authUser state for debugging

    // Optional: Handle loading state during initial auth check
    if (authUser === undefined) {
        return <div>Loading...</div>;  // Show loading while authUser is being fetched
    }

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <Routes>
                {/* Home route: Redirect unauthenticated users to Login */}
                <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
                
                {/* Login route: Redirect authenticated users to Home */}
                <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
                
                {/* Signup route: Redirect authenticated users to Home */}
                <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
                
                {/* Fallback route for undefined paths */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Notification system */}
            <Toaster />
        </div>
    );
}

export default App;
