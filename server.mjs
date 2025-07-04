import fs from 'fs'
import path from 'path'
import express from 'express'
import { createSSRApp } from 'vue'
import { createServer } from 'vite'
import { renderToString as _renderToString } from 'vue/server-renderer'

const resolve = (filePath) => path.resolve(filePath)

const renderToString = async(url) => {
    const { default: App } = await vite.ssrLoadModule('/src/app.vue')
    const app = createSSRApp(App)
    const html = await _renderToString(app, {})

    return { html }
}

const app = express()

const vite = await createServer({
    root: resolve('.'),
    appType: 'custom',
    server: {
        middlewareMode: true,
    },
})

app.use(vite.middlewares)

app.use('*splat', async(req, res) => {
    const url = req.originalUrl || req.url

    const template = await vite.transformIndexHtml(url, fs.readFileSync(resolve('index.html'), 'utf-8'))
    const { html: renderedHtml } = await renderToString(url)

    // const html = template.replace('<div id="app"></div>', `<div id="app">${renderedHtml}</div>`)
    const html = template.replace('<div id="app"></div>', `<div id="app"><h1>SSR is working</h1>${renderedHtml}</div>`)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})