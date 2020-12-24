const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: './src/App.js'
	},
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Output Management',
			template: './src/index.html'
		}),
		new CopyWebpackPlugin(
			[
				{ from: './src/manifest.json', to: './', flatten: true },
				{ from: './src/assets/img/icons/*', to: './', flatten: true },
				{ from: './src/assets/icons/*', to: './', flatten: true },
				{ from: './src/devtools/*', to: './', flatten: true }
			],
			{
				copyUnmodified: true
			}
		)
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader'
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
