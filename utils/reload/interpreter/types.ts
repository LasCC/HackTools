import {
  UPDATE_COMPLETE_MESSAGE,
  UPDATE_PENDING_MESSAGE,
  UPDATE_REQUEST_MESSAGE,
} from "../constant";

type UpdatePendingMessage = {
  type: typeof UPDATE_PENDING_MESSAGE;
  path: string;
};

type UpdateRequestMessage = {
  type: typeof UPDATE_REQUEST_MESSAGE;
};

type UpdateCompleteMessage = { type: typeof UPDATE_COMPLETE_MESSAGE };

export type SerializedMessage = string;
export type ReloadMessage =
  | UpdateCompleteMessage
  | UpdateRequestMessage
  | UpdatePendingMessage;
