var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;
var fedTime, lastFed;
var feed,addFood;

function preload(){
dogimg = loadImage("images/dogImg.png");
dogHappy = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
  createCanvas(1000, 550);
  
  foodobject=new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(800,350,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  feed = createButton("FEED DOG");
  feed.position(600,100);
  feed.mousePressed(FeedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(400,100);
  addFood.mousePressed(addFoods);
 
 
}


function draw() {
  background(46,139,87); 
  
  foodobject.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }


  

  drawSprites();
  

}

function readStock(data){
  foodS = data.val();
  foodobject.updateFoodStock(foods);
}
function FeedDog(){
  
  dog.addImage(dogHappy);

if(foodOject.getFoodStock()<= 0){
  foodobject.updateFoodStock(foodobject.getFoodStock()*0);
}else{

  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
}

database.ref('/').update({
 Foods:foodobject.getFoodStock(),
 FeedTime:hour()
})

}

function addFoods(){
  foods++;
  database.ref('/').update({
  Food:foodS
  })
  }
  
