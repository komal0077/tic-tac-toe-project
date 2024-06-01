const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];
// create a func. to initialise the game
 function initGame(){
    currentPlayer="X";
    // grid ko hide
    gameGrid=["","","","","","","","",""];
    // to empty in ui
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        
    });
    //  newgame wale button ko hide
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player-${currentPlayer}`;
 }
 initGame();

 function swapTurn(){
if(currentPlayer==="X"){
    currentPlayer="0";
}
else{
    currentPlayer="X";
}
// ui update
gameInfo.innerText=`Current Player-${currentPlayer}`;
 }


 function checkGameOver(){
let answer="";
winningPositions.forEach((position) => {
    //all 3 boxes should be non-empty and exactly same in value
    if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if(gameGrid[position[0]] === "X") 
                answer = "X";
            else {
                answer = "0";
            } 
                

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
});

if(answer!==""){
    gameInfo.innerText=`Winner Player-${answer}`;
    newGameBtn.classList.add("active");
    return;
}
// count whether there is tie
let fillCount=0;
gameGrid.forEach((box)=>{
    if(box!==""){
        fillCount++;
    }
});
// filled..game is tie
if(fillCount===9){
    gameInfo.innerText="Game tied !";
    newGameBtn.classList.add("active");
}
 }

  function handleClick(index){
    if(gameGrid[index]===""){
boxes[index].innerText=currentPlayer;
gameGrid[index]=currentPlayer;

swapTurn();

checkGameOver();

    }
  }
 boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
 });
 newGameBtn.addEventListener("click", initGame);