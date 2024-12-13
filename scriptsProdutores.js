//Função chamada pelo botão para adicionar o input no BD e na lista
const newItemProdutor =  () => {
    let inputNome = document.getElementById("newProdutor").value;
    let inputNumero = document.getElementById("newNumero").value;
    let inputCPF = document.getElementById("newCPF").value;
    let inputFuncao = document.getElementById("newFuncao").value;
    let inputSalario = document.getElementById("newSalario").value;
    let inputEmail = document.getElementById("newEmail").value;
    let inputCurriculum = document.getElementById("newCurriculum").value;

    if(inputNome == ""){
        alert("Por favor, escreva um nome valido");
    }else if(inputNumero.toString().length != 11 || isNaN(inputNumero)){
        alert("Por favor, escreva um numero de telefone valido");
    }else if(inputCPF.toString().length != 11 || isNaN(inputCPF)){
        alert("Por favor, escreva um CPF valido");
    }else{
        insertList(inputNome, inputCPF, inputNumero, inputFuncao, inputSalario, inputEmail, inputCurriculum);
        postItemProdutor(inputNome, inputCPF, inputNumero, inputFuncao, inputSalario, inputEmail, inputCurriculum)    
        alert("Produtor registrado em nosso banco.")
    }
}

//inseri o novo produtor no BD via POST
const postItemProdutor = async (inputNome, inputNumero, inputCPF, inputFuncao, inputSalario, inputEmail, inputCurriculum) => {
    const formData = new FormData();
    formData.append('nome', inputNome)
    formData.append('numero', inputNumero)
    formData.append('CPF', inputCPF)
    formData.append('funcao', inputFuncao)
    formData.append('salario', inputSalario)
    formData.append('email', inputEmail)
    formData.append('curriculum', inputCurriculum)

    let url = 'http://127.0.0.1:5000/produtor';
    fetch(url,{
        method:'post', body:formData
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Error:', error)
    });
}

//inserir produtores na lista
const insertList = (nome, CPF, numero, funcao, salario, email, curriculum) => {
    var item = [nome, CPF, numero, funcao, salario, email, curriculum];
    var table = document.getElementById("tableProdutor");
    var row = table.insertRow();
    
    for (var i = 0; i < item.length; i++){
        var cel = row.insertCell(i);
        cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newProdutor").value = "";
    document.getElementById("newNumero").value = "";
    document.getElementById("newCPF").value = "";
    document.getElementById("newFuncao").value = "";
    document.getElementById("newSalario").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newCurriculum").value = "";
    removeElement()
}

//adiciona um botao para a linha cada linha que sera usado como o input 
// de deleter um produtor
const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "closeProdutor";
    span.appendChild(txt);
    parent.appendChild(span);
}

//deleta um produtor e seus dados relacionados do banco de dados
const deleteItemProdutor = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/produtor?nome=' + item;

    fetch(url, {
        method: 'delete'
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });
}

//remove um elemento da linha atual
const removeElement = () => {
    let close = document.getElementsByClassName("closeProdutor");
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const nomeItem = div.getElementsByTagName('td')[0].innerHTML
            div.remove()
            deleteItemProdutor(nomeItem)
            alert("Produtor removido.")
        }
    }
}




