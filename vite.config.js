import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    {
      name: 'create-nojekyll',
      closeBundle() {
        writeFileSync('dist/.nojekyll', '')
      }
    }
  ],
  base: '/',
})
