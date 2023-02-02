// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: 'var(--black)',
        'blue-light': 'var(--blue-light)',
        navy: 'var(--navy)',
        'navy-card-dark': 'var(--navy-card-dark)',
        'navy-card-light': 'var(--navy-card-light)',
        'navy-light': 'var(--navy-light)',
        grey: 'var(--grey)',
        'grey-light': 'var(--grey-light)',
        red: 'var(--red)',
        'red-light': 'var(--red-light)',
        tan: 'var(--tan)',
        white: 'var(--white)',

        // client specific branding colors
        'acquia-blue': 'var(--acquia)',
        'enigma-blue': 'var(--enigma-blue)',
        'enigma-red': 'var(--enigma-red)',
        'expel-green': 'var(--expel-green)',
        'jebbit-green': 'var(--jebbit-green)',
        'netflix-red': 'var(--netflix-red)',
        'outreach-purple': 'var(--outreach-purple)',
        'swach-purple': 'var(--swach-purple)'
      },
      fill: (theme) => ({
        navy: theme('colors.navy'),
        red: theme('colors.red'),
        white: theme('colors.white')
      }),
      inset: {
        '1/2': '50%'
      },
      maxWidth: {
        xxs: '13rem',
        '8xl': '90rem',
        '9xl': '100rem'
      },
      minHeight: {
        24: '6rem',
        80: '20rem'
      },
      spacing: {
        88: '22rem',
        104: '26rem',
        112: '28rem',
        120: '30rem',
        140: '36rem'
      },
      stroke: (theme) => ({
        white: theme('colors.white')
      }),
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '' },
            'code::after': { content: '' },
            code: {
              'background-color': 'var(--blue-light)'
            }
          }
        }
      }
    }
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      fontWeight: ['hover', 'focus'],
      opacity: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
  corePlugins: {
    container: false
  }
};
