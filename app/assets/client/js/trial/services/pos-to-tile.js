import Tile from 'js/trial/tile';

export default class PosToTile { }

export let xToTile = PosToTile.xToTile = (x) => {
  return Math.floor(x / Tile.WIDTH);
};

export let yToTile = PosToTile.yToTile = (y) => {
  return Math.floor(y / Tile.HEIGHT);
};
