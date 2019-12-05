let out = ''
let cont = 0
let eventos = JSON.parse(this.localStorage.getItem("CapturaEventos")) != undefined? JSON.parse(this.localStorage.getItem("CapturaEventos")):[]
let bufferString = ''
let resultadoFinal = []
let textArea = false
let bufferTextArea = ''
let run = false
let finish = false

var Evento = function(tipo, tipoInput, target, dado, dadoContido, objeto){
    this.tipo = tipo;
    this.tipoInput = tipoInput;
    this.target = target;
    this.dado = dado;
    this.dadoContido = dadoContido;
    this.obejto = objeto;
}
//Registra eventos de teclado
window.addEventListener("input", function(event){
    if(run){    
        //Pega o ultimo evento ocorrido e testa para saber se foi evento de teclado
        textoYorN = eventos[eventos.length - 1]
        if(event.target.type == 'text' || event.target.type == 'email' || event.target.type == 'password' || event.target.type == 'number'){
            if(textoYorN != undefined){
                //Se o evento anterior foi de texto, armazena no buffer para formar uma palavra
                if(textoYorN.tipo == 'input' && (textoYorN.tipoInput == event.target.type || textoYorN.tipoInput == undefined)){
                    bufferString = event.target.value
                    //Se o ultimo evento não foi de texto, zera o buffer     
                }else{
                    if(bufferString != ''){
                        eventoAux = eventos[eventos.length-1]
                        eventoAux.dado = bufferString
                        eventoAux.dadoContido = bufferString
                        eventos[eventos.length-1] = eventoAux
                        bufferString = ''
                        this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
                    }else{   
                        bufferString = ''
                        let evento = new Evento(event.type, event.target.type, event.target.outerHTML, event.data, event.target.value, event)
                        eventos.push(evento)
                        this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
                    }
                        //Seo ultimo evento não foi de texto e o buffer está vazio, insere o texto digitado
                }
            }else{
                let evento = new Evento(event.type, event.target.type, event.target.outerHTML, event.data, event.target.value, event)
                eventos.push(evento)
                this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
            }
        }

        if(event.target.type == 'checkbox'){
            let evento = new Evento(event.type, event.target.type, event.target.outerHTML, event.data, event.target.value, event)
            eventos.push(evento)
            this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
        }

        if(event.target.type == 'select-one'){
            let evento = new Evento(event.type, event.target.type, event.target.outerHTML, event.data, event.target.value, event)
            eventos.push(evento)
            this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
        }
        //em teste ainda
        //Separa em um vetor, onde a primeira parte será o tipo de evento, Ex: text e a segunda o resultado
        if(textoYorN.type == 'input' && bufferString != ''){
            bufferString = bufferString.replace(bufferString[bufferString.length-1], '')
        }
    }
        
});

window.addEventListener("mousedown", function(event){
    if(event.target.type == "button" || event.target.type == "submit"){
        if(event.target.className == "btn fa fa-stop"){
            if(run){
                this.console.log("Finalizar?")
                let resposta = this.confirm("Deseja finalizar a gravação de eventos?")
                if(resposta){
                    eventos = []
                    this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
                    run = false
                    finish = true
                }
            }else{
                this.alert("Não há nenhuma gravação ativa!")
            }
        }
        if(event.target.className == "btn fa fa-play"){
            this.console.log("Play")
            if(finish){
                finish = false
                run = true
                this.alert("Gravação iniciada!")
            }
            if(!run && !finish){
                run = true
                this.alert("Gravação iniciada!")
            }
        }
        if(event.target.className == "btn fa fa-pause"){
            if(finish){
                this.alert("Não há nenhuma gravação ativa!")
            }
            if(!run){
                this.alert("Não há nenhuma gravação ativa!")
            }else{
                this.console.log("Pause")
                run = false
                this.alert("Gravação pausada!")
            }
        }
        if(run && event.target.className != "btn fa fa-play" && event.target.className != "btn fa fa-pause"){
            let evento = new Evento("click", "button", event.target.outerHTML, null, null, event)
            eventos.push(evento)
            this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
        }
    }
    if(run){
        //Verifica se estava ocorrendo uma digitação anteriormente, se tiver, salva e depois insere o evento click
        if(bufferString != ''){
            eventoAux = eventos[eventos.length-1]
            eventoAux.dado = bufferString
            eventoAux.dadoContido = bufferString
            eventos[eventos.length-1] = eventoAux
            bufferString = ''
            this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
        }

        if(bufferTextArea != ''){
            eventoAux = eventos[eventos.length-1]
            eventoAux.dado = bufferTextArea
            eventoAux.dadoContido = bufferTextArea
            eventos[eventos.length-1] = eventoAux
            bufferTextArea = ''
            textArea = false
        }

        if(event.srcElement.localName == "textarea"){
            textArea = true
            let evento = new Evento("textArea", "text", event.target.outerHTML, null, null, event)
            eventos.push(evento)
            this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
        }
        if(event.srcElement.localName != 'input' && event.srcElement.localName != 'select' && event.target.type != "button" && event.target.type != "submit" && event.srcElement.localName != "textarea"){
            let evento = new Evento("click", null, event.target.outerHTML, null, null, event)
            eventos.push(evento)
            this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
        }
    }
});

window.addEventListener("keydown", function(event){
    if(event.code == 'ShiftRight'){
        resultadoFinal = JSON.parse(this.localStorage.getItem("CapturaEventos"))
        this.console.log(resultadoFinal)
    }
    
    if(event.code == 'AltRight'){
        console.log("LocalStorage limpo")
        eventos = []
        this.localStorage.setItem("CapturaEventos", JSON.stringify(eventos))
    }
    if(run){
        if(textArea){
            bufferTextArea = bufferTextArea + event.key
        }
    }
})


// var url = "http://www.google.com/"

// var xhttp = new XMLHttpRequest();
// xhttp.open("GET", url, true)
// xhttp.onreadystatechange = function(){
//     if(xhttp.readyState == 4 && xhttp.status == 200){
//         console.log(xhttp.responseText)
//     }
// }

// xhttp.send();
// document.querySelector("body > div > form > div > input[type=text]:nth-child(1)").addEventListener('input', function(e) { console.log(e)});