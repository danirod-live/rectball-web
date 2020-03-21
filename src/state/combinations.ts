import { Board, Boundaries, Marble, MarbleColor, Position } from "./models";

function testBounds(b: Board): Position | null {
  const reference = b[0][0];

  // Attempt to find another marble in the first row, same color than (0,0)
  const [topRow, ...verticalSub] = b;
  const [corner, ...tail] = topRow;
  const y2 = tail.findIndex(mb => mb.color == reference.color);
  if (y2 === -1) {
    return null;
  }

  // Attempt to find another pair of marbles of the same color than (0,0)
  // exactly in positions (i,0) and (i,y2), for some i in a different row.
  const x2 = verticalSub.findIndex(
    row =>
      row[0].color == reference.color && row[y2 + 1].color == reference.color
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
    let combination = testBounds(b);

    let boardWithoutFirstCol = b.map(row => {
      let [_, ...tail] = row;
      return tail;
    });
    let subsweep = sweep(boardWithoutFirstCol).map(combination => ({
      ...combination,
      y1: combination.y1 + 1,
      y2: combination.y2 + 1
    }));

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
    let [_, ...tail] = b;
    let subscan = scan(tail).map(combination => ({
      ...combination,
      x1: combination.x1 + 1,
      x2: combination.x2 + 1
    }));
    return [...sweep(b), ...subscan];
  }
}

export const findCombinations = scan;
