const btn = document.getElementById("btn");
const textInput = document.getElementById("text");
const qrBox = document.getElementById("qr-box");
const qrDiv = document.getElementById("qrcode");

btn.addEventListener("click", () => {
  const value = textInput.value.trim();
  if (value) {
    qrDiv.innerHTML = ""; // clear old QR code
    new QRCode(qrDiv, {
      text: value,
      width: 150,
      height: 150
    });
    qrBox.style.display = "block";
  } else {
    alert("Please enter some text or URL");
  }
});
