import _ from 'lodash';

import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';

const ERR_SHORT_ROW = 'Row must be ' + Stage.WIDTH + ' characters long but was ';
const ERR_INTEGER_INDEX = 'Must supply an integer index';
const ERR_POSITIVE_INDEX = 'Index must be >= 0';
const ERR_INVALID_CHAR = 'Invalid character: ';

export default class StageParser {
  static get tileMap() {
    if (this._tileMap === undefined) {
      this._tileMap = {
        x: Tile.wallTile,
        o: Tile.backTile
      };
    }

    return this._tileMap;
  }

  static parse(input) {
    return StageParser.parseLine(input);
  }

  static parseTiles(input) {
    return _.times(Stage.HEIGHT, (row) => {
      try {
        return StageParser.parseLine(input, row * (Stage.WIDTH + 1));
      } catch (err) {
        throw 'On row ' + row + ': ' + err;
      }
    });
  }

  static parseLine(input, index) {
    if (!_.isInteger(index)) {
      throw ERR_INTEGER_INDEX;
    }
    if (index < 0) {
      throw ERR_POSITIVE_INDEX;
    }

    let lengthFromIndex = input.length - index;
    if (lengthFromIndex < Stage.WIDTH) {
      throw ERR_SHORT_ROW + lengthFromIndex;
    }

    return _.times(Stage.WIDTH, (col) => {
      let curChar = input.charAt(index + col);
      let result = StageParser.tileMap[curChar];
      if (result === undefined) {
        throw ERR_INVALID_CHAR + curChar;
      }

      return result;
    });
  }
}
