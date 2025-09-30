const quiz = [
  {
    pergunta: "Qual o próximo número da sequência? 2, 4, 8, 16, ?",
    opcoes: ["18", "20", "24", "32"],
    resposta: "32"
  },
  {
    pergunta: "Se um pato coloca um ovo na fronteira do Brasil com a Argentina, a quem pertence o ovo?",
    opcoes: ["Brasil", "Argentina", "Aos dois", "Nenhum, quem bota é a pata"],
    resposta: "Nenhum, quem bota é a pata"
  },
  {
    pergunta: "Qual número completa a sequência? 1, 1, 2, 3, 5, 8, ?",
    opcoes: ["10", "13", "15", "21"],
    resposta: "13"
  },
  {
    pergunta: "Um fazendeiro tem 17 ovelhas. Todas menos 9 morrem. Quantas restam?",
    opcoes: ["0", "8", "9", "17"],
    resposta: "9"
  },
  {
    pergunta: "Se 5 máquinas fazem 5 produtos em 5 minutos, quanto tempo 100 máquinas levarão para fazer 100 produtos?",
    opcoes: ["500 minutos", "100 minutos", "5 minutos", "50 minutos"],
    resposta: "5 minutos"
  },
  {
    pergunta: "Qual palavra é incorreta?",
    opcoes: ["Correto", "Certo", "Errado", "Incorreta"],
    resposta: "Incorreta"
  },
  {
    pergunta: "Você entra em uma sala escura com uma vela, uma lamparina e uma lareira. O que acende primeiro?",
    opcoes: ["Vela", "Lamparina", "Lareira", "O fósforo"],
    resposta: "O fósforo"
  },
  {
    pergunta: "Pedro tem o dobro da idade de João. João tem 10 anos. Qual a idade de Pedro?",
    opcoes: ["15", "20", "25", "30"],
    resposta: "20"
  },
  {
    pergunta: "Uma caixa tem 10 bolas. Você tira 2. Quantas bolas você TEM?",
    opcoes: ["8", "12", "0", "2"],
    resposta: "2"
  },
  {
    pergunta: "Qual das alternativas é diferente?",
    opcoes: [
      "2, 4, 6, 8",
      "10, 12, 14, 16",
      "18, 20, 22, 24",
      "3, 5, 7, 9"
    ],
    resposta: "3, 5, 7, 9"
  }
];

function selecionaCincoQuestoes() {
  const copia = [...quiz];
  copia.sort(() => Math.random() - 0.5);
  return copia.slice(0, 5)
}

const questoes = selecionaCincoQuestoes();
let current = 0;
let pontos = 0;

function mostraQuestao() {

  document.querySelector("#opcoes").innerHTML = '';

  if (current >= questoes.length) {
    document.querySelector("#questao").textContent = `Fim do quiz! Você fez ${pontos}/${questoes.length} pontos`;
    return;
  }

  document.querySelector("#questao").textContent = questoes[current].pergunta;

  questoes[current].opcoes.forEach(opcao => {
    let botao = document.createElement("button");
    botao.textContent = opcao;

    botao.addEventListener("click", () => {
      const div = document.querySelector(`#questao${current + 1}`);

      if (opcao == questoes[current].resposta) {
        div.classList.add('certa');
        pontos++
      } else {
        div.classList.add('errada');
      }

      setTimeout(() => {
        current++;
        mostraQuestao();
      }, 1000);
    })

    document.querySelector("#opcoes").appendChild(botao);
  })
}

mostraQuestao();