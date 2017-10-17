<style>
    /*reset css*/
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    menu,
    nav,
    section,
    summary {
        display: block;
    }

    audio:not([controls]) {
        display: none;
        height: 0;
    }


    img {
        border-style: none;
    }

    svg:not(:root) {
        overflow: hidden;
    }

    code,
    kbd,
    pre,
    samp {
        font-family: monospace, monospace;
        font-size: 1em;
    }

    p {
        font-size: 14px; /*no*/
    }

    pre {
        font-size: 14px; /*no*/
        overflow: auto;
        white-space: pre;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
        color: inherit;
        font: inherit;
        margin: 0;
        vertical-align: middle;
        outline: none;
    }

    button,
    input {
        overflow: visible;
    }

    button,
    select {
        text-transform: none;
    }

    button,
    [type="button"],
    [type="reset"],
    [type="submit"] {
        -webkit-appearance: button;
    }

    [disabled] {
        cursor: default;
    }

    [type="checkbox"],
    [type="radio"] {
        box-sizing: border-box;
        padding: 0;
    }

    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
        height: auto;
    }

    [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px; /*no*/
    }

    [type="search"]::-webkit-search-cancel-button,
    [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
    }

    textarea {
        overflow: auto;
        resize: none;
        vertical-align: top;
    }

    optgroup {
        font-weight: bold;
    }

    input,
    select,
    textarea {
        outline: 0;
    }

    textarea,
    input {
        -webkit-user-modify: read-write-plaintext-only;
    }

    input::-ms-clear,
    input::-ms-reveal {
        display: none;
    }

    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
        color: inherit;
        opacity: 0.54;
    }

    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: inherit;
        opacity: 0.54;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    td,
    th {
        padding: 0;
    }

    p,
    figure,
    form,
    blockquote {
        margin: 0;
    }

    ul,
    ol,
    li,
    dl,
    dd {
        margin: 0;
        padding: 0;
    }
    ul,
    ol {
        list-style: none outside none;
    }
    .text-overflow {
        display: -webkit-box;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    ::-webkit-scrollbar {
        width: 5px; /*no*/
        height: 5px; /*no*/
    }

    ::-webkit-scrollbar-corner {
        background-color: #535353;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(10, 10, 10, .2);
        border-radius: 2px; /*no*/
    }

    ::-webkit-scrollbar-track {
        background-color: rgba(238, 238, 238, .6);
    }

    .title-404 {
        font-size: 18px; /*no*/
        text-align: center;
        margin: 25% auto 0px; /*no*/
    }

    .vue-docs{
        width: 1000px; /*no*/
        margin: 20px auto; /*no*/
    }

    h1 {
        padding-bottom: 10px; /*no*/
        border-bottom: 1px solid #e5e5e5; /*no*/
    }

    hr {
        margin: 5px 0; /*no*/
        border-top: 1px solid transparent; /*no*/
    }

    .uk-table {
        margin-bottom: 0;
    }

    .hljs-comment,
    .hljs-quote {
        color: #998;
        font-style: italic;
    }

    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-subst {
        color: #333;
        font-weight: bold;
    }

    .hljs-number,
    .hljs-literal,
    .hljs-variable,
    .hljs-template-variable,
    .hljs-tag .hljs-attr {
        color: #008080;
    }

    .hljs-string,
    .hljs-doctag {
        color: #d14;
    }

    .hljs-title,
    .hljs-section,
    .hljs-selector-id {
        color: #900;
        font-weight: bold;
    }

    .hljs-subst {
        font-weight: normal;
    }

    .hljs-type,
    .hljs-class .hljs-title {
        color: #458;
        font-weight: bold;
    }

    .hljs-tag,
    .hljs-name,
    .hljs-attribute {
        color: #000080;
        font-weight: normal;
    }

    .hljs-regexp,
    .hljs-link {
        color: #009926;
    }

    .hljs-symbol,
    .hljs-bullet {
        color: #990073;
    }

    .hljs-built_in,
    .hljs-builtin-name {
        color: #0086b3;
    }

    .hljs-meta {
        color: #999;
        font-weight: bold;
    }

    .hljs-deletion {
        background: #fdd;
    }

    .hljs-addition {
        background: #dfd;
    }

    .hljs-emphasis {
        font-style: italic;
    }

    .hljs-strong {
        font-weight: bold;
    }
    .title-404{
        margin:10% auto 0;
    }
    .vk-docs-events .uk-text-center{
        display: none;
    }
    .ui-tabs{
        border: 1px solid #d3dce6 !important; /*no*/
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04) !important; /*no*/
    }
    .ui-tabs .ui-tabs-item {
        padding: 0 16px; /*no*/
        height: 42px; /*no*/
        line-height: 42px; /*no*/
        font-size: 14px; /*no*/
        margin-bottom: -1px; /*no*/
    }
    .ui-tabs .ui-tabs-content{
        padding: 14px; /*no*/
        font-size: 14px; /*no*/
    }
    .ui-tabs .ui-tabs-panel__content{
        padding: 10px; /*no*/
        margin-top: -1px; /*no*/
    }
</style>
<template>
    <router-view></router-view>
</template>
<script>
</script>
