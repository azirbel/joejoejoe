import _ from 'lodash';

import Stage from 'js/trial/stage';
import Tile from 'js/trial/tile';
import Turret from 'js/trial/turret';
import Vector from 'js/common/vector';

const ERR_SHORT_ROW = 'Row must be ' + Stage.WIDTH + ' characters long but was ';
const ERR_INTEGER_INDEX = 'Must supply an integer index';
const ERR_POSITIVE_INDEX = 'Index must be >= 0';
const ERR_INVALID_CHAR = 'Invalid character: ';
const ERR_UNEXPECTED_END = 'Unexpected end of input.';
const ERR_INVALID_WORD_CHAR = 'Unexpected character encountered in word: ';
const ERR_EXPECTED_PROPERY_NAME = 'Expected newline or property name, but got: ';
const ERR_EMPTY_NAME = 'Name must not be empty';
const ERR_ENTITY_NEWLINE = 'Entity tags must be followed by a newline';
const ERR_EMPTY_PROPERTY = 'Property must not be empty';
const ERR_DUPLICATE_PROPERTY = 'Property appears twice: ';
const ERR_UNKNOWN_ENTITY_TYPE = 'Unknown entity type: ';
const ERR_MISSING_PROPERTIES = 'Missing required properties: ';
const ERR_EXTRA_PROPERTIES = 'Unknown properties: ';
const ERR_DUPLICATE_SPAWN = 'Multiple spawn positions';
const ERR_MISSING_SPAWN = 'Missing spawn position';

const WORD_CHAR_REGEX = /\w/;
const WORD_END_REGEX = /:/;
const WHITESPACE_CHAR_REGEX = /[ \t]/;

const TYPE_MAP = {
  turret: Turret
};

export default class StageParser {
  static get tileMap() {
    if (this._tileMap === undefined) {
      this._tileMap = {
        'x': Tile.wallTile,
        ' ': Tile.backTile,
        's': Tile.startTile
      };
    }

    return this._tileMap;
  }

  static parse(input) {
    let tiles = StageParser.parseTiles(input);

    let spawn = null;
    _.each(tiles, (col, x) => {
      _.each(col, (tile, y) => {
        if (tile === Tile.startTile) {
          if (spawn !== null) {
            throw ERR_DUPLICATE_SPAWN;
          }
          spawn = new Vector(x, y);
        }
      });
    });

    if (spawn === null) {
      throw ERR_MISSING_SPAWN;
    }

    let entitiesIndex = Stage.HEIGHT * (Stage.WIDTH + 1);
    let entityProperties = StageParser.parseEntities(input, entitiesIndex);
    let entities = StageParser.transformEntities(entityProperties);

    return new Stage(tiles, entities, spawn);
  }

  static transformEntities(entities) {
    return _.map(entities, StageParser.transformEntity);
  }

  static transformEntity(entity) {
    let Type = TYPE_MAP[entity.type];
    if (Type) {
      let REQUIRED_PROPERTIES = Type.REQUIRED_PROPERTIES;
      let DEFAULT_PROPERTIES = Type.DEFAULT_PROPERTIES;

      let properties = entity.properties;
      let givenKeys = _.keys(properties);

      let missingKeys = _.difference(_.keys(REQUIRED_PROPERTIES), givenKeys);
      if (missingKeys.length > 0) {
        throw ERR_MISSING_PROPERTIES + missingKeys.join(', ');
      }

      let ALL_KEYS = _.concat(_.keys(DEFAULT_PROPERTIES), _.keys(REQUIRED_PROPERTIES));
      let extraKeys = _.difference(givenKeys, ALL_KEYS);
      if (extraKeys.length > 0) {
        throw ERR_EXTRA_PROPERTIES + extraKeys.join(', ');
      }

      let defaultValues = _.mapValues(DEFAULT_PROPERTIES, (value) => {
        return value[1];
      });
      let defaultFuncs = _.mapValues(DEFAULT_PROPERTIES, (value) => {
        return value[0];
      });

      properties = _.mapValues(properties, (value, key) => {
        if (key in REQUIRED_PROPERTIES) {
          return REQUIRED_PROPERTIES[key](value);
        } else {
          return defaultFuncs[key](value);
        }
      });

      return new Type(_.assign(defaultValues, properties));
    } else {
      throw ERR_UNKNOWN_ENTITY_TYPE + entity.type;
    }
  }

  static parseEntities(input, index) {
    let entities = [];

    while (index < input.length) {
      let curChar = input.charAt(index);
      if (curChar === '\n') {
        index++;
      } else if (WORD_CHAR_REGEX.test(curChar)) {
        let [entity, newIndex] = StageParser.parseEntity(input, index);
        entities.push(entity);
        index = newIndex;
      } else {
        throw ERR_EXPECTED_PROPERY_NAME;
      }
    }

    return entities;
  }

  static parseEntity(input, index) {
    let [typeName, propIndex] = StageParser.parseName(input, index);
    index = StageParser.skipWhitespace(input, propIndex);
    if (input.charAt(index) != '\n') {
      throw ERR_ENTITY_NEWLINE;
    }
    let [props, endIndex] = StageParser.parseProperties(input, index + 1);
    let entity = { type: typeName, properties: props };

    return [entity, endIndex];
  }

  static parseProperties(input, index) {
    let properties = {};

    for (;;) {
      if (index < input.length && WHITESPACE_CHAR_REGEX.test(input.charAt(index))) {
        index = StageParser.skipWhitespace(input, index);

        let [name, newIndex] = StageParser.parseName(input, index);
        index = newIndex;

        if (name in properties) {
          throw ERR_DUPLICATE_PROPERTY + name;
        }

        let val = '';
        for(;;) {
          if (index >= input.length) {
            break;
          }
          let newChar = input.charAt(index++);
          if (newChar === '\n') {
            break;
          }
          val += newChar;
        }
        val = val.trim();

        if (val === '') {
          throw ERR_EMPTY_PROPERTY;
        }

        properties[name] = val;
      } else {
        return [properties, index];
      }
    }
  }

  static skipWhitespace(input, index) {
    while (index < input.length && WHITESPACE_CHAR_REGEX.test(input.charAt(index))) {
      index++;
    }
    return index;
  }

  static parseName(input, index) {
    let name = '';

    for (;;index++) {
      if (index >= input.length) {
        throw ERR_UNEXPECTED_END;
      }

      let curChar = input.charAt(index);

      if (WORD_CHAR_REGEX.test(curChar)) {
        name += curChar;
      } else if (WORD_END_REGEX.test(curChar)) {
        if (name === '') {
          throw ERR_EMPTY_NAME;
        }

        return [name, index + 1];
      } else {
        throw ERR_INVALID_WORD_CHAR + curChar;
      }
    }
  }

  static parseTiles(input) {
    let rows = _.times(Stage.HEIGHT, (row) => {
      try {
        return StageParser.parseLine(input, row * (Stage.WIDTH + 1));
      } catch (err) {
        throw 'On row ' + row + ': ' + err;
      }
    });

    return _.times(Stage.WIDTH, (x) => {
      return _.times(Stage.HEIGHT, (y) => {
        return rows[y][x];
      });
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
