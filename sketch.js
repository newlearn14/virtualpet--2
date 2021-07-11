//Create variables here
var database,happyDog,foodS,foodStock,dog;
var dogImage,dogImage1;
var fedTime,lastfed;
var feed,addFood;

function preload()
{
   dogImage=loadImage("images/dogImg.png")
   dogImage1=loadImage("images/dogImg1.png")
   //load images here
}

function setup() {
	createCanvas(1000, 500);
  dog = createSprite(850,300,40,40);
  dog.addImage("id",dogImage1) 
  dog.scale=0.3
database=firebase.database()
foodStock=database.ref('Food')
foodStock.on("value",readStock)

foodObj= new Food();

feed=createButton("feed the Dog")
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food")
addFood.position(800,95)
addFood.mousePressed(addFoods)

}


function draw() {  

  drawSprites();
  background("Green") 
  //add styles here
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
if(lastfed>=12)
{
  text("last Feed:"+ lastfed%12 +"PM",350,30)
}
else if(lastfed==0){
  text("last Feed: 12AM",350,30)
}
else{
  text("last Feed:"+ lastfed +"AM",350,30)
}
drawSprites();

}
function readStock(data){
  foodS=data.val()
}
function writeStock(x){
 
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function feedDog()
{
  dog.addImage("id",dogImage);

  //write code here to update food stock and last fed time
  var Food_Stock_val = foodObj.getFoodStock();
  if(Food_Stock_val<=0){
    foodObj.updateFoodStock(Food_Stock_val*1);
  }else{
    foodObj.updateFoodStock(Food_Stock_val-1);
    fedTime : hour();
}
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS,
  });
}

