

const socketController = (socket, io) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    socket.on('message', (msg) => { 
        console.log(msg)
    })
}

module.exports ={ 
    socketController
}
