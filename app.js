const cellList = document.querySelectorAll('.game-cell');

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
            cell.classList.remove('from-[#FFF0F5]','to-[#FFFACD]')
            cell.classList.add('from-[#7FFFD4]','to-[#008080]','text-[#46f0e7]')
            turnO = false;
            cell.disabled = true;
            gameWinner()
            winner();
        }
        else{
            cell.innerText = "X";
            cell.classList.remove('from-[#FFF0F5]','to-[#FFFACD]')
            cell.classList.add('from-[#FF6F61]','to-[#FF69B4]','text-[#FF1493]')
            turnO = true;
            cell.disabled = true;
            gameWinner();
            winner();
        }
    })
}