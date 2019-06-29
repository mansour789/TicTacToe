

let bord = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

const viking = document.querySelector('.viking');

const q1 = document.querySelector('#n00');
const q2 = document.querySelector('#n01');
const q3 = document.querySelector('#n02');

const q4 = document.querySelector('#n10');
const q5 = document.querySelector('#n11');
const q6 = document.querySelector('#n12');

const q7 = document.querySelector('#n20');
const q8 = document.querySelector('#n21');
const q9 = document.querySelector('#n22');

const boxes = document.querySelectorAll('.box');

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
                            
                            image.setAttribute('src', 'images/cat.gif'); 
                            playerTurn = false;
                             winGame("C");
                         }
                    }else{
                        if(bord[i][j] === 0){
                              bord[i][j] = "V"
                        
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
            viking.style.display = "block";
            setTimeout(fadeOut, 100);
         }
         if( x === 'C'){
            let bg = document.querySelector('#board');
            bg.style.backgroundColor = "red";
            bg.style.zIndex = "10";

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
        
        const currentOpacity = getComputedStyle(viking).opacity;
        const currentOpcFloat = parseFloat(currentOpacity);
    
        let newOpacity = currentOpcFloat + 0.02;
    
        viking.style.opacity = newOpacity;
    
        if (currentOpcFloat <= 1) {
            setTimeout(fadeOut, 10);    
        }
    
    }
    
    