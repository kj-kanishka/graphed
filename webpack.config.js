var path = require("path");
var webpack = require("webpack");
module.exports = {
	cache: true,
	debug: true,
	entry: {
		app:path.join(__dirname, "client/app.js"),

		//common: ["bullet"]
		
		//bootstrap: ["!bootstrap-webpack!./app/bootstrap/bootstrap.config.js", "./app/bootstrap"],
		//react: "./app/react"
	},
	output: {
		path: path.join(__dirname, "public"),
		publicPath: "./public/",
		filename: "[name].js",
		chunkFilename: "[chunkhash].js"
	},
	module: {
		loaders: [
			// required to write "require('./style.css')"
			{ test: /\.css$/,    loader: "style-loader!css-loader" },

			// required for bootstrap icons
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
			{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/,    loader: "file-loader?prefix=font/" },

			// required for react jsx
			//{ test: /\.js$/,    loader: "msx-loader" },
			//{ test: /\.jsx$/,   loader: "msx-loader?insertPragma=React.DOM" },
		]
	},
	resolve: {
		alias: {
			//app:__dirname+"/client/app.js",
			'module':__dirname+'/client/modules/',
			'transition':__dirname+'/semantic_js/transition.js',
			'popup':__dirname+'/semantic_js/popup.js',
			'bullet':__dirname+'/semantic_js/bullet.js',
			'mithril-global-request-headers':__dirname+'/semantic_js/mithril-global-request-headers',
			'cookie-monster':__dirname+'/semantic_js/cookie-monster.js',
			'lodash':__dirname+'/semantic_js/lodash.js',
			'moria':__dirname+'/semantic_js/moria.js',
			'jquery-slim':__dirname+'/node_modules/jquery/dist/jquery.slim.js',
			'mithril':__dirname+'/node_modules/mithril/mithril.js',
			
			// // Bind version of jquery
			// jquery: "jquery-2.0.3",

			// // Bind version of jquery-ui
			// "jquery-ui": "jquery-ui-1.10.3",

			// // jquery-ui doesn't contain a index file
			// // bind module to the complete module
			// "jquery-ui-1.10.3$": "jquery-ui-1.10.3/ui/jquery-ui.js",
		}
	},
	plugins: [
		//new webpack.optimize.CommonsChunkPlugin({ name: "common" }),
		new webpack.optimize.UglifyJsPlugin({output: {comments: false} ,minimize: true}),
		new webpack.optimize.DedupePlugin(),
		new webpack.ProvidePlugin({
			// Automtically detect jQuery and $ as free var in modules
			// and inject the jquery library
			// This is required by many jquery plugins
			jQuery:'jquery-slim',
			$:'jquery-slim',
			m:'mithril',
			// graphed: "graphed",
			// graphed: "graphed"
		})
	]
};