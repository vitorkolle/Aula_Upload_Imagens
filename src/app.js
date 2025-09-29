import express from 'express'
// import routes from './routes.js'

const app = express()
app.use(express.json())

// health check no app raiz
app.get('/health', (_, res) => res.json({ ok: true, server: 'up' }))

// suas rotas montadas em /api
// app.use('/api', routes)

export default app
