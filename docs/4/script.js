const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let secret = [];
let guess = [];

// Gera sequência aleatória
function generateSecret() {
  for (let i = 0; i < 4; i++) {
    secret.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  console.log("Segredo:", secret); // Pode comentar para esconder
}

// Atualiza cor escolhida no slot
const slots = document.querySelectorAll('.slot');
document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (guess.length < 4) {
      guess.push(btn.dataset.color);
      slots[guess.length - 1].style.background = btn.dataset.color;
    }
  });
});

// Verifica tentativa
document.getElementById('checkBtn').addEventListener('click', () => {
  if (guess.length < 4) {
    document.getElementById('message').textContent = "Escolha 4 cores!";
    return;
  }

  let correctPosition = 0;
  let correctColor = 0;

  // Cópias para comparação
  let secretCopy = [...secret];
  let guessCopy = [...guess];

  // Verifica cores na posição correta
  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      correctPosition++;
      secretCopy[i] = guessCopy[i] = null;
    }
  }

  // Verifica cores certas em posição errada
  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] && secretCopy.includes(guessCopy[i])) {
      correctColor++;
      secretCopy[secretCopy.indexOf(guessCopy[i])] = null;
    }
  }

  if (correctPosition === 4) {
    document.getElementById('message').textContent = "🎉 Parabéns! Você abriu o cofre!";
    document.getElementById('checkBtn').disabled = true;
  } else {
    document.getElementById('message').textContent = 
      `🔎 ${correctPosition} cores na posição certa, ${correctColor} certas em posição errada.`;
    guess = [];
    slots.forEach(slot => slot.style.background = "#1f2833");
  }
});

generateSecret();