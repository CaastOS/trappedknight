const tutorial = document.getElementById("explaination");
const tutorialTitle = document.getElementById("title");
const tutorialText = document.getElementById("text");

const displayTutorial = () => { // display the tutorial modal
    const closeTutorial = document.getElementById("close-tutorial");
    const nextPage = document.getElementById("next");
    const previousPage = document.getElementById("previous");
    const cookieCheck = document.getElementById("cookie");
    let pageCounter = 0;
    const pages = [
        { title: "Welcome to The Trapped Knight!", text: `This short tutorial is intended for those who are not familiar with "The Trapped Knight" problem, and would therefore not understand what this visualisation is about. In addition, in this application there is the possibility of messing with settings that are not normally changeable in the original problem, which opens up even more possibilities.<br><br> If you want to skip the tutorial, feel free to press the "X" at the top right and experiment as much as you like. If you do not want to see this tutorial again, select "Do not show again".` },
        { title: "What is The Trapped Knight?", text: `The Trapped Knight problem is a chess-based problem invented by Neil Sloane. The board consists of a square spiral of numbers, starting with a finite number (1) and continuing to infinity. The knight starts in the initial square and moves according to the rules of chess, but can only move to the square with the smallest number, and can never return there.<br><br> See <a href="https://www.youtube.com/watch?v=RGQe8waGJ4w" target="_blank">this Numberphile video</a> (which inspired me to create this application!) to get a better idea of the mathematics behind this problem.` },
        { title: "What is the problem then?", text: `The problem is that, eventually, the knight is going to get trapped, having no other legal move to make. The interesting thing is that this only happens after 2015 steps, in a sequence that seems very random and asymmetrical. It’s important to realise that, as the Medium.com writer Maarten Mortier already pointed out, the way this grid is built is ultimately what leads to the strange <a href="https://en.wikipedia.org/wiki/Collatz_conjecture">Collatz-sequence</a> like nature.  <br><br>In addition, as I already mentioned, in order to make the problem even more interesting I have taken the liberty of bending the rules slightly and adding other interactive features.` },
        { title: "What are these features?", text: `What would happen if the knight started in a square that is not (0,0)? That's exactly what I asked myself, and to answer this dilemma I added the possibility of starting from a different point on the map, by adding a custom X and Y in the appropriate inputs. Then, inspired by a comment under Numberphile's video, I also added the possibility of marking squares as already visited from the beginning, leading to a significant change in the knight's path.<br><br> The result of these operations can be seen (along with other statistics) by clicking on the "Stats" button, which will light up once the knight has stopped.` }
    ];

    nextPage.addEventListener('click', () => { // on event "click" on the next page button, if the page is not the last one, change page
        if (pageCounter != pages.length - 1) changeToNextPage();
    });

    previousPage.addEventListener('click', () => { // on event "click" on the previous page button, if the page is not the first one, change page
        if (pageCounter != 0) changeToPreviousPage();
    });

    cookieCheck.addEventListener('click', () => { // if the "do not show" button is pressed when the modal is closed, add the cookie doNotShow to the user's browser
        addCookies();
    });

    closeTutorial.addEventListener('click', () => { // if the X is pressed, close the modal (delete it from DOM)
        closeTutorialModal();
    });

    displayPage(pages, pageCounter);    // display the first page
    tutorial.style.display = "block";   // show the DIV

    const addCookies = () => {
        closeTutorial.addEventListener('click', () => {
            if (cookieCheck.checked) {
                document.cookie = "doNotShow = true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            }
        });
    };

    const changeToNextPage = () => {
        pageCounter++;
        displayPage(pages, pageCounter);
    };

    const changeToPreviousPage = () => {
        pageCounter--;
        displayPage(pages, pageCounter);
    };

    const closeTutorialModal = () => {
        tutorial.remove();
    };


};

const displayPage = (pages, pageCounter) => {
    tutorialTitle.innerHTML = pages[pageCounter].title;
    tutorialText.innerHTML = pages[pageCounter].text;
};

const getCookieValue = name => ( // gets the cookie value of the string you pass as argument
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
);