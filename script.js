document.addEventListener("DOMContentLoaded", () => {
    // 1. ANIMAÇÃO DOS NÚMEROS (CONTADOR)
    const contadores = document.querySelectorAll(".numero-item h4");
    
    contadores.forEach(contador => {
        const textoOriginal = contador.innerText;
        // Extrai apenas os dígitos numéricos
        const valorFinal = parseInt(textoOriginal.replace(/[^0-9]/g, ''), 10);
        let valorInicial = 0;
        const duracao = 2000; // Tempo da animação em milissegundos (2 segundos)
        const incremento = valorFinal / (duracao / 16); 

        const atualizarContador = () => {
            valorInicial += incremento;
            if (valorInicial < valorFinal) {
                // Substitui os números mantendo os símbolos (~, %, +)
                contador.innerText = textoOriginal.replace(/[0-9]+/g, Math.floor(valorInicial));
                requestAnimationFrame(atualizarContador);
            } else {
                contador.innerText = textoOriginal;
            }
        };
        atualizarContador();
    });

    // 2. EFEITO DE REVELAÇÃO AO ROLAR A PÁGINA (SCROLL REVEAL)
    const elementosParaAnimar = document.querySelectorAll('.card, .esg-box, .lista-sustentavel li');
    
    // Configura o estilo inicial de invisibilidade via JS para não quebrar o CSS caso o JS falhe
    elementosParaAnimar.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
    });

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";
                observador.unobserve(entrada.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.1 }); // Dispara quando 10% do item aparece na tela

    elementosParaAnimar.forEach(el => observador.observe(el));
});