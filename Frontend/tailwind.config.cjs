/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#e5e7eb",        // slate-200
        input: "#ffffff",         // white
        ring: "#2563eb",          // blue-600
        background: "#f8fafc",    // slate-50
        foreground: "#0f172a",    // slate-900
        primary: {
          DEFAULT: "#2563eb",     // blue-600
          foreground: "#ffffff",  // white
        },
        secondary: {
          DEFAULT: "#64748b",     // slate-500
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",     // red-500
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f1f5f9",     // slate-100
          foreground: "#475569",  // slate-600
        },
        accent: {
          DEFAULT: "#059669",     // emerald-600
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        success: {
          DEFAULT: "#10b981",     // emerald-500
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f59e0b",     // amber-500
          foreground: "#ffffff",
        },
        error: {
          DEFAULT: "#ef4444",     // red-500
          foreground: "#ffffff",
        },
        surface: "#ffffff",
        "text-primary": "#0f172a",
        "text-secondary": "#475569",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scale-in 150ms ease-out',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      zIndex: {
        '999': '999',
        '1000': '1000',
        '1001': '1001',
        '1002': '1002',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
