import koa from 'koa'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import normalWebpackConfig from './webpack.docs.conf'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'

module.exports = function(userWebpackConfig) {
    let compiler, app, webpackConfig

    app = koa()
    webpackConfig = merge(normalWebpackConfig, userWebpackConfig)

    webpackConfig.plugins = webpackConfig.plugins || []
    webpackConfig.devServer = Object.assign({}, webpackConfig.devServer, {
        hot: true,
        publicPath: webpackConfig.output.publicPath
    })

    if (Array.isArray(webpackConfig.entry)) {
        webpackConfig.entry.unshift('webpack-hot-middleware/client')
    } else {
        for (let key of Object.keys(webpackConfig.entry)) {
            webpackConfig.entry[key].unshift('webpack-hot-middleware/client?reload=true')
        }
    }

    webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin())
    webpackConfig.plugins.unshift(new webpack.NoErrorsPlugin())

    compiler = webpack(webpackConfig)

    app.use(webpackDevServer(compiler, webpackConfig.devServer))
    app.use(function * (next) {
        this.type = 'text/html'
        this.body = yield readFile(compiler, path.join(compiler.outputPath, 'index.html'))
    })

    return {
        listen(port, callback) {
            app.listen(port, callback || function(err) {
                if (err) {
                    console.log(err)
                    return
                }
            })
        }
    }
}

function webpackDevServer(compiler, devServer) {
    let hotOptions = {
        log() {}
    }

    return compose([
        webpackDevMiddleware(compiler, devServer),
        webpackHotMiddleware(compiler, hotOptions)
    ])
}

function compose(middleware) {
    return function * (next) {
        if (!next) {
            next = function * noop() {}
        }

        var i = middleware.length

        while (i--) {
            next = middleware[i].call(this, next)
        }

        return yield* next
    }
}

function * readFile(compiler, filepath) {
    return new Promise((resolve, reject) => {
        compiler.outputFileSystem.readFile(filepath, (err, result) => {
            if (err) {
                reject(err)
                return
            }

            resolve(result)
        })
    })
}