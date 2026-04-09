import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ups-kalkulator/',  // <-- zmień na nazwę repo na GitHubie
})
