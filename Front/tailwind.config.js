/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
	  colors: {
		"dark": "#1e1e25",
		"dark-gray": "#1e1e2f",
		"dark-light": "#27293d",
		"electric-sky-100": "#1e8bf8",
		"electric-sky-200": "#3259f4",
		"white-for-text-1": "#d4d4d8",
		"white-for-text-2": "#e9ecef",
		"white-for-text-4": "#adb5bd",
	  }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
