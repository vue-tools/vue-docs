import md2vue from './md2vue'
import logger from './logger'
import webpack from 'webpack'
import { existsSync } from 'fs'
import merge from 'webpack-merge'
import packageJson from '../package'
import { resolve, join, isAbsolute } from 'path'
import { argv } from 'optimist'
import { serviceWorkerConfig } from './server/config'

let action, cwd, config, configFile, buildConfig, createServer

action = argv._.shift()
cwd = process.cwd()
configFile = resolve(join(cwd, argv._.length ? argv._.shift() : './docs.conf.js'))

if (argv.enableSw) {
    process.env[serviceWorkerConfig.ENABLE_KEY] = true
}

buildConfig = require('./server/webpack.build.conf')
createServer = require('./server')

config = {
    port: 8888,
    webpack: {},
    md: { dir: cwd, exclude: null },
    vue: { dir: join(cwd, 'build') }
}

if (existsSync(configFile)) {
    config = Object.assign({}, config, require(configFile))
}

config.md.dir = isAbsolute(config.md.dir) ? config.md.dir : resolve(join(cwd, config.md.dir))
config.vue.dir = isAbsolute(config.vue.dir) ? config.vue.dir : resolve(join(cwd, config.vue.dir))

if (action === 'start') {
    logger.info(`Vue-docs v${packageJson.version} server started at http://0.0.0.0:${config.port}`)
    logger.info(`vue file directory at ${config.vue.dir}`)
    logger.info(`markdown file directory at ${config.md.dir}`)

    md2vue(config.md.dir, config.md)
    createServer(config.webpack).listen(config.port)
} else if (action === 'build') {
    webpack(merge(buildConfig, config.webpack, {
        output: {
            path: config.vue.dir
        }
    }), (err, stats) => {
        if (err) {
            console.log(err)
        }
    })
}