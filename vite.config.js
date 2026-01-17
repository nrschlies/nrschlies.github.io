import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',      // keep this for a user site like nrschlies.github.io
  plugins: [react()],
})