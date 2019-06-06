class Rover {
  constructor(name, x, y) {
    this.name = name;
    this.direction = 'N';
    this.x = x;
    this.y = y;
    this.travelLog = [];
  }

  // turn the rover left 90 degrees
  turnLeft() {
    switch (this.direction) {
      case 'N':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'N';
        break;
      default:
    }
  }

  // turn the rover right 90 degrees
  turnRight() {
    switch (this.direction) {
      case 'N':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'S';
        break;
      case 'S':
        this.direction = 'W';
        break;
      case 'W':
        this.direction = 'N';
        break;
      default:
    }
  }

  // avoid movement outside the 10x10 grid
  planetEnforcer() {
    if (this.y - 1 < 0) {
      return false;
    }
    if (this.x + 1 > 9) {
      return false;
    }
    if (this.y + 1 > 9) {
      return false;
    }
    if (this.x - 1 < 0) {
      return false;
    }
    return true;
  }

  // move forward
  forward() {
    switch (this.direction) {
      case 'N':
        if (this.planetEnforcer()) {
          this.y -= 1;
        }
        break;
      case 'E':
        if (this.planetEnforcer()) {
          this.x += 1;
        }
        break;
      case 'S':
        if (this.planetEnforcer()) {
          this.y += 1;
        }
        break;
      case 'W':
        if (this.planetEnforcer()) {
          this.x -= 1;
        }
        break;
      default:
    }
  }

  // move backward
  backward() {
    switch (this.direction) {
      case 'N':
        this.y += 1;
        break;
      case 'E':
        this.x -= 1;
        break;
      case 'S':
        this.y -= 1;
        break;
      case 'W':
        this.x += 1;
        break;
      default:
    }
  }

  // Keep track of the rover movements and save then in
  // travel log array.
  roverTracker() {
    this.travelLog.push([this.x, this.y]);
  }

  // command the rover
  command(list) {
    const validCommands = 'lrfb';
    for (let i = 0; i < list.length; i += 1) {
      if (validCommands.includes(list[i])) {
        switch (list[i]) {
          case 'f':
            this.forward();
            this.roverTracker();
            break;
          case 'b':
            this.backward();
            this.roverTracker();
            break;
          case 'l':
            this.turnLeft();
            break;
          case 'r':
            this.turnRight();
            break;
          default:
        }
      } else {
        console.log(`${list[i]} it's not a valid`);
        break;
      }
    }
  }
}

const golliath = new Rover('Golliath', 0, 0);
