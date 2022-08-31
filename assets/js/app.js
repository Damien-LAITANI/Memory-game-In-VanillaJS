window.onload = function () {
  let nb_clics = 0;
  let img1 = "";
  let img2 = "";
  let case1 = "";
  let case2 = "";
  let erreurs = 0;
  let score = 0;
  let depart = false;
  let tabNb_img = [];
  const temps_debut = new Date().getTime();

  const blockJeu = document.querySelector('#blockJeu');
  initJeu();

  function initJeu() {
    createCard();
    createTableWin();
  }

  setTimeout(function () {
    const beforeStart = document.querySelector('.container__beforeGame');
    beforeStart.style.display = 'none';
    for (let i = 0; i < imgs.length * 2; i++) {
      const img = document.getElementById('img' + i);
      img.src = "./assets/images/backCard.png";
    }
    depart = true;
  }, 4000);

  function createTableWin() {
    const paireWin = document.querySelector("#paireWin");
    for (let i = 0; i < imgs.length; i++) {
      paireWin.appendChild(document.createElement("div")).id = "winImg" + i;
      document.getElementById("winImg" + i).className = "imgWin";
    }
  }

  // creation de la carte
  function createCard() {
    for (let i = 0; i < imgs.length * 2; i++) {
      const cards = document.createElement('div');
      cards.className = 'cards backCards';
      cards.id = "card" + [i];
      blockJeu.appendChild(cards);
    }

    let nb_aleatoire;
    let nbDejaUtiliser = "";
    let nb_img;
    let test = true;
    for (let i = 0; i < imgs.length * 2; i++) {

      // Affiche aléatoirement les cartes
      while (test == true) {
        nb_aleatoire = Math.floor(Math.random() * 32) + 1;
        if (nbDejaUtiliser.indexOf(" " + nb_aleatoire + " ") > -1) {
          nb_aleatoire = Math.floor(Math.random() * 32) + 1;
        } else {
          nb_img = Math.floor((nb_aleatoire + 1) / 2);

          document.getElementById('card' + i).innerHTML = "<img id='img" + i + "' class = '" + nb_img + "' src='./assets/images/img" + nb_img + ".png' alt='' />";
          tabNb_img.push(nb_img);
          nbDejaUtiliser += " " + nb_aleatoire + " ";
          test = false;
        }
      }
      test = true;
    }
  }
  // Aplique un événement à chaques cartes
  const imgTotal = [];
  for (let i = 0; i < imgs.length * 2; i++) {
    imgTotal.push(document.getElementById("img" + i));
    imgTotal[i].addEventListener("click", function () {
      if (depart) {
        nb_clics++;
        document.getElementById(this.id).src = "./assets/images/img" + this.className + ".png";
        verifier(this);
      }
    });
  }

  function verifier(img) {
    if (nb_clics == 1) {
      img1 = img.src;
      case1 = img.id;
    } else {
      img2 = img.src;
      case2 = img.id;
      if (case1 != case2) {
        depart = false;
        if (img1 != img2) {
          setTimeout(function () {
            document.getElementById(case1).src = "./assets/images/backCard.png";
            document.getElementById(case2).src = "./assets/images/backCard.png";
            depart = true;
            nb_clics = 0;
            erreurs++;
          }, 700)
        }
        else {
          score++;
          setTimeout(function () {
            const paire1 = case1;
            const img1 = document.getElementById(case1);
            const img2 = document.getElementById(case2);
            card1 = img1.parentNode;
            card1.style.animation = "paused";
            card2 = img2.parentNode;
            card2.style.animation = "paused";
            document.getElementById(case1).style.display = "none";
            document.getElementById(case2).style.display = "none";
            for (let i = 0; i < imgs.length; i++) {
              const winImg = document.getElementById('winImg' + i);
              if (winImg.innerHTML == "") {
                winImg.appendChild(document.getElementById(paire1)).style.display = "inline";
                i = imgs.length;
              }
            }
            if (score == 16) {
              const dif_temps = Math.floor((new Date().getTime() - temps_debut) / 1000);
              blockJeu.innerHTML = "<div id= \"result\"> <p> Tu as mis " + dif_temps + " secondes pour trouver toutes les paires !</p> <br /> <p> Tu as fait " + erreurs + " erreurs avant de trouver toutes les paires !</p> <br /> <p> Pour rejouer, appuis sur le bouton en bas de ton écran ! </p></div>"
            }
            depart = true;
            nb_clics = 0;
          }, 1000)
        }
      } else {
        if (nb_clics == 2) {
          nb_clics = 1;
        }
      }
    }
  }
}
