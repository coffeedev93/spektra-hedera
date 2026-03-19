module.exports = {
	darkMode: "class",
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		extend: {
      borderRadius: {
        DEFAULT: "0.375rem",
        lg: "0.5rem",
        xl: "1rem",
        full: "9999px",
      },
    },
		// plugins: [
		// 	require('@tailwindcss/forms'),
		// 	require('@tailwindcss/container-queries')
		// ],
  }
}