require('scene.js');
require('game/player.js');
require('game/tower.js');
require('game/bullet.js');

//define our 'ingame scene'
Test.Ingame = function (settings) {
  Kane.Scene.call(this, settings);
};

//again, we set the prototype to Kane.Scene's prototype
Test.Ingame.prototype = Object.create(Kane.Scene.prototype);

Test.Ingame.prototype.init = function (settings) {
  //setup an entityManager
  this.entityManager = new Kane.EntityManager({
    cache: this.cache
  });  
  this.gameBoard = new Kane.DrawPlane({
    board: $('#gameboard')
  });
  this.camera = new Kane.Camera({
    scene: this,
    gameBoard: this.gameBoard,
    h: document.height,
    w: document.width
  }); 
};

//Configure our hotkeys!
Test.Ingame.prototype.keydown = function (keyName) {
  var p = this.entityManager.player
    , speed = p.moveSpeed;

  switch (keyName) {
    case "left":
      p.dx = -speed;
      break;
    case "right":
      p.dx = speed;
      break;
    case "up":
      p.dy = -speed;
      break;
    case "down":
      p.dy = speed;
      break;
  }
};

//TODO: This must get fixed as this style of checking for event order is
//extremely hacky and brittle ...and bad
Test.Ingame.prototype.keyup = function (keyName) {
  var p = this.entityManager.player
    , speed = p.moveSpeed;

  switch (keyName) {
    case "left":
      p.dx = 0;
      break;
    case "right":
      p.dx = 0;
      break;
    case "up":
      p.dy = 0;
      break;
    case "down":
      p.dy = 0;
      break;
  }
};

Test.Ingame.prototype.onEnter = function () {
  console.log('game entered!');

  this.entityManager.player = 
    this.entityManager.spawn(
    Test.Player, 
    {
      x: 900,
      y: 100,
    }
  );

  for (var tcount = 0; tcount < 6; tcount++) {
    this.entityManager.spawn(
      Test.Tower, 
      {
        x: 100 + Math.random() * 100,
        y: 50 + tcount * 80,
      }
    );
  }
};

Test.Ingame.prototype.onExit = function () {
  //remove the player, towers, and bullets
  this.entityManager.findByType('player').kill(); 
  this.entityManager.findByType('tower').kill();
  this.entityManager.findByType('bullet').kill();
};

Test.Ingame.prototype.update = function (dT) {
  if (!dT) { 
    throw new Error('no dT provided to update'); 
  }

  this.entityManager.removeDead();
  this.entityManager.sortBy('zIndex'); 
  this.entityManager.updateAll(dT);  
  this.onUpdate(dT);
};

Test.Ingame.prototype.draw = function () {
  this.camera.draw();
  this.onDraw();
};

Test.Ingame.onUpdate = function (dT) {
  
};
