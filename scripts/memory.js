"use strict";

window.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".carte");

    const mainBoard = document.getElementById("jeuCartes");
    const discovered = document.getElementById("cartesDecouvertes");

    const min = 1, max = 9;

    let flippedCards = [];
    let foundPairs = 0;

    cards.forEach((card) => {
        card.style.order = Math.floor(Math.random() * (max - min + 1)) + min;
        card.addEventListener("click", toggleCard);
    });

    function toggleCard() {
        if (this.classList.contains("face")) {
            this.removeEventListener("click", toggleCard);
        } else {
            this.classList.add("face");
            flippedCards.push(this);
            checkPair();
            checkVictory();
        }
    }

    function stopInteractivity(e) {
        e.stopPropagation();
    }

    function checkPair() {
        if (flippedCards.length !== 2) return;

        mainBoard.addEventListener("click", stopInteractivity, true);

        if (getCardType(flippedCards[0]) === getCardType(flippedCards[1])) {
            setTimeout(() => {
                flippedCards.forEach((flippedCard) => {
                    const clonedCard = flippedCard.cloneNode(true);
                    clonedCard.style.order = 0;
                    discovered.append(clonedCard);
                    flippedCard.style.opacity = "0.1";
                });
                flippedCards = [];
                foundPairs++;
                mainBoard.removeEventListener("click", stopInteractivity, true);
            }, 1000);
        } else {
            setTimeout(() => {
                flippedCards.forEach((flippedCard) => {
                    flippedCard.classList.remove("face");
                    flippedCard.addEventListener("click", toggleCard);
                });
                flippedCards = [];
                mainBoard.removeEventListener("click", stopInteractivity, true);
            }, 1000);
        }
    }

    function checkVictory() {
        if (foundPairs < 7) return;

        const applause = new Audio("../sons/applaudissement.mp3");

        applause.addEventListener("ended", openPopup);

        applause.play();
    }

    function openPopup() {
        const popup = document.getElementsByClassName("popup")[0];
        popup.classList.add("visible");

        const newGameButton = document.getElementById("btnRecommencer");
        newGameButton.addEventListener("click", () => {
            window.location.reload();
        });
    }

    function getCardType(card) {
        return card.dataset.carte;
    }
});