import React, { FunctionComponent } from "react";

import MarbleComponent from "./Marble";
import { Board, Marble } from "../state/models";

interface BoardProps {
  board: Board;
  onMarbleClicked: (m: Marble) => void;
}

const keyForRow = (m: Marble[]) => m.map(cell => String(cell.color)).join("");

const BoardComponent: FunctionComponent<BoardProps> = ({
  board,
  onMarbleClicked
}) => (
  <div>
    {board.map((row, i) => (
      <div key={[i, keyForRow(row)].join("-")}>
        {row.map(cell => (
          <MarbleComponent
            onMarbleClicked={onMarbleClicked.bind(null, cell)}
            marble={cell}
            key={[cell.y, cell.color].join("-")}
          />
        ))}
      </div>
    ))}
  </div>
);

export default BoardComponent;
