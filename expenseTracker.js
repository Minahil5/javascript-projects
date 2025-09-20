const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("transactionForm");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const inc = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const exp = (
    amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.textContent = `$${total}`;
  income.textContent = `$${inc}`;
  expense.textContent = `$${exp}`;
}
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const li = document.createElement("li");
  li.classList.add(transaction.amount < 0 ? "expense" : "income");
  li.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
  `;
  list.appendChild(li);
}
function addTransaction(e) {
  e.preventDefault();

  const newTransaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(newTransaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  addTransactionDOM(newTransaction);
  updateValues();

  text.value = "";
  amount.value = "";
}
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  init();
}
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

form.addEventListener("submit", addTransaction);
init();
