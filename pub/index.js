var socket = io();
var message = document.getElementById('message');
var form = document.send;
form.btn.addEventListener('click', function(e) {
    e.preventDefault();
    socket.emit('chat', form.content.value);
    form.content.value = '';
})
socket.on('chat', function(msg){
    var li = document.createElement('li');
    li.innerHTML = msg;
    message.appendChild(li);
  });