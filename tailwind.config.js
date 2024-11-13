/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'infinite1': 'infinite1 25s linear infinite',
        'infinite2': 'infinite2 25s linear infinite',
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
        }
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

