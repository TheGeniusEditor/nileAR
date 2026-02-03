/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0651ED',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        'background-light': '#F8FAFC',
        'background-dark': '#0F172A',
        'surface-light': '#FFFFFF',
        'surface-dark': '#1E293B',
        'text-main-light': '#1E293B',
        'text-main-dark': '#F8FAFC',
        'text-sub-light': '#64748B',
        'text-sub-dark': '#94A3B8',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
