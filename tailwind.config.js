module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        sidebarHeight: "calc(100vh - 120px)",
        mainHeight: "calc(100vh - 160px)",
        sidebarListHeight: "calc(100vh - 200px)",
        // mainHeight: 'calc(100vw - 182px)',
        sidebarWidth: "275px",
        artWorkImgWidth: "230px",
      },
    },
  },
  plugins: [],
};
