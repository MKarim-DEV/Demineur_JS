"use strict";

const SETTINGS_SUBMIT = document.querySelector("#settings_submit");

SETTINGS_SUBMIT.addEventListener("click", async (event) => {
  event.preventDefault();
  const rows = document.querySelector("#rows").value;
  const cols = document.querySelector("#cols").value;
  const mines = document.querySelector("#mines").value;
  const usernameValue = document.querySelector("#username").value;
  ingame_title.innerHTML = `<p class="text-center fs-4 fw-bold text-light">BONNE CHANCE ${usernameValue} !!!</p>`;
  document.querySelector("#pre_game").classList.add("d-none");
  document.querySelector("#in_game").classList.remove("d-none");

  const API_URL = `https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${rows}&cols=${cols}&mines=${mines}`;

  try {
    const RESPONSE = await fetch(API_URL);
    const DATA = await RESPONSE.json();
    console.log(DATA);

    if (DATA && Array.isArray(DATA)) {
      generate_and_set_table(DATA);
      click_manager();
    } else {
      console.error("Invalid grid DATA: Unexpected DATA format.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

function generate_and_set_table(DATA) {
  const NUMROWS = DATA.length;
  const NUMCOLS = DATA[0].length;
  for (let row = 0; row < NUMROWS; row++) {
    for (let col = 0; col < NUMCOLS; col++) {
      if (DATA[row][col] === 1) {
        // Transformer les 1 en "B"
        DATA[row][col] = "B";
      }
    }
  }
  // Incrémenter les valeurs autour des "B"
  for (let row = 0; row < NUMROWS; row++) {
    for (let col = 0; col < NUMCOLS; col++) {
      if (DATA[row][col] === "B") {
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
          for (let colOffset = -1; colOffset <= 1; colOffset++) {
            const NEWROW = row + rowOffset;
            const NEWCOL = col + colOffset;
            if (
              NEWROW >= 0 &&
              NEWROW < NUMROWS &&
              NEWCOL >= 0 &&
              NEWCOL < NUMCOLS &&
              DATA[NEWROW][NEWCOL] !== "B"
            ) {
              DATA[NEWROW][NEWCOL]++;
            }
          }
        }
      }
    }
  }

  let tableHtml = '<table class="table">';
  for (let row = 0; row < NUMROWS; row++) {
    tableHtml += "<tr>";
    for (let col = 0; col < NUMCOLS; col++) {
      let cellValue = DATA[row][col];

      tableHtml += `<td class="cell">${cellValue}</td>`;
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</table>";
  document.querySelector("#grid").innerHTML = tableHtml;
}

function check_victory() {
  const REMAININGCELLS = document.querySelectorAll(".cell");
  let allRemainingAreBombs = true;

  REMAININGCELLS.forEach((remainingCell) => {
    if (remainingCell.textContent !== "B") {
      allRemainingAreBombs = false;
    }
  });
  if (allRemainingAreBombs) {
    you_win();
  }
}
function you_loose() {
  document.querySelector("#in_game").classList.add("d-none");
  document.querySelector("#you_loose").classList.remove("d-none");
}

function you_win() {
  document.querySelector("#in_game").classList.add("d-none");
  document.querySelector("#you_win").classList.remove("d-none");
}

function click_manager() {
  const cellElements = document.querySelectorAll(".cell");
  let gameOver = false;

  cellElements.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (gameOver) return;

      const cellValue = cell.textContent;

      if (cellValue === "B") {
        cell.classList.remove("cell");
        gameOver = true;
        you_loose();
      } else {
        cell.classList.remove("cell");
        check_victory();
      }
    });

    cell.addEventListener("contextmenu", (event) => {
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
