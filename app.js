const start = performance.now();
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

//==scoring title==//
const score = document.querySelector('.score');
//==store the cat and viking score===//
let catScore = document.querySelector('#catScore');
let vikingScore = document.querySelector('#vikingScore');


//==storing parent div==//
const board = document.querySelector('#board');
//==storing div's children of the parent div==//
const q1 = document.querySelector('#n00');
const q2 = document.querySelector('#n01');
const q3 = document.querySelector('#n02');

const q4 = document.querySelector('#n10');
const q5 = document.querySelector('#n11');
const q6 = document.querySelector('#n12');

const q7 = document.querySelector('#n20');
const q8 = document.querySelector('#n21');
const q9 = document.querySelector('#n22');

const catDance = document.querySelector('#dance');



//==when click play button==//
const startGame = function () {
    //==remove the h2  text==//
    document.querySelector('h2').classList = 'animated bounceOutRight';
    //==display the board to play==//
    board.style.display = 'block';
    //==remove Play button==//
    playBtn.classList += ' hinge';
    //==change the music to be more scery!!==//
    intro.setAttribute('src', 'audio/startGame.mp3');
    //==remove the score from the screen==//
    score.style.display = 'none';
    
}

//==when click playAgain button==//
const restart = function () {
    window.location.reload(true);
}


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
                        //==calling the clicking function==//
                        clicking(cat, false, "C")
                        //==set the image background to the div ===//
                        image.setAttribute('src', 'images/cat.gif');
                    }//<--end of Cat turn==//

                } else { //==if(playerTurn = false) means viking turn==//
                    //==if the spot that has been clicked = 0 means it's empty==//
                    if (bord[i][j] === 0) {
                        //==change the value of the element in the main array to be 'V'// 
                        bord[i][j] = "V";
                        //==calling the clicking function==//
                        clicking(sword, true, "V");
                        //==set the image background to the div ===//
                        image.setAttribute('src', 'images/vikings.gif');
                    }

                }//<--end of Vikings turn==//
            }//<--end of the if statment==//

        }//<--end of the inner loop==//

    }//<--end of the big loop==//


}//<--end of the function==//

//====checking to win or drow===//
const winGame = function (whoPlaying) {
    //====All caces of wining ====//

    if ((bord[0][0] !== 0 && bord[0][0] === bord[0][1] && bord[0][0] === bord[0][2]) ||
        (bord[1][0] !== 0 && bord[1][0] === bord[1][1] && bord[1][0] === bord[1][2]) ||
        (bord[2][0] !== 0 && bord[2][0] === bord[2][1] && bord[2][0] === bord[2][2]) ||

        (bord[0][0] !== 0 && bord[0][0] === bord[1][0] && bord[0][0] === bord[2][0]) ||
        (bord[0][1] !== 0 && bord[0][1] === bord[1][1] && bord[0][1] === bord[2][1]) ||
        (bord[0][2] !== 0 && bord[0][2] === bord[1][2] && bord[0][2] === bord[2][2]) ||

        (bord[0][0] !== 0 && bord[0][0] === bord[1][1] && bord[0][0] === bord[2][2]) ||
        (bord[0][2] !== 0 && bord[0][2] === bord[1][1] && bord[0][2] === bord[2][0])

    ) {

        //==check vikings win===//
        if (whoPlaying === 'V') {

            //== set opcity of 'X,O' table to 0.6=====//
            board.style.opacity = '0.6';
            //==winning theme function===//
            winTheme(swordLast, `Viking has skined another cat`, "#FFF");
            //===calling the fadeOut function ===//
            setTimeout(fadeOut, 100);
            //==Adding score function==;;
            scoring('scoreSavedV');
        }//<--end of check viking win==//

        //==if cat win===//
        if (whoPlaying === 'C') {
            //==winning theme function===//
            winTheme(catLast, `one more cat just survived`, 'red');
            //===cahnge background image and edit the style====//
            document.querySelector('body').style.background = 'url(images/catWin.jpg) no-repeat center center fixed';
            document.querySelector('body').style.backgroundSize = 'cover';
            catDance.style.display = 'block';
            //===stope the background music====//
            intro.setAttribute('src', ' ');
            //==Adding score==//
            scoring('scoreSavedC');
        }//<--end of check cat win==//

        //==calling play again function==//
        playAgain();


    }//<--end of checking all caces of win==// 

    //==check if the game is Draw==//

    if (bord[0][0] && bord[0][1] && bord[0][2] &&
        bord[1][0] && bord[1][1] && bord[1][2] &&
        bord[2][0] && bord[2][1] && bord[2][2] !== 0) {
        //===remove title===// 
        header.style.display = 'none';
        //===change text & color of win message then display it==//
        win.innerText = `It's a Draw!`;
        win.style.display = 'block';
        win.style.color = '#B5EDF9';
        //===play again function==//
        playAgain();

    }//<--end of draw checking====//
    
} //<-- end of the win function===//


//====drawing image and play sound when clicked===//
const clicking = function (sond, player, val) {
    //==play sound effect==//
    sond.play();
    //==swich turn==//
    playerTurn = player;
    //==calling the win function with "C" parameitat==//
    winGame(val);
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
        let VS = sessionStorage.getItem(whoScore);
        let VI = parseInt(VS) + 1;
        let scorGet = sessionStorage.setItem(whoScore, VI.toString());
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


//==playing with the jenes===//
const jenes = function(){
    let jene = document.querySelectorAll('.jene');
    
    for (let i = 0; i < jene.length; i++) {
        let random1 = Math.floor(Math.random() * 70);     
         let random2 = Math.floor(Math.random() * 70);

        jene[i].style.display = 'block';
        jene[i].style.top = `${random1}%`;
        jene[i].style.left = `${random2}%`;
        jene[i].style.width = `${random2}%`;
        jene[i].style.height = `${random1}%`

        
    }
}









//======Ceating AI ;) ======//


// const ai = function (conter) {
//     // console.log('ffdsf');
//     let random1 = Math.floor(Math.random() * 3);
//     let random2 = Math.floor(Math.random() * 3);

//     let imageq = document.querySelector(`#n${random1}${random2} img`);
//     // console.log(imageq);

//     if (bord[random1][random2] === 0) {
//         bord[random1][random2] = "V";
//         sword.play();
//         imageq.setAttribute('src', 'images/vikings.gif');
//         winGame('V');
//     } else {
//         ai();
//     }
// }




//==adding th click event to the buttons==//
playBtn.addEventListener('click', startGame);
playBtnAgain.addEventListener('click', restart);

//==adding click event to the div's==//


q1.addEventListener('click', drop);
q2.addEventListener('click', drop);
q3.addEventListener('click', drop);
q4.addEventListener('click', drop);
q5.addEventListener('click', drop);
q6.addEventListener('click', drop);
q7.addEventListener('click', drop);
q8.addEventListener('click', drop);
q9.addEventListener('click', drop);



const end = performance.now();

console.log(end - start);