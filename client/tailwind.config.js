/* eslint-disable no-undef */
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#12130F',
        grey: '#354458',
        lightGrey: '#656c7a',
        cream: '#E9E0D6',
        seashell: '#FBF9F7',
        bone: '#EFEDEB',
        primary: '#29ABA4',
        lightPrimary: '#DBF9B8',
        secondary: '#E43F25',
        lightSecondary: '#EB7260',
        lightTertiary: '#77C5F7',
        tertiary: '#0071BC',
        darkTertiary: '#0062A3',
        code: {
          highlight: 'rgb(125 211 252 / 0.1)',
        },
        transitionProperty: {
          height: 'height',
          'max-height': 'max-height',
        },
      },
      fontFamily: {
        lobster: ['Lobster', 'cursive'],
        serif: ['Lobster', ...defaultTheme.fontFamily.serif],
        sans: ['Oswald', ...defaultTheme.fontFamily.sans], // DETERMINE DEFAULT FONT FAMILIES
        mono: ['Oswald', ...defaultTheme.fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            fontSize: theme('fontSize.base')[0],
            lineHeight: theme('fontSize.base')[1].lineHeight,
            h1: {
              fontFamily: 'Lobster',
            },
            h2: {
              fontFamily: 'Lobster',
            },
            h3: {
              fontFamily: 'Lobster',
            },
            h4: {
              fontFamily: 'Open Sans',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: 0,
            },
            strong: {
              color: 'inherit',
              fontWeight: theme('fontWeight.semibold'),
            },
            pre: {
              color: theme('colors.slate.50'),
              boxShadow: theme('boxShadow.md'),
              display: 'flex',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

