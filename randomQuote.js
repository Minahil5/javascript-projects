const btnE1 = document.getElementById("btn");
const quoteE1 = document.getElementById("quote");
const authorE1 = document.getElementById("author");

const apiUrl = "https://api.quotable.io/random";

async function getQuote() {
    try {
        btnE1.innerText = "Loading...";
        btnE1.disabled = true;
        quoteE1.innerText = "Updating...";
        authorE1.innerText = "Updating...";

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Set quote and author
        quoteE1.innerText = data.content;
        authorE1.innerText = "~ " + data.author;

        btnE1.innerText = "Get a quote";
        btnE1.disabled = false;
    } catch (error) {
        quoteE1.innerText = "An error occurred while fetching the quote.";
        authorE1.innerText = "An error occurred.";
        btnE1.innerText = "Get a quote";
        btnE1.disabled = false;
        console.log(error);
    }
}

// Fetch first quote on page load
getQuote();

// Button click
btnE1.addEventListener("click", getQuote);
