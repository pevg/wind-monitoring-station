const { Schema, model } = require("mongoose");

const stationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Debe ingresar un nombre'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Debe ingresar una descripción']
    },
    location: {
        type: String
    },
    serverIP: {
        type: String,
        required: [true, 'Debe ingresar una IP de servidor']
    },
    publish_topic: {
        type: String,
        required: [true, 'Debe ingresar un topico de publicación']
    },
    subscription_topic: {
        type: String,
        required: [true, 'Debe ingresar un topico de suscripción']
    },
    status: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date
    }
})

const Station = model('Station', stationSchema);

module.exports = {
    Station
}
