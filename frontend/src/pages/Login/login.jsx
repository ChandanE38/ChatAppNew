import React from 'react';
import { Link } from 'react-router-dom';


// here label is build in className
//mt-Means margin top of values

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-e-96 mx-auto'>
       <div className='w-full p-6 rounded-lg shadow-md bg-black bg-clip-padding 
       backdrop-filter backdrop-blur-lg bg-opicity-0'>
          <h1 className='text-3xl font-semibold text-center text-blue-500'>LogIn-
              <span className='text-blue-500'>
                ChatApp
              </span>

          </h1>

          <form>
            <div>

                <label className='label p-2'>
                      <span className='text-base label-text text-yellow-50'>Username</span>
                </label>
                <input type='text' placeholder='Enter Username here' className='w-full input input-borded h-10'/>

            </div>
            <div>

                <label className='label p-2'>
                      <span className='text-base label-text text-yellow-50'>Password</span>
                </label>
                <input type='text' placeholder='Enter Password here' className='w-full input input-borded h-10'/>
                
            </div>
            <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
              {"Don't"} have an account?
            </Link>
            <button className='btn btn-block btn-sm mt-2'>Login</button>
           
          </form>


       </div>
    </div>
  );
};

export default Login;



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