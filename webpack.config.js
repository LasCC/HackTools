const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const lessLoader = {
	loader: 'less-loader',
	options: {
		lessOptions: {
			javascriptEnabled: true
		}
	}
};

module.exports = {
	mode: 'development',
	entry: {
		app: './src/App.tsx'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new ReactRefreshWebpackPlugin(),
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
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
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
				test: /\.(png|svg|jpg|gif)$/,
				include: path.resolve(__dirname, 'src'),
				use: [ 'file-loader' ]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				include: path.resolve(__dirname, 'src'),
				use: [ 'file-loader' ]
			},
			{
				test: /\.theme\.(less|css)$/i,
				use: [
					{
						loader: 'style-loader',
						options: { injectType: 'lazyStyleTag' }
					},
					'css-loader',
					lessLoader
				]
			},
			{
				test: /\.(less|css)$/,
				exclude: /\.theme\.(less|css)$/i,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	}
};
