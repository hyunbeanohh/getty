/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      colors: {
        default :{
          DEFAULT : '#000',
          foreground: 'white'
        },
        primary: {
          DEFAULT: 'rgb(0 0% 100%)',
          foreground: 'rgb(0 0% 98%)'
        },
      },

      animation: {
        'infinite1': 'infinite1 25s linear infinite',
        'infinite2': 'infinite2 25s linear infinite',
        'infinite1-reverse': 'infinite1-reverse 30s linear infinite',
        'infinite2-reverse': 'infinite2-reverse 30s linear infinite',
      },
      keyframes: {
        infinite1: {
          '0%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-100%)' },
          '50.1%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        infinite2: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-200%)' },
        },
        'infinite1-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'infinite2-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

