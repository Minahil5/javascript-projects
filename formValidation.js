const form = document.getElementById("signupForm");

const submitBtn = document.getElementById("submitBtn");

const status = document.getElementById("formStatus");

function byId(id) {
    return document.getElementById(id);
}
const nameEl = byId("name");
const emailEl = byId("email");
const passEl = byId("password");
const confEl = byId("confirm");

function showError(input, msg) {
    const err = byId("err-" + input.id);
    input.classList.remove("valid");
    input.classList.add("invalid");
    if (err) { err.textContent = msg || "Error"; err.classList.add("show"); }
}
function showValid(input) {
    const err = byId("err-" + input.id);
    input.classList.remove("invalid");
    input.classList.add("valid");
    if (err) err.classList.remove("show");
}
function clearState(input) {
    const err = byId("err-" + input.id);
    input.classList.remove("invalid", "valid");
    if (err) err.classList.remove("show");
}
function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validateAll() {
    let ok = true;
    if (!nameEl.value.trim()) {
        showError(nameEl, "Please enter your name."); ok = false;

    }
    else showValid(nameEl);
    if (!isEmail(emailEl.value.trim())) {
        showError(emailEl, "Please enter a valid email."); ok = false;
    }
    else showValid(emailEl);

    // password
    if (!passEl.value || passEl.value.length < 6) {
        showError(passEl, "Password at least 6 chars."); ok = false;
    }
    else showValid(passEl);

    // confirm
    if (confEl.value !== passEl.value) {
        showError(confEl, "Passwords do not match."); ok = false;
    }
    else showValid(confEl);

    return ok;
}
// live-clear on input
[nameEl, emailEl, passEl, confEl].forEach(inp => {
    inp && inp.addEventListener("input", () => {
        if (!inp.value) return clearState(inp);
        // quick single-field validate
        if (inp.id === "email")
            isEmail(inp.value) ? showValid(inp) : showError(inp, "Invalid email");
        else if
            (inp.id === "password")
            inp.value.length >= 6 ? showValid(inp) : showError(inp, "Min 6 chars");
        else if
            (inp.id === "confirm")
            inp.value === passEl.value ? showValid(inp) : showError(inp, "Not matching");
        else if
            (inp.id === "name")
            inp.value.trim() ? showValid(inp) : showError(inp, "Enter name");
    });
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    const ok = validateAll();
    if (!ok) {
        status.textContent = "Please fix the errors above.";
        return;
    }

    alert("Form is valid — submitted!");
    status.textContent = "Submitted successfully.";

    form.reset();
    [nameEl, emailEl, passEl, confEl].forEach(i => clearState(i));
});
