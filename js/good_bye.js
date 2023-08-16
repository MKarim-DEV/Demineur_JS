"use strict"
const GOOD_BYE = document.querySelector(".good_bye");

        // Ajouter un écouteur d'événement au clic sur le lien
        GOOD_BYE.addEventListener("click", function() {
            document.querySelector("#post_game").classList.add("d-none");
            document.querySelector("#pre_game").classList.add("d-none");
            document.querySelector("#good_bye").classList.remove("d-none");
        });