const colors = require("tailwindcss/colors")
const theme = require("tailwindcss-themer")

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["components/**/*.tsx", "foundation/**/*.tsx", "styles/**/*.css"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      gray: colors.gray,
      zinc: colors.zinc,
      blue: colors.blue,
      red: colors.red,
      green: colors.green,

      "light-green": "#53b486",
    },
  },
  plugins: [
    theme({
      defaultTheme: {
        extend: {
          colors: {
            primary: colors.gray[800],

            dimmed: colors.gray[400],
            "dimmed-subtle": colors.gray[300],

            bg: "white",
            "bg-dimmed": colors.gray[200],

            accent: colors.blue[600],
          },
        },
      },
      themes: [
        {
          name: "dark",
          extend: {
            colors: {
              primary: colors.zinc[200],

              dimmed: colors.zinc[500],
              "dimmed-subtle": colors.zinc[700],

              bg: colors.zinc[800],
              "bg-dimmed": colors.zinc[900],

              accent: colors.blue[400],
            },
          },
        },
      ],
    }),
  ],
}
