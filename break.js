let board;
let bWidth=700;
let bHeight=700;
let context;

//background
const image=new Image();
image.src="neon.jpg";

//player

let pHeight=15;
let pWidth=135;
let pVelocityX=10;

let player = {
    x : bWidth/2 - pWidth/2,
    y : bHeight-pHeight-8,
    width : pWidth,
    height : pHeight,
    velocityX: pVelocityX
}

//ball

let ballWidth=15;
let ballHeight=15;
let ballVelocityX=4;
let ballVelocityY=5;

ball={
    x:bWidth/2,
    y:bHeight/2,
    width:ballWidth,
    height:ballHeight,
    velocityX:ballVelocityX,
    velocityY:ballVelocityY
}

//bricks
let bricksArray=[];
let brickWidth=65;
let brickHeight=15;
let brickColumns=9;
let brickRows=5;
let brickMaxRows=12;
let brickCount=0;

//starting bricks
let brickX=26;
let brickY=50;

//score
let score=0;

//game over
let gameOver=false;


window.onload=function(){
    board=document.getElementById('board')
    board.height=bHeight;
    board.width=bWidth;
    context=board.getContext("2d"); //drawing on the board
    // let image=document.getElementById("bg");
    context.drawImage(image,0,0,700,700);

    //draw initial player
    context.fillStyle="#E6F9EC";
    context.fillRect(player.x,player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    //add bricks
    createBricks();
}

function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height );

    //redraw
    context.drawImage(image,0,0,700,700);
    context.fillStyle="#E6F9EC";
    context.fillRect(player.x,player.y, player.width, player.height);

    ball.x=ball.x+ball.velocityX;
    ball.y=ball.y+ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //bounce the ball
    if(ball.y<=0){
        //if ball touches the top of the board
        ball.velocityY*=-1; //reverse direction
    }
    else if(ball.x<=0||(ball.x+ball.width)>=board.width){
        //if the ball touches left or right wall
        ball.velocityX*=-1; //reverse direction
    }
    else if((ball.y+ball.height)>=bHeight){
        //if bal touches the bottom of the board
        //game over
        context.font="20px Helvetica"
        context.fillText("Game Over: Press Start to try again", 200, 400);
        gameOver=true;
    }
    
    //ball bounces off the paddle
    if(topCollision(ball, player)||bottomCollision(ball, player)){
        ball.velocityY *= -1;
    }
    else if(leftCollision(ball, player)||rightCollision(ball, player)){
        ball.velocityX *=-1;
    }

    //bricks
    context.fillStyle="#E6F9EC";
    for(let i = 0; i <= bricksArray.length; i++){
        let brick = bricksArray[i];
        if(!brick.break){
            if(topCollision(ball, brick)||bottomCollision(ball, brick)){
                brick.break=true;
                ball.velocityY*=-1; //flip y direction
                brickCount-=1;
                score+=100;
            }
            else if(leftCollision(ball, brick)||rightCollision(ball, brick)){
                brick.break=true;
                ball.velocityX*=-1; //flip x direction
                brickCount-=1;
                score+=100;
            }
            context.fillRect(brick.x, brick.y, brick.width, brick.height);
        }
        context.font="300 20px Helvetica";
        context.fillText(score, 15, 35);
        }
}
 

function outOfBounds(xPosition){
    return (xPosition < 0 || xPosition + player.width > board.width);
}

function movePlayer(e){
    if(gameOver){
        if(e.code=='Space'){
            resetGame();
        }
    }

    if(e.code=="ArrowLeft"){
        // player.x = player.x-pVelocityX;
        let nextPlayerX = player.x - pVelocityX;
        if(!outOfBounds(nextPlayerX)){
            player.x = nextPlayerX;
        }
    }
    else if(e.code=="ArrowRight"){
        // player.x = player.x+pVelocityX;
        let nextPlayerX = player.x + pVelocityX;
        if(!outOfBounds(nextPlayerX)){
            player.x = nextPlayerX;
        }
    }
}

function detectCollision(a, b){
    return a.x < (b.x + b.width) &&
        (a.x + a.width ) > b.x &&
        a.y < ( b.y + b.height) &&
        (a.y + a.height)> b.y;
}

function topCollision(ball, block){
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block){
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block){
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block){
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBricks(){
    bricksArray = [];
    for(let m = 0; m < brickColumns; m++){
        for(let n = 0; n < brickRows; n++){
            let brick = {
                x : brickX + m*brickWidth + m*8,
                y : brickY + n*brickHeight + n*12,
                width : brickWidth,
                height : brickHeight,
                break : false
            }
            bricksArray.push(brick);
        }
    }
    brickCount=bricksArray.length;
}

function resetGame(){
    gameOver=false;
    player = {
        x : bWidth/2 - pWidth/2,
        y : bHeight-pHeight-8,
        width : pWidth,
        height : pHeight,
        velocityX: pVelocityX
    }
    
    ball={
        x:bWidth/2,
        y:bHeight/2,
        width:ballWidth,
        height:ballHeight,
        velocityX:ballVelocityX,
        velocityY:ballVelocityY
    }
    
    bricksArray=[];
    score=0;
    createBricks();
}