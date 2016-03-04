import Vector from 'js/common/vector'

describe('vector', () => {
  describe('constructor', () => {
    it('', () => {
      let newVect = new Vector(1, 2);
      expect(newVect.x).to.equal(1);
      expect(newVect.y).to.equal(2);
    });
  });

  describe('add', () => {
    it('const add', () => {
      let initVect = new Vector(1, 2);
      let addVect = new Vector(10, 20);
      let resultVect = initVect.add(addVect);

      expect(initVect.x).to.equal(1);
      expect(initVect.y).to.equal(2);

      expect(addVect.x).to.equal(10);
      expect(addVect.y).to.equal(20);

      expect(resultVect.x).to.equal(11);
      expect(resultVect.y).to.equal(22);
    });

    it('mutate add', () => {
      let initVect = new Vector(1, 2);
      let addVect = new Vector(10, 20);
      let resultVect = initVect.addM(addVect);

      expect(initVect.x).to.equal(11);
      expect(initVect.y).to.equal(22);

      expect(addVect.x).to.equal(10);
      expect(addVect.y).to.equal(20);

      expect(resultVect.x).to.equal(11);
      expect(resultVect.y).to.equal(22);

      expect(initVect).to.equal(resultVect);
    });
  });

  describe('sub', () => {
    it('const sub', () => {
      let initVect = new Vector(1, 2);
      let subVect = new Vector(10, 20);
      let resultVect = initVect.sub(subVect);

      expect(initVect.x).to.equal(1);
      expect(initVect.y).to.equal(2);

      expect(subVect.x).to.equal(10);
      expect(subVect.y).to.equal(20);

      expect(resultVect.x).to.equal(-9);
      expect(resultVect.y).to.equal(-18);
    });

    it('mutate sub', () => {
      let initVect = new Vector(1, 2);
      let subVect = new Vector(10, 20);
      let resultVect = initVect.subM(subVect);

      expect(initVect.x).to.equal(-9);
      expect(initVect.y).to.equal(-18);

      expect(subVect.x).to.equal(10);
      expect(subVect.y).to.equal(20);

      expect(resultVect.x).to.equal(-9);
      expect(resultVect.y).to.equal(-18);

      expect(initVect).to.equal(resultVect);
    });
  });

  describe('mult', () => {
    it('const mult', () => {
      let initVect = new Vector(2, 4);
      let resultVect = initVect.mult(3);

      expect(initVect.x).to.equal(2);
      expect(initVect.y).to.equal(4);

      expect(resultVect.x).to.equal(6);
      expect(resultVect.y).to.equal(12);
    });

    it('mutate mult', () => {
      let initVect = new Vector(2, 4);
      let resultVect = initVect.multM(3);

      expect(initVect.x).to.equal(6);
      expect(initVect.y).to.equal(12);

      expect(resultVect.x).to.equal(6);
      expect(resultVect.y).to.equal(12);

      expect(initVect).to.equal(resultVect);
    });
  });

  describe('neg', () => {
    it('const mult', () => {
      let initVect = new Vector(2, 4);
      let resultVect = initVect.neg();

      expect(initVect.x).to.equal(2);
      expect(initVect.y).to.equal(4);

      expect(resultVect.x).to.equal(-2);
      expect(resultVect.y).to.equal(-4);
    });

    it('neg mult', () => {
      let initVect = new Vector(2, 4);
      let resultVect = initVect.negM();

      expect(initVect.x).to.equal(-2);
      expect(initVect.y).to.equal(-4);

      expect(resultVect.x).to.equal(-2);
      expect(resultVect.y).to.equal(-4);

      expect(initVect).to.equal(resultVect);
    });
  });

  describe('copy', () => {
    it('copies', () => {
      let initVect = new Vector(2, 4);
      let copyVect = initVect.copy();

      expect(copyVect.x).to.equal(2);
      expect(copyVect.y).to.equal(4);

      copyVect.x = 1;
      copyVect.y = 3;

      expect(initVect.x).to.equal(2);
      expect(initVect.y).to.equal(4);

      expect(copyVect.x).to.equal(1);
      expect(copyVect.y).to.equal(3);
    });
  });

  describe('xy', () => {
    it('returns xy pair', () => {
      let initVect = new Vector(2, 4);
      let [x, y] = initVect.xy();

      expect(initVect.x).to.equal(2);
      expect(initVect.y).to.equal(4);

      expect(x).to.equal(2);
      expect(y).to.equal(4);
    });
  });
});
