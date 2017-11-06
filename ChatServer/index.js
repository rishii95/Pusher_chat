const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

// app.set('port', (process.env.PORT || 5000));

// const pusher = new Pusher({
//     appId: "423763",
//     key:    "935acc7a384edda7cfe8",
//     secret: "787a9d2a3a568856e01c"
//  })
 const pusherConfig = require('./pusher.json'); // (1)
 const pusherClient = new Pusher(pusherConfig);

 const app = express(); // (2)
 
 pusherClient.notify(['donuts'], {
    fcm: {
      notification: {
        title: "hello world",
        icon: "androidlogo"
      }
    }
  });

 app.use(bodyParser.json());

 app.put('/users/:name', function(req, res) { // (3)
     console.log('User joined: ' + req.params.name);
     pusherClient.trigger('chat_channel', 'join', {
         name: req.params.name
     });
     res.sendStatus(204);
 });

 app.delete('/users/:name', function(req, res) { // (4)
     console.log('User left: ' + req.params.name);
     pusherClient.trigger('chat_channel', 'part', {
         name: req.params.name
     });
     res.sendStatus(204);
 });

 app.post('/users/:name/messages', function(req, res) { // (5)
     console.log('User ' + req.params.name + ' sent message: ' + req.body.message);
     pusherClient.trigger('chat_channel', 'message', {
         name: req.params.name,
         message: req.body.message
     });
     res.sendStatus(204);
 });

 app.listen(4000, function() { // (6)
     console.log('App listening on port 4000');
 });