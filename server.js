var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: 8888 });

//routing
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return reply.file('index.html');
    }
});

//socketio
var io = require('socket.io')(server.listener);

//sample data
var sampledata = {
    servers: [
        { name: "Sample Server 1", cpu: 37, memory: 12 },
        { name: "Sample Server 2", cpu: 69, memory: 65 },
        { name: "Sample Server 3", cpu: 92, memory: 100 }
    ],
    apis: [
        { name: "Sample API 1", status: 15},
        { name: "Sample API 2", status: 53},
        { name: "Sample API 3", status: 87}
    ],
    members: 500,
    purchases: 250
}

io.sockets.on('connection', function(socket) {
    console.log("Client " + socket.id + " connected.");
    socket.emit('data', sampledata);
});

//start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});