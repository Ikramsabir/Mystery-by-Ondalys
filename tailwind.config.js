/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // إزالة الألوان البحرية وإستعمال ألوان رمادية أنيقة
      },
      fontFamily: {
        arabic: ['"El Messiri"', 'serif'],
        tajawal: ['"Tajawal"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}