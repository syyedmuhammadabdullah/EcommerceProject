/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"selector",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      // font faimly is already defined in index.css //sf pro text
      fontWeight: {
        'light': 300,
        'normal': 400,
        'strong': 600,
        'italic': 'italic', // Note: Tailwind does not directly support 'italic' as a weight, typically this is handled via `fontStyle`
      },
      fontSize: {
        // Size
        'xxs': '4px',
        'xs': '8px',
        'sm': '12px',
        'base': '14px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        'xxl': '32px',
        'xxxl': '48px',
      },
      colors: {
        primary: {
          bg: '#e6f4ff',
          bgHover: '#bae0ff',
          border: '#91caff',
          borderHover: '#6961ff',
          hover: '#4096ff',
          base: '#1677ff',
          active: '#0958d9',
          textHover: '#003eb3',
          text: '#002c8c',
          textActive: '#001d66',
        },
        success: {
          bg: '#f6ffed',
          bgHover: '#d9f7be',
          border: '#b7eb8f',
          borderHover: '#95de64',
          hover: '#73d13d',
          base: '#52c41a',
          active: '#389e0d',
          textHover: '#237804',
          text: '#135200',
          textActive: '#092b00',
        },
        warning: {
          bg: '#fffbe6',
          bgHover: '#fff1b8',
          border: '#ffe58f',
          borderHover: '#ffd666',
          hover: '#ffc53d',
          base: '#faad14',
          active: '#d48806',
          textHover: '#ad6800',
          text: '#874d00',
          textActive: '#613400',
        },
        error: {
          bg: '#fff1f0',
          bgHover: '#ffccc7',
          border: '#ffa39e',
          borderHover: '#ff7875',
          hover: '#ff7875',
          base: '#ff4d4f',
          active: '#cf1322',
          textHover: '#a8071a',
          text: '#820014',
          textActive: '#5c0011',
        },
        info: {
          bg: '#e6f4ff',
          bgHover: '#bae0ff',
          border: '#91caff',
          borderHover: '#69b1ff',
          hover: '#4096ff',
          base: '#1677ff',
          active: '#0958d9',
          textHover: '#003eb3',
          text: '#002c8c',
          textActive: '#001d66',
        },
        text: {
          default: '#000000e0',
          heading: '#000000e0',
          description: '#00000073',
          placeholder: '#00000040',
          disabled: '#00000040',
          secondary:'#000000a6'
        },
        icon: {
          default: '#00000073',
          hover: '#000000e0',
        },
        background: {
          container: '#ffffff',
          containerDisabled: '#0000000a',
          layout: '#f5f5f5',
          elevated: '#ffffff',
          controlItemBgHover: '#0000000a',
          controlItemBgActive: '#e6f4ff',
          controlItemBgActiveHover: '#bae0ff',
        },
        border: {
          primary: '#00000026',
          secondary: '#0000000f',
          split: '#0000000f',
        },
      },
      spacing: {
        // Space
        'xxs': '4px',
        'xs': '8px',
        'sm': '12px',
        'base': '16px',
        'md': '20px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
        // Padding and Margin
        'p-xxs': '4px',
        'p-xs': '8px',
        'p-sm': '12px',
        'p-smx': '14px',
        'p-md': '16px',
        'p-mdx': '20px',
        'p-lg': '24px',
        'p-xl': '32px',
        'p-xxl': '48px',
        'm-xxs': '4px',
        'm-xs': '8px',
        'm-sm': '12px',
        'm-smx': '14px',
        'm-md': '16px',
        'm-lg': '24px',
        'm-xl': '32px',
        'm-xxl': '48px',
      },
      height: {
        // Height
        'control': '32px',
        'control-xs': '16px',
        'control-m': '24px',
        'control-lg': '40px',
        'control-xl': '48px',
      },
      borderRadius: {
        // Border Radius
        'default': '6px',
        'xs': '2px',
        'sm': '4px',
        'lg': '8px',
      },
      boxShadow: {
        // Box Shadow
        'secondary': [
          '0 6px 16px 0 rgba(0, 0, 0, 0.14)',
          '0 3px 6px -4px rgba(0, 0, 0, 0.1)',
          '0 9px 28px 8px rgba(0, 0, 0, 0.07)'
        ],
        'focus-primary': '0 0 0 2px rgba(97, 255, 255, 1)',
        'focus-error': '0 0 0 2px rgba(255, 0, 0, 1)',
        'focus-warning': '0 0 0 2px rgba(255, 230, 0, 1)',
      },
      
    },
    
  
   
  },
  plugins: [require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      addUtilities({
          '.no-scrollbar': {
              '-ms-overflow-style': 'none',  /* IE and Edge */
              'scrollbar-width': 'none',  /* Firefox */
          },
          '.no-scrollbar::-webkit-scrollbar': {
              'display': 'none',
          }
      }, ['responsive']);
  }
  ],
}

