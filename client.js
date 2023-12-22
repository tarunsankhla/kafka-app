
const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    brokers: ['10.0.0.231:9092'],
    clientId: 'myApp'
});
