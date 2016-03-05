export default class {
  constructor() {
    this.ticks = 0;
  }

  addTick() {
    this.ticks++;
  }

  isOnRepeat(interval) {
    return this.ticks % interval === 0;
  }
}
