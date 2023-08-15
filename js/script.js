"use strict";

const settings_submit = document.querySelector("#settings_submit");

settings_submit.addEventListener("click", async (event) => {
  event.preventDefault();
  const rows = document.querySelector("#rows").value;
  const cols = document.querySelector("#cols").value;
  const mines = document.querySelector("#mines").value;
  document.querySelector("#home_title").classList.add("d-none");
  document.querySelector("#setting_form").classList.add("d-none");
  document.querySelector("#ingame_title").classList.remove("d-none");
  
  const apiUrl = `https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${rows}&cols=${cols}&mines=${mines}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    if (data && Array.isArray(data)) {
      generate_and_set_table(data);
      // Sélectionnez tous les éléments avec la classe "cell"
const cellElements = document.querySelectorAll(".cell");

// Parcourez chaque élément et ajoutez un événement de clic
cellElements.forEach(cell => {
  cell.addEventListener("click", () => {
    const cellValue = cell.textContent;

    if (cellValue === "B") {
      console.log("Perdu");
    } else {
      console.log("Play again");
    }
  });
});
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
}


// settings_submit.addEventListener("click", (event) => {
//   event.preventDefault();
//   const rows = document.querySelector("#rows").value;
//   const cols = document.querySelector("#cols").value;
//   const mines = document.querySelector("#mines").value;
//   document.querySelector("#home_title").classList.add("d-none");
//   document.querySelector("#setting_form").classList.add("d-none");
//   document.querySelector("#ingame_title").classList.remove("d-none");
//   const apiUrl =`https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${rows}&cols=${cols}&mines=${mines}`;
  
//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data && Array.isArray(data)) {
//         let tableHtml = '<table class="table">';
//         for (let row = 0; row < data.length; row++) {
//           tableHtml += '<tr>';
//           for (let col = 0; col < data[row].length; col++) {
//             const cellValue = data[row][col];
//             const cellClass = cellValue === 1 ? 'bg-danger' : 'bg-primary';
//             const displayValue = cellValue === 1 ? "B" : cellValue;
//             tableHtml += `<td class="cell ${cellClass}">${displayValue}</td>`;
//           }
//         }
//             tableHtml += '</tr>';
//         tableHtml += '</table>';
//         document.querySelector("#grid").innerHTML = tableHtml;
//             // // Une fois que les cases sont générées, ajoutez les gestionnaires d'événements "click"
//             // const cells = document.querySelectorAll(".cell");
//             // cells.forEach((cell) => {
//             //   cell.addEventListener("click", () => {
//             //     // Action à effectuer lorsque la cellule est cliquée
//             //     cell.classList.remove("d-block");
//             //     cell.classList.add("d-none");
//             //     // Vous pouvez ajouter ici votre propre logique en fonction de la cellule cliquée
//             //   });
//             // });
//       } else {
//         console.error("Invalid grid data: Unexpected data format.");
//       }
//       console.log (data);
//     })
//     .catch((error) => {
//       console.error("An error occurred:", error);
//     });
//       // Ajoutez un gestionnaire d'événements "click" à chaque cellule
// });



// // function update_table_html(data) {
// //   const tableHtml = '<table class="table">';
// //   for (let row = 0; row < data.length; row++) {
// //     tableHtml += '<tr>';
// //     for (let col = 0; col < data[row].length; col++) {
// //       const cellValue = data[row][col];
// //       const cellClass = cellValue === "B" ? 'bg-danger' : 'bg-primary';
// //       const displayValue = cellValue === "B" ? "" : cellValue;
// //       tableHtml += `<td class="cell ${cellClass}">${displayValue}</td>`;
// //     }
// //     tableHtml += '</tr>';
// //   }
// //   tableHtml += '</table>';
// //   document.querySelector("#grid").innerHTML = tableHtml;
// // }
  


