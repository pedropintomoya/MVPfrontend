//Adiciona um novo fornecedor ao clicar no botao
const newItemFornecedor =  () => {
    let inputNome = document.getElementById("newFornecedor").value;
    let inputRG = document.getElementById("newRGFornecedor").value;
    let inputNumero = document.getElementById("newNumeroFornecedor").value;
    let inputServico = document.getElementById("newServicoFornecedor").value;
    let inputSite = document.getElementById("newSiteFornecedor").value;
    let inputEmail = document.getElementById("newEmailFornecedor").value;

    if(inputNome == ""){
        alert("Por favor, escreva um nome valido");
    }else if(inputNumero.toString().length != 11 || isNaN(inputNumero)){
        alert("Por favor, escreva um numero de telefone valido (11 digitos, somente os numeros)");
    }else if(inputRG.toString().length != 14 || isNaN(inputRG)){
        alert("Por favor, escreva um RG de empresa valido (15 digitos, somente os numeros)");
    }else{
        insertListFornecedor(inputNome, inputRG, inputNumero, inputServico, inputSite, inputEmail);
        postItemFornecedor(inputNome, inputRG, inputNumero, inputServico, inputSite, inputEmail);
        alert("Fornecedor registrado em nosso banco.")
    }
    
}

//adiciona os fornecedores registrados na tabela de fornecedores
const insertListFornecedor = (nome, RG, numero, servico, email, site) => {
    var item = [nome, RG, numero, servico, email, site];
    var table = document.getElementById("tableFornecedor");
    var row = table.insertRow();

    for (var i = 0; i < item.length; i++){
        var cel = row.insertCell(i);
        cel.textContent = item[i];
    }
    insertButtonFornecedor(row.insertCell(-1))
    document.getElementById("newFornecedor").value = "";
    document.getElementById("newRGFornecedor").value = "";
    document.getElementById("newNumeroFornecedor").value = "";
    document.getElementById("newServicoFornecedor").value = "";
    document.getElementById("newSiteFornecedor").value = "";
    document.getElementById("newEmailFornecedor").value = "";
    removeElementFornecedor()
}

//inseri o novo fornecedor no BD via POST
const postItemFornecedor = async (inputNome, inputRG, inputNumero, inputServico, inputSite, inputEmail) => {
    const formData = new FormData();
    formData.append('nome', inputNome)
    formData.append('RG', inputRG)
    formData.append('numero', inputNumero)
    formData.append('servico', inputServico)
    formData.append('site', inputSite)
    formData.append('email', inputEmail)

    let url = 'http://127.0.0.1:5000/fornecedor';
    fetch(url,{
        method:'post', body:formData
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Error:', error)
    });
}


//deleta um fornecedor e seus dados relacionados do banco de dados
const deleteItemFornecedor = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/fornecedor?nome=' + item;

    fetch(url, {
        method: 'delete'
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });
}

//adiciona um botao para a linha cada linha que sera usado como o input de deleter um fornecedor
const insertButtonFornecedor = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "closeFornecedor";
    span.appendChild(txt);
    parent.appendChild(span);
}


//remove um elemento da linha atual
const removeElementFornecedor = () => {
    let close = document.getElementsByClassName("closeFornecedor");
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const nomeItem = div.getElementsByTagName('td')[0].innerHTML
            div.remove()
            deleteItemFornecedor(nomeItem)
            alert("Fornecedor removido.")
        }
    }
}
