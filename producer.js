const { kafka } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
})

async function init() { 
    const producer = kafka.producer();

    console.log('connecting to producer');
    await producer.connect();
    console.log('producer connected');

    rl.setPrompt('> ');
    rl.prompt();

    rl.on('line', async function (line) {
        const [riderName, Location] = line.split(' ');
        
        await producer.send({
            topic: 'rider-updated',
            messages: [
                {
                    partition: Location.toLowerCase() === 'north' ? 0 : 1,
                    key: 'locaiton-update',
                    value: JSON.stringify({ name: riderName, loc: Location })
                },
            ],
        })
    }).on('close', async function () {
        await producer.disconnect();
    });

    // await producer.send({
    //     topic: 'rider-updated',
    //     messages: [
    //         {
    //             partition:0,
    //             key: 'locaiton-update',
    //             value: JSON.stringify({name:'Vijay Maliya',loc:'Bangalore'})
    //         },
    //      ],
    // })

    // await producer.disconnect();
}

init();