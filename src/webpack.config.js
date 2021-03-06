var path = require('path');
var webpack = require('webpack');

var commonPlugins = new webpack.optimize.CommonsChunkPlugin('shared.js');

module.exports = {
	context: path.resolve('js'),
	entry: './home_page.jsx',

	output: {
		path: path.resolve('build/js'),
		publicPath: '/public/assets/js',
		filename: 'home.js'
	},
	watch: true,

	plugins: [commonPlugins],

	module: {
		preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            },{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
		loaders:[
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(jpg|png)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=100000'
			},
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
		]
	},

	devtool: 'eval-source-map',

	devServer: {
		contentBase: 'public',
		historyApiFallback: true,
        // hot: true,
        inline: true,
        stats: 'normal',
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,
        proxy: {
            '/api/*': {
                target: 'http://localhost:9000/',
                secure: false
            }
        }
	},

	resolve: {
		extensions: ['', '.js', '.es6', '.jsx']
	},


};