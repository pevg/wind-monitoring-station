
const socketController = (socket, io, mqttServer) => {
    console.log('Cliente conectado', socket.id);
    

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    socket.on('message', (msg) => { 
        console.log("mesagge", msg)
    })

    socket.on('config', (msg) => { 
        console.log("config: ", msg)
        mqttServer.configurate(msg)
        mqttServer.connect()
        // Suscribirse al tema después de la conexión
        mqttServer.getClient().on('connect', () => {
            console.log('Conexión establecida con el broker MQTTServer.');
            mqttServer.getClient().subscribe(mqttServer.topics.subscription, (err) => {
                if (err) {
                    console.error('Error al suscribirse al tema', err);
                } else {
                    console.log('Suscrito al tema', mqttServer.topics.subscription);
                }
            });
        });
        // Manejar los mensajes MQTT recibidos desde el servidor MQTT
        mqttServer.getClient().on('message', (topic, message) => {
            console.log('Mensaje MQTT recibido:', message.toString());
            // Enviar el mensaje MQTT al cliente a través del socket
            socket.emit(mqttServer.topics.subscription, message.toString());
            
        });
    })
}

module.exports ={ 
    socketController
}
