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