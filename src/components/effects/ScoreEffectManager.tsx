import React from "react"

import { ScoreEffect } from "../../effects/score"

import "./ScoreEffectManager.css"

interface ScoreEffectManagerProps {
  queue: ScoreEffect[];
  min: number;
  max: number;
}

interface ScoreEffectProps extends ScoreEffect {
  onAnimationEnd: () => void;
}

const ScoreEffectItem: React.FunctionComponent<ScoreEffectProps> = ({ onAnimationEnd, timestamp, score }) => {
  return <div onAnimationEnd={onAnimationEnd} className="score-effect">{ score }</div>
}

const MemoizedScoreEffectItem = React.memo(ScoreEffectItem, () => true)

const ScoreEffectManager: React.FunctionComponent<ScoreEffectManagerProps> =
  ({ queue }) => {
    const done = () => queue.pop()
    return <>
      { queue.map(effect => (
        <MemoizedScoreEffectItem key={effect.timestamp} onAnimationEnd={done} { ...effect } />
        )) }
    </>
  }


export default ScoreEffectManager
