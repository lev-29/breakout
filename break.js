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
let ballVelocityX=3;
let ballVelocityY=2;

ball={
    x:bWidth/2,
    y:bHeight/2,
    width:ballWidth,
    height:ballHeight,
    velocityX:ballVelocityX,
    velocityY:ballVelocityY
}


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
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height );

    //redraw
    context.drawImage(image,0,0,700,700);
    context.fillStyle="#E6F9EC";
    context.fillRect(player.x,player.y, player.width, player.height);

    ball.x=ball.x+ball.velocityX;
    ball.y=ball.y+ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
}

function outOfBounds(xPosition){
    return (xPosition < 0 || xPosition + player.width > board.width);
}

function movePlayer(e){
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