import Tile from 'js/trial/tile';
import { xToTile, yToTile } from 'js/trial/services/pos-to-tile';

let calcNextXBound = (xTile, isPos) => {
  return Tile.WIDTH * (xTile + (isPos ? 1 : 0));
};

let calcNextYBound = (yTile, isPos) => {
  return Tile.HEIGHT * (yTile + (isPos ? 1 : 0));
};

let calcTValue = (start, vec, goal) => {
  let result = ((goal - start) / vec) || Infinity;
  return result >= 0 ? result : Infinity;
};

export let iterateRay = (start, dir, callback) => {
  let xPositive = dir.x >= 0;
  let yPositive = dir.y >= 0;
  let xDir = xPositive ? 1 : -1;
  let yDir = yPositive ? 1 : -1;

  let curXTile = xToTile(start.x);
  let curYTile = yToTile(start.y);

  let nextXBound = calcNextXBound(curXTile, xPositive);
  let nextYBound = calcNextYBound(curYTile, yPositive);

  for (;;) {
    let xt = calcTValue(start.x, dir.x, nextXBound);
    let yt = calcTValue(start.y, dir.y, nextYBound);

    if (xt === Infinity && yt === Infinity) {
      break;
    } else if (xt < yt) {
      nextXBound += Tile.HEIGHT * xDir;
      curXTile += xDir;
      if (callback(xt, true, curXTile, curYTile)) {
        break;
      }
    } else {
      nextYBound += Tile.HEIGHT * yDir;
      curYTile += yDir;
      if (callback(yt, false, curXTile, curYTile)) {
        break;
      }
    }
  }
};

export let getRayCollision = (start, dir, stage) => {
  let result = null;
  iterateRay(start, dir, (t, isX, curXTile, curYTile) => {
    if (stage.isWall(curXTile, curYTile)) {
      result = start.add(dir.mult(t));
      return true;
    }
  });

  return result;
};
