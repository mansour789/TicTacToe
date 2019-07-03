
//== the main array==//
let bord = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

//==storing the elements that we want to edit==//

//background music//
let intro = document.querySelector('#intro');

//win message//
let win = document.querySelector(".win");

//array of blood images//
const viking = document.querySelectorAll('.viking');

//header section//
const header = document.querySelector('header');

//tic tac title//
const title = document.querySelector('header h1');

//sounds effect//
const sword = document.querySelector('#sword');
const swordLast = document.querySelector('#swordLast');
const cat = document.querySelector('#cat');
const catLast = document.querySelector('#catLast');


//play button//
const playBtn = document.querySelector(".playBtn");
//play Again button//
const playBtnAgain = document.querySelector('.playBtnAgain');
//play Auto button//
const playBtnC = document.querySelector('.playBtnC')

//==scoring title==//
const score = document.querySelector('.score');
//==saving the cat and viking score===//
let catScore = document.querySelector('#catScore');
let vikingScore = document.querySelector('#vikingScore');


//==storing big div that have all small divs in it==//
const board = document.querySelector('#board');
//==GIF of cat dance when the cat win===//
const catDance = document.querySelector('#dance');



//==when click play button==//
const startGame = function () {
    //==remove the h2  text==//
    document.querySelector('h2').classList = 'animated bounceOutRight';
    //==display the board to play==//
    board.style.display = 'block';
    //==remove Play button and auto play button==//
    playBtn.classList += ' hinge';
    playBtnC.classList += ' fadeOutLeftBig';
    //==change the music to be more scery!!==//
    intro.setAttribute('src', 'audio/startGame.mp3');
    //==remove the score from the screen==//
    score.style.display = 'none';

}

//==when click playAgain button==//
const restart = function () {
    window.location.reload(true);
}

//==check of AoutPlay mode working===//
let AI = false;
//==counting how many cat pressd , use this in AuotoPlay mode===//
let conter = 0;
//===var for swiching turn==//
let playerTurn = true;
//===when player click for playing==//
const drop = function () {

    //==save the id of the div that clicked==//
    let divPressed = this.id;
    //==save the image of the div that clicked==//
    let image = document.querySelector(`#${divPressed} img`);

    //==looping throughout the 2D array and getting the indx of the element inside the inner array==//

    //==big array===//
    for (let i = 0; i < bord.length; i++) {
        //==inner array==//
        for (let j = 0; j < bord[i].length; j++) {
            //== here you need to see the div ID's to understand the code//
            //==I gave each div an id of "n" and two numbers. //
            //==the first number repreasent the index of the big array//
            //==the seconde number represent the index of inner array//

            //==check for the div that been clicked==//
            if (`n${i}${j}` === divPressed) {

                //== if the Cat turn ==//
                if (playerTurn) {
                    //==if the spot that has been clicked = 0 means it's empty==//
                    if (bord[i][j] === 0) {
                        //==change the value of the element in the main array to be 'C'// 
                        bord[i][j] = "C";
                        //==set the background image  of the div ===//
                        image.setAttribute('src', 'images/cat.gif');
                        //==counting how many cat play , for the autoPlay mode===//
                        conter++;
                        //===check if the autoPlay mode is false==//
                        if (!AI) {
                            //==calling the clicking function with (playerTurn) value of 'false'==//
                            clicking(cat, false);
                        } else {
                            //==calling the clicking functionwith (playerTurn) value of 'true'==//
                            clicking(cat, true);
                            //==calling the autoPlay function==//
                            aifunction();
                        }


                    }//<--end of Cat turn==//

                } else { //==if(playerTurn = false) means viking turn==//
                    //==if the spot that has been clicked = 0 means it's empty==//
                    if (bord[i][j] === 0) {
                        //==change the value of the element in the main array to be 'V'// 
                        bord[i][j] = "V";
                        //==calling the clicking function==//
                        clicking(sword, true);
                        //==set the image background to the div ===//
                        image.setAttribute('src', 'images/vikings.gif');
                    }

                }//<--end of Vikings turn==//
            }//<--end of the if statment==//

        }//<--end of the inner loop==//

    }//<--end of the big loop==//


}//<--end of the function==//

//====checking to win or drow===//
const winGame = function () {
    //====All caces of wining ====//

    if ((bord[0][0] === "V" && bord[0][0] === bord[0][1] && bord[0][0] === bord[0][2]) ||
        (bord[1][0] === "V" && bord[1][0] === bord[1][1] && bord[1][0] === bord[1][2]) ||
        (bord[2][0] === "V" && bord[2][0] === bord[2][1] && bord[2][0] === bord[2][2]) ||

        (bord[0][0] === "V" && bord[0][0] === bord[1][0] && bord[0][0] === bord[2][0]) ||
        (bord[0][1] === "V" && bord[0][1] === bord[1][1] && bord[0][1] === bord[2][1]) ||
        (bord[0][2] === "V" && bord[0][2] === bord[1][2] && bord[0][2] === bord[2][2]) ||

        (bord[0][0] === "V" && bord[0][0] === bord[1][1] && bord[0][0] === bord[2][2]) ||
        (bord[0][2] === "V" && bord[0][2] === bord[1][1] && bord[0][2] === bord[2][0])

    ) {

        //==check vikings win===//
       
        //== set opcity of 'X,O' table to 0.6=====//
        board.style.opacity = '0.6';
        //==calling win theme function===//
        winTheme(swordLast, `Viking has skined another cat`, "#FFF");
        //===calling the fadeOut function ===//
        setTimeout(fadeOut, 100);
        //==calling score function==;;
        scoring('scoreSavedV');
        //==calling play again function==//
        playAgain();
        return;
    }//<--end of check viking win ==//

    //==if cat win===//
    
    if ((bord[0][0] === "C" && bord[0][0] === bord[0][1] && bord[0][0] === bord[0][2]) ||
        (bord[1][0] === "C" && bord[1][0] === bord[1][1] && bord[1][0] === bord[1][2]) ||
        (bord[2][0] === "C" && bord[2][0] === bord[2][1] && bord[2][0] === bord[2][2]) ||

        (bord[0][0] === "C" && bord[0][0] === bord[1][0] && bord[0][0] === bord[2][0]) ||
        (bord[0][1] === "C" && bord[0][1] === bord[1][1] && bord[0][1] === bord[2][1]) ||
        (bord[0][2] === "C" && bord[0][2] === bord[1][2] && bord[0][2] === bord[2][2]) ||

        (bord[0][0] === "C" && bord[0][0] === bord[1][1] && bord[0][0] === bord[2][2]) ||
        (bord[0][2] === "C" && bord[0][2] === bord[1][1] && bord[0][2] === bord[2][0])

    ) {
        //==calling win theme function===//
        winTheme(catLast, `one more cat just survived`, 'red');
        //===cahnge background image and edit the style====//
        document.querySelector('body').style.background = 'url(images/catWin.jpg) no-repeat center center fixed';
        document.querySelector('body').style.backgroundSize = 'cover';
        catDance.style.display = 'block';
        //===stope the background music==  <<--This is bad solution Hope to fix it soon//
        intro.setAttribute('src', ' ');
        //==Adding score==//
        scoring('scoreSavedC');
        //==calling play again function==//
        playAgain();
        return;
    }//<--end of check cat win==// 

    //==check if the game is Draw==//

    if (bord[0][0] && bord[0][1] && bord[0][2] &&
        bord[1][0] && bord[1][1] && bord[1][2] &&
        bord[2][0] && bord[2][1] && bord[2][2]) {
        //===remove title===// 
        header.style.display = 'none';
        //===change text & color of win message then display it==//
        win.innerText = `It's a Draw!`;
        win.style.display = 'block';
        win.style.color = '#B5EDF9';
        //===play again function==//
        playAgain();
        return;

    }//<--end of draw checking====//

} //<-- end of the win function===//


//====play sound when clicked && and change (playerTurn) value ===//
const clicking = function (sond, player) {
    //==play sound effect==//
    sond.play();
    //==swich turn==//
    playerTurn = player;
    //==calling the win function with "C" parameitat==//
    winGame();
}

//====wining theme==//
const winTheme = function (sond, inText, color) {
    //====sound effect==//
    sond.play();
    //===remove title===//
    header.style.display = 'none';
    //===change text of win message then display it==//
    win.innerText = inText;
    win.style.display = 'block';
    //==change color for win message==//
    win.style.color = color;
}

//=====This fuction to let the blood fade out When Viking win===//
const fadeOut = function () {
    //====because it is more than one image we handle it as array===//
    for (let i = 0; i < viking.length; i++) {

        viking[i].style.display = "block";
        //===get the opacity as string==//
        const currentOpacity = getComputedStyle(viking[i]).opacity;
        //===convert it to a float==//
        const currentOpcFloat = parseFloat(currentOpacity);
        //==increace the opacity and save it to variable===//
        let newOpacity = currentOpcFloat + 0.0001;
        //==change to new opacity==//
        viking[i].style.opacity = newOpacity;
        //==keeping incrace opacity intell reach 0.4==//
        if (currentOpcFloat <= 0.4) {
            setTimeout(fadeOut, 10);
        }

    }
}

//===storing the score===//
const scoring = function (whoScore) {

    //==checking if there score that been saved===//
    if (sessionStorage.getItem(whoScore) == undefined) {
        //===if there no saved score make score =  1====//
        sessionStorage.setItem(whoScore, '1');
    } else {
        //==if there is a saved score get the score and add 1 to it====//
        let scoreString = sessionStorage.getItem(whoScore);
        let scoreIntger = parseInt(scoreString) + 1;
        let scorGet = sessionStorage.setItem(whoScore, scoreIntger.toString());
        return scorGet;
    }

}

//=====play again function===//
const playAgain = function () {
    //===display play again button===//
    playBtnAgain.style.display = 'block';
    //==edit the score==//
    catScore.innerText = sessionStorage.getItem('scoreSavedC');
    vikingScore.innerText = sessionStorage.getItem('scoreSavedV');
    //==display the score==//
    score.style.display = "block";
}


//======Ceating AutoPlay Mode ;) ======//

const aifunction = function () {
    // console.log('ffdsf');
    let random1 = Math.floor(Math.random() * 3);
    let random2 = Math.floor(Math.random() * 3);

    let imageq = document.querySelector(`#n${random1}${random2} img`);
    // console.log(imageq);
    console.log(conter);
    if (bord[random1][random2] === 0) {
        bord[random1][random2] = "V";
        clicking(sword, true);
        imageq.setAttribute('src', 'images/vikings.gif');
    } else {

        if (conter < 5) {
            aifunction();
        }
    }
}


//==starting the AutoPlay mode function when AutoPlay button click==//
const startAI = function () {
    AI = true;
    startGame();
}

//==adding th click event to the buttons==//
playBtn.addEventListener('click', startGame);
playBtnAgain.addEventListener('click', restart);
playBtnC.addEventListener('click', startAI);

//==adding click event to the div's==//

let box = document.querySelectorAll('.box');

    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('click', drop);
    }