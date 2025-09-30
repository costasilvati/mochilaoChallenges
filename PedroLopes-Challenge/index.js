let arrayResposta = [
    [3, 7, 11, 15, 19, 23],       // Progressão aritmética (+4)
    [1, 4, 9, 16, 25, 36],        // Quadrados perfeitos
    [2, 3, 5, 8, 13, 21],         // Soma dos dois anteriores (Fibonacci)
    [2, 5, 9, 14, 20, 27],        // Diferença crescente (3,4,5,6,7)
    [2, 4, 8, 10, 20, 22]         // Alterna *2 e +2
];

window.onload = function() {
    let responseButton = document.getElementById("sendBtn");
    let numAleatorio = Math.floor(Math.random() * arrayResposta.length);
    let arrUser = arrayResposta[numAleatorio].slice(0, -1);

    // Exibe a sequência no HTML
    document.getElementById("sequencia-logica").textContent = arrUser.join(", ");

    responseButton.addEventListener("click", () => {
        // Pega o valor digitado pelo usuário
        let numUser = Number(document.getElementById("resposta-user").value);

        // Compara com o último número da sequência
        if (numUser !== arrayResposta[numAleatorio][5]) {
            alert("Resposta incorreta! Tente novamente.");
            window.location.reload();
        } else {
            alert("Parabéns! Você acertou.");
            window.location.reload();
        }
    });
}
