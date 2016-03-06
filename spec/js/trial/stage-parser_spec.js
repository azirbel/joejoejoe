import StageParser from 'js/trial/stage-parser'
import Tile from 'js/trial/tile'

describe('StageParser', () => {
  describe('parseEntities', () => {
    it('expected behaviour, terminated by EOF', () => {
      let input =
        'turret:\n' +
        '  x: 4\n'  +
        '  y: 6\n'  +
        '\n'        +
        'lazer:\n' +
        '  x: 6\n'  +
        '  y: 7\n'  +
        '\n'

      let entities = StageParser.parseEntities(input, 0);

      let expected = [
      { type: 'turret', properties: { x: '4', y: '6' }},
      { type: 'lazer', properties: { x: '6', y: '7' }}
      ];

      expect(entities).to.eql(expected);
    });
  });

  describe('parseEntity', () => {
    it('expected behaviour, terminated by EOF', () => {
      let input =
        'turret:\n' +
        '  x: 4\n'  +
        '  y: 6';

      let [entity, index] = StageParser.parseEntity(input, 0);

      expect(entity).to.eql({ type: 'turret', properties: { x: '4', y: '6' }});
      expect(index).to.equal(input.length);
    });

    it('expected behaviour, terminated by newline', () => {
      let input =
        'turret:\n' +
        '  x: 4\n'  +
        '  y: 6\n' +
        '\n\n\n';

      let [entity, index] = StageParser.parseEntity(input, 0);

      expect(entity).to.eql({ type: 'turret', properties: { x: '4', y: '6' }});
      expect(index).to.equal(22);
    });

    it('expected behavour - whitespace after type', () => {
      let input =
        'turret: \n' +
        '  x: 4\n';

      let [entity, index] = StageParser.parseEntity(input, 0);

      expect(entity).to.eql({ type: 'turret', properties: { x: '4' }});
      expect(index).to.equal(input.length);
    });

    it('error - characters after type', () => {
      let input =
        'turret: asdf\n' +
        '  x: 4\n';

      let testFn = () => StageParser.parseEntity(input, 0);

      expect(testFn).to.throw(/must be followed by a newline/);
    });
  });

  describe('parseProperties', () => {
    it('expected behaviour, terminated by EOF', () => {
      let input =
        '  x: 4\n' +
        '  y: 6'

        let [properties, index] = StageParser.parseProperties(input, 0);

      expect(properties).to.eql({ x: '4', y: '6' });
      expect(index).to.equal(13);
    });

    it('expected behaviour, terminated by new property', () => {
      let input =
        '  x: 5\n' +
        '  y: 7 \n' +
        'newthing:';

      let [properties, index] = StageParser.parseProperties(input, 0);

      expect(properties).to.eql({ x: '5', y: '7' });
      expect(index).to.equal(15);
    });

    it('expected behaviour, terminated by newline', () => {
      let input =
        '  x: 5\n' +
        '  y: 7 \n' +
        '\n\n\n';

      let [properties, index] = StageParser.parseProperties(input, 0);

      expect(properties).to.eql({ x: '5', y: '7' });
      expect(index).to.equal(15);
    });

    it('error on empty property', () => {
      let input =
        '  x: 5\n' +
        '  y: \n' +
        'newthing:';

      let testFn = () => StageParser.parseProperties(input, 0);

      expect(testFn).to.throw(/not be empty/);
    });

    it('error on duplicate property', () => {
      let input =
        '  x: 5\n' +
        '  x: 6\n' +
        'newthing:';

      let testFn = () => StageParser.parseProperties(input, 0);

      expect(testFn).to.throw(/appears twice: x/);
    });
  });

  describe('parseName', () => {
    it('expected behaviour, terminated by EOF', () => {
      let input = 'myName:';
      let [name, index] = StageParser.parseName(input, 0);
      expect(name).to.equal('myName');
      expect(index).to.equal(7);
    });

    it('expected behaviour, terminated by space', () => {
      let input = 'name: ';
      let [name, index] = StageParser.parseName(input, 0);
      expect(name).to.equal('name');
      expect(index).to.equal(5);
    });

    it('set start index', () => {
      let input = '\n\n  speed:  ';
      let [name, index] = StageParser.parseName(input, 4);

      expect(name).to.equal('speed');
      expect(index).to.equal(10);
    });

    it('unterminated name', () => {
      let input = 'foreverandever';
      let testFn = () => StageParser.parseName(input, 0);

      expect(testFn).to.throw(/end of input/);
    });

    it('invalid character', () => {
      let input = 'property-name:';
      let testFn = () => StageParser.parseName(input, 0);

      expect(testFn).to.throw(/Unexpected character/);
    });
  });

  describe('parseTiles', () => {
    it('parsesLine', () => {
      let input =
        'x              xx  x\n' +
        'x                  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        'x              xx  x\n' +
        '                    \n' +
        'xxxxxxxxxxxxxxxxxxxx';

      let result = StageParser.parseTiles(input);

      expect(result.length).to.equal(20);

      for (let col = 0; col < 20; col++) {
        expect(result[col][18]).to.equal(Tile.backTile);
      }
      for (let col = 0; col < 20; col++) {
        expect(result[col][19]).to.equal(Tile.wallTile);
      }
    });

    it('handles exception', () => {
      let input =
        'x              xx  x\n' +
        'x      r           x\n' +
        'x              xx  x\n';

      let testFn = () => StageParser.parseTiles(input);

      expect(testFn).to.throw(/On row 1/);
    });
  });

  describe('parseLine', () => {
    it('works', () => {
      let line = 'x              xx  x';
      let result = StageParser.parseLine(line, 0);

      expect(result.length).to.equal(20);

      expect(result[0]).to.equal(Tile.wallTile);
      expect(result[1]).to.equal(Tile.backTile);
      expect(result[2]).to.equal(Tile.backTile);
      expect(result[3]).to.equal(Tile.backTile);
      expect(result[4]).to.equal(Tile.backTile);
      expect(result[5]).to.equal(Tile.backTile);
      expect(result[6]).to.equal(Tile.backTile);
      expect(result[7]).to.equal(Tile.backTile);
      expect(result[8]).to.equal(Tile.backTile);
      expect(result[9]).to.equal(Tile.backTile);
      expect(result[10]).to.equal(Tile.backTile);
      expect(result[11]).to.equal(Tile.backTile);
      expect(result[12]).to.equal(Tile.backTile);
      expect(result[13]).to.equal(Tile.backTile);
      expect(result[14]).to.equal(Tile.backTile);
      expect(result[15]).to.equal(Tile.wallTile);
      expect(result[16]).to.equal(Tile.wallTile);
      expect(result[17]).to.equal(Tile.backTile);
      expect(result[18]).to.equal(Tile.backTile);
      expect(result[19]).to.equal(Tile.wallTile);
    });

    it('error on no index', () => {
      let line = 'xxxxxxxxxxxxxxxx';

      let testFn = () => {
        let result = StageParser.parseLine(line);
      };

      expect(testFn).to.throw(/supply an integer index/);
    });

    it('error on negative index', () => {
      let line = 'xxxxxxxxxxxxxxxx';

      let testFn = () => {
        let result = StageParser.parseLine(line, -1);
      };

      expect(testFn).to.throw(/must be >= 0/);
    });

    it('error on too short input', () => {
      let line = 'xxxx';

      let testFn = () => {
        let result = StageParser.parseLine(line, 0);
      };

      expect(testFn).to.throw(/characters long but was 4/);
    });

    it('error on index too large', () => {
      let line = 'x                  x';

      let testFn = () => {
        let result = StageParser.parseLine(line, 1);
      };

      expect(testFn).to.throw(/characters long but was 19/);
    });

    it('error invalid char', () => {
      let line = 'x      r           x';

      let testFn = () => {
        let result = StageParser.parseLine(line, 0);
      };

      expect(testFn).to.throw(/Invalid character/);
    });
  });
});
