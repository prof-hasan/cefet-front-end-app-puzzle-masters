import { buscarUsuario, criarUsuario } from "./firebase.js";

async function entrar() {
  let user = document.querySelector("#usuario").value.trim();
  let pass = document.querySelector("#senha").value.trim();

  if (!user || !pass) {
    Swal.fire({
      title: "Campos vazios!",
      text: "Preencha usuário e senha",
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
    return;
  }


  const usuario = await buscarUsuario(user);


  if (!usuario) {

    await criarUsuario(user, pass);

    Swal.fire({
      title: "Conta criada!",
      text: "Bem-vindo(a)!",
      icon: "success",
      background: "#021826",
      color: "#FCB62B",
      timer: 1600,
      showConfirmButton: false,
      customClass: { popup: "retro-popup" }
    });

    localStorage.setItem("usuarioLogado", user);
    localStorage.setItem("pontuacao", 0);

  }

  else if (usuario.senha === pass) {

    Swal.fire({
      title: `Bem-vindo, ${user}!`,
      icon: "success",
      background: "#021826",
      color: "#FCB62B",
      timer: 1400,
      showConfirmButton: false,
      customClass: { popup: "retro-popup" }
    });

    localStorage.setItem("usuarioLogado", user);
    localStorage.setItem("pontuacao", usuario.pontuacao);

  }


  else {
    Swal.fire({
      title: "Senha incorreta!",
      text: "Tente novamente",
      icon: "error",
      background: "#021826",
      color: "#FCB62B",
      confirmButtonText: "Voltar",
      confirmButtonColor: "#FCB62B",
      customClass: {
        popup: "retro-popup",
        confirmButton: "retro-button"
      }
    });
    return;
  }

  setTimeout(() => {
    document.querySelector("#Tela-login").classList.add("desativado");
    
    document.querySelector("#usuario").value = "";
    document.querySelector("#senha").value = "";
  }, 1400);
}


document.querySelector("#button-login").addEventListener("click", entrar);
document.addEventListener("keydown", e => {
  if (e.key === "Enter") entrar();
});



window.addEventListener("load", async () => {
  let user = localStorage.getItem("usuarioLogado");

  if (user) {
    const usuario = await buscarUsuario(user);
    if (!usuario) {
      localStorage.clear();
      return;
    }

    localStorage.setItem("pontuacao", usuario.pontuacao);
    document.querySelector("#Tela-login").classList.add("desativado");
  }
});



document.querySelector("#exit").addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  localStorage.removeItem("pontuacao");
  document.querySelector("#Tela-login").classList.remove("desativado");
});
