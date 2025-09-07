import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiInfo, FiSun, FiMoon } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useAuthContext } from '../../../context/AuthContext.jsx'
import { useTheme } from '../../../hooks/useTheme.jsx'
import { toast } from 'react-hot-toast'

const UserProfile = () => {
  const { authUser: user, setAuthUser } = useAuthContext()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(user?.fullName || '')
  const [username, setUsername] = useState(user?.username || '')
  const [gender, setGender] = useState(user?.gender || '')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const [previewAvatar, setPreviewAvatar] = useState(() => {
    const profileImg = user?.profilePic || ''
    if (profileImg && !profileImg.startsWith('http')) {
      return `http://localhost:5000${profileImg}`
    }
    return profileImg
  })
  const [error, setError] = useState(null)

  // Update preview avatar when user data changes
  useEffect(() => {
    const profileImg = user?.profilePic || ''
    if (profileImg && !profileImg.startsWith('http')) {
      setPreviewAvatar(`http://localhost:5000${profileImg}`)
    } else {
      setPreviewAvatar(profileImg)
    }
  }, [user])

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      toast.error('Full name is required')
      return
    }
    
    setIsSaving(true)
    setError(null)

    try {
      // Debug: Check authentication state
      console.log('🔍 Debug - Current user:', user)
      console.log('🔍 Debug - Auth user from context:', user) // Fixed: authUser was not defined, using user instead
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('chat-user')
      console.log('🔍 Debug - Stored token exists:', !!storedToken)
      console.log('🔍 Debug - Stored user:', storedUser ? JSON.parse(storedUser) : 'None')
      
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('username', username)
      formData.append('gender', gender)
      
      // Only append file if a new one was selected
      if (avatarFile) {
        formData.append('profile', avatarFile)
        console.log('Uploading new profile picture:', avatarFile.name)
      }

      // Get token and validate it exists
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Authentication expired. Please login again.')
        navigate('/login')
        return
      }

      console.log('🔑 Sending request with token:', token ? 'Token exists' : 'No token')

      const response = await fetch('http://localhost:5000/api/users/update', {
        method: 'PUT',
        body: formData,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type header when using FormData - browser sets it automatically
        }
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update profile')
      }

      const updatedUser = await response.json()
      
      // Update preview avatar with the new profile image URL
      if (updatedUser.profilePic) {
        setPreviewAvatar(`http://localhost:5000${updatedUser.profilePic}`)
      }
      
      // Update localStorage and auth context
      localStorage.setItem('chat-user', JSON.stringify(updatedUser))
      setAuthUser(updatedUser)
      
      // Clear the file selection since it's now saved
      setAvatarFile(null)
      
      setIsEditing(false)
      toast.success(
        avatarFile 
          ? 'Profile and picture updated successfully!' 
          : 'Profile updated successfully!'
      )
    } catch (error) {
      setError(error.message || 'Failed to update profile. Please try again.')
      console.error('Failed to update profile:', error)
      
      // Handle authentication errors specifically
      if (error.message.includes('Unauthorized') || error.message.includes('Invalid Token') || error.message.includes('authentication')) {
        toast.error('Session expired. Please login again.')
        localStorage.removeItem('token')
        localStorage.removeItem('chat-user')
        setAuthUser(null)
        navigate('/login')
      } else {
        toast.error(error.message || 'Failed to update profile')
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      
      // Clear local storage and auth context
      localStorage.removeItem('chat-user')
      localStorage.removeItem('token')
      setAuthUser(null)
      
      navigate('/login')
      toast.success('Logged out successfully!')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if server logout fails, clear local data
      localStorage.removeItem('chat-user')
      localStorage.removeItem('token')
      setAuthUser(null)
      navigate('/login')
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF, WEBP)')
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        toast.error('Image size should be less than 5MB')
        return
      }

      setAvatarFile(file)
      setPreviewAvatar(URL.createObjectURL(file))
      toast.success('Profile picture selected successfully!')
    }
  }

  return (
    <div className="mb-[2vh] mt-[2vh] flex flex-col bg-gray-50 dark:bg-gray-900" style={{ height: "calc(100vh - 2vh)" }}>

      {/* Header */}
      <div className="relative bg-emerald-600 pb-12 pt-3 text-white dark:bg-emerald-700">
        <div className="px-4">
          <button
            onClick={() => navigate('/')}
            className="rounded-full p-2 hover:bg-white/20"
            aria-label="Back"
          >
            <FiArrowLeft size={24} />
          </button>
        </div>

        {isEditing ? (
          <div> {/* You can place anything you want in the editing view here */} </div>
        ) : (
          <div className="absolute -bottom-16 left-0 w-full text-center">
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-md dark:border-gray-800">
                    <img
                      src={previewAvatar || `https://avatar.iran.liara.run/public?username=${encodeURIComponent(user?.fullName || user?.username || 'User')}`}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://avatar.iran.liara.run/public?username=${encodeURIComponent(user?.fullName || user?.username || 'User')}`
                      }}
                    />
            </div>
          </div>
        )}
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
                <div className="text-center">
                  <div className="relative mx-auto mb-4">
                    <label className="relative mx-auto block h-32 w-32 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-white shadow-md dark:border-gray-800 hover:shadow-lg transition-shadow">
                      <img
                        src={previewAvatar || `https://avatar.iran.liara.run/public?username=${encodeURIComponent(user?.fullName || user?.username || 'User')}`}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://avatar.iran.liara.run/public?username=${encodeURIComponent(user?.fullName || user?.username || 'User')}`
                        }}
                      />
                      {/* Upload overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <div className="text-white opacity-0 hover:opacity-100 transition-opacity">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment" 
                        onChange={handleAvatarChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        aria-label="Upload profile picture"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload from your device</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Supports JPEG, PNG, GIF, WEBP (max 5MB)</p>
                  
                  {/* Additional upload options */}
                  <div className="flex justify-center space-x-3 mt-3">
                    <label className="btn btn-outline btn-sm cursor-pointer">
                      📁 Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                        aria-label="Choose profile picture file"
                      />
                    </label>
                    
                    {(previewAvatar && avatarFile) && (
                      <button
                        type="button"
                        onClick={() => {
                          setAvatarFile(null)
                          const originalImg = user?.profile || user?.profilePic || ''
                          if (originalImg && !originalImg.startsWith('http')) {
                            setPreviewAvatar(`http://localhost:5000${originalImg}`)
                          } else {
                            setPreviewAvatar(originalImg)
                          }
                          toast.info('Profile picture reset to original')
                        }}
                        className="btn btn-outline btn-sm text-red-600 hover:bg-red-50"
                      >
                        🗑️ Reset
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input pl-10"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input pl-10"
                      placeholder="Your username"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Gender
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiInfo className="text-gray-400" />
                    </div>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="input pl-10"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

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
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="text-gray-900 dark:text-white">{user?.fullName}</p>
                  </div>
                </div>

                <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <FiUser size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</p>
                    <p className="text-gray-900 dark:text-white">{user?.username}</p>
                  </div>
                </div>

                <div className="flex items-center pb-2">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <FiInfo size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
                    <p className="text-gray-900 dark:text-white">{user?.gender || 'Not specified'}</p>
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
