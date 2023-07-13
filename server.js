var express = require('express');
var app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
      origin: "http://localhost:8081",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
  },
  allowEIO3: true
});
var logs=[]
var {PythonShell} = require('python-shell');

app.use(express.static(__dirname+'/pub'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/pub/index.html');
});
server.listen(8080, ()=>console.log(`Listening on port 8080`));
io.on('connection', function(socket){
  console.log('connected',socket.id);
  for(var i=0;i<logs.length;i++){
    io.to(socket.id).emit('chat',logs[i]);
  }
  socket.on('chat', function(msg){
    var pyshell = new PythonShell('./word.py');
    pyshell.send(encodeURI(msg));
    pyshell.on('message',function(message){
      console.log("予測結果:"+msg+message);
      var cmsg=String(logs.length)+" <span style='color:"+message+";'>"+msg+"</span>";
      io.emit('chat', cmsg);
      console.log(cmsg);
      logs.push(cmsg);
    });
  });
});