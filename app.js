

let bord = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

const viking = document.querySelectorAll('.viking');
const header = document.querySelector('header');
const sword = document.querySelector('#sword');
const swordLast = document.querySelector('#swordLast');
const cat = document.querySelector('#cat');
const catLast = document.querySelector('#catLast');

const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener('click', startGame);

const q1 = document.querySelector('#n00');
const q2 = document.querySelector('#n01');
const q3 = document.querySelector('#n02');

const q4 = document.querySelector('#n10');
const q5 = document.querySelector('#n11');
const q6 = document.querySelector('#n12');

const q7 = document.querySelector('#n20');
const q8 = document.querySelector('#n21');
const q9 = document.querySelector('#n22');

const board = document.querySelector('#board');

q1.addEventListener('click', drop);
q2.addEventListener('click', drop);
q3.addEventListener('click', drop);
q4.addEventListener('click', drop);
q5.addEventListener('click', drop);
q6.addEventListener('click', drop);
q7.addEventListener('click', drop);
q8.addEventListener('click', drop);
q9.addEventListener('click', drop);





let playerTurn = true;

function drop(){
    let divPressed = this.id;
    let image = document.querySelector(`#${divPressed} img`);
    
    for(let i = 0; i < bord.length; i++){
        for (let j = 0; j < bord[i].length; j++){
            
            if( `n${i}${j}` === divPressed){
                    if(playerTurn){
                         if(bord[i][j] === 0){
                             bord[i][j] = "C"
                             cat.play();
                            image.setAttribute('src', 'images/cat.gif'); 
                            playerTurn = false;
                             winGame("C");
                         }
                    }else{
                        if(bord[i][j] === 0){
                              bord[i][j] = "V"
                              sword.play();
                            image.setAttribute('src', 'images/vikings.gif');
                              playerTurn = true;
                              winGame("V");
                              
                         }
                    }
            }

        }
        
     }


}


function winGame(x){

    let win = document.querySelector(".win");

    if( (bord[0][0] !== 0 && bord[0][0] === bord[0][1] && bord[0][0] === bord[0][2]) || 
        (bord[1][0] !== 0 && bord[1][0] === bord[1][1] && bord[1][0] === bord[1][2]) ||                           
        (bord[2][0] !== 0 && bord[2][0] === bord[2][1] && bord[2][0] === bord[2][2]) ||

        (bord[0][0] !== 0 && bord[0][0] === bord[1][0] && bord[0][0] === bord[2][0]) || 
        (bord[0][1] !== 0 && bord[0][1] === bord[1][1] && bord[0][1] === bord[2][1]) ||                           
        (bord[0][2] !== 0 && bord[0][2] === bord[1][2] && bord[0][2] === bord[2][2]) ||
        
        (bord[0][0] !== 0 && bord[0][0] === bord[1][1] && bord[0][0] === bord[2][2]) || 
        (bord[0][2] !== 0 && bord[0][2] === bord[1][1] && bord[0][2] === bord[2][0])
         
     ){
         if ( x === 'V'){
            swordLast.play();
            header.style.display = 'none';
            board.style.opacity = '0.6';
            win.innerText = `Viking has killed another cat`;
            win.style.display = 'block';
            
            setTimeout(fadeOut, 100);
         }
         if( x === 'C'){
             document.querySelector('html').style.background = 'url(images/catWin.jpg) no-repeat center center fixed'
            document.querySelector('html').style.backgroundSize = 'cover'
             catLast.play();
            header.style.display = 'none';
            win.innerText = `one more cat just survived`;
            win.style.color = 'red';
            win.style.display = 'block';
            

         }
        console.log(`${x} win`);

        for (let i = 0; i < bord.length; i++) {
            for (let j = 0; j < bord[i].length; j++) {
                    bord[i][j] = 0;
                
            }
            
        }
     }
           
    
    } 

    const fadeOut = function(){
        
        for (let i = 0; i < viking.length; i++) {
            viking[i].style.display = "block";
            const currentOpacity = getComputedStyle(viking[i]).opacity;
            const currentOpcFloat = parseFloat(currentOpacity);
    
        let newOpacity = currentOpcFloat + 0.0001;
    
        viking[i].style.opacity = newOpacity;
    
        if (currentOpcFloat <= 0.5) {
            setTimeout(fadeOut, 10);    
        }


        }
        
        
    
    }

    let into = document.querySelector('#intro');
    function audio(){
    var playAudio = document.querySelector('#intro').play();

    if (playAudio !== undefined) {
        playAudio.then(_ => {
        into.play();
      })
      .catch(error => {
        console.log(error);
      });
    }  

}


function startGame(){
    document.querySelector('h2').style.display = 'none';
    board.style.display = 'block';
    playBtn.classList += ' hinge';
    
}
