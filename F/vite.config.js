import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3005',
    },
  },
});




//Normally, when your frontend (on http://localhost:3000) tries to request data from your backend (on http://localhost:5000), the browser recognizes that these are two different origins, which triggers a CORS check.
//With the reverse proxy in place, the frontend still makes requests to / api, but Vite's development server forwards those requests to http://localhost:5000, making it appear as if the request is being made from the same origin.
//Since the request doesn’t look like it’s crossing domains anymore, there’s no need for the server to handle CORS headers.