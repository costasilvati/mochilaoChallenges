// Banco de sequências (último número é a resposta correta)
const sequencias = [
  [3, 7, 11, 15, 19, 23],   // PA +4
  [1, 4, 9, 16, 25, 36],    // quadrados
  [2, 3, 5, 8, 13, 21],     // fibonacci-like
  [2, 5, 9, 14, 20, 27],    // diferenças crescentes
  [2, 4, 8, 10, 20, 22]     // *2 e +2 alternado
];

// Lê progresso salvo (ou 0)
let desafiosConcluidos = Number(localStorage.getItem("desafiosConcluidos") || 0);
let sequenciaAtual = null;

function mostrarMensagemFinal() {
  const alvo = document.getElementById("sequencia-logica");
  alvo.textContent = `Parabéns! Você terminou ${desafiosConcluidos} desafios.`;
  // Opcional: esconder o formulário para não aceitar mais respostas
  const form = document.getElementById("formulario-usuario");
  if (form) form.style.display = "none";
}

function novaSequencia() {
  const arr = sequencias[Math.floor(Math.random() * sequencias.length)];
  sequenciaAtual = arr;
  const visivel = arr.slice(0, -1).join(", ");
  document.getElementById("sequencia-logica").textContent = visivel + ", ...";
  const input = document.getElementById("resposta-user");
  if (input) input.value = "";
}

function iniciar() {
  if (desafiosConcluidos >= 5) {
    mostrarMensagemFinal();
    return;
  }
  novaSequencia();

  const botao = document.getElementById("sendBtn");
  botao.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.getElementById("resposta-user");
    const valor = Number(input.value);

    if (!Number.isFinite(valor)) {
      alert("Digite um número válido.");
      return;
    }

    const correto = sequenciaAtual[sequenciaAtual.length - 1];
    if (valor === correto) {
      desafiosConcluidos += 1;
      localStorage.setItem("desafiosConcluidos", desafiosConcluidos);

      if (desafiosConcluidos >= 5) {
        mostrarMensagemFinal();
      } else {
        alert(`Acertou! Faltam ${5 - desafiosConcluidos} para concluir.`);
        novaSequencia();
      }
    } else {
      alert("Resposta incorreta! Tente novamente.");
    }
  });
}

window.addEventListener("DOMContentLoaded", iniciar);
