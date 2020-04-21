import React, { FunctionComponent } from "react";

import { Marble, MarbleColor } from "../state/models";

import "./Marble.css";

const colors = {
  [MarbleColor.None]: "ball",
  [MarbleColor.Red]: "ball-red",
  [MarbleColor.Green]: "ball-green",
  [MarbleColor.Blue]: "ball-blue",
  [MarbleColor.Yellow]: "ball-yellow"
};

const classNameFor = (marble: Marble) =>
  marble.showColor ? colors[marble.color] : "ball";

interface MarbleProps {
  marble: Marble;
  onMarbleClicked: () => void;
}

const MarbleComponent: FunctionComponent<MarbleProps> = ({
  marble,
  onMarbleClicked
}) => (
  <svg className="board-ball" viewBox="0 0 48 48" onClick={onMarbleClicked}>
    <g className={marble.active ? "marble marble-active" : "marble"}>
      <circle cx="24" cy="24" r="22" className={classNameFor(marble)} />
      <circle cx="14" cy="14" r="6" className="ball-glow" />
    </g>
  </svg>
);

export default MarbleComponent;
