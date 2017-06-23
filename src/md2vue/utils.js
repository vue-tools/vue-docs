import marked from './marked'
import logger from '../logger'
import DomParser from 'dom-parser'
import { resolve, join, basename } from 'path'
import { readFileSync, writeFileSync, mkdirSync, unlinkSync, existsSync } from 'fs'

const STATIC_PATH = '../server/static/'
const DOC_PATH = resolve(join(__dirname, STATIC_PATH, 'docs'))
const ROUTER_FILE_PATH = resolve(join(__dirname, STATIC_PATH, 'router/map.js'))

let routerCode = [
    'module.exports = {\n',
    '}'
]

export function add(targetPath, destPath) {
    let name, docPath

    name = basename(targetPath)
    logger.info(`${name} file is added to watcher`)

    name = basename(targetPath, '.md')
    docPath = resolve(join(DOC_PATH, `${name}.vue`))
    
    writeFileSync(docPath, md2vue(targetPath))
    writeFileSync(destPath, generateVueCode(name))
    writeFileSync(ROUTER_FILE_PATH, generateRouterCode(name, 'add'))
}

export function change(targetPath, destPath) {
    let name, docPath

    name = basename(targetPath)
    logger.info(`${name} file is change`)

    name = basename(targetPath, '.md')
    docPath = resolve(join(DOC_PATH, `${name}.vue`))
    
    writeFileSync(docPath, md2vue(targetPath))
    writeFileSync(destPath, generateVueCode(name))
}

export function remove(targetPath, destPath) {
    let name, docPath

    name = basename(targetPath)
    logger.info(`${name} file was deleted by watcher`)

    name = basename(targetPath, '.md')
    docPath = resolve(join(DOC_PATH, `${name}.vue`))

    writeFileSync(ROUTER_FILE_PATH, generateRouterCode(name, 'remove'))
    unlinkSync(docPath)
    unlinkSync(destPath)
}

function md2vue(targetPath) {
    let content = readFileSync(targetPath)
    
    return toVue(marked(content))
}

function generateRouterCode(name, op) {
    let template = routerTemplate(encodeURIComponent(name))

    if (op === 'add') {
        routerCode.splice(-1, 0, template)    
    }

    if (op === 'remove') {
        for (let index = 1; index < routerCode.length; index++) {
            if (routerCode[index] === template) {
                routerCode.splice(index, 1)
                break
            }
        }
    }

    return routerCode.join('')
}

function generateVueCode(name) {
    return vueTemplate(name, capitalize(name))
}

function routerTemplate(name) {
    return `    '/${name}': { meta: { title: '${name}' }, component: function (resolve) { require(['pages/${name}'], resolve) }},\n`
}

function vueTemplate(name, componentName) {
    return `<template>
    <Layout>
        <${componentName}></${componentName}>
    </Layout>
</template>

<script>
    import ${componentName} from 'docs/${name}'

    export default {
        components: {
            ${componentName}
        }
    }
</script>`
}

function toVue(content) {
    let parser, dom, style, script, reg, result

    parser = new DomParser()
    dom = parser.parseFromString(content)
    style = dom.getElementsByTagName('style')[0]
    script = dom.getElementsByTagName('script')[0]

    reg = {
        style: /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
		script: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
	}

    result = `<template>\n    <section>\n${content.replace(reg.style, '').replace(reg.script, '')}\n    </section>\n</template>`

    if (style) {
		result += `\n<style>\n${style.innerHTML}\n</style>`
	}

	if (script) {
		result += `\n<script>\n${script.innerHTML}\n</script>`
	}

	return result
}

function capitalize(str) {
    return typeof str === 'string' ? str[0].toUpperCase() + str.slice(1) : str
}