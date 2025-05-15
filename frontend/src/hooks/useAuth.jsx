// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
// import { mockUsers } from '../data/mockData'

// const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       isAuthenticated: false,
//       isLoading: true,
      
//       init: () => {
//         set({ isLoading: false })
//       },
      
//       login: (email, password) => {
//         const foundUser = mockUsers.find(
//           (u) => u.email === email && u.password === password
//         )
        
//         if (foundUser) {
//           const { password, ...userWithoutPassword } = foundUser
//           set({ 
//             user: userWithoutPassword, 
//             isAuthenticated: true 
//           })
//           return true
//         }
        
//         return false
//       },
      
//       register: (userData) => {
//         const userExists = mockUsers.some(u => u.email === userData.email)
        
//         if (userExists) {
//           return false
//         }
        
//         // In a real app, we would send this to the server
//         // For now, just simulate registration success
//         const newUser = {
//           ...userData,
//           id: `user-${Date.now()}`,
//           avatar: `https://avatar.iran.liara.run/public/${userData.name}`
//         }
        
//         const { password, ...userWithoutPassword } = newUser
//         set({ 
//           user: userWithoutPassword, 
//           isAuthenticated: true 
//         })
        
//         return true
//       },
      
//       logout: () => {
//         set({ user: null, isAuthenticated: false })
//       },
      
//       // updateProfile: (updates) => {
//       //   set({ user: { ...get().user, ...updates } })
//       // }

//       // sidebar.tsx

//       const updateProfile = async ({ fullName, username, gender, profilePic }) => {
//           const formData = new FormData()
//           formData.append('fullName', fullName)
//           formData.append('username', username)
//           formData.append('gender', gender)
//           if (profilePic) formData.append('profilePic', profilePic)

//           const res = await axios.put('/api/users/update', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//           })

//           setUser(res.data)
//           return res.data
//       }

//       const handleSaveProfile = async () => {
//           if (!fullName.trim() || !username.trim() || !gender) return
//           setIsSaving(true)
//           setError(null)

//           try {
//             await updateProfile({ fullName, username, gender, profilePic }) // profilePic is a File
//             setIsEditing(false)
//           } catch (error) {
//             console.error("Profile update failed:", error)
//             setError(error?.response?.data?.error || "Failed to update profile.")
//           } finally {
//             setIsSaving(false)
//           }
//         }
//     }),  
//     {
//       name: 'auth-storage',
//     }
//   )
// )

// export const useAuth = () => {
//   const authStore = useAuthStore()
  
//   // Initialize authentication state on first load
//   if (authStore.isLoading) {
//     setTimeout(() => {
//       authStore.init()
//     }, 500) // Simulate loading time
//   }
  
//   return authStore
// }


import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { mockUsers } from '../data/mockData'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      init: () => {
        set({ isLoading: false })
      },

      login: (email, password) => {
        const foundUser = mockUsers.find(
          (u) => u.email === email && u.password === password
        )

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser
          set({
            user: userWithoutPassword,
            isAuthenticated: true
          })
          return true
        }

        return false
      },

      register: (userData) => {
        const userExists = mockUsers.some(u => u.email === userData.email)

        if (userExists) {
          return false
        }

        const newUser = {
          ...userData,
          id: `user-${Date.now()}`,
          avatar: `https://avatar.iran.liara.run/public/${userData.name}`
        }

        const { password, ...userWithoutPassword } = newUser
        set({
          user: userWithoutPassword,
          isAuthenticated: true
        })

        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: async ({ fullName, username, gender, profilePic }) => {
        try {
          const formData = new FormData()
          formData.append('fullName', fullName)
          formData.append('username', username)
          formData.append('gender', gender)
          if (profilePic) formData.append('profilePic', profilePic)

          const res = await axios.put('localhost:5000/api/users/update', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          set({ user: res.data }) // update user in store
          return res.data
        } catch (err) {
          throw err
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)

export const useAuth = () => {
  const authStore = useAuthStore()

  if (authStore.isLoading) {
    setTimeout(() => {
      authStore.init()
    }, 500)
  }

  return authStore
}