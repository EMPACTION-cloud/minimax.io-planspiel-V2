/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // German flag colors for theming
        'german-red': '#DD0000',
        'german-gold': '#FFCE00',
        'german-black': '#000000',
        
        // Party colors
        'party-progressive': '#ff7f00', // Orange
        'party-social': '#e53e3e',      // Red
        'party-liberal': '#ffeb3b',     // Yellow
        'party-conservative': '#2d3748', // Black
        'party-green': '#48bb78',       // Green
        'party-left': '#8b008b',        // Purple
        'party-right': '#3182ce',       // Blue
        
        // Status colors
        'status-excellent': '#10b981',
        'status-good': '#34d399',
        'status-average': '#fbbf24',
        'status-poor': '#f87171',
        'status-critical': '#dc2626'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 1s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out'
      },
      keyframes: {
        slideInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(100%)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' }
        }
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      },
      screens: {
        '3xl': '1600px'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16'
      }
    },
  },
  plugins: [
    // Add any plugins you need here
  ],
}
