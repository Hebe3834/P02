// Optimistic Dinosaurs -- Hebe Huang, Yuqing Wu, Roshani Shrestha, Justin Zou
// SoftDev
// P02 -- Run for Your Life
// 2022-03-06

var c = document.getElementById("main_game");
var ctx = c.getContext("2d");
var requestID;  //init global var for use with animation frames
var requestID1;
var requestID2;
var radius = 1;
var levels = [50,200,250];
var rects = [];
var generate = true;
var crouchBtn = document.getElementById("crouchBtn");
crouchBtn.addEventListener("click", crouch);

var clear = (e) => {
    console.log("clear invoked...")
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var counter = 0;
var one = new Image(100);
one.src = 'sprites/tile001.png';
var two = new Image(100);
two.src = 'sprites/tile002.png';

one.onload = function(){
  ctx.drawImage(this,150,150);
}

var run = () => {
  console.log("run invoked...")
  clear();
  window.cancelAnimationFrame(requestID1);
  if (counter <= 10) {
    ctx.drawImage(one, 150, 150);
  }
  else if (counter <= 20) {
    ctx.drawImage(two, 150, 150);
  }
  else {
    counter = 0;
  }
  counter++;
  requestID1 = window.requestAnimationFrame(run);
};

var zero = new Image(100);
zero.src = 'sprites/tile000.png';
var three = new Image(100);
three.src = 'sprites/tile003.png';
var four = new Image(100);
four.src = 'sprites/tile004.png';

var crouch = () => {
  console.log("crouch invoked...")
  clear();
  window.cancelAnimationFrame(requestID2);
  if (counter <= 10) {
    ctx.drawImage(zero, 150, 150);
  }
  else if (counter <= 20) {
    ctx.drawImage(three, 150, 165);
  }
  else if (counter <= 30) {
    ctx.drawImage(four, 150, 180);
  }
  else {
    counter = 0;
  }
  counter++;
  requestID2 = window.requestAnimationFrame(crouch);
};

var playGame = () => {
  console.log("playGame invoked...")

  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(playGame);

  clear();
  //ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.strokeRect(0,levels[1], c.clientWidth, c.clientWidth);

  if(generate == true){
    console.log("generating . . .");
    var start = 300;
    var num_obs = 10;
    for (i=0;i<num_obs;i++){
      var block_len = Math.floor(Math.random() * 40 + 10);
      var block_height = Math.floor(Math.random()*80 + 10);
      var lv = 1;
      start += block_len + Math.floor(Math.random() * 100) + 150;
      rects.push([start,levels[lv] - block_height, block_len, block_height]);
    }
    generate = false;
  }

  var last_rect = 0;
  for(i=0;i<rects.length;i++){
    ctx.fillStyle = "red";
    ctx.fillRect(rects[i][0],rects[i][1],rects[i][2],rects[i][3]);
    rects[i][0]-=1;
    if(rects[i][0] > last_rect){
      last_rect = rects[i][0];
    }
  }

  console.log(rects[0][0]);
  while(true){
    if(rects[0][0] < -250){
      console.log(rects[0][0]);
      rects.shift();
    }
    else{
      break;
    }
  }

  if(last_rect < 400){
    generate = true;
  }

  console.log(rects.length);
  if(rects.length < 1){
    alert("aHHHHHH");
  }

}

playGame();
zero.onload = run();