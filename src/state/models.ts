import { findCombinations } from "./combinations";

export enum MarbleColor {
  None,
  Red,
  Green,
  Yellow,
  Blue
}

export interface Marble {
  x: number;
  y: number;
  color: MarbleColor;
  showColor: boolean;
}

export type Board = Marble[][];

export interface State {
  size: number;
  board: Board;
  score: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Boundaries {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export function generateBoard(size: number): Board {
  return Array(size)
    .fill(0)
    .map((_, row) => {
      return Array(size)
        .fill(0)
        .map((_, col) => {
          return {
            x: row,
            y: col,
            color: MarbleColor.None,
            showColor: false
          };
        });
    });
}

function inside(p: Position, b: Boundaries): boolean {
  const { x, y } = p;
  const { x1, y1, x2, y2 } = b;
  return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

const acceptableColors: MarbleColor[] = [
  MarbleColor.Red,
  MarbleColor.Green,
  MarbleColor.Yellow,
  MarbleColor.Blue
];

function pickRandomColor(): MarbleColor {
  const random = Math.floor(Math.random() * acceptableColors.length);
  return acceptableColors[random];
}

export function randomize(board: Board, bounds: Boundaries): Board {
  let newBoard = shuffleBoard(board, bounds);
  let combinations = findCombinations(newBoard);
  if (combinations.length > 0) {
    return newBoard;
  } else {
    return randomize(board, bounds);
  }
}

export function shuffleBoard(board: Board, bounds: Boundaries): Board {
  return board.map((row, x) => {
    return row.map((col, y) => {
      if (inside({ x, y }, bounds)) {
        return { ...board[x][y], color: pickRandomColor() };
      } else {
        return board[x][y];
      }
    });
  });
}
