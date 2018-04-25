var rabbitMQHandler = require('./rabbitMQ_messaging');
var ip = require('ip');
var os = require('os')
module.exports = messageHandler;

function messageHandler(io){
  // rabbitMQHandler('amqp://localhost', function(err, options){
    
  //   if(err){
  //     throw err;  
  //   }

    // options.onMessageReceived = onMessageReceived;

    io.on('connection', websocketConnect);

    function websocketConnect(socket){

      console.log('New connection')
      io.emit('start', {ipHost: os.hostname()})

      socket.on('disconnect', socketDisconnect);
      socket.on('message', socketMessage);

      function socketDisconnect(e){
        console.log('Disconnect ', e);
      }

      function socketMessage(text){
        var message =  {text: text, date: new Date(), ip: os.hostname()};
        io.emit('message', message)
        // options.emitMessage(message);
      }
    }

    function onMessageReceived(message){

      io.emit('message', message)
    }

  // });
}
