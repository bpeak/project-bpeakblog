const path = require('path')

module.exports = {
	mode: 'development',
	entry: { 
		index : path.join(__dirname, '/src/index.js') 
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, '/src'),
                exclude: path.join(__dirname, '/node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            'transform-object-rest-spread', 
                            'babel-plugin-transform-class-properties', 
                            'async-to-promises',
                            'transform-async-to-generator',
                            "transform-runtime"
                        ]
                    }
                }
            },
			{
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
					loader: "css-loader", 
					options: {
                        sourceMap: true,             
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'       
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
					loader: "css-loader", 
					options: {
                        sourceMap: true,             
                    }
                }]
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath : '/dist/imgs', // file-loader 사용시에 이미지가 사용할 기준경로
                            outputPath : './imgs', // file-lodaer 사용시에 결과물위치 ( dist 폴더기준 )
                            name: '[name].[ext]',
                            limit: 10000,
                        }
                    }
                ]
            }
		]
	},
	resolve : {
		extensions: ['.js'],
		alias: {
			'~src' : path.join(__dirname, '/src/'),
			'~components' : path.join(__dirname, '/src/components/'),
			'~containers' : path.join(__dirname, '/src/containers/'),
			'~configs' : path.join(__dirname, '/src/configs/'),
            '~constants' : path.join(__dirname, '/src/constants/'),
            '~assets' : path.join(__dirname, '/src/assets/'),
            '~redux' : path.join(__dirname, '/src/redux/'),
            '~modules' : path.join(__dirname, '/src/modules/'),
            '~routes' : path.join(__dirname, '/src/routes/')
		}
	},
}