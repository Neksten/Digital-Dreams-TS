const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = async () => {
	const getPort = (await import('get-port')).default;
	const port = await getPort({port: 3000});
	
	return {
		mode: 'development',
		entry: ['@babel/polyfill', './src/index.tsx'],
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
			publicPath: '/',
		},
		devServer: {
			port: port,
			watchFiles: ['src/**/*'],
			historyApiFallback: true,
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				'/assets/unresolved/img.png': path.resolve(
					__dirname,
					'assets/real-path-to-img/img.png',
				),
			},
		},
		plugins: [
			new HTMLWebpackPlugin({template: './public/index.html'}),
			new CleanWebpackPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.(css|sass|scss)$/,
					use: ['style-loader', 'css-loader', 'sass-loader'],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.m?jsx$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
						},
					},
				},
			],
		},
	};
};