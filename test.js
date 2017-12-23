const cluster = require('cluster');
const cpus = require('os').cpus();

if (cluster.isMaster) {

    for (let i = 0; i < cpus.length; i++) {
        const worker = cluster.fork();
        worker.send(`I am send by worker#${worker.id} in master`);
        worker.on('message', message => {
            console.log(`message: ${message}, consoled by worker#${worker.id}`);
        });
    }
} else {

    process.on('message', message => {
        console.log(`message: ${message}, console.by master`);
        process.send(message);
    });
}