const colors = require("tailwindcss/colors")

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                gray: colors.gray,
                "light-gray": "#D3D3D3",
                primary: "#56CEC0",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
