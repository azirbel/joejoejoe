export default class KeepState {
  static apply(character) {
    character.oldState = {
      isRight: character.isRight,
      isGrounded: character.isGrounded,
      isFastfall: character.isFastfall,
      isCrouch: character.isCrouch,
      isRoll: character.isRoll,
      isRunning: character.isRunning,
      state: character.state
    };
  }

  constructor(character) {
    this.character = character;
  }

  apply() {
    KeepState.apply(this.character);
  }
}
