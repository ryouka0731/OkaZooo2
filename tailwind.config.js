/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        main: {
          dark: '#222831',
          light: '#31363F'
        }
      }
    }
  },
  safelist: [
    'bg-black',
    'text-white',
    'font-[roboto]',
    'glass',
    'puni',
    'flex',
    'justify-center',
    'items-center',
    'rounded',
    'dark:hover:bg-[#333333aa]',
    'hover:bg-[#eaeaea]',
    'dark:text-white',
    'text-black',
    'transition-colors',
    'duration-200',
    'ease-in-out'
  ]
}
