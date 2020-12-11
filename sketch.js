var player;
var enemy;
var enemyGroup;
var virus;
var shoot;
var bullet;
var obs1;
var obs2;
var obs3;
var obs4;
var obs5;
var obs6;
var enemyobs;
var enemyobs2;
var enemyobs3;
var enemyobs4;
var bulletcount = 0
var bulletGroup;
var gameState = "play"
var gameover;
var gameoverimg;
var lvl = 1;

function preload(){
gameoverimg = loadImage("gameover.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createSprite(width/2, height/2, 10, 10)
  enemy = createSprite(width/2-100, height/2, 10, 10)
  enemy.velocityY = -1;
  enemyobs = createSprite(width/2-100, height/2-150, 5, 5)
  enemyobs.visible = false;
  enemyobs2 = createSprite(width/2-200, height/2-150, 5, 5)
  enemyobs2.visible = false;
  enemyobs3 = createSprite(width/2-200, height/2-50, 5, 5)
  enemyobs3.visible = false;
  enemyobs4 = createSprite(width/2-100, height/2-50, 5, 5)
  enemyobs4.visible = false;
  virus = createSprite(width/2+100, height/2, 10, 10)
  shoot = createButton("Shoot")
  shoot.position(width/2+300, height/2+200)
  obs1 = createSprite(width/2+400, height/2+100, 30, 25)
  obs2 = createSprite(width/2+300, height/2-100, 20, 35)
  obs3 = createSprite(width/2-300, height/2+200, 25, 30)
  obs4 = createSprite(width/2-400, height/2-200, 30, 30)
  obs5 = createSprite(width/2-300, height/2, 20, 15)
  gameover = createSprite(width/2-50, height/2, 10, 10)
  gameover.addImage(gameoverimg);
  gameover.visible = false;

  bulletGroup = new Group()
  enemyGroup = new Group()
  enemyGroup.add(enemy)

  player.shapeColor = "blue"
  enemy.shapeColor = "black"
  virus.shapeColor = "lime"
}

function draw() {
  background(255,255,255);  

  if (gameState === "play"){
  if (keyDown("w")){
    player.y = player.y-2
  }

  if (keyDown("s")){
    player.y = player.y+2
  }

  if (keyDown("a")){
    player.x = player.x-2
  }

  if (keyDown("d")){
    player.x = player.x+2
  }  

  shoot.mousePressed(()=>{
    bullet = createSprite(player.x, player.y, 15, 5)
    bulletGroup.add(bullet)
    bullet.shapeColor = "red"
    bullet.velocityX = -2
    bulletcount = bulletcount+1
  });

  if (bulletGroup.isTouching(enemy)){
    enemy.destroy()
    bulletGroup.destroyEach()
  }

  if (bulletcount === 3){
    shoot.hide()
  }

    if (player.isTouching(enemy) || player.isTouching(virus)){
      enemy.velocityX = 0;
      enemy.velocityY = 0;    
      player.destroy()
      virus.destroy()
      enemy.destroy()
      obs1.destroy()
      obs2.destroy()
      obs3.destroy()
      obs4.destroy()
      obs5.destroy()
      shoot.hide()
      gameState = "end"
    }

    if (lvl === 1){
    if (bulletGroup.isTouching(virus)){
      enemy.velocityX = 0
      enemy.velocityY = 0 
      virus.destroy()
      bulletGroup.destroyEach()
      enemy.destroy()
      obs1.destroy()
      obs2.destroy()
      obs3.destroy()
      obs4.destroy()
      obs5.destroy()
      shoot.hide()
      lvl = 2;
    }
  }

  if (lvl === 2){
    textSize(25)
    fill("yellow")
    text("YOU PASSED LEVEL 1", width/2-50, height/2)
  }

    if (enemy.isTouching(enemyobs)){
      enemy.velocityX = -2
      enemy.velocityY = 0;
    }

    if (enemy.isTouching(enemyobs2)){
      enemy.velocityY = 2;
      enemy.velocityX = 0;
    }

    if (enemy.isTouching(enemyobs3)){
      enemy.velocityX = 2;
      enemy.velocityY = 0;
    }

    if (enemy.isTouching(enemyobs4)){
      enemy.velocityY = -2
      enemy.velocityX = 0
    }
  }
  else if (gameState === "end"){
   gameover.visible = true;
  }
  drawSprites()
}