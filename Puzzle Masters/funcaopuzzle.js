

//Seleção de peças
let pecas = document.querySelectorAll(".peca");

let vetor;
pecas.forEach(elemento => {
    elemento.addEventListener('click', ()=>{
        let numSelecionadas = document.querySelectorAll('.selecionado')

        if (numSelecionadas.length<2 || elemento.classList.contains('selecionado')) {
            elemento.classList.toggle('selecionado')
        }
        else {
            window.alert("Você só pode selecionar 2 peças")
        }
        
    })
});

//Troca de peças

let troca = document.querySelector("#swap");
troca.addEventListener('click', ()=>{

    let numSelecionadas = document.querySelectorAll('.selecionado')

    if (numSelecionadas.length!=2) {
        window.alert("Selecione duas peças");
    }
    else{
         let midSwap = numSelecionadas[0].src;
         numSelecionadas[0].src = numSelecionadas[1].src;
         numSelecionadas[1].src = midSwap;
         numSelecionadas[0].classList.remove('selecionado');
         numSelecionadas[1].classList.remove('selecionado');
    }
})