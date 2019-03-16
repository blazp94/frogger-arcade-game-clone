// rock's dimensions approximately 101x 171, removing shadow
const X = 100; // X is the width of rock, pixels a player moves in each step
const Y = 83; // Y is pixels a player moves vertically in each step
const right = 5 * X;
const doljekorner = 5 * Y;
const levo = X;
const toptop = 0;
const bugsDesniugo = 6 * Y;

/**
 * @constructor
 * @param {number} row 
 * @param {number} speed    
 */
var Enemy = function(row, speed) {
    // speed indicating number of pixels to be moved per frame of animation
    this.x = -50;
    this.y = row * 72;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game

/**
 *  This function is called for every update of the game
 *  and updates the position of the enemy depending upon his position
 * @param {number} dt delta time
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > bugsDesniugo) {
        // to avoid memory wastage reusing older enemy instances
        this.x = -101; // so that it seems as new one
        this.y = getRandRow() * 70;
    } else
        this.x = this.x + this.speed * dt;
    this.checkCollisions();
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

/**
 *  Checks collision occured or not
 *  if occurred it conveys the same and loads the game again.
 *
 */
Enemy.prototype.checkCollisions = function() {
    if ((Math.abs(player.y - this.y) < 20) && (Math.abs(player.x - this.x) < 50)) {
        alert("You death\n Try again");
        location.reload();
    }
};

var Player = function() {
    this.x = 2 * X;
    this.y = 4 * 75;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    this.checkWinning();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if player has reached to water and reset the game by changing players positions and keeping bugs count same.
Player.prototype.checkWinning = function() {
        if (this.y == -32) {
            alert("WINNN");
            // Resetting the position of the player to again normal block
            this.y = 4 * 75;
        }
    }
    /**
     *  handles the key pressed by the player and updates position and status.
     *
     * @param {string} keyPressed which is pressed by the player
     */
Player.prototype.handleInput = function(keyPressed) {
    if ((keyPressed === 'left') && (this.x >= levo)) {
        this.x -= X;
    } else if ((keyPressed === 'right') && (this.x <= right)) {
        this.x += X;
    }
    // the canvas measures from top to bottom so opposite signs unlike normal algebra
    else if ((keyPressed === 'up') && (this.y >= toptop)) {
        if (this.y == -32) {
            this.checkWinning();
        } else {
            this.y -= Y;
        }
    } else if ((keyPressed === 'down') && (this.y <= doljekorner)) {
        this.y += Y;
    }
};

// Player object as am instant of Player class.
var player = new Player();

// list of enemies currently on screen with diffrent speeds.
var thizEnemies = [];
thizEnemies.push(new Enemy(getRandRow(), 200));
thizEnemies.push(new Enemy(getRandRow(), 100));

setTimeout(addEnemy, 3000, 50);
setTimeout(addEnemy, 5000, 100);
setTimeout(addEnemy, 100000, 150);
setTimeout(addEnemy, 15 * 1000, 200);

/**
 * adds the newly created enemy in a random row.
 *
 * @param {number} speed speed of the enemy to be added
 */
function addEnemy(speed) {
    thizEnemies.push(new Enemy(getRandRow(), speed));
}

/**
 *  Function to get random row
 *
 * @returns {number} row number among 1,2,3 returned randomly
 */
function getRandRow() {
    return (Math.floor(Math.random() * 3) + 1);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});