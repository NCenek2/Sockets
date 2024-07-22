import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatDto } from './dto/chat.dto';
@WebSocketGateway({ cors: true })
export class ChatsGateway implements OnGatewayConnection {
  handleConnection(client: Socket) {
    client.emit('id', client.id);
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  sendChat(@MessageBody() chatDto: ChatDto, @ConnectedSocket() client: Socket) {
    const { message, room } = chatDto;
    console.log(`RECEIVED ${message} from ${client.id} sent to ${room}`);
    this.server.to(room).emit('message', { ...chatDto, id: client.id });
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    console.log(`REQUEST TO JOIN ROOM ${room} from ${client.id}`);
    client.join(room);
    console.log('CURRENT ROOMS', client.rooms);
    client.emit('join', room);
  }

  @SubscribeMessage('leave')
  leaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    console.log(`REQUEST TO LEAVE ROOM ${room} from ${client.id}`);
    client.leave(room);
    console.log('CURRENT ROOMS', client.rooms);
    client.emit('leave', room);
  }
}
