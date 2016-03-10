//TODO: centralize
const LEFT = 65;
const RIGHT = 68;
const UP = 87;
const DOWN = 83;

const SPEED = 1.4;
const CROUCH_AIR_DI = 0.4;
const ROLL_BASE_SPEED = 3.5;
const ROLL_INFLUENCE_SPEED = 1.0;

const GRAVITY = 0.2;
const FAST_GRAVITY = 0.4;

export default class ApplyKeypress {
  static apply(entity, pressedMapping) {
    entity.advance();

    let oldState = entity.state;

    if (pressedMapping[DOWN]) {
      entity.isCrouch = true;
    } else {
      entity.isCrouch = false;
    }

    if (entity.isRoll) {
      let entityDir = entity.isRight ? 1 : -1;
      let pressedDir = 0;
      if (pressedMapping[LEFT] ^ pressedMapping[RIGHT]) {
        pressedDir = pressedMapping[RIGHT] ? 1 : -1;
      }

      entity.velo.x = entityDir * ROLL_BASE_SPEED + pressedDir * ROLL_INFLUENCE_SPEED;
    } else if (entity.isCrouch) {
      if (entity.isGrounded) {
        if (pressedMapping[LEFT] ^ pressedMapping[RIGHT]) {
          entity.isRight = pressedMapping[RIGHT];
          entity.isRoll = true;
        }
        entity.velo.x *= 0.95;
        entity.velo.x *= 0.5;

        if (pressedMapping[UP]) {
          entity.velo.y = -15;
        }
      } else {
        if (pressedMapping[LEFT] ^ pressedMapping[RIGHT]) {
          let dir = pressedMapping[LEFT] ? -1 : 1;
          entity.velo.x += dir * CROUCH_AIR_DI;
        }
        entity.velo.x *= 0.95;
      }
    } else {
      if (pressedMapping[LEFT] ^ pressedMapping[RIGHT]) {
        let dir = pressedMapping[LEFT] ? -1 : 1;
        entity.velo.x += dir * SPEED;
      }
      entity.velo.x *= 0.8;

      if (pressedMapping[UP]) {
        if (entity.isGrounded) {
          entity.velo.y = -15;
        }
      }
    }


    if (entity.velo.y > 0 && pressedMapping[DOWN]) {
      entity.faseFall = true;
      entity.velo.y += 2 * FAST_GRAVITY;
    }

    if (entity.fastFall) {
      entity.velo.y += FAST_GRAVITY;
    } else {
      entity.velo.y += GRAVITY;
    }

    if (entity.velo.y < 1) {
      entity.velo.y *= 0.96;
    }

    let newState = entity.state;

    if (newState != oldState) {
      entity.resetAnimation();
    }
  }

  constructor(entity, pressedMapping) {
    this.entity = entity;
    this.pressedMapping = pressedMapping;
  }

  apply() {
    ApplyKeypress.apply(this.entity, this.pressedMapping);
  }
}
