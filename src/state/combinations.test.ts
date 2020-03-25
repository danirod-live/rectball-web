import { Board } from "./models";
import { testSelection, findCombinations } from "./combinations";

const toBoard = (b: number[][]): Board =>
  b.map((row, i) =>
    row.map((col, j) => ({
      x: i,
      y: j,
      showColor: true,
      color: col,
      active: false
    }))
  );

describe("findCombinations", () => {
  describe("when it is a single column", () => {
    let board = toBoard([[1], [2], [1]]);

    it("returns an empty list because it is the recursive base case", () => {
      expect(findCombinations(board)).toHaveLength(0);
    });
  });

  describe("when it has two or more columns", () => {
    let validBoard = toBoard([
      [1, 2, 1, 3],
      [2, 4, 3, 4],
      [1, 4, 1, 3]
    ]);

    let invalidBoard = toBoard([
      [1, 2, 1, 3],
      [2, 4, 3, 4],
      [1, 4, 2, 3]
    ]);

    let validInside = toBoard([
      [1, 4, 3, 4],
      [2, 3, 4, 1],
      [2, 4, 4, 4]
    ]);

    it("returns combinations when it finds them", () => {
      let combinations = findCombinations(validBoard);
      expect(combinations).toHaveLength(1);
      expect(combinations[0]).toMatchObject({ x1: 0, y1: 0, x2: 2, y2: 2 });
    });

    it("does not return combinations when it cannot find them", () => {
      let combinations = findCombinations(invalidBoard);
      expect(combinations).toHaveLength(0);
    });

    it("accounts for combinations inside the board", () => {
      let combinations = findCombinations(validInside);
      expect(combinations).toHaveLength(1);
      expect(combinations[0]).toMatchObject({ x1: 0, y1: 1, x2: 2, y2: 3 });
    });
  });

  describe("when it is a bigger board", () => {
    let validBoard = toBoard([
      [1, 2, 3, 1, 3],
      [3, 1, 4, 2, 4],
      [4, 3, 3, 1, 3],
      [2, 1, 3, 2, 4],
      [1, 2, 4, 2, 4]
    ]);

    it("finds combinations", () => {
      let combinations = findCombinations(validBoard);
      expect(combinations).toHaveLength(2);

      expect(combinations).toContainEqual({ x1: 0, y1: 2, x2: 2, y2: 4 });
      expect(combinations).toContainEqual({ x1: 1, y1: 2, x2: 4, y2: 4 });
    });
  });
});

describe("testSelection", () => {
  it("returns false when the selection is not complete", () => {
    let board = toBoard([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]);
    expect(testSelection([], board)).toBeFalsy();
  });

  it("returns false when the selection mismatches color", () => {
    let board = toBoard([
      [1, 1],
      [1, 2]
    ]);
    let selection = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ];
    expect(testSelection(selection, board)).toBeFalsy();
  });

  it("returns false when the selection is not a square", () => {
    let board = toBoard([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]);
    let selection = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 2 }
    ];
    expect(testSelection(selection, board)).toBeFalsy();
  });

  it("returns true when the selection is valid", () => {
    let board = toBoard([
      [1, 1],
      [1, 1]
    ]);
    let selection = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ];
    expect(testSelection(selection, board)).toBeTruthy();
  });
});
