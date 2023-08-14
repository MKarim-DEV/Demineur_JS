"use strict";
settings_submit.addEventListener("click", (event) => {
  event.preventDefault();
  const rows = document.querySelector("#rows").value;
  const cols = document.querySelector("#cols").value;
  const mines = document.querySelector("#mines").value;
  const apiUrl =`https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${rows}&cols=${cols}&mines=${mines}`;
  
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && Array.isArray(data)) {
        let tableHtml = '<table class="table">';
        for (let row = 0; row < data.length; row++) {
          tableHtml += '<tr>';
          for (let col = 0; col < data[row].length; col++) {
            const cellValue = data[row][col];
            const cellClass = cellValue === 1 ? 'bg-danger' : 'bg-primary';
            const displayValue = cellValue === 1 ? "B" : cellValue;
           tableHtml += `<td class="cell ${cellClass}">${displayValue}</td>`;
          }
          tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        document.querySelector("#grid").innerHTML = tableHtml;
            // Une fois que les cases sont générées, ajoutez les gestionnaires d'événements "click"
            const cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
              cell.addEventListener("click", () => {
                // Action à effectuer lorsque la cellule est cliquée
                cell.classList.remove("d-block");
                cell.classList.add("d-none");
                // Vous pouvez ajouter ici votre propre logique en fonction de la cellule cliquée
              });
            });
      } else {
        console.error("Invalid grid data: Unexpected data format.");
      }
      console.log (data);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
      // Ajoutez un gestionnaire d'événements "click" à chaque cellule
});

