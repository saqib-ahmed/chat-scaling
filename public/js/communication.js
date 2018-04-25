(
  function(){
    
    var messageInput = '#chat-input';
    var messageSubmit = '#chat-send';
    var messageList = '#chat-list';

    var socket = io();

    //messages to server
    $(messageSubmit).click(function(){
      
      var msg = $(messageInput).val();
      if(!msg){
        return;
      }

      sendMessage(msg);
      $(messageInput).val('');
    });
    
    //messages from server
    socket.on('message', displayMessage);

    socket.on('start', function(data){
      $('#ipHost').text("Host: "+ data.ipHost); 
    });

    function sendMessage(msg){
      socket.emit('message', msg)
    }

    function displayMessage(msg){
      $(messageList).append(getMessageHTML(msg))
    }

    function getMessageHTML(msg){
      return '<li class="chat-message"><strong>' + msg.text + '</strong><i class=\"msg-date\" style=\"font-size: small; float: right; margin-top: 10px\">'+ msg.ip + ' ' + moment(new Date(msg.date)).format('h:mm:ss a') + '</i>' +  '</li>' 
    }
  }
)();
