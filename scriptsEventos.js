//Adiciona um novo evento ao clicar no botao
const newItemEvento =  () => {
    let inputNome = document.getElementById("newEvento").value;
    let inputCliente = document.getElementById("newClientevento").value;
    let inputData = document.getElementById("newDataEvento").value;
    let inputTamanho = document.getElementById("newTamanhoEvento").value;
    let inputNumero = document.getElementById("newNumeroEvento").value;
    let inputEmail = document.getElementById("newEmailEvento").value;

    if(inputNome == ""){
        alert("Por favor, escreva um nome valido");
    }else if(inputNumero.toString().length != 11 || isNaN(inputNumero)){
        alert("Por favor, escreva um numero de telefone valido (11 digitos, somente os numeros)");
    }else if(isValidDate(inputData)){
        alert("Por favor, coloque uma data valdia (formato YYYYMMDD)");
    }else{
        insertListEvento(inputNome, inputCliente, inputData, inputTamanho, inputNumero, inputEmail);
        postItemEvento(inputNome, inputCliente, inputData, inputTamanho, inputNumero, inputEmail);
        alert("Evento registrado em nosso banco.")
    }
    
}

//adiciona os eventos registrados na tabela de eventos
const insertListEvento = (nome, cliente, data, tamanho, numero, email) => {
    var item = [nome, cliente, data, tamanho, numero, email];
    var table = document.getElementById("tableEvento");
    var row = table.insertRow();

    for (var i = 0; i < item.length; i++){
        var cel = row.insertCell(i);
        cel.textContent = item[i];
    }
    insertButtonEvento(row.insertCell(-1))
    document.getElementById("newEvento").value = "";
    document.getElementById("newClientevento").value = "";
    document.getElementById("newDataEvento").value = "";
    document.getElementById("newTamanhoEvento").value = "";
    document.getElementById("newNumeroEvento").value = "";
    document.getElementById("newEmailEvento").value = "";
    removeElementEvento()
}

//inseri o novo evento no BD via POST
const postItemEvento = async (inputNome, inputCliente, inputData, inputTamanho, inputNumero, inputEmail) => {
    const formData = new FormData();
    formData.append('nome', inputNome)
    formData.append('cliente', inputCliente)
    formData.append('data', inputData)
    formData.append('tamanho', inputTamanho)
    formData.append('numero', inputNumero)
    formData.append('email', inputEmail)

    let url = 'http://127.0.0.1:5000/evento';
    fetch(url,{
        method:'post', body:formData
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Error:', error)
    });
}

//deleta um evento e seus dados relacionados do banco de dados
const deleteItemEvento = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/evento?nome=' + item;

    fetch(url, {
        method: 'delete'
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });
}

//adiciona um botao para a linha cada linha que sera usado como o input de deleter um evento
const insertButtonEvento = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "closeEvento";
    span.appendChild(txt);
    parent.appendChild(span);
}

//remove um elemento da linha atual
const removeElementEvento = () => {
    let close = document.getElementsByClassName("closeEvento");
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const nomeItem = div.getElementsByTagName('td')[0].innerHTML
            div.remove()
            deleteItemEvento(nomeItem)
            alert("Evento removido.")
        }
    }
}

//funcção que checa se a data é valida
//a função date.parse retorna quanto tempo se passou entre 19700101 e a data inserida
//portanto, se ela não retornar um inteiro, a data não é valida. Por isso checamos o negativo de isNaN 
const isValidDate =  (stringDate) => {
    return !isNaN(Date.parse(stringDate));
}