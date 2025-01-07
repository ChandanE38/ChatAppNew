import React from 'react'

const GenderCheckbox = () => {
  return (
    <div className='flex'>
        <div className='form-control'>
            <label className={'label gap-1 cursor-pointer'}>
                <span className='label-text text-white'>Male</span>
                <input type='checkbox' className='checkbox border-yellow-100'/>
            </label>
        </div>

        <div className='form-control'>
            <label className={'label gap-1 cursor-pointer'}>
                <span className='label-text text-white'>Female</span>
                <input type='checkbox' className='checkbox border-yellow-100'/>
            </label>
        </div>
        {/* <div className='form-control'>
            <label className={'label gap-1 cursor-pointer'}>
                <span className='label-text text-white'>Others</span>
                <input type='checkbox' className='checkbox border-yellow-100'/>
            </label>
        </div> */}
    </div>
   
  )
}

export default GenderCheckbox;


// STARTER CODE FOR GENDER CHECK COMPONENT


// import React from 'react'

// const GenderCheckbox = () => {
//   return (
//     <div className='flex'>
//         <div className='form-control'>
//             <label className={'label gap-1 cursor-pointer'}>
//                 <span className='label-text text-white'>Male</span>
//                 <input type='checkbox' className='checkbox border-yellow-100'/>
//             </label>
//         </div>

//         <div className='form-control'>
//             <label className={'label gap-1 cursor-pointer'}>
//                 <span className='label-text text-white'>Female</span>
//                 <input type='checkbox' className='checkbox border-yellow-100'/>
//             </label>
//         </div>
//         {/* <div className='form-control'>
//             <label className={'label gap-1 cursor-pointer'}>
//                 <span className='label-text text-white'>Others</span>
//                 <input type='checkbox' className='checkbox border-yellow-100'/>
//             </label>
//         </div> */}
//     </div>
   
//   )
// }

// export default GenderCheckbox