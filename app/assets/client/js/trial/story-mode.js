import InGame from 'js/trial/in-game';

const stageNames = [
  1,
  2,
  3
];

export default class StoryMode {
  constructor(context, keyManager) {
    this.context = context;
    this.keyManager = keyManager;
    this.currentStageIdx = 0;

    this.nextGame();
  }

  nextGame() {
    let stageName = stageNames[this.currentStageIdx];
    this.inGame = new InGame(this.context, this.keyManager, stageName);
  }

  update() {
    this.inGame.update();
  }

  draw() {
    this.inGame.draw();
  }
}
