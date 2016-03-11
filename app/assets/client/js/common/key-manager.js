export default class KeyManager {
  constructor() {
    this.downMap = {};
    this.pressed = new Set();
  }

  pressKey(key) {
    this.downMap[key] = true;
    this.pressed.add(key);
  }

  releaseKey(key) {
    this.downMap[key] = false;
  }

  clearState() {
    this.downMap = {};
    this.pressed.clear();
  }

  newFrame() {
    this.pressed.clear();
  }

  isDown(key) {
    return !!this.downMap[key];
  }

  isPressed(key) {
    return this.pressed.has(key);
  }
}
