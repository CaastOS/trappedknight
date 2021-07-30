document.addEventListener("DOMContentLoaded", function () { // when the page is loaded

    if (getCookieValue("doNotShow") == "") { // if there isn't a cookie named doNotShow (added when the do not show cell on tutorial is pressed), display the tutorial
        displayTutorial();
    } else { // remove the tutorial from DOM
        tutorial.remove();
    }

    createTable(0, 0, 3); // display the default table

    addButton.addEventListener('click', () => { // when the add to visited button is pressed
        addVisited();
    });

    modalButton.addEventListener('click', (e) => { // when the stats button is pressed
        modal.classList.add('active');
        e.preventDefault();
    });

    modalClose.addEventListener('click', (e) => { // when the button to close the modal (stats) is pressed
        modal.classList.remove('active');
        e.preventDefault();
    });

    playButton.addEventListener('click', () => { // on "Play" click
        inizialize(); // disable "Play" and coordinates interaction. Enable "Stop"
        play(); // run the alghorithm
    });
});
