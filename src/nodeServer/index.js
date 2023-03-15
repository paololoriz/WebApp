const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const WebSocket = require('ws');

// Configurazione del WebSocket server
const wsServer = new WebSocket.Server({ port: 8081 });
var array = [];
// Gestione delle connessioni WebSocket
wsServer.on('connection', (socket) => {
  console.log('Client connesso');
  //console.log(socket);

  server.on('message', (msg, rinfo) => {
    console.log(`Messaggio ricevuto: ${msg} da ${rinfo.address}:${rinfo.port}`);
    socket.send(msg);
    console.log(`Dati inviati: ${msg.toJSON()}`);

  });

});

// Gestione dei messaggi UDP
server.on('message', (msg, rinfo) => {
  console.log(`Messaggio ricevuto: ${msg} da ${rinfo.address}:${rinfo.port}`);
});

// server.on('message', function message(data, isBinary) {
//   const message = isBinary ? data : data.toString();
//   socket.send(message);
//   console.log(message)
// });

server.on('close', function close(code, data) {
  const reason = data.toString();
  // Continue as before.
});

// Avvio del server UDP
server.bind(12345, () => {
  console.log('Server UDP in ascolto sulla porta 12345');
});
