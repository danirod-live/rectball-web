import React, { FunctionComponent } from "react";

import MarbleComponent from "./Marble";
import { Board, Marble } from "../state/models";

import "./Board.css";

interface BoardProps {
  board: Board;
  onMarbleClicked: (m: Marble) => void;
}

const keyForRow = (m: Marble[]) => m.map(cell => String(cell.color)).join("");

const BoardComponent: FunctionComponent<BoardProps> = ({
  board,
  onMarbleClicked
}) => (
  <div className="board-grid">
    {board.map((row, i) => (
      <div className="board-row" key={[i, keyForRow(row)].join("-")}>
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
