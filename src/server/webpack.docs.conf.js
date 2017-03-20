import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
    entry: {
        main: [path.resolve(__dirname, 'static/entry.js')]
    },
    output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
    resolve: {
		extensions: ['', '.js', '.css', '.vue', '.json'],
		alias: {
			'vue': 'vue/dist/vue.runtime.common.js',
			'docs': path.resolve(__dirname, 'static/docs'),
			'pages': path.resolve(__dirname, 'static/pages'),
			'components': path.resolve(__dirname, 'static/components')
		}
	},
    plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'index.html')
		})
	],
    module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 1,
				name: 'img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 1,
				name: 'fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-vue-jsx', 'transform-runtime']
    },
	vue: {
		postcss: [
			autoprefixer({ browsers: ['last 7 versions'] })
		]
	},
	devServer: {
		noInfo: true
	}
}