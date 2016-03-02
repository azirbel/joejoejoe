export default class {
  constructor(interval, func) {
    this.interval = interval;
    this.func = func;
    this._intervalId = null;
  }

  start() {
    if (this._intervalId == null) {
      this._intervalId = setInterval(this.func, this.interval);
    }
  }

  stop() {
    if (this._intervalId != null) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }
}
