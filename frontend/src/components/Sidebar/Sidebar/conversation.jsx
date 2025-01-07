import React from 'react'

const Conversation= () => {
  return (
    <>
        <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer '>

           {/* <div className="avatar offline">
                <div className="w-4 rounded-full">
                    img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                </div>
            </div> */}
            <div className="avatar online">
               <div className="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
               </div>
            </div>
            

            <div>
                <div className='flex gap-20'>
                    <p className='font-bold text-gray-200'>Rohan</p>
                    <span className='text-xl'>@#$</span>
                </div>
            </div>
        </div>

        <div className='divider my-0 py-0 h-1'></div>
    
    </>
  )
}

export default Conversation;



// import React from 'react'

// const Conversation= () => {
//   return (
//     <>
//         <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer '>

//            {/* <div className="avatar offline">
//                 <div className="w-4 rounded-full">
//                     img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
//                 </div>
//             </div> */}
//             <div className="avatar online">
//                <div className="w-14 rounded-full">
//                     <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//                </div>
//             </div>
            

//             <div>
//                 <div className='flex gap-20'>
//                     <p className='font-bold text-gray-200'>Rohan</p>
//                     <span className='text-xl'>@#$</span>
//                 </div>
//             </div>
//         </div>

//         <div className='divider my-0 py-0 h-1'></div>
    
//     </>
//   )
// }

// export default Conversation;
