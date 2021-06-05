var ironMan;
var bg;
var city,cityImage;
var ironManAnimation,ironManAnimation2;
var enemy,enemyAnimation1;
var enemyGroup;
var repulsor;
var COUNT=0;
var NOTCOUNT=1;
var STATE=NOTCOUNT;
var no=800;
var count = 500;
var Animation1=4;
var Animation2=5;
var Anim = 4;
var BM;

var gameState="LEVEL0";




function preload(){
  ironManAnimation=loadAnimation("Ironman1/1.png","Ironman1/2.png","Ironman1/3.png",
  "Ironman1/4.png");

  ironManAnimation2=loadAnimation("Ironman2/1.png","Ironman2/2.png","Ironman2/3.png",
  "Ironman2/4.png","Ironman2/5.png","Ironman2/6.png","Ironman2/7.png","Ironman2/8.png",
  "Ironman2/9.png","Ironman2/10.png","Ironman2/11.png");

  cityImage=loadImage("Background/1.png");

  enemyFly=loadAnimation("Enemy/1.png","Enemy/2.png");


  shoot=loadImage("fire.png");

  BM=loadSound("1.flac");

  getBackground()
}



function setup(){

  createCanvas(1200,500);

  
  city=createSprite(width/2,300,width*2,10);
  city.scale=5;
  city.addImage("City",cityImage);
  city.velocityX=80;
  enemyGroup=new Group();
  repulsorGroup=new Group();
  ironMan=createSprite(900,270,30,30);
  ironMan.addAnimation("Iron Man",ironManAnimation);
  ironMan.addAnimation("fires",ironManAnimation2);
  ironMan.scale=0.35;
  BM.loop();
  


  
}


function draw(){

  if(gameState="LEVEL0"){
    
  }

  
//console.log(Anim);
  background(bg);
  
if(gameState==="LEVEL1"){
  // scrolling city
  if(city.x>4900){
    city.x=-3600;
  }



  
  
// move ironman up
  if(keyDown(UP_ARROW)){
    ironMan.y-=10;
  }

  //move iron man down
  if(keyDown(DOWN_ARROW)){
    ironMan.y+=10;
  }


  // functions to create repulsor
  Repulsor()

  // function to create enemy
  Enemy()



  // Changing Animations.
  if(Anim===Animation1){
     
    count=800;
    if(keyDown("space")){
      Anim=Animation2;
    }
    }


    if(Anim===Animation2){
     
      count-=16;
      if(count<0){
        Anim =Animation1;
        ironMan.changeAnimation("Iron Man",ironManAnimation)
      }
    }


    // Setting a counter for repulsor.
  
  if(STATE===NOTCOUNT){
    no=500;
    count=800;
    if(keyDown("space")){
      STATE=COUNT;
  
    }
    }


    if(STATE===COUNT){
      no-=2;
      count-=1;
      if(no===0){
        STATE=NOTCOUNT;
      }
    }

  



    // destroy the enemy 
    for(var i=0;i<enemyGroup.length;i++){
      if(enemyGroup.get(i).isTouching(repulsorGroup)){
        enemyGroup.get(i).destroy();
     }
    }
   }

  

  drawSprites();


  


}





function Enemy(){
  if(frameCount%Math.round(random(400,800))===0){
    enemy = createSprite(-100,random(100,400),50,80);
    enemy.addAnimation("Enemy",enemyFly);
    enemy.debug=true;
    enemy.setCollider("rectangle",-400,100,850,500);
    enemy.scale=0.27;
    enemy.velocityX=1;
    enemyGroup.add(enemy);
  }
 
}

function Repulsor(){
  if(keyDown("space")&&STATE===NOTCOUNT){
    repulsor=createSprite(900,ironMan.y,20,20);
    repulsor.addImage("shhots",shoot);
    repulsor.debug=true;
    repulsor.setCollider("circle",-60,0,100);
    repulsor.scale=0.4;
    repulsor.velocityX=-80

    repulsor.lifetime=150;
    repulsorGroup.add(repulsor)

    ironMan.changeAnimation("fires",ironManAnimation2);
    
    }

    


}


async function getBackground(){
  console.log("123")
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON=response.json();
  console.log(responseJSON);
  var dateTime= await responseJSON.datetime;
  console.log(dateTime);
  dateTime.slice(11,13);


    if(hour>=6 && hour<=19){
      bg="Day.jpg";
    }

    else{
      bg="NightSky.jpg";
    }

    backgroundImg = loadImage(bg);
}

