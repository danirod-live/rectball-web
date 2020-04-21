import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import * as serviceWorker from "./serviceWorker";
import ScoreContainer from "./containers/ScoreContainer";
import BoardContainer from "./containers/BoardContainer";
import ScoreEffectContainer from "./containers/ScoreEffectContainer"
import soundMachine from "./effects/sfx";
import scoreEffect from "./effects/score";

import {
  reducer,
  setBoardSize,
  randomizeBoard,
  setBoardVisibility
} from "./state/state";

import "./index.css";

const { events: scoreUiEvents, middleware: scoreMiddleware } = scoreEffect()
const store = createStore(reducer, applyMiddleware(thunk, soundMachine, scoreMiddleware));
store.dispatch(setBoardSize(8));
store.dispatch(randomizeBoard());
store.dispatch(setBoardVisibility(true));

const game = (
  <Provider store={store}>
    <ScoreContainer />
    <div className="board">
      <ScoreEffectContainer queue={scoreUiEvents} />
      <BoardContainer />
    </div>
  </Provider>
);

ReactDOM.render(game, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
