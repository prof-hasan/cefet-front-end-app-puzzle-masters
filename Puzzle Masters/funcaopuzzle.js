import { salvarPontuacao } from "./PagInicial/firebase.js";



function carregarPagina(url) {
    document.getElementById("loader").classList.remove("desativado");

    setTimeout(() => {
        window.location.href = url;
    }, 800);
}

window.carregarPagina = carregarPagina;

let pecas = document.querySelectorAll(".peca");
let chaveDoCodigo = document.querySelector("#chave");

embaralha();

pecas.forEach(elemento => {
    elemento.addEventListener('click', () => {
        let numSelecionadas = document.querySelectorAll('.selecionado')

        if (numSelecionadas.length < 2 || elemento.classList.contains('selecionado')) {
            elemento.classList.toggle('selecionado')
        }
        else {
            Swal.fire({
                title: "AVISO DO SISTEMA",
                text: "Você só pode selecionar DUAS peças!",
                icon: "warning",
                background: "#021826",
                color: "#FCB62B",
                confirmButtonColor: "#FCB62B",
                confirmButtonText: "OK",
                customClass: {
                    popup: "retro-popup",
                    confirmButton: "retro-button"
                }
            });
        }

    })
});

let troca = document.querySelector("#swap");
troca.addEventListener('click', async () => {

    let numSelecionadas = document.querySelectorAll('.selecionado')

    if (numSelecionadas.length != 2) {
        Swal.fire({
            title: "ERRO DE COMANDO",
            text: "Selecione exatamente DUAS peças para trocar.",
            icon: "error",
            background: "#021826",
            color: "#FCB62B",
            confirmButtonText: "ENTENDI",
            confirmButtonColor: "#FCB62B",
            customClass: {
                popup: "retro-popup",
                confirmButton: "retro-button"
            }
        });
    }
    else {
        let midSwap = numSelecionadas[0].src;
        numSelecionadas[0].src = numSelecionadas[1].src;
        numSelecionadas[1].src = midSwap;

        numSelecionadas[0].classList.remove('selecionado');
        numSelecionadas[1].classList.remove('selecionado');

        let verificadorDeCorrecao = 0;

        let userLogado = sessionStorage.getItem("usuarioLogado");

        if (!userLogado) {
            Swal.fire({
                icon: "error",
                title: "ERRO",
                text: "Nenhum usuário logado!",
                background: "#021826",
                color: "#FCB62B",
                confirmButtonText: "OK",
                customClass: {
                    popup: "retro-popup",
                    confirmButton: "retro-button"
                }
            });
            return;
        }

        let pontos = Number(sessionStorage.getItem("pontuacao")) || 0;



        for (let index = 0; index < pecas.length; index++) {
            let nomeCodificado = pecas[index].src.split('/').pop();

            let nomeFinal = decodeURI(nomeCodificado);

            let esperado = `${chaveDoCodigo.value} (${index + 1}).png`;
            if (nomeFinal !== esperado) {
                verificadorDeCorrecao = 1;
                break;
            }
        }

        if (verificadorDeCorrecao == 0) {
            pontos += (pecas.length * 4);
            await salvarPontuacao(userLogado, pontos);
            sessionStorage.setItem("pontuacao", pontos);


            await new Promise(resolve => setTimeout(resolve, 100));
            Swal.fire({
                title: "PARABÉNS!",
                html: `
    <span style="
      font-family:'VT323', monospace;
      font-size: 26px;
      color: #00FFE1;
      text-shadow: 2px 2px #011423;
    ">
      Puzzle resolvido com sucesso!<br>
    +${pecas.length * 4} pontos<br>
    Total: ${pontos}
    </span>
  `,
                icon: "success",
                background: "#021826",
                color: "#FCB62B",
                confirmButtonText: "TELA INICIAL",
                confirmButtonColor: "#3ACFC5",
                customClass: {
                    popup: "retro-popup",
                    confirmButton: "retro-button"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.close();
                    carregarPagina("../PagInicial/Pagina-Inicial.html")
                }
            })

        }
    }
})


function embaralha() {
    const numeroDeTrocas = 10 * pecas.length;

    for (let i = 0; i < numeroDeTrocas; i++) {

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
