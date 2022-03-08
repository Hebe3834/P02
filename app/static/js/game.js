// Optimistic Dinosaurs -- Hebe Huang, Yuqing Wu, Roshani Shrestha, Justin Zou
// SoftDev
// P02 -- Run for Your Life
// 2022-03-06

var c = document.getElementById("main_game");
var ctx = c.getContext("2d");
var requestID;  //init global var for use with animation frames
var obstacles = [[200, 0]];
var radius = 1;

var clear = (e) => {
    console.log("clear invoked...")
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var playGame = () => {
  console.log("playGame invoked...")

    window.cancelAnimationFrame(requestID);
    requestID = window.requestAnimationFrame(playGame);

    clear();
    ctx.beginPath();

    // for(var i = 0; i < obstacles.length; i++) {
    //
    // }
    radius += 1;
    ctx.arc(c.clientWidth/2, c.clientHeight/2, radius, 0, 360);
    ctx.fill();
}

playGame();
ctx.fillStyle = "red";
ctx.fillRect(c.clientWidth/2, c.clientHeight/2, 50, 100);

console.log("test")
