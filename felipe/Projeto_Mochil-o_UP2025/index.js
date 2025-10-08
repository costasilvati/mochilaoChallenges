const frases = [
    { palavras: ['PROGRAMAR', 'EU', 'AMO'], fraseCerta: 'EU AMO PROGRAMAR' },
    { palavras: ['QUERO', 'DESENVOLVEDOR', 'SER'], fraseCerta: 'QUERO SER DESENVOLVEDOR' },
    { palavras: ['PARE', 'DE', 'NUNCA', 'APRENDER'], fraseCerta: 'NUNCA PARE DE APRENDER' },
    { palavras: ['DA', 'PENSAR', 'CAIXA', 'FORA'], fraseCerta: 'PENSAR FORA DA CAIXA' },
    { palavras: ['PROBLEMAS', 'SEJA', 'DE', 'RESOLVEDOR', 'UM'], fraseCerta: 'SEJA UM RESOLVEDOR DE PROBLEMAS' }
];

const card = document.querySelector(".card");
const cardDrop = document.querySelector(".card-drop");
const botao = document.querySelector('.botao');
const feedback = document.getElementById('feedback');

let atual = 0;
let pontos = 0;

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5)
}

function carregaJogo() {
    if (atual < frases.length) {
        card.innerHTML = '';
        cardDrop.innerHTML = '';
        montarCard();
        montarDropZone();
    } else {
        document.querySelector('.desafio').innerHTML = `
        <div>
        <h2>🎉 Parabéns! Você concluiu o jogo!</h2>
        <p>Sua pontuação final foi: ${pontos} / ${frases.length}</p>
        </div>`
        botao.style.display = 'none';
    }
}

function montarCard() {
    let fraseAtual = frases[atual];
    let palavras = embaralhar([...fraseAtual.palavras])
    palavras.forEach((palavra, i) => {
        let div = document.createElement('div');
        div.draggable = true;
        div.className = 'peca';
        div.textContent = palavra;
        div.id = 'word-' + i;
        card.appendChild(div);

        div.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", div.id);
        });
    });
}

function montarDropZone() {
    let fraseAtual = frases[atual];
    fraseAtual.palavras.forEach(() => {
        let divDrop = document.createElement('div');
        divDrop.className = 'drop_zone';

        divDrop.addEventListener('dragover', e => e.preventDefault());
        divDrop.addEventListener('drop', e => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const peca = document.getElementById(id);

            if (!divDrop.hasChildNodes()) {
                divDrop.appendChild(peca);
            }
        });

        cardDrop.appendChild(divDrop);
    });
}

function mostrarFeedback(mensagem, tipo) {
    feedback.textContent = mensagem;
    feedback.className = tipo;
    
    setTimeout(() => {
        feedback.textContent = "";
        feedback.className = "";
    }, 1500);
}

function fraseEstaCorreta() {
    const zonas = document.querySelectorAll('.drop_zone');
    const fraseMontada = [];

    zonas.forEach(zona => {
        if (zona.firstChild) {
            fraseMontada.push(zona.firstChild.textContent);
        }
    });

    let fraseUsuario = fraseMontada.join(' ');

    if (fraseUsuario === frases[atual].fraseCerta) {
        pontos++;
        mostrarFeedback("✅ Correto!", "success");

        setTimeout(() => {
            atual++;
            carregaJogo();
        }, 1500);

    } else {
        mostrarFeedback("❌ Errado! Tente novamente.", "error");
        carregaJogo()
    }
}

botao.addEventListener('click', e => {
    e.preventDefault();
    fraseEstaCorreta();
});

carregaJogo();
