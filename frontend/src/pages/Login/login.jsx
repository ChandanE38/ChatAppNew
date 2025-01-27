// import {useState} from 'react';
// import { Link } from 'react-router-dom';
// import useLogin from '../../hooks/useLogin.js';


// // here label is build in className
// //mt-Means margin top of values

// const Login = () => {

//   //We have two inputs one for the user name and other for the password.
//   //Here wev have "state" i.e username and "setterFunction" i.e setUsername.
//   const {username,setUsername} = useState("");
//   const {password,setPassword} = useState("");

//   const {loading,login}=useLogin();

//   //Creating handleSubmit function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(username,password);
//   }


//   return (
//     <div className='flex flex-col items-center justify-center min-e-96 mx-auto'>
//        <div className='w-full p-6 rounded-lg shadow-md bg-black bg-clip-padding 
//        backdrop-filter backdrop-blur-lg bg-opicity-0'>
//           <h1 className='text-3xl font-semibold text-center text-blue-500'>LogIn-
//               <span className='text-blue-500'>
//                 ChatApp
//               </span>

//           </h1>

//           <form onSubmit={handleSubmit}>
//             <div>

//                 <label className='label p-2'>
//                       <span className='text-base label-text text-yellow-50'>Username</span>
//                 </label>
//                 <input type='text' placeholder='Enter Username here' className='w-full input input-borded h-10'
//                   value={username}
//                   onChange={(e)=>setUsername(e.target.value)}

//                 />

//             </div>
//             <div>

//                 <label className='label p-2'>
//                       <span className='text-base label-text text-yellow-50'>Password</span>
//                 </label>
//                 <input type='text' placeholder='Enter Password here' className='w-full input input-borded h-10'
//                   value={password}
//                   onChange={(e)=>setPassword(e.target.value)}
//                 />
                
//             </div>
//             <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
//               {"Don't"} have an account?
//             </Link>

//             {/* This button will be disabled depending on the state. */}
//             <button className='btn btn-block btn-sm mt-2'
//               disabled={loading}
//             >
//               {loading ? <span className='loading loading-spinner'></span>:"Login"}
//             </button>
           
//           </form>


//        </div>
//     </div>
//   );
// };

// export default Login;



// fullName:'',
// username:'',
// password:'',
// confirmPassword:'',
// gender:''


// STARTER CODE OF THE LOGIN PAGE 

// import React from 'react';


// // here label is build in className
// //mt-Means margin top of values

// const Login = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-e-96 mx-auto'>
//        <div className='w-full p-6 rounded-lg shadow-md bg-black bg-clip-padding 
//        backdrop-filter backdrop-blur-lg bg-opicity-0'>
//           <h1 className='text-3xl font-semibold text-center text-blue-500'>LogIn-
//               <span className='text-blue-500'>
//                 ChatApp
//               </span>

//           </h1>

//           <form>
//             <div>

//                 <label className='label p-2'>
//                       <span className='text-base label-text text-yellow-50'>Username</span>
//                 </label>
//                 <input type='text' placeholder='Enter Username here' className='w-full input input-borded h-10'/>

//             </div>
//             <div>

//                 <label className='label p-2'>
//                       <span className='text-base label-text text-yellow-50'>Password</span>
//                 </label>
//                 <input type='text' placeholder='Enter Password here' className='w-full input input-borded h-10'/>
                
//             </div>
//             <a href='#' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
//               {"Don't"} have an account?
//             </a>
//             <button className='btn btn-block btn-sm mt-2'>Login</button>
           
//           </form>


//        </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Custom hook for login logic
  const { loading, login } = useLogin();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-75">
        <h1 className="text-3xl font-semibold text-center text-blue-500">
          Log In - <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-yellow-50">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username here"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-yellow-50">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password here"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Signup Link */}
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          {/* Submit Button */}
          <button
            className="btn btn-block btn-sm mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;