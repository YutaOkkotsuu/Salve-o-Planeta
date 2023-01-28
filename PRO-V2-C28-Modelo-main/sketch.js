const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1, board2;
var numberOfArrows = 10;
var tempo

var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/cidade_1.PNG");
}

function setup() {
  canvas = createCanvas(windowWidth -2, windowHeight -5);

  engine = Engine.create();
  world = engine.world;


  playerArcher = new PlayerArcher(windowWidth/1.87-30,windowHeight - 160,120,120);
  tempo = 100

}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  playerArcher.display();


  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

      //var board1Collision = Matter.SAT.collides(
        //board1.body,
        //playerArrows[i].body
      //);

      //var board2Collision = Matter.SAT.collides(
       // board2.body,
       // playerArrows[i].body
      //);


     // if (board1Collision.collided || board2Collision.collided) {
        //score += 5;
      //}

    
      var posX = playerArrows[i].body.position.x;
      var posY = playerArrows[i].body.position.y;

      if (posX > width || posY > height) {
        if (!playerArrows[i].isRemoved) {
          playerArrows[i].remove(i);
        } else {
          playerArrows[i].trajectory = [];
        }
      }
    }
  }
  tempo = tempo - second()


  // Título
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("ARQUEIRO ÉPICO", width / 2, 100);

  // Contagem de Tempo
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Tempo: " + tempo, width - 200, 130);


  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Pontuação: " + score, width - 200, 100);


  if (numberOfArrows == 0) {
    gameOver();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
     title: `Fim de Jogo!!!`,
      text: "Obrigado por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


