import { KEY_W, KEY_A, KEY_S, KEY_D } from 'js/common/key-codes';

const UP = KEY_W;
const LEFT = KEY_A;
const DOWN = KEY_S;
const RIGHT = KEY_D;

export default class MoveReaction {
  static apply(character, keys) {
    let oldState = character.state;

    let isSide = keys.isDown(LEFT) != keys.isDown(RIGHT);
    let isRight = keys.isDown(RIGHT);

    if (!character.oldState.isGrounded && character.isGrounded) {
      character.isFastfall = false;

      if (character.isCrouch && isSide) {
        character.isRoll = true;
        character.isRight = isRight;
      }
    }

    if (character.state != oldState) {
      character.resetAnimation();
    }
  }

  constructor(character, keyManager) {
    this.character = character;
    this.keyManager = keyManager;
  }

  apply() {
    MoveReaction.apply(this.character, this.keyManager);
  }
}