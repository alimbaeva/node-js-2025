import { handleRegistration } from '../controllers/player.js';
import { handleCreateRoom } from '../controllers/room.js';

export function handleMessage(ws, message) {
  const { type, data, id } = message;

  switch (type) {
    case 'reg':
      handleRegistration(ws, data, id);
      break;
    case 'create_room':
        handleCreateRoom(ws, data, id);
        break;
    default:
      ws.send(JSON.stringify({ type: 'error', data: JSON.stringify({ message: 'Неизвестный тип сообщения' }), id }));
  }
}
