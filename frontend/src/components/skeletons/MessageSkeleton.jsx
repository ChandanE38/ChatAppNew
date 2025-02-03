const MessageSkeleton = () => {
  return (
    <>
        <div className='flex gap-3 items-center'>
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-1">
                <div className="skeleton h-4 w-40"></div>
                <div className="skeleton h-4 w-40"></div>
            </div>
        </div>

        <div className='flex gap-3 items-center justify-end'>
            <div className="flex flex-col gap-1">
                <div className="skeleton h-4 w-40"></div>
            </div>
            <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
        </div>
    
    </>
  );
}

export default MessageSkeleton;

// const MessageSkeleton = () => {
//     return (
//       <div className="flex flex-col gap-4">
//         {/* Incoming Message Skeleton */}
//         <div className="flex gap-3 items-center">
//           <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
//           <div className="flex flex-col gap-1">
//             <div className="skeleton h-4 w-[60%] md:w-[40%]"></div>
//             <div className="skeleton h-4 w-[50%] md:w-[35%]"></div>
//           </div>
//         </div>
  
//         {/* Outgoing Message Skeleton */}
//         <div className="flex gap-3 items-center justify-end">
//           <div className="flex flex-col gap-1 items-end">
//             <div className="skeleton h-4 w-[50%] md:w-[35%]"></div>
//           </div>
//           <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
//         </div>
//       </div>
//     );
//   };
  
//   export default MessageSkeleton;
  