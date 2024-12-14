import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

// Tailwind CSS configuration
export const content = [
  "./index.html",
  "./src/**/*.{ts,tsx,js,jsx}",
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];

export const darkMode = "class";

export const theme = {
  extend: {},
};

export const plugins = [addVariablesForColors];

// Plugin function that adds Tailwind colors as CSS variables
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
