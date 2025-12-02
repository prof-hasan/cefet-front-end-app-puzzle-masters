function carregarPagina(url) {
    document.getElementById("loader").classList.remove("desativado");
    
    setTimeout(() => {
        window.location.href = url;
    }, 800); 
  }


let soundButton = document.querySelector("#soundLogo");
let soundDiv = document.querySelector("#sound")

let musica = new Audio("PagInicial-Sound.mp3");
musica.loop = true;


soundDiv.addEventListener('click', () => {
  let listaDeSrc = [
    "PagInicial-img/PagInicial-Mute.png",
    "PagInicial-img/PagInicial-Unmute.png"
  ]

  let srcAtual = soundButton.src.split("/").pop();

  if (srcAtual === "PagInicial-Mute.png") {
    soundButton.src = listaDeSrc[1];
    musica.play();
    musica.volume = 1;
  }
  else {
    soundButton.src = listaDeSrc[0];
    musica.pause();
  }
});

let desligaEstatica = document.querySelector("#buttonTV");
let estatica = document.querySelector("#estatica");

desligaEstatica.addEventListener('click', () => {
  estatica.classList.toggle('desativado');
})

let revelaMenu = document.querySelector("#listaDePuzzles");
let menu = document.querySelector("#menu-puzzles");
let escondeMenu = document.querySelector("#fechar-menu");
let bloqueio = document.querySelector("#bloqueio-clique");


function animarMenu(e) {
  e.classList.remove("desativado");

  anime({
    targets: e,
    opacity: [0, 1],
    scale: [
      { value: 0.3, duration: 0 },
      { value: 1.15, duration: 250 },
      { value: 1.0, duration: 150 }
    ],
    borderColor: [
      { value: "#FCB62B", duration: 80 },
      { value: "#011423", duration: 80 }
    ],
    easing: "easeOutQuad",
    duration: 400,
    begin: () => {
      e.style.pointerEvents = "auto";
    }
  });

  bloqueio.classList.remove("desativado");
}

function fecharMenu(e) {

  anime({
    targets: e,
    opacity: [1, 0],
    scale: [1, 0.3],
    duration: 350,
    easing: 'easeInQuad',
    complete: () => {
      e.classList.add("desativado");
      e.style.pointerEvents = "none";
    }
  });

  bloqueio.classList.add("desativado");
}



function mudaMenu(e) {
  const estavaAtivo = !e.classList.contains("desativado");

  document.querySelectorAll(".menu").forEach(menu => {
    if (!menu.classList.contains("desativado") && menu !== e) {
      fecharMenu(menu);
    }
  });

  if (estavaAtivo) {
    fecharMenu(e);
  } else {
    animarMenu(e);
  }
}

revelaMenu.addEventListener('click', ()=> mudaMenu(menu));
escondeMenu.addEventListener('click', ()=> mudaMenu(menu));

let ranking = document.querySelector("#ranking");
let revelaRanking = document.querySelector("#abreRanking");
let escondeRanking = document. querySelector("#fechar-ranking")

revelaRanking.addEventListener('click', ()=> mudaMenu(ranking));
escondeRanking.addEventListener('click', ()=> mudaMenu(ranking))



