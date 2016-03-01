import Tile from 'js/trial/tile'

let xToTile = (x) => {
  return Math.floor(x / Tile.WIDTH);
}

let yToTile = (y) => {
  return Math.floor(y / Tile.HEIGHT);
}

let calcNextXBound = (xTile, isPos) => {
  return Tile.WIDTH * (xTile + (isPos ? 1 : 0));
}

let calcNextYBound = (yTile, isPos) => {
  return Tile.HEIGHT * (yTile + (isPos ? 1 : 0));
}

let calcTValue = (start, vec, goal) => {
  return (goal - start) / vec;
}

export default class {
  constructor(character, stage) {
    this.character = character;
    this.stage = stage;
  }

  apply() {
    let xPositive = this.character.velo.x >= 0;
    let yPositive = this.character.velo.y >= 0;
    let xDir = xPositive ? 1 : -1;
    let yDir = yPositive ? 1 : -1;

    let boundCorner = this.character.getBound(xPositive, yPositive);
    let opposite = this.character.getBound(!xPositive, !yPositive);

    let curXTile = xToTile(boundCorner.x);
    let curYTile = yToTile(boundCorner.y);

    let nextXBound = calcNextXBound(curXTile, xPositive);
    let nextYBound = calcNextYBound(curYTile, yPositive);

    while (true) {
      let xt = calcTValue(this.character.pos.x, this.character.velo.x, nextXBound);
      let yt = calcTValue(this.character.pos.y, this.character.velo.y, nextYBound);

      if (xt > 1 && yt > 1) {
        break;
      } else if (yt < xt) {
        curYTile += yDir;
        nextYBound += yDir;

        // Check entire row
        let oppositeX = opposite.x + yt * this.character.velo.x;
        let oppositeXTile = xToTile(oppositeX);

        for (let xTile = oppositeXTile; xTile != curXTile + xDir; xTile += xDir) {
          if (this.stage.tiles[xTile][curYTile] === Tile.wallTile) {
            this.character.velo.y = 0;
          }
        }
      } else {
        curXTile += xDir;
        nextXBound += xDir;
      }
    }

    this.character.pos.addM(this.character.velo);
  }
}
