let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bottomObstaclesArray = [];

let colors = ["red","blue","green","yellow"];

let heights = [(canvas.height/2)-10,(canvas.height/2)-40,(canvas.height/2)-70,(canvas.height/2)-100,(canvas.height/2)-130];

function Obstacle(){
    this.number1 = Math.floor(Math.random()*colors.length);
    this.number2 =  Math.floor(Math.random()*heights.length);
    this.color = colors[this.number1];
    this.width = 50;
    this.height = heights[this.number2];
    this.x = window.innerWidth;
    this.y = canvas.height - this.height;
    
}


function fillBottomObstacle(){
    let obs = new Obstacle();
    bottomObstaclesArray.push(obs);
}

function drawBottomObstacle(){
    for(let i = 0;i<bottomObstaclesArray.length;i++){
        let obs = bottomObstaclesArray[i];
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

function controlObstacleArray(){
    for(let i = 0;i<bottomObstaclesArray.length;i++){
        let obs =  bottomObstaclesArray[i];
        if(obs.x < -obs.width){
            bottomObstaclesArray.splice(i,1);
            console.log(bottomObstaclesArray.length);
        }
    }
}

function gameLoop(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    drawBottomObstacle();
    updateBottomObstacle();
    controlObstacleArray();
    requestAnimationFrame(gameLoop);
}

gameLoop();

setInterval(fillBottomObstacle,1500);





