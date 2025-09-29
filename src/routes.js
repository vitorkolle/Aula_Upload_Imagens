import express from 'express'
import pool from './db.js'
import upload from './uploadConfig.js'
import fs from 'fs'

const r = express.Router()

//inserir a imagem
r.post('/images', upload.single('image'), async (req, res) => {
    try {
        const filePath = req.file.path
        await pool.execute('INSERT INTO images(img) VALUES(?)', [filePath])
        res.status(201).json({message: 'Imagem enviada', img: filePath})
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

//listar imagens
r.get('/images', async (_, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM images')
        res.status(200).json(rows)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

export default r