const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
	mode: 'development',
	entry: {
		app: path.join(__dirname, 'src/App.tsx')
	},
	devtool: 'source-map',
	output: { path: path.join(__dirname, 'dist'), filename: '[name].js' },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ],
				exclude: /\.module\.css$/
			},
			{
				test: /\.ts(x)?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true
						}
					}
				],
				include: /\.module\.css$/
			},
			{
				test: /\.svg$/,
				use: 'file-loader'
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							mimetype: 'image/png'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.tsx', '.ts' ],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [ { from: 'dist', to: '.' } ]
		})
	]
};

module.exports = config;
