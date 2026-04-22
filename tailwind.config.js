/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FAFAF7',
          sand: '#F0EDE6',
          gold: '#C8963E',
          'gold-light': '#E8C97A',
          'gold-dark': '#A67B2E',
          coral: '#E05A3A',
          'coral-light': '#F07A5E',
          indigo: '#3D348B',
          'indigo-light': '#5A4FCF',
          charcoal: '#1A1A1A',
          slate: '#6B6B6B',
          'slate-light': '#9B9B9B',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.65)',
          'white-heavy': 'rgba(255, 255, 255, 0.85)',
          border: 'rgba(255, 255, 255, 0.3)',
          'border-dark': 'rgba(0, 0, 0, 0.08)',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      borderWidth: {
        '3': '3px',
      },
      backdropBlur: {
        'glass': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'count': 'countPulse 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        countPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
