const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: './src/App.tsx',
		vendor: [ 'react', 'react-dom' ]
	},
	devtool: 'source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Output Management',
			template: './src/index.html'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './src/manifest.json',
					to: './',
					noErrorOnMissing: true
				},
				{
					from: './src/assets/img/icons/*',
					to: './',
					noErrorOnMissing: true
				},
				{
					from: './src/assets/icons/*',
					to: './',
					noErrorOnMissing: true
				},
				{
					from: './src/devtools/*',
					to: './',
					noErrorOnMissing: true
				},
				{
					from: './src/assets/img/icons/iconfont.js',
					to: './',
					noErrorOnMissing: true
				}
			]
		})
	],
	resolve: {
		extensions: [ '.js', '.jsx', '.tsx', '.ts' ],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader'
			},
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src'),
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: path.resolve(__dirname, 'src'),
				use: [ 'file-loader' ]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				include: path.resolve(__dirname, 'src'),
				use: [ 'file-loader' ]
			}
		]
	}
};
