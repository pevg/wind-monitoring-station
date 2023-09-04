const mqtt = require('mqtt')

class MqttServer {
    constructor() {
        this.brokerUrl = ''; //'mqtt://192.168.0.107';
        this.username = 'pevg';
        this.password = 'pevg';
        this.client = null;
        this.topics = {
            subscription: null,
            publish: null
        }
    }

    configurate(msg) {
        this.brokerUrl = msg.server;
        this.topics.subscription = msg.subscription_topic;
        this.topics.publish = msg.publish_topic;
    }

    getClient() {
        return this.client;
    }

    connect(){
        this.client = mqtt.connect(this.brokerUrl, {
            username: this.username,
            password: this.password
        })
    }
    
}

module.exports ={ MqttServer }