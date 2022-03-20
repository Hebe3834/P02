// Optimistic Dinosaurs -- Hebe Huang, Yuqing Wu, Roshani Shrestha, Justin Zou
// SoftDev
// P02 -- Run for Your Life
// 2022-03-06

var c = document.getElementById("main_game");
var b = document.getElementById("bgimg");
var start_btn = document.getElementById("start");
var ctx = c.getContext("2d");
var btx = b.getContext("2d");
var scoreEle = document.getElementById("usrScore");
var coinEle = document.getElementById("usrCoins");
var score = 0;
var usrCoinsEarned = 0;
var requestID;  //init global var for use with animation frames
var radius = 1;
var levels = 200;
var rects = [];
var circs = [];
var generate = true;
var r = true;
var jmp = false;
var up = false;
var img = [25,150];
var counter = 0;
var c_generate = true;
var coin = new Image(100);
coin.src = 'static/sprites/coin.png';
var coin_lv = [30,90,150];
var coins = [];
var skin;
try {
  skin = document.getElementById("skin").getAttribute("value");
} catch {
  skin = 'Default'
}
var zero = new Image(100);
zero.src = 'static/sprites/' + skin + '0.png';
var one = new Image(100);
one.src = 'static/sprites/' + skin + '1.png';
var two = new Image(100);
two.src = 'static/sprites/' + skin + '2.png';
var three = new Image(100);
three.src = 'static/sprites/' + skin + '3.png';
var highScore = parseInt(document.getElementById("highScore"));
var bg = document.getElementById('source');
var revive, view_score;
var invinc = false;
var inv_btn = document.getElementById('inv');
var coin_dub = document.getElementById('coin_dub');
var coin_d = false;
var clear = (e) => {
    console.log("clear invoked...")
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};



var stopIt = () => {
  console.log("stopIt invoked...")
  console.log( requestID );
  window.cancelAnimationFrame(requestID);
  ctx.drawImage(zero, img[0], img[1], 50, 50);
  if(score > highScore){
    console.log(score);
  }
};

var run = () =>{
  console.log("run invoked...");
  if (counter <= 10) {
    ctx.drawImage(one, img[0], img[1], 50, 50);
  }
  else if (counter <= 20) {
    ctx.drawImage(two, img[0], img[1], 50, 50);
  }
  else {
    counter = 0;
  }
  counter++;
}

var jump = () =>{
  if(jmp && !up){ // falling down
      img[1] += 9;
      if(img[1]>150){
        img[1] = 150;
        jmp = false;
      }
    jmp_cnt = 0;
    }

    else if(up && jmp){ // jumping up
      img[1]-=9;
      if(img[1]<0){ // -10 because of empty space in image
        img[1] = 0;
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
var start = 500;
  if(c_generate){
  for(i=0;i<10;i++){
    var coin_x = Math.floor(Math.random()*100 + 25) +60;
    start+= coin_x;
    var coin_y = coin_lv[Math.floor(Math.random()*3)];
    var on_obs = false;
    //console.log(rects);
    for (j=0;j<rects.length;j++){
      // replace rects[j][0] with circ_X - r and replace rects[j][0]
      if((start>=(rects[j][0]-70) && (start <= (rects[j][0] + rects[j][2] + 20))) && (coin_y+70>=rects[j][1])){
        on_obs = true;
      }
    }

    for(j=0;j<circs.length;j++){
    if(((start + 70)>=(circs[j][0] - circs[j][2])) && (start<= (circs[j][0] + circs[j][2] +20)) && (coin_y+70 >= (circs[j][1] - circs[j][2])) && ((coin_y + 20)<= (circs[j][1]+circs[j][2]))){
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
    if (img[0] <= coins[i][0] + 50 && img[0] + 50 >= coins[i][0] && img[1] <= coins[i][1] + 50 && img[1] + 50 >= coins[i][1]){
      // console.log(img);
      // console.log(coins);
      // console.log(coins[i]);
      coins.splice(i,1);
      if(coin_d){
        usrCoinsEarned+=2;
      }else{
      usrCoinsEarned++;
    }
      i--;
    }
  }

    if(coins[coins.length-1][0] < 300){
      console.log("coin generate true");
      c_generate = true;
    }
    if(coins[0][0]<=-250){
      coins.shift();
    }
console.log(coins);
}
var playGame = () => {
  console.log("playGame invoked...")

  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(playGame);

  clear();

  btx.drawImage(bg, 0, 0, 800, 400);

  ctx.strokeStyle = "black";
  ctx.strokeRect(0,levels, c.clientWidth, c.clientWidth);
  generate_rect();
  generate_coin();
  var ix = img[0];
  var iy = img[1];
  var iw = 50;
  var ih = 50;

  if (!r) {
    iy += 25;
    ih = 25;
  }

  if (rects.length > 0) {
    var rx = rects[0][0];
    var ry = rects[0][1];
    var rw = rects[0][2] - 5;
    var rl = rects[0][3] - 5;
  }

  var cx = 0;
  var cy = 0;
  var cr = 0;

  if (circs.length > 0){
    cx = circs[0][0];
    cy = circs[0][1];
    cr = circs[0][2];
  }

  var dx = Math.max(ix, Math.min(cx, ix)) - cx;
  var dy = Math.max(iy, Math.min(cy, iy + ih)) - cy;

if(invinc == false){
  if ((ix <= rx + rw && ix + iw >= rx && iy <= ry + rl && iy + ih >= ry) ||
  (dx * dx + dy * dy <= cr * cr)
  ){

    stopIt(); // game over
    display_btns();
  }
}

  // (ix <= cx + cr && ix + 95 >= cx - cr && iy <= cy + cr && iy + 95 >= cy - cr)

  if(r){
    run();
  }
  else{
    ctx.drawImage(three, img[0], img[1] + 25,50,25);
  }

  jump();
  score ++;
  scoreEle.innerHTML = "SCORE: " + score;
  coinEle.innerHTML = "COINS EARNED: " + usrCoinsEarned;
};

var reset = () => {
  rects = [];
  circs = [];
  coins = [];
  generate = true;
  c_generate = true;
  playGame();
}
document.body.addEventListener('keydown', function(event) {
            var key = event.key;
            if(key=="ArrowDown" || key =="s"){
              event.preventDefault();
              r = false;
            }
            if((key == "ArrowUp" || key =="w") && jmp == false){
              event.preventDefault();
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

start_btn.addEventListener('click',function(){
  if(document.getElementById('revive') != null){
    document.body.removeChild(document.body.lastChild);
  }
  reset();
});

inv_btn.addEventListener('click',function(){
  invinc = true;
  setTimeout(function(){invinc = false;
    window.alert("invicibility has ended");
  }, 10000);

});

coin_dub.addEventListener('click', function(){
  coin_d = true;
  setTimeout(function(){coin_d = false;}, 10000);
})

var display_btns = () =>{
  let div = document.createElement("div");
  let revive_btn = document.createElement("button");
  revive_btn.setAttribute("class", "btn btn-danger");
  revive_btn.setAttribute("formaction", "/profile");
  revive_btn.setAttribute("id", "revive");
  revive_btn.innerHTML = "Revive";

  let view_stat  = document.createElement("button");
  view_stat.setAttribute("class", "btn btn-danger");
  view_stat.setAttribute("formaction", "/profile");
  view_stat.setAttribute("id", "view_score");
  view_stat.innerHTML = "View Score";

  document.body.appendChild(div);
  div.appendChild(revive_btn);
  div.appendChild(view_stat);

  revive_btn.addEventListener('click',function(){
    document.body.removeChild(document.body.lastChild);
    reset();
  });
  view_stat.addEventListener('click',function(){gameOver(score);});
}

var gameOver = (score) => {
  let results = document.createElement("form");
  results.setAttribute("method", "POST");
  results.setAttribute("action", "/game_results");

  let coinsEarned = document.createElement("input");
  coinsEarned.setAttribute("name", "coins");
  coinsEarned.setAttribute("value", usrCoinsEarned);
  let lastScore = document.createElement("input");
  lastScore.setAttribute("name", "score");
  lastScore.setAttribute("value", score+1);

  let enter = document.createElement("input");
  enter.setAttribute("type", "submit");

  document.body.appendChild(results);
  results.appendChild(coinsEarned);
  results.appendChild(lastScore);
  results.appendChild(enter);
  enter.click();
}
