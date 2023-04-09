import {
  LOCAL_RELOAD_SOCKET_URL,
  UPDATE_COMPLETE_MESSAGE,
  UPDATE_PENDING_MESSAGE,
  UPDATE_REQUEST_MESSAGE,
} from "./constant";
import MessageInterpreter from "./interpreter";

let needToUpdate = false;

export default function initReloadClient({
  watchPath,
  onUpdate,
}: {
  watchPath: string;
  onUpdate: () => void;
}): WebSocket {
  const socket = new WebSocket(LOCAL_RELOAD_SOCKET_URL);

  function sendUpdateCompleteMessage() {
    socket.send(MessageInterpreter.send({ type: UPDATE_COMPLETE_MESSAGE }));
  }

  socket.addEventListener("message", (event) => {
    const message = MessageInterpreter.receive(String(event.data));

    switch (message.type) {
      case UPDATE_REQUEST_MESSAGE: {
        if (needToUpdate) {
          sendUpdateCompleteMessage();
          needToUpdate = false;
          onUpdate();
        }
        return;
      }
      case UPDATE_PENDING_MESSAGE: {
        if (!needToUpdate) {
          needToUpdate = message.path.includes(watchPath);
        }
        return;
      }
    }
  });

  socket.addEventListener("close", () => {
    console.log("Reload server disconnected.");
  });

  return socket;
}
