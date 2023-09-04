const express                 = require('express')
const cors                    = require('cors')
const { router }              = require('../routes/station')
const { dbConnection }        = require( '../database/config')
const { createServer }        = require('http')
const { socketController }    = require('../sockets/controller')
const { Server:ServerIO }     = require('socket.io')
const { MqttServer }          = require('./mqtt.server')

class Server {
    constructor() {
        this.app            = express();
        this.port           = process.env.PORT;
        this.server         = createServer(this.app);
        this.ioOptions      = { cors: { origin: '*',
                                        methods: ['GET', 'POST'] }};
        this.io             = new ServerIO(this.server, this.ioOptions);

        this.mqttServer     = new MqttServer();

        this.connectDB();

        // Middlewares
        this.middlewares();

        // Server Routes
        this.routes();

        // Sockets
        this.sockets()

        // MQTT
        this.mqtt()


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
        this.io.on('connection', (socket) => socketController (socket, this.io, this.mqttServer) )
    }

    mqtt() {
        const mqttClient = this.mqttServer.getClient();
    
        mqttClient?.on('connect', () => {
          console.log('Conexión establecida con el broker MQTT.');
          mqttClient.subscribe(this.mqttServer.topics.subscription, (err) => {
            if (err) {
              console.error('Error al suscribirse al tema', err);
            } else {
              console.log('Suscrito al tema', this.mqttServer.topics.subscription);
            }
          });
        });
    
        mqttClient?.on('message', (topic, message) => {
          console.log('Mensaje recibido del broker MQTT:', message.toString());
          // Enviar el mensaje MQTT al cliente a través del socket
          this.io.emit('mqttMessage', message.toString());
        });
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