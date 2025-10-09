/**
 * Lista de desafios disponíveis.
 * Se você adicionar/remover pastas, ajuste este array.
 * As URLs são relativas à raiz (funciona no GitHub Pages).
 */
const CHALLENGES = [
  "1/index.html",
  "2/index.html",
  "3/index.html",
  "4/index.html",
];

// Chave usada no localStorage para a fila sem repetição
const QUEUE_KEY = "desafiosQueue_v1";

const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const statusEl = document.getElementById("status");

// ---------- Utilidades ----------
function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function loadQueue() {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(x => typeof x === "string")) return parsed;
    return null;
  } catch {
    return null;
  }
}

function saveQueue(queue) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

function buildFreshQueue() {
  return shuffleInPlace([...CHALLENGES]);
}

function updateStatus(queue) {
  const total = CHALLENGES.length;
  const restando = queue.length;
  const feitos = total - restando;
  statusEl.textContent = `Desafios prontos: ${total} · Já visitados nesta rodada: ${feitos} · Restando: ${restando}`;
  nextBtn.classList.toggle("hidden", restando === 0);
}

// Evita repetir até passar por todos: consome da fila embaralhada.
async function goNextFromQueue() {
  let queue = loadQueue();
  if (!queue || queue.length === 0) {
    queue = buildFreshQueue();
  }

  // Pega o próximo
  const next = queue.shift();
  saveQueue(queue);         // salva a fila atualizada
  updateStatus(queue);

  // Redireciona (com cache-buster)
  const url = next + (next.includes("?") ? "&" : "?") + "t=" + Date.now();
  window.location.href = url;
}

// Modo simples: escolha totalmente aleatória (pode repetir)
function goRandom() {
  const pick = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
  const url = pick + (pick.includes("?") ? "&" : "?") + "t=" + Date.now();
  window.location.href = url;
}

// ---------- Inicialização ----------
(function init() {
  // Por padrão, usaremos a FILA (sem repetição). Se quiser totalmente aleatório, troque o handler do playBtn.
  playBtn.addEventListener("click", goNextFromQueue);
  nextBtn.addEventListener("click", goNextFromQueue);

  // Atualiza status inicial
  const q = loadQueue() ?? buildFreshQueue();
  saveQueue(q);
  updateStatus(q);
})();
