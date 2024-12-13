//função que chama todos os dados presentes no banco de dados e povoa cada uma das tabelas 
//com seus respectivos dados representados
const getList = async (tabela) => {
    let url = 'http://127.0.0.1:5000/' + tabela
    if(tabela == 'eventos'){
        fetch(url, {
            method: 'get',
        })
            .then((response) => response.json())
            .then((data) => {
              data.eventos.forEach(itemEvento => insertListEvento(itemEvento.nome, itemEvento.cliente, itemEvento.data, 
                itemEvento.tamanho, itemEvento.numero, itemEvento.email))
        })
        .catch((error) => {
              console.error('Error:', error);
        });
    }else if(tabela == 'fornecedores'){
        fetch(url, {
            method: 'get',
        })
            .then((response) => response.json())
            .then((data) => {
              data.fornecedores.forEach(itemFornecedor => insertListFornecedor(itemFornecedor.nome, itemFornecedor.RG, itemFornecedor.numero, 
                itemFornecedor.servico, itemFornecedor.email, itemFornecedor.site))
        })
        .catch((error) => {
              console.error('Error:', error);
        });
    }else if(tabela == 'produtores'){
        fetch(url, {
            method: 'get',
        })
            .then((response) => response.json())
            .then((data) => {
              data.produtores.forEach(itemProdutor => insertList(itemProdutor.nome, 
                itemProdutor.numero, itemProdutor.CPF, itemProdutor.funcao, itemProdutor.salario,
                itemProdutor.email, itemProdutor.curriculum))
        })
        .catch((error) => {
              console.error('Error:', error);
        });
    }
}
getList('eventos')
getList('fornecedores')
getList('produtores')
alert("Tabelas de usuarios atualizadas.")

//Encontro todos as opçoes que queremos dentro das tableas
var tabs = document.querySelectorAll("#tabPostRegistro .tabNavPost"),
    secs = document.querySelectorAll("#tabPostRegistro .tabContPost"),
    tabs2 = document.querySelectorAll("#tabShowReg .tabNavShow"),
    secs2 = document.querySelectorAll("#tabShowReg .tabContShow");

//Função que realiza a troca de abas do registro de usuarios
tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
        //retiro o current a classe da aba que sera trocada
        for (let t of tabs){ 
            t.classList.remove("current"); 
        }
        for (let s of secs){ 
            s.classList.remove("current");
        }

        //adciono current a classe da aba que foi selecionada
        tab.classList.add("current");
        secs[i].classList.add("current");
  });
});

//Função que realiza a troca de abas das tabelas que apresentam os usuarios registrados
tabs2.forEach((tab2, i) => {
    tab2.addEventListener("click", () => {
      //retiro o current a classe da tabela que sera trocada
        for (let t of tabs2) { 
            t.classList.remove("current"); 
        }
        for (let s of secs2) { 
            s.classList.remove("current"); 
        }
  
        //adciono current a classe da tabela que foi selecionada
        tab2.classList.add("current");
        secs2[i].classList.add("current");
    });
});


//Procura por qualquer valor na tabela que tenha em alguma tupla o digitado na busca e exclui 
//o resto da visao do cliente
const tableFilterFornecedor = (event) => {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#tableFornecedor tbody").rows;
    var col = []

    for (var i = 1; i < rows.length; i++) {
        //tentei implementar uma solução com loop for para ficar mais elegante e poder reaproveitar a função, porem não consegui que ela funciona-se e pretendo descobrir no futuro como melhor
        //implementar funções parecidas
        col[0] = rows[i].cells[0].textContent.toUpperCase();
        col[1] = rows[i].cells[1].textContent.toUpperCase();
        col[2] = rows[i].cells[2].textContent.toUpperCase();
        col[3] = rows[i].cells[3].textContent.toUpperCase();
        col[4] = rows[i].cells[4].textContent.toUpperCase();
        col[5] = rows[i].cells[5].textContent.toUpperCase();

        if (col[0].indexOf(filter) > -1 || col[1].indexOf(filter) > -1 || col[2].indexOf(filter) > -1 || col[3].indexOf(filter) > -1 || col[4].indexOf(filter) > -1 || col[5].indexOf(filter) > -1){
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }   
    }
}
const tableFilterProdutor = (event) => {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#tableProdutor tbody").rows;
    var col = []

    for (var i = 1; i < rows.length; i++) {
        col[0] = rows[i].cells[0].textContent.toUpperCase();
        col[1] = rows[i].cells[1].textContent.toUpperCase();
        col[2] = rows[i].cells[2].textContent.toUpperCase();
        col[3] = rows[i].cells[3].textContent.toUpperCase();
        col[4] = rows[i].cells[4].textContent.toUpperCase();
        col[5] = rows[i].cells[5].textContent.toUpperCase();
        col[6] = rows[i].cells[6].textContent.toUpperCase();

        if (col[0].indexOf(filter) > -1 || col[1].indexOf(filter) > -1 || col[2].indexOf(filter) > -1 || col[3].indexOf(filter) > -1 || col[4].indexOf(filter) > -1 || col[5].indexOf(filter) > -1 ||col[6].indexOf(filter) > -1 ){
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }      
    }
}
const tableFilterEvento = (event) => {
    var filter = event.target.value.toUpperCase();
    var rows = document.querySelector("#tableEvento tbody").rows;
    var col = []

    for (var i = 1; i < rows.length; i++) {
        col[0] = rows[i].cells[0].textContent.toUpperCase();
        col[1] = rows[i].cells[1].textContent.toUpperCase();
        col[2] = rows[i].cells[2].textContent.toUpperCase();
        col[3] = rows[i].cells[3].textContent.toUpperCase();
        col[4] = rows[i].cells[4].textContent.toUpperCase();
        col[5] = rows[i].cells[5].textContent.toUpperCase();

        if (col[0].indexOf(filter) > -1 || col[1].indexOf(filter) > -1 || col[2].indexOf(filter) > -1 || col[3].indexOf(filter) > -1 || col[4].indexOf(filter) > -1 || col[5].indexOf(filter) > -1){
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        } 
    }
}
document.querySelector('#filterEvento').addEventListener('keyup', tableFilterEvento, false);
document.querySelector('#filterProdutor').addEventListener('keyup', tableFilterProdutor, false);
document.querySelector('#filterFornecedor').addEventListener('keyup', tableFilterFornecedor, false);

