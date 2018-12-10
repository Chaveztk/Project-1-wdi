# Project-1-wdi



For the first assigned project at WDI we were given a week to create a game using HTML, CSS and JavaScript (jQuery used). For my project i decided to create snake (old Nokia mobile game from 90's).

I tried to duplicate the game as much as possible without any start or pause buttons, the game however was styled to my imagination using CSS.



# game in players

The game starts once the game in loaded, the snake will always start in the same position it has been assigned to, the food the snake has to eat (in red) is set to random.
When food is eaten by Snake the snake with grow longer and the speed the snake moves at will increase making the game more difficult and challenging to play.

The directional key pad is used to direct the snake around the screen.



Your score will increase (below on game screen) each time a food is eaten.



if the snake hit the wall or itself then it was display the game over screen






# what was a challenge

Snake was created using a grid based rather than a canvas. Using a grid made it more difficult in getting the snake to move and the body to follow along. The biggest challenge in the movement was trying to stop the body (all Div tags behind the head) to stop filling up the whole screen when the snake moves.
The snake is an array and in order the above to not happened each div on the grid had a class <div> class= 'blank'</div> (covering the grid in white). The snake head to be given a new position on each move along the Grid depending on the direction it was moving in. deleting the old position with .shift(); once the snake has moved to more the class 'blank' show again.
as seen below

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



# What was a win

I was quite pleased with the outcome i was able to achieve, to see an old  game that i used to play when i was young being created from an empty programming files to a game.

# what additional features would i add

* Looking back at the project i would  have added a 'highscore' feature so that players can have their score saved for others to try beat it. CSS could of used a bit more work for making the project a bit more stylish within an old-school type game.

* To make things more challenging - if the snake eat 5 foods the snake moves onto a more challenging grid with obstacles that classed as a collision etc.

# what i would do differently
