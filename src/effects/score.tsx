import { Middleware } from "redux"

import { RectballAction, ADD_SCORE } from "../state/types"

export interface ScoreEffect {
  score: number;
  timestamp: number;
}

export default function() {
  const events: ScoreEffect[] = []

  const middleware: Middleware = () => next => (action: RectballAction) => {
    if (action.type === ADD_SCORE) {
      events.push({
        score: action.score,
        timestamp: Date.now(),
      })
    }
    next(action)
  }

  return { events, middleware }
}
