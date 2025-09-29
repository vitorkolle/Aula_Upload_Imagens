import express from 'express'
import routes from './routes.js'
import path from 'path'

const app = express()
app.use(express.json())

//configuração para servir arquivos estáticos
app.use('/uploads', express.static(path.resolve('uploads')))

// suas rotas montadas em /api
app.use('/api', routes)

export default app
