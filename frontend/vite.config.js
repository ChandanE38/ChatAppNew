import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // // change the port number by this way accordingly
  server:{
     port:8000,
  //   proxy:{
  //     "/api":{
  //       target:"http://localhost:5000",
  //       changeOrigin:true,
  //     },
  //   },
  },
})
