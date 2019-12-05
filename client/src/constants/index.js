export * from "./route";
export * from "./actions";
export * from "./api";
export * from "./pieces";

export const FIELD_HEIGHT = 20;
export const FIELD_WIDTH = 10;
export const UNSENT_INT = -1;
export const NO_COLOR = "transparent";

export const DIRECTION = {
  DOWN: "DOWN",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
  CURRENT: "CURRENT",
  ROTATE: "ROTATE",
};

export const GAME_STATUS = {
  START: "START",
  STOP: "STOP",
  PAUSE: "PAUSE"
};
