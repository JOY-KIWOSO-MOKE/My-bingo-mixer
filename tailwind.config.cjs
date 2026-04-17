module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        'neon-pink': 'var(--neon-pink)',
        'neon-blue': 'var(--neon-blue)',
        'neon-cyan': 'var(--neon-cyan)',
        'neon-green': 'var(--neon-green)',
        surface: 'var(--surface)',
        bg: 'var(--bg)',
        text: 'var(--text)'
      },
      boxShadow: {
        neon: '0 0 8px var(--neon-pink), 0 0 24px var(--neon-blue)'
      }
    }
  },
  plugins: []
}
