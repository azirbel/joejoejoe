import _ from 'lodash';

import Character from 'js/trial/character';

import { KEY_W, KEY_A, KEY_S, KEY_D } from 'js/common/key-codes';
import { xToTile, yToTile } from 'js/trial/services/pos-to-tile';

const UP = KEY_W;
const LEFT = KEY_A;
const DOWN = KEY_S;
const RIGHT = KEY_D;

const RUN_SPEED = 1.4;
const CROUCH_AIR_DI = 0.4;
const ROLL_BASE_SPEED = 3;
const ROLL_INFLUENCE_SPEED = 1.5;

const GRAVITY = 0.2;
const FAST_GRAVITY = 0.4;

export default class ApplyKeypress {
  static apply(entity, keys, stage) {
    let preAdvanceState = entity.state;
    entity.advance();
    let preApplyState = entity.state;

    if (keys.isDown(DOWN)) {
      entity.isCrouch = true;
    } else if (preApplyState === 'CROUCH') {
      let testYTile = yToTile(entity.pos.y + Character.TALL_BOUNDS[2]);
      let xPositions = [
        entity.pos.x + Character.TALL_BOUNDS[0],
        entity.pos.x + Character.TALL_BOUNDS[1] - 1e-10
      ];
      let canStand = _.chain(xPositions)
        .map(xToTile)
        .uniq()
        .every((xTile) => !stage.isWall(xTile, testYTile))
        .value();
      if (canStand) {
        entity.isCrouch = false;
      }
    }

    let isSide = keys.isDown(LEFT) != keys.isDown(RIGHT);
    let isRight = keys.isDown(RIGHT);
    let downDir = isSide ? (isRight ? 1 : -1) : 0;

    let entityDir = entity.isRight ? 1 : -1;

    if (entity.isRoll) {
      entity.velo.x = entityDir * ROLL_BASE_SPEED + downDir * ROLL_INFLUENCE_SPEED;
    } else if (entity.isCrouch) {
      if (entity.isGrounded) {
        if (isSide) {
          entity.isRight = isRight;
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
      if (isSide) {
        entity.velo.x += downDir * RUN_SPEED;
        entity.isRight = isRight;
        entity.isRunning = true;
      } else {
        entity.isRunning = false;
      }
      entity.velo.x *= 0.8;

      let jumpPressed = keys.isPressed(UP) || keys.isDown(UP) && preAdvanceState === 'ROLL';
      if (jumpPressed && entity.isGrounded) {
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

    if (entity.state != preApplyState) {
      entity.resetAnimation();
    }
  }

  constructor(entity, keyManager, stage) {
    this.entity = entity;
    this.keyManager = keyManager;
    this.stage = stage;
  }

  apply() {
    ApplyKeypress.apply(this.entity, this.keyManager, this.stage);
  }
}
