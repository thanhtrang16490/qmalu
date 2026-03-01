/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e6282b',
          light: '#f04447',
          dark: '#c41f22',
        },
        secondary: {
          DEFAULT: '#4fb348',
          light: '#6bc563',
          dark: '#3d8e37',
        },
        // Apple-style neutral colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f7',
          200: '#e8e8ed',
          300: '#d2d2d7',
          400: '#b0b0b5',
          500: '#86868b',
          600: '#6e6e73',
          700: '#515154',
          800: '#1d1d1f',
          900: '#000000',
        },
      },
    },
  },
  plugins: [],
}
