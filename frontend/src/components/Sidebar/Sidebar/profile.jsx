import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiInfo, FiSun, FiMoon } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTheme } from '../../../hooks/useTheme.jsx'
import axios from 'axios'

const UserProfile = () => {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  // Always use chat-user from localStorage
  const getChatUser = () => {
    try {
      return JSON.parse(localStorage.getItem('chat-user')) || {};
    } catch {
      return {};
    }
  };

  const [fullName, setFullName] = useState(getChatUser().fullName || '')
  const [username, setUsername] = useState(getChatUser().username || '')
  const [gender, setGender] = useState(getChatUser().gender || 'male')
  const [profilePic, setProfilePic] = useState(null)
  const [previewProfilePic, setPreviewProfilePic] = useState(getChatUser().profile || '')
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const chatUser = getChatUser();
    setFullName(chatUser.fullName || '');
    setUsername(chatUser.username || '');
    setGender(chatUser.gender || 'male');
    setPreviewProfilePic(chatUser.profile || '');
  }, []);

  const handleSaveProfile = async () => {
    if (!fullName.trim() || !username.trim() || !gender) return;
    setIsSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('username', username);
      formData.append('gender', gender);
      if (profilePic) formData.append('profilePic', profilePic);

      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/users/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Save the updated user data (including new profile image URL) to localStorage
      localStorage.setItem('chat-user', JSON.stringify(res.data));
      setIsEditing(false);
      // Optionally update previewProfilePic immediately
      setPreviewProfilePic(res.data.profile || '');
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('chat-user')
    navigate('/login')
  }

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePic(file)
      setPreviewProfilePic(URL.createObjectURL(file))
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
                src={previewProfilePic}
                alt="Profile"
                className="h-full w-full object-cover"
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
                  <label className="relative mx-auto block h-32 w-32 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-white shadow-md dark:border-gray-800">
                    <img
                      src={previewProfilePic}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      className="absolute inset-0 opacity-0"
                    />
                  </label>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Click to change profile picture</p>
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
                      <FiUser className="text-gray-400" />
                    </div>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="input pl-10"
                    >
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
                    <p className="text-gray-900 dark:text-white">{getChatUser().fullName}</p>
                  </div>
                </div>

                <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <FiUser size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</p>
                    <p className="text-gray-900 dark:text-white">{getChatUser().username}</p>
                  </div>
                </div>

                <div className="flex items-center border-b border-gray-200 pb-4 dark:border-gray-700">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <FiUser size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
                    <p className="text-gray-900 dark:text-white">{getChatUser().gender}</p>
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
