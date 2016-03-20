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

    this.callbacks = {
      onExit: () => {
        this.currentStageIdx = (this.currentStageIdx + 1) % stageNames.length;

        this.nextGame();
      }
    };

    this.nextGame();
  }

  nextGame() {
    let stageName = stageNames[this.currentStageIdx];

    this.inGame = new InGame(this.context, this.keyManager, stageName, this.callbacks);
  }

  update() {
    this.inGame.update();
  }

  draw() {
    this.inGame.draw();
  }
}
