import { useEffect, useState } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    const root = document.documentElement

    // Set class for Tailwind dark mode (optional, in case you use `class` strategy)
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Set data-theme for DaisyUI
    root.setAttribute('data-theme', theme)

    // Persist theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}

