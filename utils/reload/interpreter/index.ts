import { ReloadMessage, SerializedMessage } from "./types";

export default class MessageInterpreter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static send(message: ReloadMessage): SerializedMessage {
    return JSON.stringify(message);
  }
  static receive(serializedMessage: SerializedMessage): ReloadMessage {
    return JSON.parse(serializedMessage);
  }
}
