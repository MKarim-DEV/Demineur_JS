"use strict";

const settings_submit = document.querySelector("#settings_submit");

settings_submit.addEventListener("click", async (event) => {
  event.preventDefault();
  const rows = document.querySelector("#rows").value;
  const cols = document.querySelector("#cols").value;
  const mines = document.querySelector("#mines").value;
  document.querySelector("#pre_game").classList.add("d-none");
  document.querySelector("#in_game").classList.remove("d-none");
  
  const apiUrl = `https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${rows}&cols=${cols}&mines=${mines}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    if (data && Array.isArray(data)) {
      generate_and_set_table(data);
      click_manager();
    } else {
      console.error("Invalid grid data: Unexpected data format.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

function generate_and_set_table(data) {
  const numRows = data.length;
  const numCols = data[0].length;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {

      if (data[row][col] === 1) {
        // Transformer les 1 en "B"
        data[row][col] = "B";}
      }
    }
  // Incrémenter les valeurs autour des "B"
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (data[row][col] === "B") {
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
          for (let colOffset = -1; colOffset <= 1; colOffset++) {
            const newRow = row + rowOffset;
            const newCol = col + colOffset;
            if (
              newRow >= 0 && newRow < numRows &&
              newCol >= 0 && newCol < numCols &&
              data[newRow][newCol] !== "B"
            ) {
              data[newRow][newCol]++;
            }
          }
        }
      }
    }
  }

  let tableHtml = '<table class="table">';
  for (let row = 0; row < numRows; row++) {
    tableHtml += '<tr>';
    for (let col = 0; col < numCols; col++) {
      let cellValue = data[row][col];

      tableHtml += `<td class="cell">${cellValue}</td>`;
    }
    tableHtml += '</tr>';
  }
  tableHtml += '</table>';
  document.querySelector("#grid").innerHTML = tableHtml;
};

function checkVictory() {
  const remainingCells = document.querySelectorAll(".cell");
  let allRemainingAreBombs = true;

  remainingCells.forEach(remainingCell => {
    if (remainingCell.textContent !== "B") {
      allRemainingAreBombs = false;
    }
});

  if (allRemainingAreBombs) {
    prompt("Gagné");
    end_game(); // Appeler la fonction pour relancer la partie
  }
}
function end_game() {
  document.querySelector("#in_game").classList.add("d-none");
  document.querySelector("#post_game").classList.remove("d-none");
}

function click_manager() {
  const cellElements = document.querySelectorAll(".cell");

  let gameOver = false;

  cellElements.forEach(cell => {
    cell.addEventListener("click", () => {
      if (gameOver) return;

      const cellValue = cell.textContent;

      if (cellValue === "B") {
        cell.classList.remove("cell");
        gameOver = true;
        prompt("Perdu");
        end_game(); // Appeler la fonction pour relancer la partie
      } else {
        cell.classList.remove("cell");
        checkVictory();
      }
    });

    cell.addEventListener("contextmenu", event => {
      event.preventDefault();

      if (cell.classList.contains("cell")) {
        if (cell.classList.contains("border-danger")) {
          prompt("Case déjà spotée");
        } else {
          cell.classList.add("border", "border-danger", "border-3");
        }
      } else {
        prompt("Case déjà révélée, vous ne pouvez pas la spotter");
      }
    });
  });
}



