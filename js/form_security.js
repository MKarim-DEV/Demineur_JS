"use strict";
function validateForm() {
    const usernameInput = document.getElementById("username");
    const rowsInput = document.getElementById("rows");
    const colsInput = document.getElementById("cols");
    const minesInput = document.getElementById("mines");

    const rows = parseInt(rowsInput.value);
    const cols = parseInt(colsInput.value);
    const maxMines = (rows * cols) - 1;

    const usernameError = document.getElementById("username-error");
    const rowsError = document.getElementById("rows-error");
    const colsError = document.getElementById("cols-error");
    const minesError = document.getElementById("mines-error");

    usernameError.style.display = "none";
    rowsError.style.display = "none";
    colsError.style.display = "none";
    minesError.style.display = "none";
    if (usernameInput.value.length === 0 || usernameInput.value.length > 50) {
        usernameError.style.display = "block";
        return false;
    }
    if (rows < 2 || rows > 50 || isNaN(rows)) {
        rowsError.style.display = "block";
        return false;
    }
    if (cols < 2 || cols > 50 || isNaN(cols)) {
        colsError.style.display = "block";
        return false;
    }
    const mines = parseInt(minesInput.value);
    if (mines <= 0 || mines > maxMines || isNaN(mines)) {
        minesError.textContent = `Le nombre de mines doit être entre 1 et ${maxMines}.`;
        minesError.style.display = "block";
        return false;
    }
    return true;
}