export const SET_BOARD_SIZE = "Set the board size";
export const ADD_SCORE = "Add score";
export const RANDOMIZE_BOARD = "Randomize the board";
export const MARK_PICKED = "Mark as picked";
export const SET_BOARD_VISIBILITY = "Set board visibility";
export const CLEAR_SELECTION_LIST = "Clear selection list";

interface SetBoardSizeAction {
  type: typeof SET_BOARD_SIZE;
  size: number;
}

interface MarkPickedAction {
  type: typeof MARK_PICKED;
  x: number;
  y: number;
  picked: boolean;
}

interface AddScoreAction {
  type: typeof ADD_SCORE;
  score: number;
}

interface ClearSelectionListAction {
  type: typeof CLEAR_SELECTION_LIST;
}

interface RandomizeBoardAction {
  type: typeof RANDOMIZE_BOARD;
  boundaries?: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
}

interface SetBoardVisibilityAction {
  type: typeof SET_BOARD_VISIBILITY;
  visibility: boolean;
}

export type RectballAction =
  | AddScoreAction
  | ClearSelectionListAction
  | MarkPickedAction
  | RandomizeBoardAction
  | SetBoardSizeAction
  | SetBoardVisibilityAction;
