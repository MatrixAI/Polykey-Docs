import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.tsx',
    './src/**/*.jsx',
    './pages/**/*.mdx',
    './pages/**/*.tsx',
    './docs/**/*.mdx',
    './docs/**/*.tsx',
  ],
  corePlugins: {
    preflight: false, // Disable Tailwind's default base styles to prevent style conflicts
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      textColor: {
        main: '#FFFFFF',
        links: '#289295',
      },
      colors: {
        'tab-inactive': 'rgba(222, 218, 215, 0.50)',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
