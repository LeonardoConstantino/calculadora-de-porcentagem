
const VALOR_TOTAL = document.querySelector("#valorTotal")
const VALOR_PORCENTAGEM = document.querySelector("#valorPorcentagem")
const VALOR_UNIDADE = document.querySelector("#valorUnidade")
const BTN_ADD_VALOR_PORCENTAGEM = document.querySelector("#adicionarValorPorcentagem")
const BTN_ADD_VALOR_UNIDADE = document.querySelector("#adicionarValorUnidade")
const ALERTA = document.querySelector(".alert")
const DIV_RESULTADOS = document.querySelector(".resultados")

const desabilitaInputs = e => {
    let inputSemValor = !e.target.value
    if (inputSemValor) {
        habilitaInputs()
        return
    }
    // console.log(e.target.value)
    if (e.target.id === 'valorPorcentagem') {
        VALOR_UNIDADE.setAttribute( 'disabled', '')
        BTN_ADD_VALOR_UNIDADE.setAttribute( 'disabled', '')
    }
    if (e.target.id === 'valorUnidade') {
        VALOR_PORCENTAGEM.setAttribute( 'disabled', '')
        BTN_ADD_VALOR_PORCENTAGEM.setAttribute( 'disabled', '')
    }
}

const habilitaInputs = () => {
    VALOR_PORCENTAGEM.removeAttribute( 'disabled')
    VALOR_UNIDADE.removeAttribute( 'disabled')
    BTN_ADD_VALOR_UNIDADE.removeAttribute( 'disabled')
    BTN_ADD_VALOR_PORCENTAGEM.removeAttribute( 'disabled')
}

const limpaInputs = () => {
const TEM_VALOR_TOTAL = document.querySelector("#manterValorTotal").checked
    VALOR_PORCENTAGEM.value = ''
    VALOR_UNIDADE.value = ''
    if(!TEM_VALOR_TOTAL) VALOR_TOTAL.value = ''
}

const clicou_btn_porcentagem = (e) => {
    // console.log(e)
    if (e.target.id === 'adicionarValorPorcentagem') {
        return true
    }
}

const calc = (porcentagem) => {
    if(porcentagem === "%"){
        let val1 = (VALOR_UNIDADE.value * 100) / VALOR_TOTAL.value
        return val1.toString().includes(".") ? val1.toFixed(2) + "%" : val1
    }
    let val2 = (VALOR_PORCENTAGEM.value / 100) * VALOR_TOTAL.value
    return val2.toString().includes(".") ? val2.toFixed(2) + "%" : val2
}

const gerar_cor = (opacidade = 1) => {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
   
   return `${r}, ${g}, ${b}`;
}

const menor_valor = (valor1, valor2) => {
    if(valor1 > valor2) return valor1; 
    return valor2; 
}

const mostra_resultado = (e) => {
    if(VALOR_PORCENTAGEM.value === "" && VALOR_UNIDADE.value === "") return
    const  PORCENTAGEM = clicou_btn_porcentagem(e)
    let cor = gerar_cor()

    const DIV_RESULTADO = document.createElement("div")
    DIV_RESULTADO.setAttribute('class', 'resultado' )
    DIV_RESULTADO.classList.add('center' )
    
    DIV_RESULTADO.innerHTML = `
        <div class="valor-resultado">
            <p>
                <strong>
                ${PORCENTAGEM ?
                    VALOR_PORCENTAGEM.value + "%":
                    VALOR_UNIDADE.value
                }
                </strong> ${PORCENTAGEM?"de":"é"} <strong>
                ${PORCENTAGEM ? VALOR_TOTAL.value : calc("%")}
                </strong> 
                ${PORCENTAGEM?"são":"de"} 
                <strong>
                ${PORCENTAGEM ? calc() : VALOR_TOTAL.value}
                </strong>
            </p>
        </div>
        <div class="grafico center">
            <div 
            class="total center" 
            style="
            background-color:rgb(${cor});
            ">
                <div 
                class="porcentagem" 
                style="
                    width: ${PORCENTAGEM ?
                        menor_valor(
                                VALOR_PORCENTAGEM.value,
                                VALOR_TOTAL.value
                            ) + "%":
                        VALOR_UNIDADE.value + "%"
                    };
                    background-color:rgb(${cor});
                    filter: invert(100%);
                ">
                </div>
            </div>
        </div>
    `
    DIV_RESULTADOS.appendChild(DIV_RESULTADO)
    DIV_RESULTADOS.classList.remove("display_none")
    DIV_RESULTADOS.classList.add("display_flex")
}

const alerta = () => {
    let alertaVisivel = !ALERTA.classList.contains("display_none")
    if (VALOR_PORCENTAGEM.value) return
    if (VALOR_UNIDADE.value) return
    if (alertaVisivel) return

    ALERTA.classList.toggle('display_none')
    setTimeout(() => {
        ALERTA.classList.toggle('display_none')
    }, 5000);
}

const click_btn = (e) => {
    e.preventDefault()
    alerta()
    mostra_resultado(e)
    // console.log('oiiiii')
    habilitaInputs()
    limpaInputs()
    VALOR_PORCENTAGEM.focus()
    // console.log(e)
}


VALOR_PORCENTAGEM.addEventListener('input', (e) => {desabilitaInputs(e)})
VALOR_UNIDADE.addEventListener('input', (e) => {desabilitaInputs(e)})

VALOR_PORCENTAGEM.addEventListener("keypress", (e) => {if(e.key === "Enter")click_btn(e)})

BTN_ADD_VALOR_PORCENTAGEM.addEventListener('click', (e) => {click_btn(e)})
BTN_ADD_VALOR_UNIDADE.addEventListener('click', (e) => {click_btn(e)})


// 300% de 100 são 300

// 100 é 33.33% de 300

// 33.33% de 100 são 33.33%