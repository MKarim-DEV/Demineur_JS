"use strict"
const RESTART = document.querySelector(".restart");

        // Ajouter un écouteur d'événement au clic sur le lien
        RESTART.addEventListener("click", function() {
    document.querySelector("#post_game").classList.add("d-none");
    document.querySelector("#in_game").classList.add("d-none");
    document.querySelector("#pre_game").classList.remove("d-none");
  });