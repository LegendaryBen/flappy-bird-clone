let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bottomObstaclesArray = [];

let topObstaclesArray = [];

let colors = ["red","blue","green","yellow"];

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



function gameLoop(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    drawBottomObstacle();
    drawTopObstacle();
    updateBottomObstacle();
    updateTopObstacle();
    controlObstacleArray();
    controlObstacleArray2();
    requestAnimationFrame(gameLoop);
}

gameLoop();

setInterval(fillBottomObstacle,1200);
setInterval(fillTopObstacle,1700);




