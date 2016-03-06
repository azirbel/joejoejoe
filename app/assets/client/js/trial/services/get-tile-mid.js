import Tile from 'js/trial/tile';
import Vector from 'js/common/vector';

export default function getTileMid(x, y) {
  return new Vector((x + 0.5) * Tile.WIDTH, (y + 0.5) * Tile.HEIGHT);
}

