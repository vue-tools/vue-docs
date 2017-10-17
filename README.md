# vue-docs

让你的文档轻松成为一个 `VUE SPA`, 面向`vue`编程 ^_^

<!-- TOC -->

- [vue-docs](#vue-docs)
  - [Install](#install)
  - [Config](#config)
  - [Start](#start)
  - [Build Doc](#build-doc)
  - [Deploy](#deploy)
  - [Reference](#reference)

<!-- /TOC -->

## Install

```bash
// global
npm i vue-docs -g --registry=https://registry.npm.taobao.org

// or
npm i -g --registry=https://registry.npm.taobao.org
```
## Config

默认可没有 `docs.config.js`， 若需要配置，按照下列操作

- 在根目录创建 `docs.config.js`
- 写入下列内容 `docs.config.js`
```
var path = require('path')
var webpack = require('webpack')
module.exports = {
    port: 9999,
    // your webpack config
    webpack: {
        resolve: {
            alias: {
                'vt-tabs': path.resolve(__dirname, 'src')
            }
        }
    },
    md: { dir: './' },
    vue: { dir: './docs' }
}
```

## Start

```
// global
vue-docs start

// project
./node_modules/.bin/vue-docs start

```

## Build Doc

```
// global
vue-docs build

// project
./node_modules/.bin/vue-docs build

```

## Deploy

将 `docs`目录下的内容发布到 你的服务器即可访问， 发布到 `github pages` 可参考[vt-tabs](https://github.com/vue-tools/vt-tabs)

## ChanageLog

- 增加 editorconfig, eslint编码规范
- 增加 enableSw参数， 控制是否支持 serviceWorker

## 备注 

请保证在使用`vue-docs`的时候， 项目中的 `vue-loader`和 `vue-docs`中的`vue-loader` major版本一致. 

## Reference

- [vuikit docs](https://github.com/vuikit/vuikit-docs)
