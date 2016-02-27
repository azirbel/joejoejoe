let getCurrentMs = () => {
    return new Date().getTime();
};

export default class {
  constructor(interval, func) {
    this.interval = interval;
    this.func = func;
    this.currentTime = getCurrentMs();

    this.isPlaying = false;
    this.shouldStop = true;
  }

  start() {
    this.shouldStop  = false;

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.doInterval();
    }
  }

  stop() {
    if (this.isPlaying) {
      this.shouldStop = true;
    }
  }

  doInterval() {
    if (this.shouldStop) {
      this.shouldStop = false;
      this.isPlaying = true;
      return;
    }

    this.func();

    //TODO - handle this more precisely
    setInterval(this.func, this.interval);
  }
}
