require('kane.js');

var SpriteInterface = {};

Kane.Sprite = function (settings) {
  var validImage = settings.image instanceof Image;

  this.sx = 0;
  this.sy = 0;
  this.w = 0;
  this.h = 0;

  if (!validImage) {
    throw new Error('no valid image provided to constructor!');
  };

  _.extend(this, settings);
};

Kane.Sprite.prototype = Object.create(SpriteInterface);
