"use strict";
const GOOD_BYE_1 = document.querySelector("#good_bye_1");

GOOD_BYE_1.addEventListener("click", function () {
  document.querySelector("#you_win").classList.add("d-none");
  document.querySelector("#pre_game").classList.add("d-none");
  document.querySelector("#good_bye").classList.remove("d-none");
});
const GOOD_BYE_2 = document.querySelector("#good_bye_2");

// Ajouter un écouteur d'événement au clic sur le lien
GOOD_BYE_2.addEventListener("click", function () {
  document.querySelector("#you_loose").classList.add("d-none");
  document.querySelector("#pre_game").classList.add("d-none");
  document.querySelector("#good_bye").classList.remove("d-none");
});
