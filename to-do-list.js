const formE1 = document.querySelector(".form");
const inputE1 = document.querySelector(".input");
const ulE1 = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list")) || [];

// Display saved tasks on page load
list.forEach(task => {
    toDoList(task);
});

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    if (inputE1.value.trim() !== "") {
        toDoList();
    }
});

function toDoList(task) {
    const liE1 = document.createElement("li");
    liE1.textContent = task ? task.name : inputE1.value;

    if (task && task.checked) liE1.classList.add("checked");

    // Icons container with check and trash icons
    const iconsHTML = `
        <div class="icons">
            <div><i class="fas fa-check-square"></i></div>
            <div><i class="fas fa-trash"></i></div>
        </div>
    `;
    liE1.insertAdjacentHTML('beforeend', iconsHTML);
    ulE1.appendChild(liE1);
    inputE1.value = "";

    // Get references to check and trash icons
    const [checkBtnE1, trashBtnE1] = liE1.querySelectorAll(".icons > div");

    checkBtnE1.onclick = () => {
        liE1.classList.toggle("checked");
        updateLocalStorage();
    };

    trashBtnE1.onclick = () => {
        liE1.remove();
        updateLocalStorage();
    };

    updateLocalStorage();
}

function updateLocalStorage() {
    const list = [...document.querySelectorAll("li")].map(li => ({
        name: li.firstChild.textContent.trim(),
        checked: li.classList.contains("checked")
    }));
    localStorage.setItem("list", JSON.stringify(list));
}
