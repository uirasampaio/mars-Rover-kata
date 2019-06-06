// Rovers
let roversTeam = [
  {name: 'Buzz', direction: 'N', X: 0, Y: 0, travelLog: []},
  {name: 'Armstrong', direction: 'S', X: 0, Y: 5, travelLog: []},
  {name: 'Gagarin', direction: 'W', X: 0, Y: 9, travelLog: []}
];

// Rovers planet dimensions
const planet = [
  [null, null, null, null, null, null, 'rock', null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  ['Giant rock', null, null, 'space garbage', null, null , null, null, 'Elon musk', null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, 'Rock', null, null, null, null, null, 'Douglas Adams', null, null],
  [null, null, null, null, null, null, null, null, null, null],
  ['NASA', null, null, null, null, 'Alien', null, null, null, null],
  [null, null, null, null, null, null, null, null, null , null],
  [null, null, 'alien spaceship', null, 'Another Rock', null, null, null, null, null],
  ['Moon Rock', null, null, null, null, null, null, null, 'starbucks', null],
];
//

// keep track of the rover movements
function roverLog(rover) {
  rover.travelLog.push([rover.X, rover.Y]);
}

// find objects in the planet to avoid collision
function geoMap() {
  const objectsArray = []; 
  for (let i = 0; i < planet.length; i++) {
    for (let r = 0; r < planet[i].length; r++) {
      if (planet[i][r] !== null) {
        objectsArray.push([i, r]);
      }
    }
  }
  return objectsArray;
}
// keep track of the movements of the rover
function tracker(rover) {
  planet[rover.X][rover.Y] = rover.name;
}
// remove the rover last location
function cleanLast(rover) {
  planet[rover.X][rover.Y] = null;
}
// Change the rover after each movement
function randomRover() { 
  let roving = roversTeam[Math.floor(Math.random() * 3)];
  return roving;
}
// turn the rover 90degrees left
function turnLeft(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    default:
  }
}
// turn the rover 90degrees right
function turnRight(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
      break;
    default:
  }
}

// move the rover foward, avoid the movement outside the grid and avoid object collision
function moveForward(rover) {
  const position = geoMap();
  switch (rover.direction) {
    case 'N':
      if ((rover.Y - 1) < 0) {
        console.log(`Rover ${rover.name} it's trying to leave the planet`);
      } else if (!position.includes([rover.Y - 1], [rover.X])) {
        console.log('Avoid Collision');
      } else {
        rover.Y--;
        roverLog(rover);
      }
      break;
    case 'E':
      if ((rover.X + 1) > 9) {
        console.log(`Rover ${rover.name} it's trying to leave the planet`);
      } else if (!position.includes([rover.Y], [rover.X + 1])) {
        console.log('Avoid collision');
      } else {
        rover.X++;
        roverLog(rover);
      }
      break;
    case 'S':
      if ((rover.Y + 1) > 9) {
        console.log(`Rover ${rover.name} its trying to leave the planet`);
      } else if (!position.includes([[rover.X], [rover.Y + 1]])) {
        console.log('Avoid collision');
      } else {
        rover.Y++;
        roverLog(rover);
      };
      break;
    case 'W':
      if ((rover.X - 1) < 0) {
        console.log(`Rover ${rover.name} It's trying to leave the planet`);
      } else if (!position.includes([[rover.X - 1], [rover.Y]])) {
        console.log('Avoid collision');
      } else {
        rover.X--;
        roverLog(rover);
      }
      break;
    default:
  }
}
// move the Rover backward, avoid the movement outside the grid and avoid object collision
function moveBackwards(rover) {
  let position = geoMap();
  switch (rover.direction) {
    case 'N':
      if ((rover.Y + 1) > 9) {
        console.log(`Rover ${rover.name} It's trying to leave the planet.`);
      } else if (!position.includes([[rover.X], [rover.Y + 1]])) {
        console.log('Avoid collision');
      } else {
        rover.Y++;
        roverLog(rover);
      }
      break;
    case 'E':
      if ((rover.X - 1) < 0) {
        console.log(`Rover ${rover.name} It's trying to move out of planet`);
      } else if (!position.includes([[rover.X - 1], [rover.Y]])) {
        console.log('Avoid collision');
      } else {
        rover.X--;
        roverLog(rover);
      }
      break;
    case 'S':
      if ((rover.Y - 1) < 0) {
        console.log(`Rover ${rover.name} It's trying to move out of planet `);
      } else if (!position.includes([[rover.X], [rover.Y - 1]])) {
        console.log('Avoid collision');
      } else {
        rover.Y--;
        roverLog(rover);
      }
      break;
    case 'W':
      if ((rover.X + 1) > 9) {
        console.log(`Rover ${rover.name} It's trying to move out of planet`);
      } else if (!position.includes([[rover.X + 1], [rover.Y]])) {
        console.log('Avoid collision');
      } else {
        rover.X++;
        roverLog(rover);
      }
      break;
    default:
  }
}
// check if the command is valid, execute the movements of the rover and
// return the travel log information
function command(list) {
  const validCommands = 'lrfb';
  let rover = randomRover();
  for (let i = 0; i < list.length; i++) {
    if (validCommands.includes(list[i])) {
      switch (list[i]) {
        case 'f':
          cleanLast(rover);
          moveForward(rover);
          tracker(rover);
          rover = randomRover();
          break;
        case 'b':
          cleanLast(rover);
          moveBackwards(rover);
          tracker(rover);
          rover = randomRover();
          break;
        case 'l':
          turnLeft(rover);
          break;
        case 'r':
          turnRight(rover);
          break;
        default:
      }
    } else {
      console.log(`${list[i]} Its not a valid move. Rover will not move! Execute 'roverManual' for help.`);
    }
  }
}

// Manual of rover movements
function roverManual() {
  console.log(` The rover valid commands are: 
  'l' - will turn the rover 90 degrees left
  'r' - will turn the rover 90 degrees right
  'f' - will move the rover forward
  'b' - will move the rover backwards`);
}
