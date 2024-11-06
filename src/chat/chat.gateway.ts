import { ConnectedSocket,MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
//npm install socket.io-client
//npm i --save @nestjs/websockets @nestjs/platform-socket.io


@WebSocketGateway(3000,{cors:{origin:'*'}})
export class ChatGateway {
@WebSocketServer() server:Server;
private userMap: Map<string, string> = new Map();
handleConnection(client: Socket) {
  
  console.log("new user connected..", client.id);
  client.emit('you-have-connected', {
    message: "You have connected",
  });
  
  const username = this.userMap.get(client.id);
  console.log("User Connected:", username);
  if (username) {
    client.broadcast.emit('user-joined', {
      message: `New User Joined the chat: ${username}`,
    });
    this.server.emit('message', { sender: username, content: `${username} has rejoined the chat` });
  }
}
handleDisconnect(client:Socket){
  console.log("User disconnected", client.id);
  client.emit('you-have-connected', {
    message: "You have connected",
  });
  this.server.emit('user-left',{
    message:`User Left the chat: ${client.id}`,
    });
    const username = this.userMap.get(client.id);  // Get the username for the socket id
    console.log("User disconnected:", username);
    if (username) {
      this.server.emit('user-left', {
        message: `User Left the chat: ${username}`,
      });
      this.userMap.delete(client.id);  // Remove the user from the map
    }
}
  @SubscribeMessage('events')
  handleEvent(client:Socket,message:any) {
    console.log(message);
    this.userMap.set(client.id, message.username);

    // Emit a reply to the user
    client.emit('reply', 'You have joined the chat');

    // Broadcast the message to all clients with the username as the sender
    this.server.emit('message', { sender: message.username, content: message.content });
  }
}
