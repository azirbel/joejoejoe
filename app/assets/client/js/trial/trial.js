import IntervalTimer from 'js/common/interval-timer'

const FPS = 60;
const MS_PER_FRAME = 1000/FPS;

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.timer = new IntervalTimer(MS_PER_FRAME, this.newFrame);
    this.timer.start();

    this.draw();
  }

  newFrame() {
    console.log('new frame');
  }

  draw() {
    this.context.moveTo(100, 100);
    this.context.lineTo(200, 100);
    this.context.stroke();
  }
};
