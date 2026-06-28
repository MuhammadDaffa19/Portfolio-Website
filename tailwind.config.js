/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
      },
      colors: {
        space: {
          950: "#070A12",
          900: "#0B1020",
          800: "#111827",
          700: "#1A2238",
        },
        cosmic: {
          purple: "#A78BFA",
          blue: "#7C9DFF",
          cyan: "#7BD3EA",
          pink: "#E879F9",
          soft: "#EAF1FF",
        },
      },
      boxShadow: {
        "cosmic-soft": "0 0 40px rgba(124, 157, 255, 0.24)",
        "cosmic-strong": "0 0 70px rgba(167, 139, 250, 0.38)",
      },
      backgroundImage: {
        "space-radial":
          "radial-gradient(circle at center, rgba(124,157,255,0.18), transparent 42%)",
      },
      animation: {
        "slow-spin": "slowSpin 18s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        slowSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.75",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.04)",
          },
        },
      },
    },
  },
  plugins: [],
};