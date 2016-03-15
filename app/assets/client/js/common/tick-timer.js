export default class TickTimer {
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

  getTimeInCycle(interval, start = 0) {
    let adjustedTicks = this.ticks - start;
    if (adjustedTicks < 0) {
      return -1;
    }

    return adjustedTicks % interval;
  }
}
