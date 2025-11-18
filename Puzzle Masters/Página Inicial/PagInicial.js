let soundButton = document.querySelector("#soundLogo");


let musica = new Audio("PagInicial-Sound.mp3");
musica.loop = true;


soundButton.addEventListener('click', ()=>{
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

