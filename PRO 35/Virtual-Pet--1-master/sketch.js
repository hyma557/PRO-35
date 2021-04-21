var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;

function preload(){
dogimg = loadImage("Dog.png");
dogHappy = loadImage("happydog.png");

}

function setup() {
  createCanvas(500, 750);
  
  
  dog = createSprite(250,300,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 
 
}


function draw() {
  background(46,139,87); 
  
  if (keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogimg);
  }

  drawSprites();
  fill("white")
  textSize(30);
  text("food remaining: "+foods,150,150);
  textSize(25)
  text("NOTE:To feed dog click up arrow key",60,50);
  
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
  if (x<=0){
    x = 15;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}





