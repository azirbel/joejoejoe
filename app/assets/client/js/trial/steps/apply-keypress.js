//TODO: centralize
const LEFT = 65;
const RIGHT = 68;
const UP = 87;
const DOWN = 83;

const SPEED = 1.4;

const GRAVITY = 0.2;
const FAST_GRAVITY = 0.4;

export default class {
  constructor(entity, pressedMapping) {
    this.entity = entity;
    this.pressedMapping = pressedMapping;
  }

  apply() {
    if (this.pressedMapping[LEFT] ^ this.pressedMapping[RIGHT]) {
      let dir = this.pressedMapping[LEFT] ? -1 : 1;
      this.entity.velo.x += dir * SPEED;
    }

    if (this.pressedMapping[UP]) {
      if (this.entity.isGrounded) {
        this.entity.velo.y = -15;
      }
    }

    this.entity.velo.x *= 0.8;

    if (this.entity.velo.y > 0 && this.pressedMapping[DOWN]) {
      this.entity.faseFall = true;
      this.entity.velo.y += 2 * FAST_GRAVITY;
    }

    if (this.entity.fastFall) {
      this.entity.velo.y += FAST_GRAVITY;
    } else {
      this.entity.velo.y += GRAVITY;
    }

    if (this.entity.velo.y < 1) {
      this.entity.velo.y *= 0.96;
    }
  }
}
