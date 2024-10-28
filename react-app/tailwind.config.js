/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "login-bg": "#658147",
        "login-frame-bg": "#E7F0DC",
        "sidebar-bg": "#597445",
        "dashboard-bg": "#eef0ea",
      },
      width: {
        "360px": "360px",
        "400px": "400px",
        "300px": "300px",
        "110px": "110px",
        "55px": "55px",
        "20%": "20%",
        "40%": "40%",
        "60%": "60%",
        "50%": "50%",
        "80%": "80%",
        "100%": "100%",
      },
      height: {
        "420px": "420px",
        "270px": "270px",
      },
      margin: {
        "105px": "105px",
        "50px": "50px",
      },
    },
  },
  plugins: [],
};
