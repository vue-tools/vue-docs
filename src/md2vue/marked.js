import yaml from 'yamljs'
import marked from 'marked'
import highlight from 'highlight.js'

let plugins = {
    example(marked, code, lang, highlight) {
        return `${code}<pre class="${this.options.langPrefix}${lang}"><code>${highlight.highlightAuto(code).value}</code></pre>`
    },
    interface(marked, code, lang, highlight) {
        code = marked(code).replace(/&#39;/ig, "'").replace('<p>', '').replace('</p>', '')

        try {
            return `<vue-doc-tabs :data='${JSON.stringify(yaml.parse(code), null, 2)}'></vue-doc-tabs>`
        } catch (e) {
            return 'yaml parse error, check your interface code'
        }
    }
}

marked.Renderer.prototype.code = function (code, lang, escaped) {
    let plugin = plugins[lang]

    if (!lang) {
        return `<pre><code>${escape(code, true)}</code></pre>`
    } else if (lang && isFunction(plugin)) {
        let result = plugin.call(this, marked, code, lang, highlight)

        return result ? result : code
    }

    return `<pre class="${this.options.langPrefix}${escape(lang)}"><code>${highlight.highlightAuto(code).value}</code></pre>`
}

marked.setOptions({
    renderer: new marked.Renderer()
})

export default function (content) {
    content = content + ''
    content = content.replace(/@/g, '__at__')
    
    return marked(content).replace(/__at__/g, '@')
}

function isFunction(obj) {
    return Object.prototype.toString.call(obj) === `[object Function]`
}

function escape(html, encode) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
                .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
}