module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        socialMedia:
          "url('https://wallpapers-hub.art/wallpaper-images/19611.jpg')",
      }),
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
      },
      animation: {
        bounce: "bounce 1.8s infinite",
      },
    },
  },
  variants: {
    extend: {
      lineClamp: ["hover"],
    },
  },

  plugins: [require("@tailwindcss/line-clamp")],
};
//https://wallpaperbat.com/img/600854-wallpaper-galaxy-earth-network-stars-galaxy-1080p-desktop-background-wallpaper-hd-3840x2400-download-hd-wallpaper.jpg
