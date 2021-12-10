// tailwind.config.js

module.exports = {
	darkMode: "media",
	purge: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// Configure your color palette here
				cyan: "#00FFFF",
				seashore: "#6EA1C3",
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ["responsive", "hover", "focus", "group-hover"],
			textColor: ["responsive", "hover", "focus", "group-hover"],
		},
	},
	plugins: [],
};
