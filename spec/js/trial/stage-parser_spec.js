import StageParser from 'js/trial/stage-parser'
import Tile from 'js/trial/tile'

describe('StageParser', () => {
  describe('parseLine', () => {
    it('parsesLine', () => {
      let line = 'xoooooooooooooooooox';
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
      expect(result[15]).to.equal(Tile.backTile);
      expect(result[16]).to.equal(Tile.backTile);
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
  });
});
