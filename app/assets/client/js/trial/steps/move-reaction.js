export default class MoveReaction {
  static apply(character) {
    if (!character.oldState.isGrounded && character.isGrounded) {
      character.isFastfall = false;
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
