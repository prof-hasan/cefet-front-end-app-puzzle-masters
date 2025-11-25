

//Seleção de peças
let pecas = document.querySelectorAll(".peca");
let chaveDoCodigo = document.querySelector("#chave");

embaralha();

let vetor;
pecas.forEach(elemento => {
    elemento.addEventListener('click', () => {
        let numSelecionadas = document.querySelectorAll('.selecionado')

        if (numSelecionadas.length < 2 || elemento.classList.contains('selecionado')) {
            elemento.classList.toggle('selecionado')
        }
        else {
            window.alert("Você só pode selecionar 2 peças")
        }

    })
});

//Troca de peças

let troca = document.querySelector("#swap");
troca.addEventListener('click', async () => {

    let numSelecionadas = document.querySelectorAll('.selecionado')

    if (numSelecionadas.length != 2) {
        window.alert("Selecione duas peças");
    }
    else {
        let midSwap = numSelecionadas[0].src;
        numSelecionadas[0].src = numSelecionadas[1].src;
        numSelecionadas[1].src = midSwap;

        numSelecionadas[0].classList.remove('selecionado');
        numSelecionadas[1].classList.remove('selecionado');

        //Verificar se as peças estão na posição correta

        let verificadorDeCorrecao = 0;

        for (let index = 0; index < pecas.length; index++) {
            let nomeCodificado = pecas[index].src.split('/').pop(); 

            let nomeFinal = decodeURI(nomeCodificado);

            let esperado = `${chaveDoCodigo.value} (${index + 1}).png`;
            if (nomeFinal !== esperado ) {
                verificadorDeCorrecao = 1;
                break;
            }
        }

        if (verificadorDeCorrecao == 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
            window.alert("Parabéns");

        }
    }
})


//Embaralhar as peças

function embaralha() {
    const numeroDeTrocas = 10 * pecas.length;

    for (let troca = 0; troca < numeroDeTrocas; troca++) {

        let peca1 = Math.floor(Math.random() * pecas.length);
        let peca2 = Math.floor(Math.random() * pecas.length);

        if (peca1 == peca2) {
            continue;
        }

        let midEmbaralho = pecas[peca1].src;
        pecas[peca1].src = pecas[peca2].src;
        pecas[peca2].src = midEmbaralho;
    }
}

let soundButton = document.querySelector("#soundLogo");
let soundDiv = document.querySelector("#sound")

let musica = new Audio("../PagInicial/PagInicial-Sound.mp3");
musica.loop = true;


soundDiv.addEventListener('click', () => {
  let listaDeSrc = [
    "../PagInicial/PagInicial-img/PagInicial-Mute.png",
    "../PagInicial/PagInicial-img/PagInicial-Unmute.png"
  ]

  let srcAtual = soundButton.src.split("/").pop();

  if (srcAtual === "PagInicial-Mute.png") {
    soundButton.src = listaDeSrc[1];
    musica.play();
  }
  else {
    soundButton.src = listaDeSrc[0];
    musica.pause();
  }
});