let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bottomObstaclesArray = [];

let topObstaclesArray = [];

let colors = ["red","blue","green","yellow"];

let playerPos = 0;

let heights = [(canvas.height/2)-70,(canvas.height/2)-90,(canvas.height/2)-120,(canvas.height/2)-150,(canvas.height/2)-200];

function Obstacle(){
    this.number1 = Math.floor(Math.random()*colors.length);
    this.number2 =  Math.floor(Math.random()*heights.length);
    this.color = colors[this.number1];
    this.width = 50;
    this.height = heights[this.number2];
    this.x = window.innerWidth;
    this.y = canvas.height - this.height;
    
}

function Obstacle2(){
    this.number1 = Math.floor(Math.random()*colors.length);
    this.number2 =  Math.floor(Math.random()*heights.length);
    this.color = colors[this.number1];
    this.width = 50;
    this.height = heights[this.number2];
    this.x = window.innerWidth;
    this.y = 0;
}

function Player(){
    this.color = "white";
    this.width = 30;
    this.height = 30;
    this.y = (canvas.height/2) + (this.height + 50);
    this.x = (canvas.width/2) - 200;
}

let player = new Player();

function getGamepad(){
    let gamepad = navigator.getGamepads();
    if(gamepad[0]){
        let press = gamepad[0];

        if(press.buttons[0].pressed == true){
            playerPos = -16;
        }

        if(press.buttons[0].pressed == false){
            playerPos = 4;
        }

    }
}

function drawPlayer(){
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x,player.y,player.width,player.height);
}

function updatePlayer(){
    player.y += playerPos;

    if(player.y < 0){
        player.y = 0;
    }

    if(player.y + player.height > canvas.height){
        player.y = canvas.height - player.height;
    }
}

function fillBottomObstacle(){
    let obs = new Obstacle();
    bottomObstaclesArray.push(obs);
}

function fillTopObstacle(){
    let obs = new Obstacle2();
    topObstaclesArray.push(obs);

}

function drawBottomObstacle(){
    for(let i = 0;i<bottomObstaclesArray.length;i++){
        let obs = bottomObstaclesArray[i];
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x,obs.y,obs.width,obs.height);
    }
}

function drawTopObstacle(){
    for(let i = 0;i<topObstaclesArray.length;i++){
        let obs = topObstaclesArray[i];
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x,obs.y,obs.width,obs.height);
    }
}


function updateBottomObstacle(){
    let controller = -5;
    for(let i = 0;i<bottomObstaclesArray.length;i++){
        let obs = bottomObstaclesArray[i];
        obs.x += controller;
    }
}

function updateTopObstacle(){
    let controller = -5;
    for(let i = 0;i<topObstaclesArray.length;i++){
        let obs = topObstaclesArray[i];
        obs.x += controller;
    }
}



function controlObstacleArray(){
    for(let i = 0;i<bottomObstaclesArray.length;i++){
        let obs =  bottomObstaclesArray[i];
        if(obs.x < -obs.width){
            bottomObstaclesArray.splice(i,1);
        }
    }
}

function controlObstacleArray2(){
    for(let i = 0;i<topObstaclesArray.length;i++){
        let obs =  topObstaclesArray[i];
        if(obs.x < -obs.width){
            topObstaclesArray.splice(i,1);
        }
    }
}


function checkCollisionAgainstObstacles1(){
    let check = false;
    for(let i = 0;i<topObstaclesArray.length;i++){
        let obs = topObstaclesArray[i];
        if(player.x + player.width >= obs.x && obs.x + obs.width >= player.x && player.y + player.height >= obs.y && obs.y + obs.height >= player.y){
            check = true;
            break;
        }
    }
    return check;
}


function checkCollisionAgainstObstacles2(){
    let check = false;
    for(let i = 0;i<bottomObstaclesArray.length;i++){
        let obs = bottomObstaclesArray[i];
        if(player.x + player.width >= obs.x && obs.x + obs.width >= player.x && player.y + player.height >= obs.y && obs.y + obs.height >= player.y){
            check = true;
            break;
        }
    }
    return check;
}


function gameLoop(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    getGamepad();
    updatePlayer();
    drawPlayer();
    drawBottomObstacle();
    drawTopObstacle();
    updateBottomObstacle();
    updateTopObstacle();
    let t = checkCollisionAgainstObstacles1();
    let b = checkCollisionAgainstObstacles2();
    
    if(t == true ){
        ctx.font = "50px serif";
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER",canvas.width/2-120,canvas.height/2)
        return;
    }

    if(b == true ){
        ctx.font = "50px serif";
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER",canvas.width/2-120,canvas.height/2)
        return;
    }

    controlObstacleArray();
    controlObstacleArray2();
    requestAnimationFrame(gameLoop);
}

gameLoop();

setInterval(fillBottomObstacle,1200);
setInterval(fillTopObstacle,1700);




