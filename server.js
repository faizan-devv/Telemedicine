const fs = require('fs');
const express = require('express');
const { analytics } = require('googleapis/build/src/apis/analytics');
const app = express();
const https = require('https').createServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert')
}, app);
const io = require('socket.io')(https);
const port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + "/exp_app"));
app.use('/:id', express.static(__dirname + "/exp_app"), (req, res) => {
});

require('pug');

let clients = {};

io.on('connect', function(socket){
    let id;
    socket.on("NewClient", function(res) {
        id = res.id;
        if(res != null){
            socket.leaveAll();
            socket = socket.join(res.id, (err) => {
                console.log(socket.rooms);
            });
        }

        if(clients[id] == NaN || clients[id] == null){
            clients[id] = 0;
        }
        if(clients[id] < 2){
            if(clients[id] == 1){
                this.to(id).emit('CreatePeer');
                console.log("NEW PEER");
            }
            clients[id]++;
        } else {
            this.emit('SessionActive');
        }
        console.log("NEW CLIENT");
        console.log(clients);
    })
    socket.on('drawing', (data) => socket.to(id).emit('drawing', data));
    socket.on('Offer', SendOffer)
    socket.on('Answer', SendAnswer)
    socket.on('disconnect', Disconnect)
    socket.on('message', (data) => newMsg(data));

    function Disconnect(){
        if(clients[id] > 0)
            clients[id]--;
    }
    
    function SendOffer(Offer){
        this.to(id).emit('BackOffer', Offer)
    }
    
    function SendAnswer(data){
        this.to(id).emit('BackAnswer', data)
    }

    function newMsg(data) {
        socket.to(id).emit('BackMessage', data);
    }

})

app.use(express.static(__dirname + "/exp_app"));

https.listen(port, () => console.log(`Active on ${port} port `))