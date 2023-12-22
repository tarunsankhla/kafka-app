const { kafka} = require('./client');

async function init() { 
    const admin = kafka.admin();
    console.log('Admin connecting... ');
    admin.connect();
    console.log('Admin Connected');

    console.log('creating topic');
    await admin.createTopics({
        topics: [{
            topic: 'rider-updated',
            numPartitions:2
        }]
    })

    console.log('topic created');

    console.log('trying to disconnet');
    await admin.disconnect();
}

init();