import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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
        
        // In a real app, we would send this to the server
        // For now, just simulate registration success
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
      
      updateProfile: (updates) => {
        set({ user: { ...get().user, ...updates } })
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)

export const useAuth = () => {
  const authStore = useAuthStore()
  
  // Initialize authentication state on first load
  if (authStore.isLoading) {
    setTimeout(() => {
      authStore.init()
    }, 500) // Simulate loading time
  }
  
  return authStore
}