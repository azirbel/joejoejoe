import Tile from 'js/trial/tile'
import Point from 'js/common/point'

const EPSILON = 0.01;

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

    let epsilonPoint = new Point(xDir, yDir).multM(EPSILON);

    let boundCorner = null;
    let opposite = null;

    let recalcBounds = () => {
      boundCorner = this.character.getBound(yPositive, yPositive);
      opposite = this.character.getBound(!xPositive, !yPositive);
    };
    recalcBounds();

    let deltaCorner = boundCorner.sub(epsilonPoint);

    let curXTile = xToTile(deltaCorner.x);
    let curYTile = yToTile(deltaCorner.y);

    let nextXBound = calcNextXBound(curXTile, xPositive);
    let nextYBound = calcNextYBound(curYTile, yPositive);

    while (true) {
      let xt = calcTValue(boundCorner.x, this.character.velo.x, nextXBound);
      let yt = calcTValue(boundCorner.y, this.character.velo.y, nextYBound);

      if (xt > 1 && yt > 1) {
        break;
      } else if (yt < xt) {
        curYTile += yDir;

        let oppositeX = opposite.x + yt * this.character.velo.x;
        let oppositeXTile = xToTile(oppositeX);

        for (let xTile = oppositeXTile; xTile != curXTile + xDir; xTile += xDir) {
          if (this.stage.tiles[xTile][curYTile] === Tile.wallTile) {
            this.character.pos.y += nextYBound - boundCorner.y;
            this.character.velo.y = 0;
            recalcBounds();
            break;
          }
        }

        nextYBound += Tile.HEIGHT * yDir;
      } else {
        curXTile += xDir;

        let oppositeY = opposite.y + xt * this.character.velo.y;
        let oppositeYTile = yToTile(oppositeY);

        for (let yTile = oppositeYTile; yTile != curYTile + yDir; yTile += yDir) {
          if (this.stage.tiles[yTile][curXTile] === Tile.wallTile) {
            this.character.pos.x += nextXBound - boundCorner.x;
            this.character.velo.x = 0;
            recalcBounds();
            break;
          }
        }

        nextXBound += Tile.WIDTH * xDir;
      }
    }

    this.character.pos.addM(this.character.velo);
  }
}
