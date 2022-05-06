module.exports = {
  mode: 'jit',
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit"],
      },
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      'top': '0px 0 10px rgba(0, 0, 0, 0.3);',
      'around': '0 0 10px 2px rgba(0, 0, 0, 0.15);',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      right: '4px 0 5px -1px rgba(0, 0, 0, 0.25)'
    },
    zIndex: {
      '[-20]': -20,
      '[-10]': -10,
      '0': 0,
      '10': 10,
      '20': 20,
      '25': 25,
      '30': 30,
      '40': 40,
      '50': 50,
      '60': 60,
      '70': 70,
      '75': 75,
      '100': 100,
      'auto': 'auto',
      }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
