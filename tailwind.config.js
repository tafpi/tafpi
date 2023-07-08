/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.js",
		"./pages/*.js",
		"./components/**/*.js",
		"./components/*.js"
	],
	theme: {
		fontFamily: {
			mono: [
				"'Noto Sans Mono', monospace",
			],
		},
		extend: {},
	},
	plugins: [],
}

