import multer from "multer"
import path from "path"
import fs from "fs"

//diretorio de upload
const uploadDir = 'uploads'

//verifica se o diretorio de upload existe
if (!fs.existsSync(uploadDir)) {
    //cria o diretorio caso ele não exista
    fs.mkdirSync(uploadDir)
}

//cria um armazenamento no multer
const storage = multer.diskStorage({

    //destino do arquivo
    destination: (req, file, cb) => {
        //retorna o destino
        cb(null, uploadDir)
    },

    //tratamento do nome
    filename: (req, file, cb ) => {
        //pega a extensao do arquivo
        const ext = path.extname(file.originalname)

        //cria o nome do arquivo usando a data e hora e um numero aleatorio de até nove dígitos
        const name = `${Date.now()}-${Math.floor(Math.random() * 1E9)}${ext}`

        //retorna o nome
        cb(null, name)
    }
})

//filtro do tipo de arquivo
const fileFilter = (req, file, cb) => {

    //tipos de arquivos permitidos
    const allowed = ['image/jpeg', 'image/png', 'image/jpg']

    //verifica se o tipo de arquivo esta permitido
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Arquivo inválido'))
}

//configuração do multer
const upload = multer({
    storage,
    fileFilter,
    //limitar o arquivo
    limits:{
        fileSize: 2 * 1024 * 1024 //2mb
    }
})

export default upload

    