export default class {
  constructor() {
    this.ticks = 0;
  }

  addTick() {
    this.ticks++;
  }

  isOnInterval(interval, start = 0) {
    let adjustedTicks = this.ticks - start;
    return adjustedTicks >= 0 && adjustedTicks % interval === 0;
  }
}
