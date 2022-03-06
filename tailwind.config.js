module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        sidebarHeight: "calc(100vh - 120px)",
        sidebarListHeight: "calc(100% - 40px)",
        // mainHeight: 'calc(100vw - 182px)',
        sidebarWidth: "275px",
        artWorkImgWidth: "230px",
      },
    },
  },
  plugins: [],
};
