// Optimistic Dinosaurs -- Hebe Huang, Yuqing Wu, Roshani Shrestha, Justin Zou
// SoftDev
// P02 -- Run for Your Life
// 2022-03-06

var c = document.getElementById("main_game");
var ctx = c.getContext("2d");
var requestID;  //init global var for use with animation frames
var radius = 1;
var levels = [50,200,250];
var rects = [];
var generate = true;

var clear = (e) => {
    console.log("clear invoked...")
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
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
      var block_height = Math.floor(Math.random()*80 + 10)
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

  if(last_rect < 400){
    generate = true;
  }

}

playGame();
