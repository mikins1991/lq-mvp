import { extendTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: Record<string, any> | StyleFunctionProps) => ({
    body: {
      bg: mode(colors.black, '#2d3142')(props),
      color: colors.white,
      fontSize: '16px',
    },
  }),
};

const colors = {
  brand: {
    50: '#f6e8ff',
    100: '#e3bdff',
    200: '#cd94ff',
    300: '#b46ef7',
    400: '#9a4ce7',
    500: '#7e31ce',
    600: '#641eab',
    700: '#4b1483',
    800: '#341158',
    900: '#1e0d2d',
  },

  black: '#151515',
  white: '#fff',
  text: '#151515',
  textError: '#FF6262',
  background: '#212134',
  brandColorMain: '#00CCCC',
  brandColorMain005: '#00CCCC0D',
  brandColorMain01: '#00CCCC1A',
  modalBackgraund: '#EFFFFF',
  borderGray: '#1B1B1B4D',
  blueBrand: '#0070f3',
};

const fonts = {
  heading: `Noto Sans, sans-serif`,
  body: `Noto Sans, sans-serif`,
};

const components = {
  Text: {
    variants: {},
  },
  Button: {
    variants: {
      blum: {
        w: 'max-content',
        backgroundColor: 'background',
        borderRadius: 'full',
        fontWeight: 'normal',
        px: 3,
        py: 2,
        h: '35px',
        border: '1px solid black',
        _focus: { outline: 'none' },
        _hover: { bg: 'brandColorMain01' },
        fontSize: 'sm',
      },
      secondary: {
        backgroundColor: 'blueBrand',
        color: 'white',
        borderRadius: '10px',
        fontWeight: 'normal',
        fontSize: 'sm',
        px: '3',
        py: '2',
        h: '35px',
        _focus: { outline: 'none' },
        _hover: { opacity: '0.7' },
        _active: { backgroundColor: 'blueBrand' },
        _disabled: {
          _hover: {
            backgroundColor: 'blueBrand !important',
            opacity: '0.5',
            cursor: 'not-allowed',
          },
          backgroundColor: 'blueBrand',
          opacity: '0.7',
        },
      },
    },
  },
};

const config = {
  initialColorMode: 'black',
  useSystemColorMode: false,
};
const fontSizes = {
  '2md': '2rem', //32px
  11: '2.75rem', // 44px
  '5.5xl': '3.25rem', //52px
};

const breakpoints = ['0em', '30em', '48em', '62em', '80em', '96em'];
// 0-30em (0-480px)
// 30em-48em (480px - 768px)
// 48em-62em (768px - 992px)
// 62em-80em (992px - 1280px)
// 80em-96em+ (1280px - 1536px)
// 96em+ (1536px+)

const theme = extendTheme({
  config,
  styles,
  colors,
  fonts,
  components,
  breakpoints,
  fontSizes,
});
export default theme;

// fontSizes
//     -xs: 0.75rem; 12px
//     -sm: 0.875rem; 14px
//     -md: 1rem;      16px
//     -lg: 1.125rem; 18px
//     -xl: 1.25rem; 20px
//     -2xl: 1.5rem; 24px
//     -3xl: 1.875rem; 30 px
//     -2md: '2rem' 32px
//     -4xl: 2.25rem; 36px
//     -5xl: 3rem;
//     -6xl: 3.75rem;
//     -7xl: 4.5rem;
//     -8xl: 6rem;
//     -9xl: 8rem;

//fintWeight
//     -hairline: 100;
//     -thin: 200;
//     -light: 300;
//     -normal: 400;
//     -medium: 500;
//     -semibold: 600;
//     -bold: 700;
//     -extrabold: 800;
//     -black: 900;
// lineHeights: {
//   normal: "normal",
//   none: 1,
//   shorter: 1.25,
//   short: 1.375,
//   base: 1.5,
//   tall: 1.625,
//   taller: "2",
//   "3": ".75rem",
//   "4": "1rem",
//   "5": "1.25rem",
//   "6": "1.5rem",
//   "7": "1.75rem",
//   "8": "2rem",
//   "9": "2.25rem",
//   "10": "2.5rem",

// px	1px	1px
// 0.5	0.125rem	2px
// 1	0.25rem	4px
// 1.5	0.375rem	6px
// 2	0.5rem	8px
// 2.5	0.625rem	10px
// 3	0.75rem	12px
// 3.5	0.875rem	14px
// 4	1rem	16px
// 5	1.25rem	20px
// 6	1.5rem	24px
// 7	1.75rem	28px
// 8	2rem	32px
// 9	2.25rem	36px
// 10	2.5rem	40px
// 12	3rem	48px
// 14	3.5rem	56px
// 16	4rem	64px
// 18 4.5rem 72px
// 20	5rem	80px
// 24	6rem	96px
// 28	7rem	112px
// 32	8rem	128px
// 36	9rem	144px
// 40	10rem	160px
// 44	11rem	176px
// 48	12rem	192px
// 56	14rem	224px
// 60	15rem	240px
// 64	16rem	256px
// 72	18rem	288px
// 80	20rem	320px
// 96	24rem	384px
