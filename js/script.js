const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

const field = new Image();
field.src = './img/field.jpg';

const foodImg = new Image();
foodImg.src = './img/food/pear_icon.svg';

const bodyImg = new Image();
bodyImg.src = './img/body.png';

const cellSide = 32; /* width and height of one cell */

let scoreCounter = document.getElementById('score-counter');

// Snake starting position
let snake = [
    {
        x: 8 * cellSide, 
        y: 7 * cellSide
    }
];

// Food starting position
let food = {};

// Generate food position
function updateFoodPos() {
    let x = Math.floor(Math.random() * 17) * cellSide;
    let y = Math.floor(Math.random() * 15) * cellSide;

    food.x = x === snake[0].x ? x - cellSide : x,
    food.y = y === snake[0].y ? y - cellSide : y
}

updateFoodPos();

document.addEventListener('keydown', direction);

let dir;

let directionChanged = false;

function direction(event) {
    if(directionChanged) {
        return
    }

    if((event.keyCode === 65 || event.keyCode === 37) && dir !== 'right')
        dir = 'left';
    else if((event.keyCode === 87 || event.keyCode === 38) && dir !== 'down')
        dir = 'up';
    else if((event.keyCode === 68 || event.keyCode === 39) && dir !== 'left')
        dir = 'right';
    else if((event.keyCode === 83 || event.keyCode === 40) && dir !== 'up')
        dir = 'down';

    directionChanged = true;
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x === arr[i].x && head.y === arr[i].y) {
            clearInterval(game);
        }
    }
}

function drawGame() {
    ctx.drawImage(field, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y, cellSide, cellSide);

    for(let i = 0; i < snake.length; i++) {
        // if(i === 0) {
        //     ctx.drawImage(headImg, snake[i].x, snake[i].y);
        // } else {
            ctx.drawImage(bodyImg, snake[i].x, snake[i].y);
        // }
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(dir === 'left') snakeX -= cellSide;
    if(dir === 'right') snakeX += cellSide;
    if(dir === 'up') snakeY -= cellSide;
    if(dir === 'down') snakeY += cellSide;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX === food.x && snakeY === food.y) {
        scoreCounter.innerText++;

        updateFoodPos();
    } else {
        snake.pop();
    }

    if( snakeX < 0 || 
        snakeX > cellSide * 16 || 
        snakeY < 0 || 
        snakeY > cellSide * 14 ) {
            clearInterval(game);
        }

    eatTail(newHead, snake);

    snake.unshift(newHead);

    directionChanged = false;

    console.log(snake);
}

let game = setInterval(drawGame, 160);
