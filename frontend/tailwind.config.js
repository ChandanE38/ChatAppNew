
module.exports = {
  content: [
    './index.html', // If your project has an `index.html` at the root
    './src/**/*.{js,ts,jsx,tsx}', // Adjust based on your file extensions and project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')], // Ensure DaisyUI is included
  daisyui: {
    themes: ["light", "dark"], // Add or customize themes here
  },
};





