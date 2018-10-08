const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
	mode: 'development',
	target : 'node',
	node: { __dirname : true },
	externals: [nodeExternals()],
	entry: { 
		index : path.join(__dirname, '/src/index.ts') 
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
			}
		]
	},
	resolve : {
		extensions: ['.ts'],
		alias: {
			'~src' : path.join(__dirname, '/src/'),
			'~db' : path.join(__dirname, '/src/db/'),
			'~modules' : path.join(__dirname, '/src/modules/'),
			'~configs' : path.join(__dirname, '/src/configs/'),
			'~constants' : path.join(__dirname, '/src/constants/'),
			'~middlewares' : path.join(__dirname, '/src/middlewares/')
		}
	},
}