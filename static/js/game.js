// getting all the boxes Ids
const boxes = {};
for (let i = 1; i <= 49; i++) {
    boxes[`box${i}`] = document.getElementById(i.toString());
}
let box1 = boxes.box1;

var scoreWin = 0;
var scoreLose = 0;

function updateScoreBoard(number) {

    if (number < 0) {
        scoreLose += 1;
    } else if (number > 0) {
        scoreWin += 1;
    }

    document.getElementById("loses").innerHTML = scoreLose;
    document.getElementById("wins").innerHTML = scoreWin;
}

updateScoreBoard(0);

// define a default value
let currentBox = box1;
currentBox.style.backgroundColor = "#f5f5f5";

const snakeTail = [currentBox];

// the funcrtion to chnage bg color when moving
function moveBox(newBox) {
    // check if snake ate itself
    if (snakeTail.some(box => box === newBox)) {
        alert("You just ate yourself!");
        updateScoreBoard(-1);
        newGame();
        return;
    }
    // Check if the new box is an apple (background image exists)
    if (newBox.style.backgroundImage.includes("apple-96.png")) {
        // Add the new box to the snake's tail
        snakeTail.push(newBox);
        newBox.style.backgroundColor = "#f5f5f5"; // Turn the box into part of the snake
        newBox.style.backgroundImage = "";
        callApple(); // Generate a new apple
    } else {
        // Clear the tail's last box if the snake moves without eating
        const tailEnd = snakeTail.shift(); 
        tailEnd.style.backgroundColor = ""; // Clear the last box's color
        snakeTail.push(newBox); // Add the new box to the snake's tail
        newBox.style.backgroundColor = "#f5f5f5";  // Set the new box color
    }
    
    currentBox = newBox; // Update to the new box
}

// get a random number within range of the boxes
function getRandomInt(min, max) {
    const availableBoxes = [];
    for (let i = min; i <= max; i++) {
        if (!snakeTail.some(box => box.id === i.toString()) && i.toString() !== currentBox.id) {
            availableBoxes.push(i);
        }
    }

    if (availableBoxes.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * availableBoxes.length);
    return availableBoxes[randomIndex]


}

// chnages the random box bg color
function randomApple(integer) { 
    var randomBox = document.getElementById(integer.toString());
    randomBox.style.backgroundColor = ""; // Clear any existing background color
    randomBox.style.backgroundImage = "url('./static/assets/apple-96.png')"; // Set the image as background
    randomBox.style.backgroundSize = "cover"; // Ensure the image covers the box
    randomBox.style.backgroundPosition = "center"; // Center the image
}
// merging 2 functions above into one
function callApple() {
    var randomNumber = getRandomInt(1, 49);
    if (randomNumber === null) {
        // alert("Game Over! No space left for a new apple!");
        return;
    }
    randomApple(randomNumber);
}


// waiting for user's movement
document.addEventListener("keydown", (event) => {

    // handle the winning scenario
    if (snakeTail.length === 49) {
        alert("Game Over! You've filled the entire grid!");
        updateScoreBoard(1)
        newGame();
        return;
    }
    // moving the snake by user
    if (event.key === "ArrowUp" && currentBox.id > 7) {
        moveBox(document.getElementById((+currentBox.id - 7).toString()));
    } else if (event.key === "ArrowDown" && currentBox.id < 43) {
        moveBox(document.getElementById((+currentBox.id + 7).toString()));
    } else if (event.key === "ArrowLeft" && currentBox.id % 7 !== 1) {
        moveBox(document.getElementById((+currentBox.id - 1).toString()));
    } else if (event.key === "ArrowRight" && currentBox.id % 7 !== 0) {
        moveBox(document.getElementById((+currentBox.id + 1).toString()));
        // crossing walls conditions
    } else if (event.key === "ArrowUp" && !(currentBox.id > 7)) {
        moveBox(document.getElementById((+currentBox.id + 42).toString()));
    } else if (event.key === "ArrowDown" && !(currentBox.id < 43)) {
        moveBox(document.getElementById((+currentBox.id - 42).toString()));
    } else if (event.key === "ArrowLeft" && !(currentBox.id % 7 !== 1)) {
        moveBox(document.getElementById((+currentBox.id + 6).toString()));
    } else if (event.key === "ArrowRight" && !(currentBox.id % 7 !== 0)) {
        moveBox(document.getElementById((+currentBox.id - 6).toString()));
    }
    // checking if an apple already exists
    let hasApple = false;
    for (var i = 1; i <= 49; i++) {
        if (boxes[`box${i}`].style.backgroundImage.includes("apple-96.png")) {
            hasApple = true;
            break;
        }
    }

    if (!hasApple) {
        callApple();
    }
});

// clearing all apples and back to default
function newGame() {
    for (var i = 1; i <= 49; i++) {
        document.getElementById(i.toString()).style.backgroundColor = "";
        document.getElementById(i.toString()).style.backgroundImage = "";
    }
    currentBox = box1
    currentBox.style.backgroundColor = "#f5f5f5";
    snakeTail.length = 1;
    snakeTail[0] = currentBox;
}


// apple existence check
function checkApple() {
    // checking if an apple already exists
    let hasApple = false;
    for (var i = 1; i <= 49; i++) {
        if (boxes[`box${i}`].style.backgroundImage.includes("apple-96.png")) {
            hasApple = true;
            break;
        }
    }

    if (!hasApple) {
        callApple();
    }
}

// mobile buttons configuration
function moveup() {
    if (currentBox.id > 7) {
        moveBox(document.getElementById((+currentBox.id - 7).toString()));
    } else {
        moveBox(document.getElementById((+currentBox.id + 42).toString()));
    }
    checkApple();
}

function moveright() {
    if (currentBox.id % 7 !== 0) {
        moveBox(document.getElementById((+currentBox.id + 1).toString()));
    } else {
        moveBox(document.getElementById((+currentBox.id - 6).toString()));
    }
    checkApple();
}

function moveleft() {
    if (currentBox.id % 7 !== 1) {
        moveBox(document.getElementById((+currentBox.id - 1).toString()));
    } else {
        moveBox(document.getElementById((+currentBox.id + 6).toString()));
    }
    checkApple();
}

function movedown() {
    if (currentBox.id < 43) {
        moveBox(document.getElementById((+currentBox.id + 7).toString()));
    } else {
        moveBox(document.getElementById((+currentBox.id - 42).toString()));
    }
    checkApple();
}