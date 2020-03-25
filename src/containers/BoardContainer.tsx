import { connect, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import BoardComponent from "../components/Board";
import { Board, State, Marble } from "../state/models";
import { pickMarble } from "../state/state";
import { RectballAction } from "../state/types";

interface BoardStateProps {
  board: Board;
}

interface BoardDispatchProps {
  onMarbleClicked: (m: Marble) => void;
}

const mapState: MapStateToProps<BoardStateProps, {}, State> = state => ({
  board: state.board
});

const mapDispatch = (dispatch: ThunkDispatch<State, {}, RectballAction>) => ({
  onMarbleClicked: (m: Marble) => dispatch(pickMarble(m.x, m.y, !m.active))
});

export default connect<BoardStateProps, BoardDispatchProps, {}, State>(
  mapState,
  mapDispatch
)(BoardComponent);
