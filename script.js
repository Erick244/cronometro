function timer(hora, minuto, segundo, ms) {
    const croHora = document.querySelector(hora);
    const croMinuto = document.querySelector(minuto);
    const croSegundo = document.querySelector(segundo);
    const croMs = document.querySelector(ms);
    
    const botaoInciar = document.querySelector('[kz-iniciar]');
    botaoInciar.onclick = () => {
        manipularAtributo(botaoInciar, true, 'disabled');
        manipularAtributo(botaoPausar, false, 'disabled');
        manipularAtributo(botaoReset, false, 'disabled');
        
        inciarTimer();
    }
    
    const log = document.querySelector('.log');
    const botaoPausar = document.querySelector('[kz-pausar]')
    botaoPausar.onclick = () => {
        manipularAtributo(botaoPausar, true, 'disabled')
        manipularAtributo(botaoInciar, false, 'disabled')
        
        const newLog = criarP(croHora.innerHTML, croMinuto.innerHTML, croSegundo.innerHTML, croMs.innerHTML);
        log.appendChild(newLog);
        
        stopTimer();
    }
    
    const botaoReset = document.querySelector('[kz-reset]')
    botaoReset.onclick = () => {
        manipularAtributo(botaoReset, true, 'disabled');
        manipularAtributo(botaoPausar, true, 'disabled');
        manipularAtributo(botaoInciar, false, 'disabled')
        
        resetTimer();
    }
    
    document.querySelector('[kz-clearLog]').onclick = () => {
        log.innerHTML = null;
    }
    
    let [contMs, contSeg, contMin, contHor, timer] = [0, 0, 0, 0, null];
    
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

    function criarP(textHor, textMin, textSeg, textMs) {
        const p = document.createElement('p');

        p.innerHTML = `- ${textHor}:${textMin}:${textSeg} <sup>${textMs}<sup/>`;
        return p;
    }

    function manipularAtributo(elem, set, atributeName, value=null) {
        set ? elem.setAttribute(atributeName, value)
            : elem.removeAttribute(atributeName);
    }
}

timer('.hora', '.minuto', '.segundo', '.ms');
