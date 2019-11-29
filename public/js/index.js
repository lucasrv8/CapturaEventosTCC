let out = ''
let cont = 0
let eventos = []
let bufferString = ''
var Evento = function(tipo, tipoInput, target, dado, dadoContido, objeto){
    this.tipo = tipo;
    this.tipoInput = tipoInput;
    this.target = target;
    this.dado = dado;
    this.dadoContido = dadoContido;
    this. obejto = objeto;
}
//Registra eventos de teclado
window.addEventListener("input", function(event){
    this.console.log(event.target.type)
    //Pega o ultimo evento ocorrido e testa para saber se foi evento de teclado
    textoYorN = eventos[eventos.length - 1]
    //this.console.log(textoYorN)
    if(event.target.type == 'text'){
        if(textoYorN != undefined){
            //Se o evento anterior foi de texto, armazena no buffer para formar uma palavra
            if(textoYorN.tipo == 'input' && textoYorN.tipoInput != 'checkbox'){
                bufferString = event.target.value
                this.console.log("Buffer: " + bufferString)
                //console.log("Buffer: " + bufferString
                //Se o ultimo evento não foi de texto, zera o buffer     
            }else if(bufferString != ''){
                bufferString = ''   
                //Seo ultimo evento não foi de texto e o buffer está vazio, insere o texto digitado
            }else{
                let evento = new Evento(event.type, event.target.outerHTML, event.data, event.target.value, event)
                eventos.push(evento)
            }
        }else{
            let evento = new Evento(event.type, event.target.type, event.target.outerHTML, event.data, event.target.value, event)
            eventos.push(evento)
            this.console.log("sdashdausd")
        }
    }

    if(event.target.type == 'checkbox'){
        this.console.log("teste check")
        let evento = new Evento(event.type, event.target.type, event.target.outerHTML, event.data, event.target.value, event)
            eventos.push(evento)
    }
    //em teste ainda
    //Separa em um vetor, onde a primeira parte será o tipo de evento, Ex: text e a segunda o resultado
    if(textoYorN.type == 'input' && bufferString != ''){
        bufferString = bufferString.replace(bufferString[bufferString.length-1], '')
    }
    if(cont < 2 ){
        out = out + event.key
        cont++
    }
    if(cont == 2){
        if(out == 'Altf'){
            console.log("out: " + out)
            localStorage.clear()
            
            //this.localStorage.setItem("eventos", 'teste')
        }
        out = ''
        cont = 0

    }
        
});

window.addEventListener("mousedown", function(event){
    // console.log(event);
    //Verifica se estava ocorrendo uma digitação anteriormente, se tiver, salva e depois insere o evento click
    if(bufferString != ''){
        eventoAux = eventos[eventos.length-1]
        eventoAux.dado = bufferString
        eventoAux.dadoContido = bufferString
        eventos[eventos.length-1] = eventoAux
        bufferString = ''
    }
    this.console.log(event.srcElement)
    if(event.srcElement.localName != 'input'){
        let evento = new Evento("click", null, event.target.outerHTML, null, null, event)
        eventos.push(evento)
        
        console.log(eventos)
    }
    //localStorage.setItem("eventos", localStorage.getItem("eventos") + event.target)
    //let eventos = localStorage.getItem("eventos")
    //console.log(Object.values(eventos))
});

// window.addEventListener("input", function(event){
//     this.console.log(event)
//     let evento = new Evento(event.type, event.target.outerHTML, event.data, event.target.value, event)
//     eventos.push(evento)
//     this.console.log(eventos)
// })

// document.querySelector("body > div > form > div > input[type=text]:nth-child(1)").addEventListener('input', function(e) { console.log(e)});