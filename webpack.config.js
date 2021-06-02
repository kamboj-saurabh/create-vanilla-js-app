const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


let mode = "development"
let target = "web"

if(process.env.NODE_ENV === "production"){
	mode = "production"
	target = "browserslist"
}

const webpackConfig = {
	entry: path.resolve(__dirname, "src", "index.js"),

	output: {
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "images/[hash][ext][query]",
		clean: true 
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},

			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},

			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset"
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: "Vanilla JS Starter",
			template: path.resolve(__dirname, "src", "index.html")
		})
	],

	optimization: {
		splitChunks: {
			cacheGroups: {
				node_vendors: {
					name: "vendor",
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					priority: 1
				}
			}
		}
	},

	
	devtool: "inline-source-map",
	devServer: {
    	contentBase: './dist',
    	port: 3000
	},

    mode:mode,
	target:target


};

module.exports = webpackConfig;