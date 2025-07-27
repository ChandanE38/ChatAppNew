import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup.js';

// here label is build in className
//mt-Means margin top of values

const SignUp = () => {
   const [inputs,setInputs]= useState({
      fullName:'',
      username:'',
      password:'',
      confirmPassword:'',
      gender:''
   });

   const {loading,signup} = useSignup();

   const handleCheckboxChange = (gender) => {
      setInputs({...inputs,gender})
   }

   const handleSubmit =async (e) => {
       e.preventDefault();
       

       await signup(inputs);
   };

  

  return (
    <div className='flex flex-col items-center justify-center min-e-96 mx-auto'>
       <div className='w-full p-6 rounded-lg shadow-md bg-black bg-clip-padding 
       backdrop-filter backdrop-blur-lg bg-opicity-0'>
          <h1 className='text-3xl font-semibold text-center text-blue-500'>SignUp-
              <span className='text-blue-500'>
                 ChatApp
              </span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
                    <label className='label p-1'>
                          <span className='text-base label-text text-yellow-50'>FullName</span>
                    </label>
                    <input type='text' placeholder='Enter your name' className='w-full input input-borded h-10'
                      value={inputs.fullName}
                      onChange={(e)=>setInputs({...inputs , fullName:e.target.value})}
                    />
             </div>

              <div>
                 <label className='label p-1'>
                      <span className='text-base label-text text-yellow-50'>Username</span>
                 </label>
                 <input type='text' placeholder='Enter Username here' className='w-full input input-borded h-10'
                    value={inputs.username}
                    onChange={(e)=>setInputs({...inputs , username:e.target.value})}
                 />
              </div>

              <div>
                 <label className='label p-1'>
                      <span className='text-base label-text text-yellow-50'>Password</span>
                 </label>
                 <input type='text' placeholder='Enter Password here' className='w-full input input-borded h-10'
                      value={inputs.password}
                      onChange={(e)=>setInputs({...inputs , password:e.target.value})}
                 />
              </div>

              <div>
                  <label className='label p-1'>
                       <span className='text-base label-text text-yellow-50'>ConfirmPassword</span>
                  </label>
                  <input type='text' placeholder='Enter Confirm Password' className='w-full input input-borded h-10'
                      value={inputs.confirmPassword}
                      onChange={(e)=>setInputs({...inputs , confirmPassword:e.target.value})}
                  />
              </div>

              <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender}/>
              {/* <GenderCheckbox /> */}

              <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-1 inline-block'>
                 Already have an account?
              </Link>
              <div>
                    <button className='btn btn-block btn-sm mt-1'disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                    </button>

              </div>
          </form>


       </div>
    </div>
  );
};

export default SignUp;



//STARTER CODE FOR SIGNUP COMPONENT


// import React from 'react';
// import GenderCheckbox from './GenderCheckbox';

// // here label is build in className
// //mt-Means margin top of values

// const SignUp = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-e-96 mx-auto'>
//        <div className='w-full p-6 rounded-lg shadow-md bg-black bg-clip-padding 
//        backdrop-filter backdrop-blur-lg bg-opicity-0'>
//           <h1 className='text-3xl font-semibold text-center text-blue-500'>SignUp-
//               <span className='text-blue-500'>
//                 ChatApp
//               </span>
//           </h1>

//           <form>
//             <div>
//                     <label className='label p-1'>
//                           <span className='text-base label-text text-yellow-50'>Name</span>
//                     </label>
//                     <input type='text' placeholder='Enter your name' className='w-full input input-borded h-10'/>
//              </div>

//               <div>
//                  <label className='label p-1'>
//                       <span className='text-base label-text text-yellow-50'>Username</span>
//                  </label>
//                  <input type='text' placeholder='Enter Username here' className='w-full input input-borded h-10'/>
//               </div>

//               <div>
//                  <label className='label p-1'>
//                       <span className='text-base label-text text-yellow-50'>Password</span>
//                  </label>
//                  <input type='text' placeholder='Enter Password here' className='w-full input input-borded h-10'/>
//               </div>

//               <div>
//                   <label className='label p-1'>
//                        <span className='text-base label-text text-yellow-50'>Confirm Password</span>
//                   </label>
//                   <input type='text' placeholder='Enter Confirm Password' className='w-full input input-borded h-10'/>
//               </div>

//               <GenderCheckbox/>

//               <a href='#' className='text-sm hover:underline hover:text-blue-600 mt-1 inline-block'>
//                  Already have an account?
//               </a>
//               <button className='btn btn-block btn-sm mt-1'>Signup</button>
           
//           </form>


//        </div>
//     </div>
//   );
// };

// export default SignUp;