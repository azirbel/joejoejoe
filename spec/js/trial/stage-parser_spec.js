import StageParser from 'js/trial/stage-parser'
import Tile from 'js/trial/tile'

describe('StageParser', () => {
  describe('parseTiles', () => {
    it('parsesLine', () => {
      let input =
        'xooooooooooooooxxoox\n' +
        'xoooooooooooooooooox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'xooooooooooooooxxoox\n' +
        'oooooooooooooooooooo\n' +
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
        'xooooooooooooooxxoox\n' +
        'xoooooorooooooooooox\n' +
        'xooooooooooooooxxoox\n';

      let testFn = () => StageParser.parseTiles(input);

      expect(testFn).to.throw(/On row 1/);
    });
  });

  describe('parseLine', () => {
    it('works', () => {
      let line = 'xooooooooooooooxxoox';
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
      let line = 'xoooooooooooooooooox';

      let testFn = () => {
        let result = StageParser.parseLine(line, 1);
      };

      expect(testFn).to.throw(/characters long but was 19/);
    });

    it('error invalid char', () => {
      let line = 'xoooooorooooooooooox';

      let testFn = () => {
        let result = StageParser.parseLine(line, 0);
      };

      expect(testFn).to.throw(/Invalid character/);
    });
  });
});
