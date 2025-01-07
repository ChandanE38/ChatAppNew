import React from 'react';
import GenderCheckbox from './GenderCheckbox';


// here label is build in className
//mt-Means margin top of values

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-e-96 mx-auto'>
       <div className='w-full p-6 rounded-lg shadow-md bg-black bg-clip-padding 
       backdrop-filter backdrop-blur-lg bg-opicity-0'>
          <h1 className='text-3xl font-semibold text-center text-blue-500'>SignUp-
              <span className='text-blue-500'>
                ChatApp
              </span>
          </h1>

          <form>
            <div>
                    <label className='label p-1'>
                          <span className='text-base label-text text-yellow-50'>Name</span>
                    </label>
                    <input type='text' placeholder='Enter your name' className='w-full input input-borded h-10'/>
             </div>

              <div>
                 <label className='label p-1'>
                      <span className='text-base label-text text-yellow-50'>Username</span>
                 </label>
                 <input type='text' placeholder='Enter Username here' className='w-full input input-borded h-10'/>
              </div>

              <div>
                 <label className='label p-1'>
                      <span className='text-base label-text text-yellow-50'>Password</span>
                 </label>
                 <input type='text' placeholder='Enter Password here' className='w-full input input-borded h-10'/>
              </div>

              <div>
                  <label className='label p-1'>
                       <span className='text-base label-text text-yellow-50'>Confirm Password</span>
                  </label>
                  <input type='text' placeholder='Enter Confirm Password' className='w-full input input-borded h-10'/>
              </div>

              <GenderCheckbox/>

              <a href='#' className='text-sm hover:underline hover:text-blue-600 mt-1 inline-block'>
                 Already have an account?
              </a>
              <button className='btn btn-block btn-sm mt-1'>Signup</button>
           
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