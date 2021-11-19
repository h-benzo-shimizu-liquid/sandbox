
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

module.exports = {
	entry: path.resolve(__dirname, "./src/main.ts"),
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "index.js?[hash]",
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx",],
		alias: { "@": path.resolve(__dirname, "src"), },
	},
	module: {
		rules: [{
			test: /\.(ts|tsx)$/,
			loader: "ts-loader",
		}, {
			test: /\.css$/,
			use: ["style-loader", "css-loader"],
		},],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: path.join(__dirname, "src/index.html"), }),
	],
	devServer: {
		static: {
			directory: path.resolve(__dirname, "./dist"),
		},
	},
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

