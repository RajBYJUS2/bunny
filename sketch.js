const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var connect;
var rabbit;
var food;
var bg;
var button;

var button2,button3;
var rope2,rope3;

var connect2,conncect3;

var canW,canH;

var mutebtn,blower;
var eatingsound;
var air;
var cryingsound;
var cutsound;
var bgsound;


var blink,eat,sad;

function preload()
{
  bg = loadImage('background.png');
  food = loadImage('melon.png');
  bunny = loadImage('Rabbit-01.png');

  bgsound = loadSound('sound1.mp3');
  cryingsound = loadSound('sad.wav')
  cutsound = loadSound('rope_cut.mp3')
  air= loadSound('air.wav')
  eatingsound= loadSound('eating_sound.mp3')

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png","eat_4.png");
  sad= loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");


  blink.playing = true;
  eat.playing=true;
  sad.playing=true;
  eat.looping=false;
  sad.looping=false;
}
function setup() 
{
 var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
 if(isMobile){
  canW = displayWidth;
  canH = displayHeight;
  createCanvas(displayWidth+80,displayHeight);
 }
 else {
  canW= windowWidth;
  canH = windowHeight;
  createCanvas(windowWidth,windowHeight);
 }
  frameRate(80);



  bgsound.play();
  bgsound.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,displayWidth,20);


  button2= createImg('cut_btn.png');
  button2.position(400,90);
  button2.size(50,50);
  button2.mouseClicked(drop2);

button3 = createImg('cut_btn.png')
button3.position(600,250)
button3.size(50,50);
button3.mouseClicked(drop3);

  

  button = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);
rope3= new Rope(6,{x:645,y:280})
  rope2 = new Rope(6,{x:430, y:90})
  rope = new Rope(6,{x:230, y:30});
fruit = Bodies.circle(300,300,20);
Matter.Composite.add(rope.body,fruit);

blink.frameDelay = 20;
eat.frameDelay = 20;
sad.frameDelay=20;

rabbit = createSprite(420,canH-80,100,100);
rabbit.addAnimation('blinking', blink);
rabbit.addAnimation('eating', eat);
rabbit.addAnimation('crying', sad);

rabbit.changeAnimation('blinking');
rabbit.scale= 0.2;

blower = createImg('balloon.png');
blower.position(10,250);
blower.size(154,100);
blower.mouseClicked(airblow);


mutebtn = createImg('mute.png');
mutebtn.position(canW-100,20)
mutebtn.size(50,50);
mutebtn.mouseClicked(mute);
conncect3 = new Link(rope3,fruit);
connect2 = new Link(rope2,fruit);
connect = new Link(rope,fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  
}

function draw() 
{
  background(51);
  image(bg,0,0,displayWidth,displayHeight);
   push();
   imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,65,65);
  }
  pop();
  rope2.show();
  rope.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

if(collides(fruit,rabbit)==true)
{
  rabbit.changeAnimation('eating')
  eatingsound.play();
}
if(fruit!=null && fruit.position.y>=canH-30)
{
  rabbit.changeAnimation('crying')
  bgsound.stop();
  cryingsound.play();
  fruit=null;
}
  
  drawSprites();

 
   
}
function drop()
{
  rope.break();
  cutsound.play();
  connect.detach();
  connect=null
}
function drop2()
{
  rope2.break();
  cutsound.play();
  connect2.detach();
  connect2=null
}
function drop3()
{
  rope3.break();
  cutsound.play();
  conncect3.detach();
  conncect3=null
}
function collides(bodyA,bodyB)
{
  if(bodyA!=null)
  {
    var d = dist(bodyA.position.x,bodyA.position.y,bodyB.position.x,bodyB.position.y)
    if(d<=80)
    {
      World.remove(engine.world,fruit);
      fruit=null;
      return true;

    }
    else{
      return false;
    }
  }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0}, {x:0.01, y:0});
  air.play();
}

function mute()
{
  if(bgsound.isPlaying())
  {
    bgsound.stop();
  }
  else{
    bgsound.play();
  }
}
function keyPressed()
{
  if(keyCode==LEFT_ARROW)
  {
    airblow();
  }
}
