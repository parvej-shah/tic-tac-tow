const cellList = document.querySelectorAll('.game-cell');
let xCount = [];
let oCount = [];
/* Selecting The Winner */
const winningCells = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
let winnerIs = '';
function winner(){
    if(winnerIs!==''){
        console.log('Winner is ', winnerIs);
    }
}
/* draw or not */
function isDraw(){
    if ((xCount.length==5 || oCount.length==5) && (xCount.length!==oCount.length)){
        document.getElementById('winner-text').innerHTML = `The game is DRAW`;
        document.getElementById('game-over-show').classList.remove('hidden')
        document.getElementById('game-over-show').classList.add('flex')
        document.getElementById('reset-btn').classList.remove('flex');
        document.getElementById('reset-btn').classList.add('hidden');
        resetGame();
    }
}

/* Getting the winner */
function gameWinner(){
    for(const winningCell of winningCells){
        const winningCellOne = cellList[winningCell[0]].innerText
        const winningCellTwo = cellList[winningCell[1]].innerText
        const winningCellThree = cellList[winningCell[2]].innerText
        /* console.log(winningCellOne,winningCellTwo,winningCellThree) */
        if(winningCellOne !=='' && winningCellTwo!=='' && winningCellThree!==''){
            if(winningCellOne === winningCellTwo && winningCellTwo===winningCellThree ){
                document.getElementById('winner-text').innerHTML = `The Winner is ${winningCellOne}<i class="fa-solid fa-crown text-yellow-500 text-2xl pl-1"></i>`
                winnerIs = winningCellOne;
            }
        }
}}

/* changing X or O */
let turnO = true;
for(const cell of cellList){
    cell.addEventListener('click', function(){
        if(winnerIs!==''){
            cell.disabled = true;
        }
        else if(turnO){
            cell.innerText = 'O';
            oCount.push("O");
            cell.classList.remove('from-[#FFF0F5]','to-[#FFFACD]');
            cell.classList.add('from-[#7FFFD4]','to-[#008080]','text-[#46f0e7]');
            turnO = false;
            cell.disabled = true;
            gameWinner()
            winner();
            isDraw()
        }
        else{
            cell.innerText = "X";
            xCount.push("X");
            cell.classList.remove('from-[#FFF0F5]','to-[#FFFACD]')
            cell.classList.add('from-[#FF6F61]','to-[#FF69B4]','text-[#FF1493]')
            turnO = true;
            cell.disabled = true;
            gameWinner();
            winner();
            isDraw();
        }
    })
};
/* Restart */
function resetGame(){
    turnO = true;
    winnerIs = '';
    document.getElementById('winner-text').innerHTML = '';
    for(const cell of cellList){
        cell.disabled = false;
        cell.innerText = '';
        cell.classList.remove('from-[#7FFFD4]','to-[#008080]','text-[#46f0e7]')
        cell.classList.remove('from-[#FF6F61]','to-[#FF69B4]','text-[#FF1493]')
        cell.classList.add('from-[#FFF0F5]','to-[#FFFACD]')
    }
    for(let o of oCount){
        console.log('deleted :' ,o)
        oCount.pop(o);
        
    };
    for(let x of xCount){
        console.log('deleted :' ,x)
        xCount.pop(x);
    };
    
}
document.getElementById('draw-btn').addEventListener('click', function (){
    document.getElementById('reset-btn').classList.remove('hidden');
    document.getElementById('reset-btn').classList.add('flex');
    document.getElementById('game-over-show').classList.remove('flex')
    document.getElementById('game-over-show').classList.add('hidden')
    for(let o of oCount){
        console.log('deleted :' ,o)
        oCount.pop(o);
        
    };
    for(let x of xCount){
        console.log('deleted :' ,x)
        xCount.pop(x);
    };
})
document.getElementById('reset-btn').addEventListener('click', resetGame);