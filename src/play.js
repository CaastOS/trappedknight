const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const addButton = document.getElementById("add-visited");
const addInput = document.getElementById("visited");
const xInput = document.getElementById("x");
const yInput = document.getElementById("y");
const centerDiv = document.getElementById("center");
const modalButton = document.getElementById("modal-button");
const modalClose = document.getElementById("close-modal");
const modal = document.getElementById("stats");
let abort;
let chart;
let visited = [];

const play = () => {
    graphValues = []; // array passed to Chart.js in order to create the chart
    let divTo; // this is going to be used to determine the div containing the next move based on the difference of the coordinates
    let speed = document.getElementById("speed").value; // get the speed selected by the user in the input[type=range]

    // get the starting X and Y, if nothing is inserted, they equals to 0
    let currentX = parseInt(xInput.value);
    if (isNaN(currentX)) currentX = 0;
    let currentY = parseInt(yInput.value);
    if (isNaN(currentY)) currentY = 0;

    // temp variables used later in the code to get the difference in (X,Y) of the current loop (where the knight moved)
    let divX = currentX;
    let divY = currentY;

    visited.push(spiralCell(currentX, currentY)); // inizialize the visited array with the first value (the one we start from)
    createTable(currentX, currentY, 3); // inizialize the first table with coordinates given by the user

    stopButton.addEventListener("click", () => { // when the stop button is clicked, set abort = true (in order to let the last animation end before stopping it)
        abort = true; // set abort to true, so the current loop can finish the animation and end without overlapping (in case the user spams play and stop)
    });

    const displayTable = setInterval(() => {
        let newCoord = nextMove(currentX, currentY, visited); // nextMove returns the coordinates of the next move the knight has to make

        if (newCoord == "trap" || abort) { // trap is the return given when we encounter a trap, and we need to stop
            if (!abort) { // if it ended because the knight has no other move, create the chart
                createGraph();
                modalButton.disabled = false;
            }//
            clearInterval(displayTable);   // stop the setInterval()
            stop(); // reset the buttons' state and the visited array
        } else {
            currentX = newCoord.x;
            currentY = newCoord.y;
            divX = currentX - divX; // the difference between the new and the old coordinates, resulting in the effective movement of the knight
            divY = -(currentY - divY); // this is multiplied by -1 since HTML div:nth-child(n) works the exact opposite way (1 is down, -1 is up)
            divTo = document.querySelector(`#perspective > div:nth-child(${4 + divY}) > div:nth-child(${4 + divX})`); // 4:4 is the center of the table
            animation(divTo, speed, divX, divY); // if the speed is adeguate, animate the knight's movement
            setTimeout(() => createTable(currentX, currentY, 3), speed / 2); // wait for animation to finish (both are speed/2) and create another table based on the new coords
            divX = currentX; // old coordinates are now new coordinates, waiting for the next cycle
            divY = currentY;
        }
    }, speed);
};

const inizialize = () => {  // disable all the buttons but "Stop"
    playButton.disabled = true;
    abort = false;
    stopButton.disabled = false;
    xInput.readOnly = true;
    yInput.readOnly = true;
    modalButton.disabled = true;
    addButton.disabled = true;
};

const stop = () => { // enable all the buttons but "Stop"
    stopButton.disabled = true;
    xInput.readOnly = false;
    yInput.readOnly = false;
    playButton.disabled = false;
    addButton.disabled = false;
    visited = [];
};

const animation = (divTo, speed, divX, divY) => {
    if (speed > 300) { // speed limit for animations is 300, below that value it starts to get REALLY messy

        const toLetter = {
            "1": "one",
            "2": "two",
        };

        let classX = divX.toString().replace(/\b(?:1|2)\b/gi, matched => toLetter[matched]); // replace the X value with the written equivalent
        let classY = divY.toString().replace(/\b(?:1|2)\b/gi, matched => toLetter[matched]); // replace the Y value with the written equivalent

        let classCSS = classX + classY; // CSS class of the correct animation

        divTo.classList.add("selected"); // add the selected class to the destination square
        knight.classList.add(classCSS); // add the classCSS class to the knight, translating it to the correct cell

        setTimeout(() => {
            knight.classList.remove(classCSS); // remove the classCSS class to the knight
            divTo.classList.remove("selected"); // remove the selected class to the destination square
            knight.classList.add("trans-center"); // move the item back to the center smoothly
        }, speed / 2);

        knight.classList.remove("trans-center"); // remove the trans-center class once the knight is in the center
    }
};

const createGraph = () => {

    const colorScale = []; // inizialize the background color array

    for (i = 0; i < graphValues.length; i++) { // iterate through every item and give it a background color to be passed as data.datasets.backgroundColor
        if (i <= 500) colorScale.push("#e63946");
        else if (i <= 1000) colorScale.push("#1982c4");
        else if (i <= 1500) colorScale.push("#8ac926");
        else if (i <= 2000) colorScale.push("#ffca3a");
        else if (i <= 3000) colorScale.push("");
        else colorScale.push("#f9c74f");
    }

    const data = {
        type: 'scatter', // chart type
        data: {
            datasets: [{
                data: graphValues,
                borderColor: "white", // color of the line between each point
                backgroundColor: colorScale, // background color
                borderWidth: 0.1,
                pointRadius: 2,
                pointHoverRadius: 2,
                fill: false,
                tension: 0, // keep the lines straight
                showLine: true // show the lines
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // do not display X and Y labels
                },
                zoom: {
                    pan: {
                        enabled: window.screen.width >= 1280, // if the user is from computer, consent to move around the chart
                        mode: 'xy'
                    },
                    zoom: {
                        wheel: {
                            enabled: window.screen.width >= 1280 // if the user is from computer, consent to zoom into the chart
                        },
                        mode: 'xy'
                    }
                }
            },
            scales: {
                x: {
                    display: false // do not display X and Y axis
                },
                y: {
                    display: false // do not display X and Y axis
                }
            }
        }
    };
    new Chart(graph, data);
};

const addVisited = () => { // add the value inserted to addInput to visited
    value = parseInt(addInput.value);
    if (!isNaN(value)) {
        visited.push(value);
        addCounter++;
    }
    addInput.value = "";
};