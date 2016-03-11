import { KEY_W, KEY_A, KEY_S, KEY_D } from 'js/common/key-codes';

const UP = KEY_W;
const LEFT = KEY_A;
const DOWN = KEY_S;
const RIGHT = KEY_D;

const SPEED = 1.4;
const CROUCH_AIR_DI = 0.4;
const ROLL_BASE_SPEED = 3.5;
const ROLL_INFLUENCE_SPEED = 1.0;

const GRAVITY = 0.2;
const FAST_GRAVITY = 0.4;

export default class ApplyKeypress {
  static apply(entity, keys) {
    entity.advance();

    let oldState = entity.state;

    if (keys.isDown(DOWN)) {
      entity.isCrouch = true;
    } else {
      entity.isCrouch = false;
    }

    let isSide = keys.isDown(LEFT) != keys.isDown(RIGHT);
    let isRight = keys.isDown(RIGHT);
    let downDir = isSide ? (isRight ? 1 : -1) : 0;

    let isSidePress = keys.isPressed(LEFT) != keys.isPressed(RIGHT);
    let isRightPress = keys.isPressed(RIGHT);

    let entityDir = entity.isRight ? 1 : -1;

    if (entity.isRoll) {
      entity.velo.x = entityDir * ROLL_BASE_SPEED + downDir * ROLL_INFLUENCE_SPEED;
    } else if (entity.isCrouch) {
      if (entity.isGrounded) {
        if (isSidePress) {
          entity.isRight = isRightPress;
          entity.isRoll = true;
        } else if (keys.isPressed(UP)) {
          entity.velo.y = -15;
        }

        entity.velo.x *= 0.95;
        entity.velo.x *= 0.5;
      } else {
        entity.velo.x += downDir * CROUCH_AIR_DI;
        entity.velo.x *= 0.95;
      }
    } else {
      entity.velo.x += downDir * SPEED;
      entity.velo.x *= 0.8;

      if (keys.isPressed(UP) && entity.isGrounded) {
        entity.velo.y = -15;
      }
    }

    if (entity.velo.y > 0 && keys.isDown(DOWN)) {
      entity.isFastfall = true;
      entity.velo.y += 2 * FAST_GRAVITY;
    }

    if (entity.isFastfall) {
      entity.velo.y += FAST_GRAVITY;
    } else {
      entity.velo.y += GRAVITY;
    }

    if (entity.velo.y < 1) {
      entity.velo.y *= 0.96;
    }

    if (entity.state != oldState) {
      entity.resetAnimation();
    }
  }

  constructor(entity, keyManager) {
    this.entity = entity;
    this.keyManager = keyManager;
  }

  apply() {
    ApplyKeypress.apply(this.entity, this.keyManager);
  }
}
