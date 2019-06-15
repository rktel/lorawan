const dgram = require('dgram');
const server = dgram.createSocket('udp4');


server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', Meteor.bindEnvironment((msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    Meteor.call('insertData', msg.toString())
}));

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(4433);