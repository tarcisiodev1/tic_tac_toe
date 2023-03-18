const camposSpan = document.querySelectorAll("#conteinerJogo span");
let camposVirtual = [];
let rodadaPlayer = "";

// function playerRodada() {
//   const inputPlayer = document.getElementById(rodadaPlayer);
//   document.getElementById("rodadaPlayer").innerText = inputPlayer.value;
// }

function inicializacao() {
  camposVirtual = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  rodadaPlayer = "player1";
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="rodadaPlayer"></span>';
  playerRodada();
  camposSpan.forEach(function (element) {
    element.classList.remove("vitoria");
    element.innerText = "";
    element.classList.add("campos-jogo");
    element.addEventListener("click", pegandoElementoDoEventoClick);
  });
}

function pegandoElementoDoEventoClick(ev) {
  const span = ev.currentTarget;
  const campoClicado = span.dataset.campos;

  const conjuntoLinhaColuna = campoClicado.split(".");
  // O método split() divide uma String em uma lista ordenada de substrings["N", "N"]
  const linha = conjuntoLinhaColuna[0];
  const coluna = conjuntoLinhaColuna[1];
  // Marca a região clicada com o símbolo do jogador
  if (rodadaPlayer === "player1") {
    span.innerText = "X";
    camposVirtual[linha][coluna] = "X";
  } else {
    span.innerText = "O";
    camposVirtual[linha][coluna] = "O";
  }
  // Limpa o console e exibe nosso tabuleiro virtual
  console.clear();
  console.table(camposVirtual);
  // Desabilita a região clicada
  desabilitarCampos(span);
  // Verifica se alguém venceu
  const camposDeVitoria = verificacaoCampoDeVitoria();
  if (camposDeVitoria.length > 0) {
    marcaCamposDeVitoria(camposDeVitoria);
  } else if (camposVirtual.flat().includes("")) {
    // O método flat() cria um novo array com todos elementos
    //  sub-arrays concatenados nele de forma recursiva até a profundidade especificada.
    rodadaPlayer = rodadaPlayer === "player1" ? "player2" : "player1";
    playerRodada();
  } else {
    document.querySelector("h2").innerHTML = "Empate!";
  }
}

function playerRodada() {
  const inputJogador = document.getElementById(rodadaPlayer);
  document.getElementById("rodadaPlayer").innerText = inputJogador.value;
}

function verificacaoCampoDeVitoria() {
  const camposDeVitoria = [];
  if (
    camposVirtual[0][0] &&
    camposVirtual[0][0] === camposVirtual[0][1] &&
    camposVirtual[0][0] === camposVirtual[0][2]
  )
    camposDeVitoria.push("0.0", "0.1", "0.2");
  if (
    camposVirtual[1][0] &&
    camposVirtual[1][0] === camposVirtual[1][1] &&
    camposVirtual[1][0] === camposVirtual[1][2]
  )
    camposDeVitoria.push("1.0", "1.1", "1.2");
  if (
    camposVirtual[2][0] &&
    camposVirtual[2][0] === camposVirtual[2][1] &&
    camposVirtual[2][0] === camposVirtual[2][2]
  )
    camposDeVitoria.push("2.0", "2.1", "2.2");
  if (
    camposVirtual[0][0] &&
    camposVirtual[0][0] === camposVirtual[1][0] &&
    camposVirtual[0][0] === camposVirtual[2][0]
  )
    camposDeVitoria.push("0.0", "1.0", "2.0");
  if (
    camposVirtual[0][1] &&
    camposVirtual[0][1] === camposVirtual[1][1] &&
    camposVirtual[0][1] === camposVirtual[2][1]
  )
    camposDeVitoria.push("0.1", "1.1", "2.1");
  if (
    camposVirtual[0][2] &&
    camposVirtual[0][2] === camposVirtual[1][2] &&
    camposVirtual[0][2] === camposVirtual[2][2]
  )
    camposDeVitoria.push("0.2", "1.2", "2.2");
  if (
    camposVirtual[0][0] &&
    camposVirtual[0][0] === camposVirtual[1][1] &&
    camposVirtual[0][0] === camposVirtual[2][2]
  )
    camposDeVitoria.push("0.0", "1.1", "2.2");
  if (
    camposVirtual[0][2] &&
    camposVirtual[0][2] === camposVirtual[1][1] &&
    camposVirtual[0][2] === camposVirtual[2][0]
  )
    camposDeVitoria.push("0.2", "1.1", "2.0");
  return camposDeVitoria;
}

function desabilitarCampos(element) {
  element.classList.remove("campos-jogo");
  element.removeEventListener("click", pegandoElementoDoEventoClick);
}

function marcaCamposDeVitoria(arrayCamposDeVitoria) {
  arrayCamposDeVitoria.forEach(function (campo) {
    document
      .querySelector('[data-campos="' + campo + '"]')
      .classList.add("vitoria");
  });
  // colocar nome do vencedor
  const nomePlayer = document.getElementById(rodadaPlayer).value;
  document.querySelector("h2").innerHTML = nomePlayer + " venceu!";
}

const button = document.getElementById("start");

button.addEventListener("click", inicializacao);
