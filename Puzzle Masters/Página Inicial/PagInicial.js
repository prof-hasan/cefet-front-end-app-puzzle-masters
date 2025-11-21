let soundButton = document.querySelector("#soundLogo");
let soundDiv = document.querySelector("#sound")

let musica = new Audio("PagInicial-Sound.mp3");
musica.loop = true;


soundDiv.addEventListener('click', ()=>{
  let listaDeSrc = [
    "PagInicial-img/PagInicial-Mute.png",
    "PagInicial-img/PagInicial-Unmute.png"
  ]

let srcAtual = soundButton.src.split("/").pop();

  if (srcAtual === "PagInicial-Mute.png") {
    soundButton.src = listaDeSrc[1];
    musica.play();
  }
  else{
    soundButton.src = listaDeSrc[0];
    musica.pause();
  }
});

let desligaEstatica = document.querySelector("#buttonTV");
let estatica = document.querySelector("#estatica");

desligaEstatica.addEventListener('click', ()=>{
  estatica.classList.toggle('desativado');
})

let revelaMenu = document.querySelector("#listaDePuzzles");
let menu = document.querySelector("#menu-puzzles");
let escondeMenu = document.querySelector("#fechar-menu");
let bloqueio = document.querySelector("#bloqueio-clique");


function animarMenu() {
  menu.style.opacity = 0;
  menu.style.transform = "scale(0.3)";

  anime({
    targets: menu,
    opacity: [0, 1],
    scale: [
      { value: 0.3, duration: 0 },
      { value: 1.15, duration: 300, easing: "easeOutQuad" },
      { value: 1.0, duration: 120, easing: "easeInOutQuad" }
    ],
    duration: 450
  });

  anime({
    targets: menu,
    borderColor: [
      { value: "#FCB62B", duration: 80 },
      { value: "#011423", duration: 80 },
      { value: "#FCB62B", duration: 80 },
      { value: "#011423", duration: 80 }
    ],
    easing: "steps(4)",
  });

  bloqueio.classList.remove("desativado");
}

function fecharMenu() {

  
  menu.style.transform = "scale(1)";
  menu.style.opacity = 1;

  
  anime({
    targets: menu,
    borderColor: [
      { value: "#011423", duration: 80 },
      { value: "#FCB62B", duration: 80 },
      { value: "#011423", duration: 80 },
      { value: "#FCB62B", duration: 80 }
    ],
    easing: "steps(4)",
  });

  
  anime({
    targets: menu,
    opacity: [1, 0],
    scale: [
      { value: 1.0, duration: 0 },                      
      { value: 1.15, duration: 120, easing: "easeOutQuad" },
      { value: 0.3, duration: 300, easing: "easeInQuad" }    
    ],
    duration: 450,
    complete: () => {
      menu.classList.add("desativado");
      menu.style.transform = "";
      menu.style.opacity = "";
    }
  });

  bloqueio.classList.add("desativado");
}



function mudaMenu() {
  const estavaAtivo = !menu.classList.contains("desativado");

  if (estavaAtivo) {
    fecharMenu();
  }
  else{
    menu.classList.remove("desativado")
    animarMenu()
  }
}

revelaMenu.addEventListener('click', mudaMenu);
escondeMenu.addEventListener('click', mudaMenu)