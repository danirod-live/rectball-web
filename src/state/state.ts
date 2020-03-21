import { generateBoard, randomize, State } from './models';
import { ADD_SCORE, RANDOMIZE_BOARD, SET_BOARD_SIZE, RectballAction } from './types';

// TODO: Import this from redux-types
type Action = {
  type: string,
}

export const initialState: State = {
  size: 0,
  board: [],
  score: 0,
};

export function setBoardSize(size: number): RectballAction {
  return {
    type: SET_BOARD_SIZE,
    size,
  };
}

export function randomizeBoard(boundaries?: {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}): RectballAction {
  return {
    type: RANDOMIZE_BOARD,
    boundaries,
  };
}

export function addScore(score: number): RectballAction {
  return { type: ADD_SCORE, score }
}

export function reducer(previousState: State, action: RectballAction): State {
  switch (action.type) {
    case SET_BOARD_SIZE:
      return {
        ...previousState,
        size: action.size,
        board: generateBoard(action.size),
      }
    case ADD_SCORE:
      return {
        ...previousState,
        score: previousState.score + action.score,
      }
    case RANDOMIZE_BOARD: {
      let bounds = action.boundaries || {
        x1: 0,
        y1: 0,
        x2: previousState.size - 1,
        y2: previousState.size - 1,
      };
      return {
        ...previousState,
        board: randomize(previousState.board, bounds),
      }
    }
    default:
      console.error({ message: "Unknown action", action })
      return previousState;
  }
}
