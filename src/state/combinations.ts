import { Board, Boundaries, Position } from "./models";

function testBounds(b: Board): Position | null {
  const reference = b[0][0];

  // Attempt to find another marble in the first row, same color than (0,0)
  const [topRow, ...verticalSub] = b;
  const tail = topRow.slice(1);
  const y2 = tail.findIndex(mb => mb.color === reference.color);
  if (y2 === -1) {
    return null;
  }

  // Attempt to find another pair of marbles of the same color than (0,0)
  // exactly in positions (i,0) and (i,y2), for some i in a different row.
  const x2 = verticalSub.findIndex(
    row =>
      row[0].color === reference.color && row[y2 + 1].color === reference.color
  );
  if (x2 === -1) {
    return null;
  }

  return { x: x2 + 1, y: y2 + 1 };
}

function sweep(b: Board): Boundaries[] {
  if (b[0].length < 2) {
    return [];
  } else {
    /* Recursive case to get the bounds of the inner boards. */
    let boardWithoutFirstCol = b.map(row => row.slice(1));
    let subsweep = sweep(boardWithoutFirstCol).map(combination => ({
      ...combination,
      y1: combination.y1 + 1,
      y2: combination.y2 + 1
    }));

    /* Then actually find combinations here. */
    let combination = testBounds(b);
    if (combination) {
      let boundary = { x1: 0, y1: 0, x2: combination.x, y2: combination.y };
      return [boundary, ...subsweep];
    } else {
      return subsweep;
    }
  }
}

function scan(b: Board): Boundaries[] {
  if (b.length < 2) {
    return [];
  } else {
    let subscan = scan(b.slice(1)).map(combination => ({
      ...combination,
      x1: combination.x1 + 1,
      x2: combination.x2 + 1
    }));
    return [...sweep(b), ...subscan];
  }
}

export const findCombinations = scan;

export function testSelection(picklist: Position[], board: Board): boolean {
  if (picklist.length < 4) {
    return false;
  }
  let marbles = picklist.map(pick => board[pick.x][pick.y]);

  let testedColor = marbles[0].color;
  if (!marbles.every(marble => marble.color === testedColor)) {
    return false;
  }

  let rows = new Set(picklist.map(pick => pick.x));
  let cols = new Set(picklist.map(pick => pick.y));
  return rows.size === 2 && cols.size === 2;
}
