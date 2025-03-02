// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to '/' if deployed at the root or to '/your-sub-directory/' if not
export default defineConfig({
  base: '/',
  plugins: [react()],
})
