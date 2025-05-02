// // import { useState } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { FiArrowLeft, FiUser, FiMail, FiInfo, FiSun, FiMoon } from 'react-icons/fi'
// // import { motion } from 'framer-motion'
// // import { useAuth } from '../../../hooks/useAuth.jsx'
// // import { useTheme } from '../../../hooks/useTheme.jsx'

// // const UserProfile = () => {
// //   const { user, updateProfile, logout } = useAuth()
// //   const { theme, toggleTheme } = useTheme()
// //   const navigate = useNavigate()

// //   const [name, setName] = useState(user?.name || '')
// //   const [about, setAbout] = useState(user?.about || '')
// //   const [isEditing, setIsEditing] = useState(false)
// //   const [isSaving, setIsSaving] = useState(false)
// //   const [avatarFile, setAvatarFile] = useState(null)
// //   const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || '')

// //   const handleSaveProfile = async () => {
// //     if (!name.trim()) return
// //     setIsSaving(true)

// //     try {
// //       await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay
// //       updateProfile({
// //         name,
// //         about,
// //         avatar: previewAvatar // replace with uploaded URL in real backend
// //       })
// //       setIsEditing(false)
// //     } catch (error) {
// //       console.error('Failed to update profile:', error)
// //     } finally {
// //       setIsSaving(false)
// //     }
// //   }

// //   const handleLogout = () => {
// //     logout()
// //     navigate('/login')
// //   }

// //   const handleAvatarChange = (e) => {
// //     const file = e.target.files[0]
// //     if (file) {
// //       setAvatarFile(file)
// //       setPreviewAvatar(URL.createObjectURL(file))
// //     }
// //   }

// //   return (
// //     <div className="min-h-full bg-gray-50 pb-20 dark:bg-gray-900">
// //       {/* Header */}
// //       <div className="relative bg-emerald-600 pb-24 pt-6 text-white dark:bg-emerald-700">
// //         <div className="px-4">
// //           <button
// //             onClick={() => navigate('/')}
// //             className="rounded-full p-2 hover:bg-white/20"
// //             aria-label="Back"
// //           >
// //             <FiArrowLeft size={24} />
// //           </button>
// //         </div>

// //         <div className="absolute -bottom-16 left-0 w-full text-center">
// //           <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-md dark:border-gray-800">
// //             <img
// //               src={previewAvatar}
// //               alt="Profile"
// //               className="h-full w-full object-cover"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Profile content */}
// //       <div className="mt-20 px-4 pb-8">
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //           className="mx-auto max-w-md"
// //         >
// //           <div className="mb-6 text-center">
// //             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
// //               {isEditing ? 'Edit Profile' : 'Profile'}
// //             </h1>
// //           </div>

// //           <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
// //             {isEditing ? (
// //               <div className="space-y-4">
// //                 {/* Avatar Upload */}
// //                 <div className="text-center">
// //                   <label className="relative mx-auto block h-32 w-32 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-white shadow-md dark:border-gray-800">
// //                     <img
// //                       src={previewAvatar}
// //                       alt="Preview"
// //                       className="h-full w-full object-cover"
// //                     />
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={handleAvatarChange}
// //                       className="absolute inset-0 opacity-0"
// //                     />
// //                   </label>
// //                   <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Click to change profile picture</p>
// //                 </div>

// //                 {/* Name */}
// //                 <div>
// //                   <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Name
// //                   </label>
// //                   <div className="relative">
// //                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
// //                       <FiUser className="text-gray-400" />
// //                     </div>
// //                     <input
// //                       id="name"
// //                       type="text"
// //                       value={name}
// //                       onChange={(e) => setName(e.target.value)}
// //                       className="input pl-10"
// //                       placeholder="Your name"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* About */}
// //                 <div>
// //                   <label htmlFor="about" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     About
// //                   </label>
// //                   <div className="relative">
// //                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
// //                       <FiInfo className="text-gray-400" />
// //                     </div>
// //                     <input
// //                       id="about"
// //                       type="text"
// //                       value={about}
// //                       onChange={(e) => setAbout(e.target.value)}
// //                       className="input pl-10"
// //                       placeholder="Tell us about yourself"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Buttons */}
// //                 <div className="flex space-x-3 pt-4">
// //                   <button
// //                     type="button"
// //                     onClick={() => setIsEditing(false)}
// //                     className="btn btn-secondary flex-1"
// //                     disabled={isSaving}
// //                   >
// //                     Cancel
// //                   </button>

// //                   <button
// //                     type="button"
// //                     onClick={handleSaveProfile}
// //                     className="btn btn-primary flex-1"
// //                     disabled={isSaving}
// //                   >
// //                     {isSaving ? (
// //                       <span className="flex items-center justify-center">
// //                         <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
// //                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
// //                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
// //                         </svg>
// //                         Saving...
// //                       </span>
// //                     ) : (
// //                       'Save'
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="space-y-4">
// //                 <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-700">
// //                   <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
// //                     <FiUser size={20} />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
// //                     <p className="text-gray-900 dark:text-white">{user?.name}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-700">
// //                   <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
// //                     <FiMail size={20} />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
// //                     <p className="text-gray-900 dark:text-white">{user?.email}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center pb-2">
// //                   <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
// //                     <FiInfo size={20} />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-500 dark:text-gray-400">About</p>
// //                     <p className="text-gray-900 dark:text-white">{user?.about || 'No about information'}</p>
// //                   </div>
// //                 </div>

// //                 <button
// //                   onClick={() => setIsEditing(true)}
// //                   className="btn btn-primary w-full"
// //                 >
// //                   Edit Profile
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           <div className="mt-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
// //             <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Settings</h2>
// //             <div className="space-y-4">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center">
// //                   <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
// //                     {theme === 'light' ? <FiSun size={20} /> : <FiMoon size={20} />}
// //                   </div>
// //                   <div>
// //                     <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
// //                     <p className="text-sm text-gray-500 dark:text-gray-400">
// //                       {theme === 'light' ? 'Currently using light mode' : 'Currently using dark mode'}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <button
// //                   onClick={toggleTheme}
// //                   className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-gray-700"
// //                   aria-pressed={theme === 'dark'}
// //                 >
// //                   <span className="sr-only">Toggle dark mode</span>
// //                   <span
// //                     className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
// //                       theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
// //                     }`}
// //                   />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           <button
// //             onClick={handleLogout}
// //             className="btn btn-secondary mt-6 w-full"
// //           >
// //             Logout
// //           </button>
// //         </motion.div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default UserProfile


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiInfo, FiSun, FiMoon } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useAuth } from '../../../hooks/useAuth.jsx'
import { useTheme } from '../../../hooks/useTheme.jsx'

const UserProfile = () => {
  const { user, updateProfile, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name || '')
  const [about, setAbout] = useState(user?.about || '')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || '')

  const handleSaveProfile = async () => {
    if (!name.trim()) return
    setIsSaving(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay
      updateProfile({
        name,
        about,
        avatar: previewAvatar // replace with uploaded URL in real backend
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setPreviewAvatar(URL.createObjectURL(file))
    }
  }

  return (
    // <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <div className="min-h-min flex flex-col bg-gray-50 dark:bg-gray-900">
  
      {/* Header */}
      <div className="relative bg-emerald-600 pb-24 pt-6 text-white dark:bg-emerald-700">
        <div className="px-4">
          <button
            onClick={() => navigate('/')}
            className="rounded-full p-2 hover:bg-white/20"
            aria-label="Back"
          >
            <FiArrowLeft size={24} />
          </button>
        </div>

        <div className="absolute -bottom-16 left-0 w-full text-center">
          <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-md dark:border-gray-800">
            <img
              src={previewAvatar}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-md"
        >
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Profile' : 'Profile'}
            </h1>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            {isEditing ? (
              <div className="space-y-4">
                {/* Avatar Upload */}
                <div className="text-center">
                  <label className="relative mx-auto block h-32 w-32 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-white shadow-md dark:border-gray-800">
                    <img
                      src={previewAvatar}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="absolute inset-0 opacity-0"
                    />
                  </label>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Click to change profile picture</p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input pl-10"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                {/* About */}
                <div>
                  <label htmlFor="about" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    About
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiInfo className="text-gray-400" />
                    </div>
                    <input
                      id="about"
                      type="text"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="input pl-10"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-secondary flex-1"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="btn btn-primary flex-1"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="flex items-center justify-center">
                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <FiUser size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                    <p className="text-gray-900 dark:text-white">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center pb-2">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <FiInfo size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">About</p>
                    <p className="text-gray-900 dark:text-white">{user?.about || 'No about information'}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary w-full"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    {theme === 'light' ? <FiSun size={20} /> : <FiMoon size={20} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {theme === 'light' ? 'Currently using light mode' : 'Currently using dark mode'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleTheme}
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-gray-700"
                  aria-pressed={theme === 'dark'}
                >
                  <span className="sr-only">Toggle dark mode</span>
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-secondary mt-6 w-full"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default UserProfile
