/** Shared Tailwind preset for Rakamin UI */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#01959F',
          surface: '#F7FEFF',
          // tambahan
          border: '#4DB5BC',
          hover: '#01777F',
          pressed: '#01595F',
          focus: '#01959F',
        },
        secondary: {
          DEFAULT: '#FBC037',
          // tambahan
          surface: '#FFFCF5',
          border: '#FEEABC',
          hover: '#F8A92F',
          pressed: '#FA9810',
          focus: '#FBC037',
        },
        black: {
          DEFAULT: '#1E1F21',
        },
        gray: {
          900: "#111827"
        },
        neutral: {
          10: '#FFFFFF',
          // tambahan
          20: '#FAFAFA',
          25: '#FCFCFC',
          30: '#EDEDED',
          40: '#E0E0E0',
          // tambahan
          50: '#C2C2C2',
          60: '#9E9E9E',
          // tambahan
          70: '#757575',
          80: '#616161',
          90: '#404040',
          100: '#1D1F20',
        },
        accent: {
          hover: '#F7FEFF',
        },
        // Semantic colors from Design System
        danger: {
          DEFAULT: '#E01527',
          border: '#F5B1B7',
          surface: '#FFFAFA',
          // tambahan
          pressed: '#700414',
        },
        warning: {
          DEFAULT: '#FBC037',
          border: '#FFE9BC',
          surface: '#FFFCF5',
          // tambahan
          hover: '#B1652F',
          pressed: '#985628',
          focus: '#CA7336',
        },
        success: {
          DEFAULT: '#43936C',
          border: '#B8DBCA',
          surface: '#F9FBF9',
          // tambahan
          hover: '#367A59',
          pressed: '#20573D',
          focus: '#43936C',
        },
      },
      fontFamily: {
        nunito: [
          'var(--font-nunito)',
          '"Nunito Sans"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        'modal': '0px 4px 8px 0px #0000001A',
        'blur': '0px 1px 2px 0px #0000001F',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-m-regular': {
          fontFamily: 'var(--font-nunito), "Nunito Sans", ui-sans-serif, system-ui, sans-serif',
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '24px',
          letterSpacing: '0px',
        },
        '.shadow-modal': {
            boxShadow: '0px 4px 8px 0px #0000001A',
        },
      });
    },
  ],
};