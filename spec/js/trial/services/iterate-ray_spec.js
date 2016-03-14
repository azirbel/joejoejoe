import Vector from 'js/common/vector';
import { iterateRay } from 'js/trial/services/cast-ray'

describe('iterateRay', () => {
  it('cancels after return true', () => {
    let start = new Vector(40.5, 40.5);
    let dir = new Vector(0.4, 0.4);
    let callback = (xt, yt, isX) => {
      return true;
    };
    let spy = sinon.spy(callback);

    iterateRay(start, dir, spy);
    expect(spy.calledOnce).to.equal(true);
  });

  it('simple case go right', () => {
    let iterNum = 0;
    let start = new Vector(48, 40.5);
    let dir = new Vector(12.8, 0);
    let calledCount = 0;
    let callback = (t, isX, curXTile, curYTile) => {
      expect(isX).to.equal(true);
      expect(t).to.equal(1.25 + calledCount * 2.5);
      expect(curXTile).to.equal(2 + calledCount);
      expect(curYTile).to.equal(1);
      calledCount++;
      if (calledCount >= 5) {
        return true;
      }
    };
    iterateRay(start, dir, callback);

    expect(calledCount).to.equal(5);
  });

  it('simple case go down', () => {
    let iterNum = 0;
    let start = new Vector(48, 48);
    let dir = new Vector(0, 12.8);
    let calledCount = 0;
    let callback = (t, isX, curXTile, curYTile) => {
      expect(isX).to.equal(false);
      expect(t).to.equal(1.25 + calledCount * 2.5);
      expect(curXTile).to.equal(1);
      expect(curYTile).to.equal(2 + calledCount);
      calledCount++;
      if (calledCount >= 5) {
        return true;
      }
    };
    iterateRay(start, dir, callback);

    expect(calledCount).to.equal(5);
  });

  it('diagonal', () => {
    let iterNum = 0;
    let start = new Vector(48, 40);
    let dir = new Vector(12.8, 12.8);
    let calledCount = 0;
    let callback = (t, isX, curXTile, curYTile) => {
      expect(isX).to.equal(calledCount % 2 == 0);
      expect(curXTile).to.equal(2 + Math.floor(calledCount / 2));
      expect(curYTile).to.equal(1 + Math.floor((calledCount + 1) / 2));
      if (isX) {
        expect(t).to.equal(1.25 + calledCount / 2 * 2.5);
      } else {
        expect(t).to.equal(1.875 + (calledCount - 1) / 2 * 2.5);
      }
      calledCount++;
      if (calledCount >= 10) {
        return true;
      }
    };
    iterateRay(start, dir, callback);

    expect(calledCount).to.equal(10);
  });
});
