import { handleRegistration } from '../controllers/player.js';
import { handleCreateRoom, handleJoinRoom } from '../controllers/room.js';
import { handleAddShips } from '../controllers/game.js';

export function handleMessage(ws, message) {
  const { type, data, id } = message;
console.log(type, data, id)
  switch (type) {
    case 'reg':
      handleRegistration(ws, data, id);
      break;
    case 'create_room':
      handleCreateRoom(ws, data, id);
      break;
    case 'add_user_to_room':
      handleJoinRoom(ws, data, id);
      break;
    case 'add_ships':
      handleAddShips(ws, data, id);
      break;
    case 'attack':
      console.log('attack', data, id)
      handleAttack(ws, data, id);
      break;
    default:
      ws.send(JSON.stringify({ type: 'error', data: JSON.stringify({ message: 'Неизвестный тип сообщения' }), id }));
  }
}
