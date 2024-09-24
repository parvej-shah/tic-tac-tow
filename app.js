const cellList = document.querySelectorAll('.game-cell');
let xCount = [];
let oCount = [];
const timingList = [3000,5000,2000,1000,500]
const randomIndexTime = Math.floor(Math.random()*timingList.length)
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
let playerType,playerName,friendName;
let isActive = true;
/* Player type select */
document.getElementById('next-btn-player-select').addEventListener('click',()=>{
playerType = document.querySelector('input[type="radio"]:checked').value;
/* showing friend name */
if(playerType==='friend'){
    document.getElementById('friend-name-div').classList.remove('hidden');
}
hideAndShowElement('player-select-section','player-info-section')
})
/* Player info */
document.getElementById('next-btn-details').addEventListener('click',()=>{
    playerName = document.querySelector('#player-name').value;
    friendName = document.querySelector('#friend-name').value;
    if(playerName===''){
        alert("Must Input your Name")
    }else{
        hideAndShowElement('initial-page','game-bar')
        /* Player name show */
        console.log(document.querySelector('#playerOne'))
        document.querySelector('#playerOne').innerText = playerName;
        if(playerType ==='robot'){
            document.querySelector('#playerTwo').innerText = "Robot"
        }
        else{
            document.querySelector('#playerTwo').innerText =friendName;
        }
    }
    })

/* draw or not */
function isDraw(){
    if ((xCount.length==5 || oCount.length==5) && (xCount.length!==oCount.length)){
        document.getElementById('winner-text').innerHTML = `The game is DRAW`;
        document.getElementById('game-over-show').classList.remove('hidden')
        document.getElementById('game-over-show').classList.add('flex')
        document.getElementById('reset-btn').classList.remove('flex');
        document.getElementById('reset-btn').classList.add('hidden');
        xCount.length = 0;
        oCount.length = 0;
        isActive = false;
        resetGame();
    }
}

/* Getting the winner */
function gameWinner(){
    for(const winningCell of winningCells){
        const winningCellOne = cellList[winningCell[0]].innerText
        const winningCellTwo = cellList[winningCell[1]].innerText
        const winningCellThree = cellList[winningCell[2]].innerText
        if(winningCellOne !=='' && winningCellTwo!=='' && winningCellThree!==''){
            if(winningCellOne === winningCellTwo && winningCellTwo===winningCellThree ){
                cellList[winningCell[0]].innerText = '';
                cellList[winningCell[1]].innerText = '';
                cellList[winningCell[2]].innerText = '';
                const p1 = document.createElement('p');
                const p2 = document.createElement('p');
                const p3 = document.createElement('p');
                p1.innerText = winningCellOne;
                p2.innerText = winningCellTwo;
                p3.innerText = winningCellThree;
                p1.classList.add('animate-spin','drop-shadow-sm');
                p2.classList.add('animate-spin','drop-shadow-sm');
                p3.classList.add('animate-spin','drop-shadow-sm');
                cellList[winningCell[0]].appendChild(p1)
                cellList[winningCell[1]].appendChild(p2)
                cellList[winningCell[2]].appendChild(p3)
                if(winningCellOne ==='O'){
                    document.getElementById('winner-text').innerHTML = `The Winner is ${playerName}<i class="fa-solid fa-crown text-yellow-500 text-2xl pl-1"></i>`
                }
                if(winningCellOne ==='X'){
                    if(playerType ==='robot'){
                        document.getElementById('winner-text').innerHTML = `The Winner is Robot<i class="fa-solid fa-crown text-yellow-500 text-2xl pl-1"></i>`
                    }
                    else{
                        document.getElementById('winner-text').innerHTML = `The Winner is ${friendName}<i class="fa-solid fa-crown text-yellow-500 text-2xl pl-1"></i>`
                    }
                }
                winnerIs = winningCellOne;
                isActive = false;
            }
        }
}}
/* playing with robot */
let turnO = true;
function playingRobot(){
    if(isActive){
        const randomIndex = Math.floor(Math.random()*9);
        if(cellList[randomIndex].innerText==='O' || cellList[randomIndex].innerText==='X'){
            const randomIndexTime = Math.floor(Math.random()*timingList.length);
            setTimeout(playingRobot,timingList[randomIndexTime]);
            gameWinner();
            isDraw();
        }
        else{
            cellList[randomIndex].innerText = "X";
            xCount.push("X");
            cellList[randomIndex].classList.remove('from-[#FFF0F5]','to-[#FFFACD]')
            cellList[randomIndex].classList.add('from-[#FF6F61]','to-[#FF69B4]','text-[#FF1493]')
            turnO = true;
            cellList[randomIndex].disabled = true;
            if(isActive){
                if(turnO){
                    document.getElementById('playerOne').classList.add('animate-bounce','text-red-500')
                    document.getElementById('playerTwo').classList.remove('animate-bounce','text-red-500')
                }else{
                    document.getElementById('playerTwo').classList.add('animate-bounce','text-red-500')
                    document.getElementById('playerOne').classList.remove('animate-bounce','text-red-500')
                }
            }
            gameWinner();
            isDraw();
        }
    }
}
/* changing */
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
            isDraw()
            if(isActive){
                if(turnO){
                    document.getElementById('playerOne').classList.add('animate-bounce','text-red-500')
                    document.getElementById('playerTwo').classList.remove('animate-bounce','text-red-500')
                }else{
                    document.getElementById('playerTwo').classList.add('animate-bounce','text-red-500')
                    document.getElementById('playerOne').classList.remove('animate-bounce','text-red-500')
                }
            }
            if(playerType==='robot'){
                const randomIndexTime = Math.floor(Math.random()*timingList.length);
                setTimeout(playingRobot,timingList[randomIndexTime]);
                /* playingRobot(); */
            }
        }
        else if(playerType==='robot'){
            const randomIndexTime = Math.floor(Math.random()*timingList.length);
            setTimeout(playingRobot,timingList[randomIndexTime]);
        }
        else{
            cell.innerText = "X";
            xCount.push("X");
            cell.classList.remove('from-[#FFF0F5]','to-[#FFFACD]')
            cell.classList.add('from-[#FF6F61]','to-[#FF69B4]','text-[#FF1493]')
            turnO = true;
            cell.disabled = true;
            gameWinner()
            isDraw()
            if(isActive){
                if(turnO){
                    document.getElementById('playerOne').classList.add('animate-bounce','text-red-500')
                    document.getElementById('playerTwo').classList.remove('animate-bounce','text-red-500')
                }else{
                    document.getElementById('playerTwo').classList.add('animate-bounce','text-red-500')
                    document.getElementById('playerOne').classList.remove('animate-bounce','text-red-500')
                }
            }
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
    document.getElementById('playerTwo').classList.remove('animate-bounce','text-red-500')
    document.getElementById('playerOne').classList.add('animate-bounce','text-red-500')
    xCount.length = 0;
    oCount.length = 0;
    isActive = true;
}
/* Restart after draw */
document.getElementById('draw-btn').addEventListener('click', function (){
    document.getElementById('reset-btn').classList.remove('hidden');
    document.getElementById('reset-btn').classList.add('flex');
    document.getElementById('game-over-show').classList.remove('flex')
    document.getElementById('game-over-show').classList.add('hidden')
    xCount.length = 0;
    oCount.length = 0;
    resetGame()
})
document.getElementById('reset-btn').addEventListener('click', resetGame);