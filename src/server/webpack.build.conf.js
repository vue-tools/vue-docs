import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

module.exports = {
    entry: {
        main: [path.resolve(__dirname, 'static/entry.js')],
        vendors: ['vue', 'vue-router']
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:7].js',
        chunkFilename: 'js/[id].[hash:7].js'
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('css/[name].[hash:7].css'),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.[hash:7].js'),
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
            loader: ExtractTextPlugin.extract('style', 'css')
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
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader')
        },
        postcss: [
            autoprefixer({ browsers: ['last 7 versions'] })
        ]
    }
}