import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Base
        'jun-black':   '#09090b',   // ultra dark background
        'jun-dark':    '#111118',   // dark surfaces
        'jun-surface': '#18181f',   // card surfaces
        'jun-border':  '#2a2a3a',   // subtle borders

        // Accent palette — electric creative agency
        'jun-sand':    '#8b5cf6',   // electric purple (replaces beige)
        'jun-accent':  '#06b6d4',   // electric cyan
        'jun-lime':    '#a3e635',   // energy lime

        // Light / neutral
        'jun-light':   '#fafafa',   // near white
        'jun-warm':    '#f4f3ff',   // light lavender surface
        'jun-muted':   '#71717a',   // muted text
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in':        'fadeIn 0.8s ease-out forwards',
        'fade-in-up':     'fadeInUp 0.8s ease-out forwards',
        'fade-in-down':   'fadeInDown 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'blob':           'blob 7s infinite',
        'blob-delay':     'blob 9s 2s infinite',
        'spin-slow':      'spinSlow 28s linear infinite',
        'spin-reverse':   'spinReverse 20s linear infinite',
        'spin-med':       'spinSlow 15s linear infinite',
        'float-up-fade':  'floatUpFade 5s ease-in-out infinite',
        'pulse-expand':   'pulseExpand 2.5s ease-out infinite',
        'float-gentle':   'floatGentle 4s ease-in-out infinite',
        'scan-x':         'scanX 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%':   { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':     { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':     { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        spinSlow: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        spinReverse: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        floatUpFade: {
          '0%':   { transform: 'translateY(0px)',   opacity: '0' },
          '15%':  { transform: 'translateY(0px)',   opacity: '1' },
          '80%':  { transform: 'translateY(-65px)', opacity: '1' },
          '100%': { transform: 'translateY(-85px)', opacity: '0' },
        },
        pulseExpand: {
          '0%':   { transform: 'scale(1)',   opacity: '0.5' },
          '100%': { transform: 'scale(2.8)', opacity: '0'   },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scanX: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%':      { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
