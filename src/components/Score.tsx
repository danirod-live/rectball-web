import React, { FunctionComponent } from 'react'

import './Score.css'

interface ScoreProps {
  score: number;
}

const Score: FunctionComponent<ScoreProps> = ({ score }) => (
  <div className="scoreboard">
    { score }
  </div>
);

export default Score
