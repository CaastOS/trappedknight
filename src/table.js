
// Diagonal, horizontal, and vertical lines in the number spiral correspond to polynomials of the form f(n) = 4n^2 + bn + c
const spiralCell = (x, y) => { // x, y are coordinates to pass, the function returns the value inside that cell
    if (x == y & y == 0) return 1;
    else if (-x < y && y <= x) { // This means that we are in the first quadrant
        let n = Math.abs(x);
        return (4 * Math.pow(n, 2)) - (2 * n) + 1 + y - n;
    } else if (-y <= x && x < y) { // This means that we are in the second quadrant
        let n = Math.abs(y);
        return (4 * Math.pow(n, 2)) + 1 - n - x;
    } else if (x <= y && y < -x) { // This means that we are in the third quadrant
        let n = Math.abs(x);
        return (4 * Math.pow(n, 2)) + n + 1 - y;
    } else if (y < x && x <= -y) { // This means that we are in the fourth quadrant
        let n = Math.abs(y);
        return (4 * Math.pow(n, 2)) + (3 * n) + 1 + x;
    }
};


const createTable = (x, y, size) => { // size is equal to the number of rows in each direction (always three in my visualization)

    // x,y = these are requested because, when a move is made, the center cell will become the cell where the knight is
    let divNumber = 1; // first div in DOM
    for (let i = size; i >= -size; i--) { // iterate the bidimensional array from +n to -n (think of it like a Cartesian coordinate system)
        let rowNumber = 1; // first div in .column
        for (let j = -size; j <= size; j++) { // iterate each array object from +n to -n
            currentRow = `#perspective > div:nth-child(${divNumber}) > div:nth-child(${rowNumber})`; // get the item based on CSS selector
            document.querySelector(currentRow).innerHTML = spiralCell(x + j, y + i); // set the current row to the correct value
            rowNumber++;
        }
        divNumber++;
    }
};