"use strict:"
document.addEventListener("DOMContentLoaded", function () {
    const settingsForm = document.getElementById("setting_form");
    const usernameInput = document.getElementById("username");
    const rowsInput = document.getElementById("rows");
    const colsInput = document.getElementById("cols");
    const minesInput = document.getElementById("mines");

    settingsForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const rows = parseInt(rowsInput.value);
        const cols = parseInt(colsInput.value);
        const maxMines = (rows * cols) - 1;

        if (usernameInput.value.length === 0 || usernameInput.value.length > 50) {
            alert("Le nom doit contenir entre 1 et 50 caractères.");
            return;
        }

        if (rows < 2 || rows > 50 || isNaN(rows)) {
            alert("Le nombre de lignes doit être entre 2 et 50.");
            return;
        }

        if (cols < 2 || cols > 50 || isNaN(cols)) {
            alert("Le nombre de colonnes doit être entre 2 et 50.");
            return;
        }

        const mines = parseInt(minesInput.value);
        if (mines < 0 || mines > maxMines || isNaN(mines)) {
            alert(`Le nombre de mines doit être entre 0 et ${maxMines}.`);
            return;
        }
    });
});
