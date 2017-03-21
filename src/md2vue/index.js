import logger from '../logger'
import chokidar from 'chokidar'
import { existsSync, mkdirSync } from 'fs'
import { add, change, remove } from './utils'
import { resolve, join, basename, extname } from 'path'

const STATIC_PATH = '../server/static/'
const PAGE_PATH = resolve(join(__dirname, STATIC_PATH, 'pages'))

if (!existsSync(PAGE_PATH)) {
    mkdirSync(PAGE_PATH)
}

export default function (mdPath, opts = {}) {
    mdPath = resolve(mdPath)
    
    if (!existsSync(mdPath)) {
        logger.error(`markdown file directory not exist`)
        return
    }

    let watcher = chokidar.watch(mdPath, { ignored: opts.exclude })
    watcher.on('add', (path) => correctExt(path) && add(path, getPagePath(path)))
    watcher.on('change', (path) => correctExt(path) && change(path, getPagePath(path)))
    watcher.on('unlink', (path) => correctExt(path) && remove(path, getPagePath(path)))
}

function getPagePath(path) {
    return resolve(join(PAGE_PATH, `${basename(path, '.md')}.vue`))
}

function correctExt(path) {
    return extname(path) === '.md'
}