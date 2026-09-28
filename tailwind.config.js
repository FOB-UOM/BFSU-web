/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bfsu: {
          // Semantic palette — matches CSS custom props
          page:          'var(--bg-page)',
          surface:       'var(--bg-surface)',
          elevated:      'var(--bg-elevated)',
          subtle:        'var(--bg-subtle)',
          inset:         'var(--bg-inset)',

          text:          'var(--text-primary)',
          secondary:     'var(--text-secondary)',
          muted:         'var(--text-muted)',
          faint:         'var(--text-faint)',

          border:        'var(--border)',
          'border-strong': 'var(--border-strong)',

          gold:          '#C59B27',
          'gold-dark':   '#8E6F18',
          'gold-light':  '#DDB748',

          // Raw named palette (light)
          ivory:         '#FBFBFA',
          'ivory-dark':  '#F4F2EC',
          night:         '#0B0E14',
          'night-surface':'#111622',
          ink:           '#12161F',
          'ink-muted':   '#4A5364',
        }
      },
      fontFamily: {
        sans:       ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display:    ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body:       ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono:       ['"Space Mono"', 'monospace'],
        monumental: ['Cinzel', 'serif'],
        serif:      ['Fraunces', 'Newsreader', 'Georgia', 'serif'],
      },
      // Font weights with editorial intention
      fontWeight: {
        light:      '300',
        normal:     '400',
        medium:     '500',  // body baseline
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',  // display
        black:      '900',
      },
      letterSpacing: {
        tightest:   '-0.04em',
        tighter:    '-0.025em',   // display headings
        tight:      '-0.015em',
        normal:     '0.005em',    // body
        label:      '0.12em',
        wide:       '0.22em',     // mono overlines
        widest:     '0.3em',
      },
      lineHeight: {
        display:    '1.06',
        heading:    '1.12',
        snug:       '1.4',
        body:       '1.72',       // body baseline
        relaxed:    '1.8',
        loose:      '2',
      },
    },
  },
  plugins: [],
}
