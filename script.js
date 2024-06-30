const transactionsUl = document.querySelector('#transactions') // essas linhas selecionan elementos HTML especificos e os
const incomeDisplay = document.querySelector('#money-plus')    // atribuem a variaveis. isso facilita a manipulaçao desses 
const expenseDisplay = document.querySelector('#money-minus')  // elementos no J.S
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')
// `transactionsUL`: lista de transaçoes.
// `incomeDisplay`: exibiçao de receita.
// `expenseDisplay`: exibiçao de despesas.
// `balanceDisplay`: exibiçao de saldos.
// `form`:formulario de entrada de transaçoes.
// `inputTransactionName: campo de transaçao.
// `inputTransactionAmount` campo de valor da transaçao



const localStorageTransactions = JSON.parse(localStorage  // aqui o codigo obtem as transaçoes no localStorage e as converte
  .getItem('transactions'))                          // de volta para um array de objetos JS. se nao houver transaçoes 
let transactions = localStorage                  // no `localStorage`, `transactions` sera um array vazio
  .getItem('transactions') !== null ? localStorageTransactions : []




const removeTransaction = ID => {    // esta funçao remove uma transaçao com id especifico da lista 
  transactions = transactions.filter(transaction => //de transaçoes atualiza o localStorage e reinicializa a interface
    transaction.id !== ID)
  updateLocalStorage()
  init()
}




const addTransactionIntoDOM = transaction => {    //Esta funçao adiciona  uma transaçao ao DOM
  const operator = transaction.amount < 0 ? '-' : '+'         // define o operador baseado no valor da transaçao
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus' // adiciona uma classe CSS para a estilizaçao 
  const amountWithoutOperator = Math.abs(transaction.amount)
  const li = document.createElement('li')                    //cria um elemento `li` com o nome valor e um botao de excluir 
                                                              //anexa o `li` a lista de transacoes no html
  li.classList.add(CSSClass)
  li.innerHTML = `
      ${transaction.name} 
      <span>${operator} r$ ${amountWithoutOperator}</span>
      <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
      x
      </button
    `
  transactionsUl.append(li)
}


const updateBalanceValues = () => {                    // esta funçao atualiza os valores do saldo receita e despesa:
  const transactionsAmounts = transactions             // mapeia os valores das transaçoes 
    .map(transaction => transaction.amount)            // calcula o total receita e despesas.
  const total = transactionsAmounts                    // atualiza o conteudo dos elementos html correspondesntes 
    .reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
  const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
  const expense = Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

  balanceDisplay.textContent = `R$ ${total}`
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
}


const init = () => {                          //esta funçao inicializa a aplicaçao
  transactionsUl.innerHTML = ''               //limpa a lista de transaçoes no DOM
  transactions.forEach(addTransactionIntoDOM) //adiciona cada transaçao ao DOM
  updateBalanceValues()                        // atualiza os valores de saldo , receitas e despesas 
}
init()


const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions)) // esta funçao atualiza o localStorage com a lista 
}       
                                                             // de transaçao atual.

const generateID = () => Math.round(Math.random() * 1000) // esta funcao gera um id aleatorio para cada funçao


const addToTransactionsArray = (transactionName, transactionAmount) => { // esta funçao adciona uma nova transaçao ao array
  transactions.push({                                                    //de transaçoes atribuindo um id nome e valor
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount)
  })
}



const cleanInputs = () => {         //esta funçao limpa o campo de entrada do formulario
  inputTransactionName.value = ''
  inputTransactionAmount.value = ''

}


const handleFormSubit = event => {               //esta funçao lida com a submissao do formulario
  event.preventDefault()                    //previne o comportamento padrao do formulario(recarregar a pagina)
                                            // obtem e valida os valores dos campos
  const transactionName = inputTransactionName.value.trim() //adciona a nova transaçao ao array , inicializa a interface , atualiza 
  const transactionAmount = inputTransactionAmount.value.trim() // o localStorage e limpa os campos de entrada 

  const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

  if (isSomeInputEmpty) {
    alert('Por favor preencha tanto o nome quanto o valor da transaçao')
    return
  }

  addToTransactionsArray(transactionName, transactionAmount)
  init()
  updateLocalStorage()
  cleanInputs()
}

form.addEventListener('submit', handleFormSubit)


























