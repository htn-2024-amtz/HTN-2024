import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";
import colors from "tailwindcss/colors";


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

          primary: colors.amber,
          secondary: colors.sky,
          neutral: colors.stone,

      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
