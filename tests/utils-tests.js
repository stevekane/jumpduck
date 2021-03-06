minispade.require('utils.js');

var assert = chai.assert;

describe("Kane.Utils", function () {
  it('should be an object of helper functions', function () {
    assert.isObject(Kane.Utils); 
  });

  describe("#camel", function () {
    it('shoud return the string in camelCase form', function () {
      var name = "PopCorn"
        , camelName;

      camelName = Kane.Utils.camel(name);
      assert.equal('popCorn', camelName);
    });
  });

  describe("#generateColor()", function () {
    it('should return a random valid hex number', function () {
      var randColor = Kane.Utils.generateColor();

      assert.match(randColor, /^#[0-9a-f]{6}$/i);
    });
  });
  
  describe("#validateColor()", function () {
    it('should return true if provided color is valid hex', function () {
      var threeDigitHex = '#333'
        , sixDigitHex = '#123abc';

      assert.isTrue(Kane.Utils.validateColor(threeDigitHex));
      assert.isTrue(Kane.Utils.validateColor(sixDigitHex));
    });

    it('should return false if the provided color is invalid hex', function () {
      var badHexColor = '#1hj234'
        , wrongLengthHexColor = '#1234';

      assert.isFalse(Kane.Utils.validateColor(badHexColor));
      assert.isFalse(Kane.Utils.validateColor(wrongLengthHexColor));
    });
  });

  describe("#stripExtension()", function () {
    it('return the filename with the file extension removed', function () {
      var imageName = "cat/in/hat.png"
        , jsonName = "moose/tracks.json"

      assert.equal(Kane.Utils.stripExtension(imageName), 'cat/in/hat');
      assert.equal(Kane.Utils.stripExtension(jsonName), 'moose/tracks');
    });
  });

  describe("#stripFilePath()", function () {
    it('should remove the filepath and return the filename.extension', function () {
      var filePath = '/one/dog/to/rule/them/all.png';

      assert.equal(Kane.Utils.stripFilePath(filePath), 'all.png');
    });
  });

  describe("#updatePosition()", function () {
    it('should return the new position', function () {
      var dT = 10
        , v = .01
        , oldPos = 0
        , expectedNewPos = oldPos + dT * v;
  
      assert.equal(Kane.Utils.updatePosition(dT, v, oldPos), expectedNewPos); 
    });
  });

  describe("#updateVelocity()", function () {
    it('should return the new position', function () {
      var dT = 10
        , a = .01
        , oldVel = 0
        , expectedNewVel = oldVel + dT * a;
  
      assert.equal(Kane.Utils.updateVelocity(dT, a, oldVel), expectedNewVel); 
    });
  });

  describe("#checkBBCollision()", function () {
    var b1 = {
      x: 0,
      y: 0,
      w: 10,
      h: 10
    } , b2 = {
      x: 2,
      y: 2,
      w: 5,
      h: 5 
    } , b3 = {
      x: 0,
      y: 0,
      w: 1,
      h: 1 
    };

    it('should return boolean', function () {
      assert.isBoolean(Kane.Utils.checkBBCollision(b1, b2));
    });

    it('should return true if they overlap', function () {
      assert.isTrue(Kane.Utils.checkBBCollision(b1, b2));
    });

    it('should return false if they overlap', function () {
      assert.isFalse(Kane.Utils.checkBBCollision(b2, b3));
    });
  });

  describe("#createCanvas()", function () {
    var h = 400
      , w = 600
      , name = "testCanvas";

    it('should return a jquery canvas element', function () {
      var newCan = Kane.Utils.createCanvas(w, h, name);

      assert.isObject(newCan);
      assert.equal(newCan.attr('height'), h);
      assert.equal(newCan.attr('width'), w);
      assert.equal(newCan.attr('id'), name);
    });
  });
});
