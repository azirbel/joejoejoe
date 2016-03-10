export default class Animation {
  constructor(film) {
    this.film = film;
    this.reset();
  }

  reset() {
    this.currentFrame = 0;
    this.currentIndex = 0;
  }

  advance() {
    this.currentFrame++;
    if (this.currentFrame >= this.film[this.currentIndex][0]) {
      this.currentIndex++;
      this.currentFrame = 0;
    }
  }

  isOver() {
    return this.currentIndex >= this.film.length;
  }

  get image() {
    return this.film[this.currentIndex][1];
  }
}
