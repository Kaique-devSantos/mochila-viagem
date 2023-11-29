const form = (document.getElementById("novoItem"))
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento)=> {

    criaElemento(elemento)
})

form.addEventListener("submit", (evento) =>{
   
    /*preventDefault essa propriedade foi utilizada no evento para desativar o comportamento padrao que
    estava enviando dados do form para url da pagina*/
    evento.preventDefault() 
    /* com esse console conseguimos achar a propriedade target vamos usar no futuro, que nos tras o alvo 
    q neste caso é evento que ocorre no form, console.log(evento) */
    

    //console.log(evento.target.elements['nome'].value)
    //console.log(evento.target.elements['quantidade'].value)

    /*aqui buscamos o valor do alvo existente no evento, usamos elements para acessar indice por nome*/
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade'] 


    /* const existe busca no array (const itens), em elemento, em elemento.nome ele pede pra trazer
    exatamente o nome e seu valor*/
    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value ,
        "quantidade": quantidade.value
    }
    
    if (existe) {
        
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        
        itens[itens.findIndex(elemento => elemento.id === id)] = itemAtual
        
    } else {
            itemAtual.id = itens[itens.length -1] ? (itens[itens.length - 1]).id + 1  : 0

             criaElemento(itemAtual)
    
             itens.push(itemAtual)

    }
    

    /* JSON.stringify guarda todos elementos em uma string, aqui está escrevendo no localStorage */
    localStorage.setItem("itens", JSON.stringify (itens))

    nome.value = ""
    quantidade.value = ""

} )

function criaElemento (item) {      
    /*const novoItem cria elemento li e add class item*/  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

/*const numeroItem cria elemento strong que esta sendo buscada do nosso html com quantidade, criando id 
para conseguiguir localizar cada elemento pelo indice */

    const numeroItem = document.createElement ('strong')
    numeroItem.innerHTML = item.quantidade
    /*nosso data set foi utilizado nessa etapada para adc id no item via JS pertindo acesso via indice. */
    numeroItem.dataset.id = item.id

    /* utilizamos appendChild para inserir o strong dentro da li, correção do Object*/
    novoItem.appendChild(numeroItem)
   
    /* const novoItem + busca do elemento nome*/
    novoItem.innerHTML += item.nome

    novoItem.appendChild (botaoDeleta (item.id))

    /* aq estamos adc a const novoItem na const lista manipulação feita com usso da tag appendChild()*/
    lista.appendChild(novoItem)

}

function atualizaElemento (item) {
    document.querySelector("[data-id='"+item.id+"']" ).innerHTML = item.quantidade
}

function botaoDeleta (id) {
     const elementoBotao = document.createElement("buton")

     elementoBotao.innerText = "X"

     elementoBotao.addEventListener("click" , function ()  {
       
        /* this.parentNode foi utilizado como parametro para remover o elemento por completo*/
        deletaElemento(this.parentNode, id)
     }) 

     return elementoBotao
}

function deletaElemento (tag , id) {
tag.remove()
itens.splice(itens.findIndex(elemento => elemento.id === id) ,1)

/*nesta esta etapa do codigo reutilizamos essa linha de codigo para reescrever no local storage depois
de ter deletado item*/
localStorage.setItem("itens", JSON.stringify (itens))

}