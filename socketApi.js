let socket_io = require('socket.io');
let io = socket_io();
let socketApi = {};
//Your socket logic here
socketApi.io = io;

// const io = (httpServer, {
//     cors: {
//       origin: "http://localhost:3001",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }
//   });

io.on('connection', function(socket){
    console.log('A user connected');

    // socket.emit("message", "Welcome to Tap Bid!")

    // broadcast when a user connects
    // socket.broadcast.emit("message", "A user has joined the chat")

    //Runs when client disconnects
    socket.on("message", (msg)=>{
        io.emit("message", msg)
    })
});


module.exports = socketApi;