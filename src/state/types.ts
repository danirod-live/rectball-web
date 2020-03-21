// Redux types

export const SET_BOARD_SIZE = 'Set the board size';
export const ADD_SCORE = 'Add score';
export const RANDOMIZE_BOARD = 'Randomize the board';

interface SetBoardSizeAction {
  type: typeof SET_BOARD_SIZE;
  size: number;
}

interface AddScoreAction {
  type: typeof ADD_SCORE;
  score: number;
}

interface RandomizeBoardAction {
  type: typeof RANDOMIZE_BOARD;
  boundaries?: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }
}

export type RectballAction =
  | AddScoreAction
  | RandomizeBoardAction
  | SetBoardSizeAction
