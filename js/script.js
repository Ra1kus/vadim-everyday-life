const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = './img/field.png';

const foodImg = new Image();
foodImg.src = './img/food.png';

const headImg = new Image();
headImg.src = './img/new-head.png';

const bodyImg = new Image();
bodyImg.src = './img/body.png';

let box = 32;

let score = 0;

function xPosCalc() {
    let x = Math.floor(Math.random() * 17 + 1) * box
    if(x === 288) {
        x -= box
    }
    return x
}

function yPosCalc() {
    let x = Math.floor(Math.random() * 15 + 3) * box
    if(x === 320) {
        x -= box
    }
    return x
}

let food = {
    x: xPosCalc(),
    y: yPosCalc()
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    if((event.keyCode === 65 || event.keyCode === 37) && dir !== 'right')
        dir = 'left';
    else if((event.keyCode === 87 || event.keyCode === 38) && dir !== 'down')
        dir = 'up';
    else if((event.keyCode === 68 || event.keyCode === 39) && dir !== 'left')
        dir = 'right';
    else if((event.keyCode === 83 || event.keyCode === 40) && dir !== 'up')
        dir = 'down';
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x === arr[i].x && head.y === arr[i].y)
        clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++) {
        if(i === 0) {
            ctx.drawImage(headImg, snake[i].x, snake[i].y);
        } else {
            // ctx.fillStyle = 'green';
            // ctx.fillRect(snake[i].x, snake[i].y, box, box);

            ctx.drawImage(bodyImg, snake[i].x, snake[i].y);
        }

    }

    ctx.fillStyle = '#fff';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.8);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);

    if(dir === 'left') snakeX -= box;
    if(dir === 'right') snakeX += box;
    if(dir === 'up') snakeY -= box;
    if(dir === 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 150);
