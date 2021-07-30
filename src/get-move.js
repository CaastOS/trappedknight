const traps = document.getElementById("traps");
const knightMoves = 8; // a knight can only move in 8 different positions: X +- 2 and Y +- 1 || Y+-2  and X+-1
let addCounter = 0; // used to count the total amount of values pushed into added array
let previousSmaller;
let graphValues;

const nextMove = (currentX, currentY, visited) => {


    let smallestValue;
    let indexOfVisited;
    let indexOfSmallest;

    // there is probably a better way to do this??
    let relativeMoves = []; // coordinates of all the legal moves a knight can do
    relativeMoves.push({
        x: currentX - 2,
        y: currentY + 1,
        get value() { return spiralCell(this.x, this.y); }
    });

    relativeMoves.push({
        x: currentX + 2,
        y: currentY - 1,
        get value() { return spiralCell(this.x, this.y); }
    });

    relativeMoves.push({
        x: currentX - 2,
        y: currentY - 1,
        get value() { return spiralCell(this.x, this.y); }
    });

    relativeMoves.push({
        x: currentX + 2,
        y: currentY + 1,
        get value() { return spiralCell(this.x, this.y); }
    });

    relativeMoves.push({
        x: currentX - 1,
        y: currentY + 2,
        get value() { return spiralCell(this.x, this.y); }
    });

    relativeMoves.push({
        x: currentX + 1,
        y: currentY + 2,
        get value() { return spiralCell(this.x, this.y); }
    });

    relativeMoves.push({
        x: currentX - 1,
        y: currentY - 2,
        get value() { return spiralCell(this.x, this.y); }
    });

    relativeMoves.push({
        x: currentX + 1,
        y: currentY - 2,
        get value() { return spiralCell(this.x, this.y); }
    });


    for (let i = 0; i < knightMoves; i++) { // get the smallest number in relativeMoves not included in visited

        smallestValue = Math.min.apply(Math, relativeMoves.map(function (o) { return o.value; })); // smallestValue before the visited check
        if (visited.includes(smallestValue)) {
            indexOfVisited = relativeMoves.findIndex(el => el.value === smallestValue); // index of smallestValue before the visited check
            relativeMoves.splice(indexOfVisited, 1);
        } else {
            break;
        }
    }

    visited.push(smallestValue); // add this value to the visited ones

    indexOfSmallest = relativeMoves.findIndex(el => el.value === smallestValue); // index of proper smallest value 

    if (indexOfSmallest == -1 && !abort) { // if there is no legal move left
        numberOfMoves = visited.length - 1; // -1 is added because the first cell is not an actual move to consider
        trapsContent = `<div><h5>Starting coordinates:</h5><p> X: ${xInput.value} Y: ${yInput.value}</p></div><div><h5>Final cell:</h5>${previousSmaller} in ${numberOfMoves} moves.</div></div>`;
        traps.innerHTML = trapsContent;
        if (addCounter > 0) { // if there is a manually added value from the user
            let number = "number was";
            if (addCounter > 1) {
                number = "numbers were";
            }
            traps.innerHTML = trapsContent + `<span>${addCounter} ${number} manually added to visited.</span>`;
            addCounter = 0;
        }
        return "trap";

    }

    previousSmaller = smallestValue; // set the previous smallest number to the current smallest number in order to loop
    graphValues.push({ x: relativeMoves[indexOfSmallest].x, y: relativeMoves[indexOfSmallest].y });

    return relativeMoves[indexOfSmallest]; // return X and Y of the smallest value (where the knight will go)
};
