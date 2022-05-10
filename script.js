function timer(hora, minuto, segundo, ms) {
    const croHora = document.querySelector(hora);
    const croMinuto = document.querySelector(minuto);
    const croSegundo = document.querySelector(segundo);
    const croMs = document.querySelector(ms);

    let [contMs, contSeg, contMin, contHor, timer] = [0, 0, 0, 0, null];

    const botaoInciar = document.querySelector('[kz-iniciar]');
    botaoInciar.onclick = () => {
        botaoInciar.setAttribute('disabled', null);
        inciarTimer();
    }

    document.querySelector('[kz-pausar]').onclick = () => {
        botaoInciar.removeAttribute('disabled');
        stopTimer();
    }

    document.querySelector('[kz-reset]').onclick = () => {
        botaoInciar.removeAttribute('disabled');
        resetTimer();
    }

    function inciarTimer() {
        timer = setInterval(() => {
            if (contMs == 250) {
                contMs = 0;
                contSeg++
                contSeg >= 10 ? croSegundo.innerHTML = `${contSeg}`
                    : croSegundo.innerHTML = `0${contSeg}`;
            }

            if (contSeg == 59) {
                contSeg = 0;
                contMin++
                contMin >= 10 ? croMinuto.innerHTML = `${contMin}`
                    : croMinuto.innerHTML = `0${contMin}`;
            }

            if (contMin == 59) {
                contMin = 0;
                contHor++
                contHor >= 10 ? croHora.innerHTML = `${contHor}`
                    : croHora.innerHTML = `0${contHor}`;
            }

            contMs++
            contMs >= 100 ? croMs.innerHTML = `${contMs}`
                : croMs.innerHTML = `0${contMs}`;
        }, 1)
    }

    const stopTimer = () => clearInterval(timer);

    function resetTimer() {
        clearInterval(timer);

        [contMs, contSeg, contMin, contHor] = [0, 0, 0, 0];

        croHora.innerHTML = '00';
        croMinuto.innerHTML = '00';
        croSegundo.innerHTML = '00';
        croMs.innerHTML = '000';
    }
}

timer('.hora', '.minuto', '.segundo', '.ms');
