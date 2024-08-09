const board = ["", "", "", "", "", "", "", "", ""];
const cells = document.querySelectorAll(".cell");
let playerWins = 0;
let computerWins = 0;
let draws = 0;

//VALORES DEL LOCAL AL CARGAR PAGINA
function initializeCounters() {
  playerWins = parseInt(localStorage.getItem("playerWins")) || 0;
  computerWins = parseInt(localStorage.getItem("computerWins")) || 0;
  draws = parseInt(localStorage.getItem("draws")) || 0;

  document.getElementById("playerWins").textContent = playerWins;
  document.getElementById("computerWins").textContent = computerWins;
  document.getElementById("draws").textContent = draws;
}

//ACTUALIZAR CONTADORES Y DOM
function updateCounters() {
  localStorage.setItem("playerWins", playerWins);
  localStorage.setItem("computerWins", computerWins);
  localStorage.setItem("draws", draws);

  document.getElementById("playerWins").textContent = playerWins;
  document.getElementById("computerWins").textContent = computerWins;
  document.getElementById("draws").textContent = draws;
}

//DETECTAR CLICK JUGADOR
//handleCellClick
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("cellIndex");

  //VERIFICAR CELL VACIA
  if (board[index] === "") {
    board[index] = "X";
    cell.textContent = "X";
    cell.style.backgroundColor = "#E6AF2E";  //PLAYER ( P )//

    if (checkWinner("X")) {
      alert("¡Ganaste!");
      playerWins++;
      updateCounters();
      return;
    }

    computerMove();
  }
}

//MOVIMIENTO DE LA COMPU
function computerMove() {
  const emptyCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);

  //VERIFICAR EMPATE
  if (emptyCells.length === 0) {
    alert("¡Es un empate!");
    draws++;
    updateCounters();
    return;
  }

  //SELECCIONAR CELL ALEATORIA
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cellIndex = emptyCells[randomIndex];
  board[cellIndex] = "O";
  const cell = document.querySelector(`.cell[cellIndex="${cellIndex}"]`);
  cell.textContent = "O";
  cell.style.backgroundColor = "#39A6EF";  //COMPUTADORA//

  if (checkWinner("O")) {
    alert("¡La computadora ganó!");
    computerWins++;
    updateCounters();
  }
}

//VERIFICAR GANADOR
function checkWinner(p) {
  const winningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombs.some(combination => {
    return combination.every(index => board[index] === p);
  });
}

//FUNCION REINICIAR
document.getElementById("restartBtn").addEventListener("click", () => {
  for (let i = 0; i < board.length; i++) {
    board[i] = "";
  }

  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
});

//INICIADOR DE CONTADORES AL CARGAR
initializeCounters();
