import express  from 'express'
import cors     from 'cors'
import router   from '../routes/station.js'

export class Server {
    constructor() {
        this.app            = express()
        this.port           = process.env.PORT
        this.stationPath    = '/api/station'

        // Middlewares
        this.middlewares()

        // Server Routes
        this.routes()
    }

    middlewares() {
        // Public Files
        this.app.use(express.static('public'))
        // CORS
        this.app.use(cors())
        // JSON parser
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.stationPath, router)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`)
        })
    }

}


