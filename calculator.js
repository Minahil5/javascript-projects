const buttonEl = document.querySelectorAll("button");
const inputFieldE1 = document.getElementById("result");

for (let i = 0; i < buttonEl.length; i++) {
  buttonEl[i].addEventListener("click", () => {
    const buttonValue = buttonEl[i].textContent;
    
    if (buttonValue === "C") {
      clearResult();
    } else if (buttonValue === "=") {
      calculateResult();
    } else {
      appendValue(buttonValue);
    }
  });
}

function clearResult() {
  inputFieldE1.value = "";
}

function calculateResult() {
  inputFieldE1.value = eval(inputFieldE1.value);
}

function appendValue(value) {
  inputFieldE1.value += value;
}
