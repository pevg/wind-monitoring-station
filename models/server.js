const express                 = require('express')
const cors                    = require('cors')
const { router }              = require('../routes/station')
const { dbConnection }        = require( '../database/config')
const { createServer }        = require('http')
const { socketController }    = require('../sockets/controller')
const { Server:ServerIO }     = require('socket.io')

class Server {
    constructor() {
        this.app            = express();
        this.port           = process.env.PORT;
        this.server         = createServer(this.app);
        this.ioOptions      = { cors: { origin: '*',
                                        methods: ['GET', 'POST'] }};
        this.io             = new ServerIO(this.server, this.ioOptions);

        this.connectDB();

        // Middlewares
        this.middlewares();

        // Server Routes
        this.routes();

        // Sockets
        this.sockets()


    }

    middlewares() {
        // Public Files
        this.app.use(express.static('public'));
        // CORS
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }));
        // JSON parser
        this.app.use(express.json());
    }

    async connectDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(process.env.STATION_PATH, router);
    }

    sockets() {
        this.io.on('connection', (socket) => socketController (socket, this.io) )
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = {
    Server
}