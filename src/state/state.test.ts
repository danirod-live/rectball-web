import {
  addScore,
  initialState,
  randomizeBoard,
  setBoardSize,
  reducer
} from "./state";
import { MarbleColor } from "./models";

const toBoard = (b: number[][]): Board =>
  b.map((row, i) =>
    row.map((col, j) => ({ x: i, y: j, showColor: true, color: col + 1 }))
  );

describe("setBoardSize", () => {
  let action = setBoardSize(8);

  it("returns a state with the size set into the state", () => {
    let newState = reducer(initialState, action);
    expect(newState.size).toBe(8);
  });

  it("returns a board with the new dimensions set", () => {
    let newState = reducer(initialState, action);
    expect(newState.board).toHaveLength(8);
    newState.board.forEach(row => {
      expect(row).toHaveLength(8);
    });
  });
});

describe("randomizeBoard", () => {
  let action = randomizeBoard();
  let ball = { color: MarbleColor.None };
  let state = {
    size: 2,
    board: [
      [{ ...ball }, { ...ball }],
      [{ ...ball }, { ...ball }]
    ]
  };

  it("will yield a board with colors", () => {
    let newState = reducer(state, action);
    newState.board.forEach(row => {
      row.forEach(ball => {
        expect(ball.color).not.toBe(MarbleColor.None);
      });
    });
  });

  describe("when a subregion is specified", () => {
    let board = toBoard([
      [1, 2, 3, 4, 1, 4],
      [2, 3, 2, 2, 2, 3],
      [1, 4, 1, 1, 2, 2],
      [1, 2, 2, 3, 1, 1],
      [4, 4, 2, 3, 2, 4],
      [4, 2, 4, 1, 1, 1]
    ]);

    let state = {
      size: 6,
      board: board
    };

    beforeEach(() => {
      jest
        .spyOn(global.Math, "random")
        .mockReturnValueOnce(0.99)
        .mockReturnValueOnce(0.99)
        .mockReturnValueOnce(0.99)
        .mockReturnValueOnce(0.99)
        .mockReturnValueOnce(0.99)
        .mockReturnValueOnce(0.99);
    });

    afterEach(() => {
      global.Math.random.mockRestore();
    });

    it("regenerates only that portion of the board", () => {
      let action = randomizeBoard({ x1: 3, x2: 5, y1: 4, y2: 5 });
      let newState = reducer(state, action);

      let newBoard = newState.board.map(row => row.map(col => col.color - 1));
      expect(newBoard).toMatchObject([
        [1, 2, 3, 4, 1, 4],
        [2, 3, 2, 2, 2, 3],
        [1, 4, 1, 1, 2, 2],
        [1, 2, 2, 3, 3, 3],
        [4, 4, 2, 3, 3, 3],
        [4, 2, 4, 1, 3, 3]
      ]);
    });
  });

  describe("when the generated combination is not valid", () => {
    beforeEach(() => {
      jest
        .spyOn(global.Math, "random")
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(3)
        .mockReturnValueOnce(4)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1);
    });

    afterEach(() => {
      global.Math.random.mockRestore();
    });

    it("will retry if no combinations are valid after randomizing once", () => {
      let newState = reducer(state, action);
      let color = newState.board[0][0].color;
      newState.board.forEach(row => {
        row.forEach(ball => {
          expect(ball.color).toBe(color);
        });
      });
    });
  });
});

describe("addScore", () => {
  let action = addScore(60);
  let state = {
    score: 50,
    board: [],
    size: 6
  };

  it("adds the score to the board score", () => {
    let newState = reducer(state, action);
    expect(newState.score).toBe(110);
  });
});
