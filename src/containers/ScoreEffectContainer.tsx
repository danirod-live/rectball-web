import { connect, MapStateToProps } from "react-redux"

import ScoreEffectManager from "../components/effects/ScoreEffectManager"
import { State } from "../state/models"
import { ScoreEffect } from "../effects/score"

interface ScoreEffectStateProps {
  min: number;
  max: number;
}

interface ScoreEffectOwnProps {
  queue: ScoreEffect[];
}

const mapState: MapStateToProps<ScoreEffectStateProps, ScoreEffectOwnProps, State> = (state, props) => ({
  queue: props.queue,
  min: props.queue.length === 0 ? 0 : props.queue[0].timestamp,
  max: props.queue.length === 0 ? 0 : props.queue[props.queue.length - 1].timestamp,
})

export default connect<ScoreEffectStateProps, {}, ScoreEffectOwnProps, State>(mapState)(ScoreEffectManager)
