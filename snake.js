window.onload=function() {
    canvas=document.getElementById("gameCanvas");
    ctx=canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/15);
}

playerX=playerY=10;
gridSize=tileCount=20;
foodX=foodY=15;
xv=yv=0; // Velocity Values
tail = [];
tailSize = 5; // Beginning Snake Size

function game() {
    playerX+=xv;
    playerY+=yv;

    // Handles the Snake wrapping across screen
    if (playerX < 0) {
        playerX = tileCount-1;
    }
    if (playerX > tileCount-1) {
        playerX = 0;
    }
    if (playerY < 0) {
        playerY = tileCount-1;
    }
    if (playerY > tileCount-1) {
        playerY = 0;
    }

    // Colors each tile of the game screen
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle="lime";
    for (var i=0; i < tail.length; i++) {
        ctx.fillRect(tail[i].x * gridSize, tail[i].y * gridSize, gridSize - 2, gridSize - 2);
        if (tail[i].x == playerX && tail[i].y == playerY) { // Game Lost
            tailSize = 5;
        }
    }

    // Makes Tail follow the head of the snake
    pointObj = {x: playerX, y: playerY}
    tail.push(pointObj);
    while(tail.length > tailSize) {
        tail.shift();
    }

    if (playerX == foodX &&  playerY == foodY) { // Food Eaten
        tailSize++;
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
    }

    ctx.fillStyle="blue";
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

function keyPush(event) {
    switch(event.keyCode) {
        case 37: // Left Arrow Key
            xv=-1;
            yv=0;
            break;
        case 38: // Down Arrow Key
            xv=0;
            yv=-1;
            break;
        case 39: // Right Arrow Key
            xv=1;
            yv=0;
            break;
        case 40: // Up Arrow Key
            xv=0;
            yv=1;
            break;
    }
}