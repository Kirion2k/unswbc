const animate = require('tailwindcss-animate');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  prefix: 'tw-',
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: Object.fromEntries(['background', 'foreground', 'border', 'input', 'ring', 'primary', 'secondary', 'muted', 'accent', 'destructive', 'popover', 'card'].map(name => [name,
        ['background', 'foreground', 'border', 'input', 'ring'].includes(name)
          ? `hsl(var(--${name}) / <alpha-value>)`
          : { DEFAULT: `hsl(var(--${name}) / <alpha-value>)`, foreground: `hsl(var(--${name}-foreground) / <alpha-value>)` }
      ])),
      maskImage: { 'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))' },
      borderRadius: { lg: 'var(--club-radius)', md: '0.875rem', sm: '0.5rem' },
    },
  },
  plugins: [animate],
};
