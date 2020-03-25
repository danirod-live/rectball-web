import { connect, MapStateToProps } from "react-redux";

import { State } from "../state/models";
import Score from "../components/Score";

interface ScoreStateProps {
  score: number;
}

const mapState: MapStateToProps<ScoreStateProps, {}, State> = state => ({
  score: state.score
});

export default connect<ScoreStateProps, {}, {}, State>(mapState)(Score);
