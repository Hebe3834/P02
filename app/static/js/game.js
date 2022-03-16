// Optimistic Dinosaurs -- Hebe Huang, Yuqing Wu, Roshani Shrestha, Justin Zou
// SoftDev
// P02 -- Run for Your Life
// 2022-03-06

var c = document.getElementById("main_game");
var start_btn = document.getElementById("start");
var ctx = c.getContext("2d");
var scoreEle = document.getElementById("usrScore");
var score = 0;
var requestID;  //init global var for use with animation frames
var radius = 1;
var levels = 200;
var rects = [];
var circs = [];
var generate = true;
var r = true;
var jmp = false;
var up = false;
var img = [25,95];
var counter = 0;
var c_generate = true;
var coin = new Image(100);
coin.src = 'static/sprites/coin.png';
var coin_lv = [60,90,100,150];
var coins = [];
var zero = new Image(100);
zero.src = 'static/sprites/tile000.png';
var one = new Image(100);
one.src = 'static/sprites/tile001.png';
var two = new Image(100);
two.src = 'static/sprites/tile002.png';
var four = new Image(100);
four.src = 'static/sprites/tile004.png';
var highScore = parseInt(document.getElementById("highScore"));

var clear = (e) => {
    console.log("clear invoked...")
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
  ctx.drawImage(zero, img[0], img[1], 150, 150);
  if(score > highScore){
    console.log(score);
  }
};

var run = () =>{
  console.log("run invoked...");
  if (counter <= 10) {
    ctx.drawImage(one, img[0], img[1], 150, 150);
  }
  else if (counter <= 20) {
    ctx.drawImage(two, img[0], img[1], 150, 150);
  }
  else {
    counter = 0;
  }
  counter++;
}

var jump = () =>{
  if(jmp && !up){ // falling down
      img[1] += 5;
      if(img[1]>95){
        img[1] = 95;
        jmp = false;
      }
    jmp_cnt = 0;
    }

    else if(up && jmp){ // jumping up
      img[1]-=8;
      if(img[1]<-10){ // -10 because of empty space in image
        img[1] = -10;
        up = false;
      }
}
}

var generate_rect = () =>{
  if(generate == true){
    console.log("generating . . .");
    var start = 300;
    var num_obs = 10;
    for (i=0;i<num_obs;i++){
      var circ_rect = Math.floor(Math.random()*3);
      // 0,1 is rectangle, 2 is circle
      if(score < 100){
        circ_rect = 0;
      }
      console.log(circ_rect);
      if(circ_rect<2){
      var block_len = Math.floor(Math.random() * 30 + 10);
      var block_height = Math.floor(Math.random()*50 + 20);
      var random = Math.floor(Math.random() * 250);
      start += block_len+250 + (6-((block_len+250)%6))+random+(6-random%6);
      console.log(start)
      rects.push([start,levels - block_height, block_len, block_height]);
      }
      else{
        var rad = Math.floor(Math.random() * 10 + 17);
        var circ_y = Math.floor(Math.random() * -60 + levels - 30);
        start += 2*rad + Math.floor(Math.random() * 250) + 250;
        circs.push([start,circ_y,rad]);
        console.log(circs);

      }
    }
    generate = false;
  }


var last = 0;
for(i=0;i<rects.length;i++){
  ctx.fillStyle = "red";
  ctx.fillRect(rects[i][0],rects[i][1],rects[i][2],rects[i][3]);
  rects[i][0]-=6;
  if(rects[i][0] > last){
    last = rects[i][0];
  }
}
  for(i=0;i<circs.length;i++){
    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(circs[i][0], circs[i][1], circs[i][2], 0, 2*Math.PI);
    ctx.fill();
    circs[i][0]-=6;
    if(circs[i][0] > last){
      last = circs[i][0];
    }
  }

  while(true){
    if(rects.length > 0 && rects[0][0] < -250){
      console.log(rects[0][0]);
      rects.shift();
    }
    else if (circs.length > 0 && circs[0][0] < -250){
      circs.shift();
    }
    else{
      break;
    }
  }

  if(last < 300){
    generate = true;
  }
};
var generate_coin = () =>{
var start = 0;
  if(c_generate){
  for(i=0;i<10;i++){
    var coin_x = Math.floor(Math.random()*100 + 25) +60;
    start+= coin_x
    var coin_y = coin_lv[Math.floor(Math.random()*4)];
    var on_obs = false;
    for (j=0;j<rects.length;j++){
      if((start>=rects[i][0] && start <= rects[i][0] + rects[i][2]) || (coin_y+50>=rects[i][1])){
        on_obs = true;
      }
    }
    if(on_obs == false){
    coins.push([start, coin_y]);
  }
  }
  c_generate = false;
}
  for (i=0;i<coins.length;i++){
    ctx.drawImage(coin, coins[i][0], coins[i][1],50,50);
    coins[i][0] -= 6;
    //console.log(coins);
  }

    if(coins[coins.length-1] < 300){
      console.log("coin generate true");
      c_generate = true;
    }
    if(coins[0]<=250){
      coins.shift();
    }

}
var playGame = () => {
  console.log("playGame invoked...")

  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(playGame);

  clear();

  ctx.strokeStyle = "black";
  ctx.strokeRect(0,levels, c.clientWidth, c.clientWidth);
  generate_rect();
  generate_coin();
  var ix = img[0];
  var iy = img[1];

  var rx = rects[0][0];
  var ry = rects[0][1];
  var rw = rects[0][2];
  var rl = rects[0][3];

  var cx = 0;
  var cy = 0;
  var cr = 0;

  if (circs.length > 0){
    cx = circs[0][0];
    cy = circs[0][1];
    cr = circs[0][2];
  }

  var dx = Math.max(ix, Math.min(cx, ix + 95)) - cx;
  var dy = Math.max(iy, Math.min(cy, iy + 95)) - cy;

  if ((ix <= rx + rw && ix + 95 >= rx && iy <= ry + rl && iy + 95 >= ry) ||
  (dx * dx + dy * dy <= cr * cr)
  ){
    stopIt(); // game over
    const msg = document.createElement("h1");
    console.log(highScore);
    const msgContent = document.createTextNode("Game Over! You scored " + parseInt(highScore));
    msg.appendChild(msgContent);
    document.body.insertBefore(msg, c);
  }

  // (ix <= cx + cr && ix + 95 >= cx - cr && iy <= cy + cr && iy + 95 >= cy - cr)

  if(r){
    run();
  }
  else{
    ctx.drawImage(four, img[0], img[1] + 50,150,100);
  }

  jump();
  score ++;
  scoreEle.innerHTML = "SCORE: " + score;
};

var reset = () => {
  rects = []
  circs = []
  generate = true;
  playGame();
}
document.body.addEventListener('keydown', function(event) {
            var key = event.key;
            if(key=="ArrowDown" || key =="s"){
              r = false;
            }
            if((key == "ArrowUp" || key =="w") && jmp == false){
              up = true;
              jmp = true;
            }
            if (key == " ") {
              location.reload();
            }

            // for debugging
            if(key == "q"){
              window.cancelAnimationFrame(requestID);
            }
        });

document.body.addEventListener('keyup', function(event) {
            var key = event.key;
            if(key=="ArrowDown" || key =="s"){
              r = true;
            }

        });
start_btn.addEventListener('click',reset);
