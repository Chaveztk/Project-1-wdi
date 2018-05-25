


const grid = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

console.log(`grid is ${grid.length}x${grid[0].length}`);

$(()=>{

  let snake = [];

  let direction = 'right'; // direction of snake
  let score = 0; // initial score
  let snakeIsGrowing = false;
  let gameIsRunning = false;
  let intervalId = -1;
  const initialSpeed = 300;
  let currentSpeed = initialSpeed;
  const maxSpeed = 10;
  const width = grid[0].length;
  const height = grid.length;
  const $map = $('.gameScreen');
  const $gameEndScreen = $('#gameOver');





  function clearFood() {
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        getDivAt(j, i).removeClass('food');
      }
    }
  }

  function placeRandomFood() {
    let randomX = randomUpTo(width);
    let randomY = randomUpTo(height);
    while(getDivAt(randomX, randomY).hasClass('snake')) {
      randomX = randomUpTo(width);
      randomY = randomUpTo(height);
    }
    // Found a spare space! Add apple
    getDivAt(randomX, randomY).addClass('food');
  }

  function randomUpTo(n) {
    return Math.floor(Math.random() * n);
  }

  function getNewHeadPosition() {
    const currentHeadPosition = getSnakeHead();
    const newHeadPosition = [];
    switch(direction) {
      case 'left':
        newHeadPosition[0] = currentHeadPosition[0] - 1;
        newHeadPosition[1] = currentHeadPosition[1];
        break;
      case 'right':
        newHeadPosition[0] = currentHeadPosition[0] + 1;
        newHeadPosition[1] = currentHeadPosition[1];
        break;
      case 'up':
        newHeadPosition[0] = currentHeadPosition[0];
        newHeadPosition[1] = currentHeadPosition[1] - 1;
        break;
      case 'down':
        newHeadPosition[0] = currentHeadPosition[0];
        newHeadPosition[1] = currentHeadPosition[1] + 1;
        break;
    }
    return newHeadPosition;
  }

  function getSnakeHead() {
    return snake[snake.length - 1];
  }

  function addNewHeadToSnake(newHeadPosition) {
    snake.push(newHeadPosition);
  }

  function shiftSnake() {
    if (snakeIsGrowing) {
      growSnake();
      console.log(snakeIsGrowing);
      snakeIsGrowing = false;
    } else {
      snake.shift();
    }
  }

  function growSnake() {
    console.log('grow!');
    console.log(`score is ${score}`);
    const tailPosition = snake[0];
    snake.unshift(tailPosition);
  }

  function clearSnake() {
    for(let i = 0; i < height; i++) {
      for(let j = 0; j < width; j++) {
        getDivAt(j, i).removeClass('snake');
      }
    }
  }

  function drawSnake() {
    for(let i = 0; i < snake.length; i++) {
      const snakePosition = snake[i];
      getDivAt(snakePosition[0], snakePosition[1]).addClass('snake');
    }
  }

  function getDivAt(i, j) {
    return $(`div[x=${i}][y=${j}]`);
  }

  function foodIsAtHead() {
    const headPosition = getSnakeHead();
    // is there food at the head position?
    if(getDivAt(headPosition[0], headPosition[1]).hasClass('food')) {
      // head is at food!
      return true;
    } else {
      return false;
    }
  }

  function eatFood(position) {
    // increase the score
    score = score + 1;
    // Remove the food at this position
    getDivAt(position[0], position[1]).removeClass('food');
    getDivAt(position[0], position[1]).addClass('blank');
    // Tell the snake to grow
    snakeIsGrowing = true;
    // add another random apple
    placeRandomFood();
    // Speed up the game
    if(currentSpeed > maxSpeed) {
      currentSpeed -= 10;
    }
    runLoopAtSpeed(currentSpeed);
  }

  function showScore() {
    $('.score').text(score);
  }

  function snakeHasCrashed() {
    const headPosition = getSnakeHead();
    const headPositionDiv = getDivAt(headPosition[0], headPosition[1]);
    if(headPositionDiv.hasClass('snake')) {
      // Snake has eaten itself!
      return true;
    } else if(positionIsOutsideGrid(headPosition)) {
      // Snake has left the grid
      return true;
    } else {
      return false;
    }
  }

  function endGame() {
    clearInterval(intervalId);
    gameIsRunning = false;
    console.log(`Your score was ${score}`);
    console.log(snake);
  }

  function positionIsOutsideGrid(position) {
    if (position[0] < 0 || position[0] > width - 1 ||
        position[1] < 0 || position[1] > height - 1) {
      return true;
    } else {
      return false;
    }
  }


  function drawGrid() {
    $.each(grid, (i, row) =>{
      $.each(row, (j, cell) =>{
        const $element = $('<div />');
        $element.attr('x', j);
        $element.attr('y', i);
        $element.appendTo('#map');
      });
    });
  }

  function drawGame() {
    $.each(grid, (i, row) =>{
      $.each(row, (j, cell) =>{
        const $element = getDivAt(j, i);
        if(cell === 0){
          $element.addClass('blank');
        } else if(cell === 1){
          $element.addClass('snake');
          // snakePosition = {x: i, y: j};
        } else if(cell === 2){
          $element.addClass('food');
        }
      });
    });
  }

  function startGame() {
    score = 0;
    currentSpeed = initialSpeed;
    snake = [
      [2, 4],
      [3, 4],
      [4, 4],
      [5, 4] // head

    ];
    gameIsRunning = true;
    drawGame();
    clearFood();
    placeRandomFood();
    runLoopAtSpeed(currentSpeed);
    $gameEndScreen.hide();
  }

  function runLoopAtSpeed(speed) {
    clearInterval(intervalId);
    intervalId = setInterval(function(){
      showScore();
      const newHead = getNewHeadPosition();
      addNewHeadToSnake(newHead);
      if (foodIsAtHead()) {
        eatFood(newHead);
      }
      shiftSnake();
      if(snakeHasCrashed()) {
        $map.hide();
        $gameEndScreen.show();
        $('body').css('backgroud-color', 'black');

        endGame();

      }
      // Draw the new snake, (clear it first)
      if(gameIsRunning) {
        clearSnake();
        drawSnake();
        $gameEndScreen.hide();
        $map.show();
      }
    }, speed);
  }

  document.addEventListener('keydown', function(e){
    switch(e.which){
      case 38: // up
        e.preventDefault(); // stop up and down moving screen around!
        direction = 'up';
        break;
      case 39:
        e.preventDefault(); // stop up and down moving screen around!
        direction = 'right';
        break;
      case 40:
        e.preventDefault(); // stop up and down moving screen around!
        direction = 'down';
        break;
      case 37:
        e.preventDefault(); // stop up and down moving screen around!
        direction = 'left';
        break;
    }
  });

  drawGrid();
  startGame();

  $('#gameOver').on('click', function() {
    startGame();
    clearSnake();

  });
});
