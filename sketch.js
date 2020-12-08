//Create variables here
var dog, happyDog, hungryDog, foodStock, foodS;
const database = firebase.database();

function preload()
{
  //load images here
  hungryDog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250, 250);
  dog.addImage("dog image", hungryDog);
  dog.scale = 0.2;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock, showError);

}


function draw() {  
  background("46, 139, 87");
  drawSprites();
  //add styles here

  textSize(20);
  fill("black");
  text("Press Up arrow to feed the dog", 150, 20);
  text("Food Left: "+ foodS, 100,  200)

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
}



function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if (x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  });
}

function showError(){
  console.log("We are having problem to read the database...");
}
