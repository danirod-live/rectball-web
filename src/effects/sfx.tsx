import { Middleware } from "redux";

import { RectballAction, MARK_PICKED } from "../state/types";

function pickSound(action: RectballAction): HTMLAudioElement | null {
  if (action.type === MARK_PICKED) {
    if (action.picked) {
      return new Audio(process.env.PUBLIC_URL + "/media/select.ogg");
    } else {
      return new Audio(process.env.PUBLIC_URL + "/media/unselect.ogg");
    }
  }
  return null;
}

const soundMachine: Middleware = () => next => (action: RectballAction) => {
  let sound = pickSound(action);
  if (sound) {
    sound.play();
  }
  next(action);
};

export default soundMachine;
