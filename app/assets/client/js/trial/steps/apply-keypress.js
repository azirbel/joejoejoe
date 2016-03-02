//TODO: centralize
const LEFT = 65;
const RIGHT = 68;
const UP = 87;
const DOWN = 83;

const CONSUMED_KEYS = [LEFT, RIGHT, UP, DOWN];

export default class {
  constructor(entity, pressedMapping) {
    this.entity = entity;
    this.pressedMapping = pressedMapping;
  }

  apply() {
    if (this.pressedMapping[LEFT] ^ this.pressedMapping[RIGHT]) {
      let dir = this.pressedMapping[LEFT] ? -1 : 1;
      this.entity.velo.x += dir;
    }
  }
}
