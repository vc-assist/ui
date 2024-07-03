const colors = require("tailwindcss/colors");

export const COLORS = {
  blue: "#242463",
  lightBlue: "#A5CEF2",
  purple: "#FFB703",
  red: "#ec4234",
  lightRed: "#e5736e",
  orange: "#fb923c",
  gray: "#6F6F6F",
  lightGray: "#e9e7ec",
  lightGreen: "#53b486",
};

export const COLOR_LIST = [
  COLORS.red,
  COLORS.blue,
  COLORS.purple,
  COLORS.orange,
  COLORS.lightBlue,
  COLORS.lightRed,
  COLORS.lightGreen,
];

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "components/**/*.tsx",
    "foundation/**/*.tsx",
    "styles/**/*.css",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      gray: colors.gray,
      zinc: colors.zinc,

      blue: colors.blue,
      red: colors.red,
      green: colors.green,

      primary: "var(--primary)",
      dimmed: "var(--dimmed)",
      "dimmed-subtle": "var(--dimmed-subtle)",

      bg: "var(--bg)",
      "bg-dimmed": "var(--bg-dimmed)",

      accent: "var(--accent)",

      "light-green": "#53b486",
    },
  },
};
