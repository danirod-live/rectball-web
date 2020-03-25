import { Reducer, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

import {
  markPickedInBoard,
  generateBoard,
  randomize,
  State,
  updatePickedList,
  Boundaries
} from "./models";
import {
  ADD_SCORE,
  MARK_PICKED,
  RANDOMIZE_BOARD,
  SET_BOARD_SIZE,
  SET_BOARD_VISIBILITY,
  RectballAction,
  CLEAR_SELECTION_LIST
} from "./types";
import { testSelection } from "./combinations";

export const initialState: State = {
  size: 0,
  board: [],
  picked: [],
  score: 0
};

export const setBoardSize: ActionCreator<RectballAction> = (size: number) => ({
  type: SET_BOARD_SIZE,
  size
});

export const clearSelectionList: ActionCreator<RectballAction> = () => ({
  type: CLEAR_SELECTION_LIST
});

export const markPicked: ActionCreator<RectballAction> = (
  x: number,
  y: number,
  picked: boolean
) => ({
  type: MARK_PICKED,
  x,
  y,
  picked
});

export const randomizeBoard: ActionCreator<RectballAction> = (
  boundaries?: Boundaries
) => ({
  type: RANDOMIZE_BOARD,
  boundaries
});

export const addScore: ActionCreator<RectballAction> = (score: number) => ({
  type: ADD_SCORE,
  score
});

export const setBoardVisibility: ActionCreator<RectballAction> = (
  visibility: boolean
) => ({
  type: SET_BOARD_VISIBILITY,
  visibility
});

export function pickMarble(
  x: number,
  y: number,
  picked: boolean
): ThunkAction<Promise<void>, State, {}, RectballAction> {
  return (dispatch, getState) => {
    dispatch(markPicked(x, y, picked));

    let { picked: picklist, board } = getState();
    if (!picked || picklist.length !== 4) {
      return Promise.resolve();
    }

    if (testSelection(picklist, board)) {
      let minX = Math.min(...picklist.map(pick => pick.x));
      let maxX = Math.max(...picklist.map(pick => pick.x));
      let minY = Math.min(...picklist.map(pick => pick.y));
      let maxY = Math.max(...picklist.map(pick => pick.y));

      let rows = maxY - minY + 1;
      let cols = maxX - minX + 1;
      let score = rows * cols;

      dispatch(addScore(score));
      dispatch(randomizeBoard({ x1: minX, y1: minY, x2: maxX, y2: maxY }));
    }

    dispatch(clearSelectionList());
    return Promise.resolve();
  };
}

export const reducer: Reducer<State, RectballAction> = (
  previousState = initialState,
  action
) => {
  switch (action.type) {
    case SET_BOARD_SIZE:
      return {
        ...previousState,
        size: action.size,
        board: generateBoard(action.size)
      };
    case ADD_SCORE:
      return {
        ...previousState,
        score: previousState.score + action.score
      };
    case MARK_PICKED:
      return {
        ...previousState,
        board: markPickedInBoard(
          previousState.board,
          action.x,
          action.y,
          action.picked
        ),
        picked: updatePickedList(
          previousState.picked,
          action.x,
          action.y,
          action.picked
        )
      };
    case RANDOMIZE_BOARD: {
      let bounds = action.boundaries || {
        x1: 0,
        y1: 0,
        x2: previousState.size - 1,
        y2: previousState.size - 1
      };
      return {
        ...previousState,
        board: randomize(previousState.board, bounds)
      };
    }
    case SET_BOARD_VISIBILITY:
      return {
        ...previousState,
        board: previousState.board.map(row =>
          row.map(cell => ({ ...cell, showColor: action.visibility }))
        )
      };
    case CLEAR_SELECTION_LIST:
      return {
        ...previousState,
        picked: [],
        board: previousState.board.map(row =>
          row.map(cell => ({ ...cell, active: false }))
        )
      };
    default:
      return previousState;
  }
};
