const chatBtn = document.getElementById("Chatbtn");
const contactBtn = document.getElementById("Contactbtn");
const addBtn = document.getElementById("addBtn");
const overlayContent = document.getElementById("overlay-content");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");
const contactIdInput = document.getElementById("contactId");
const nameInput = document.getElementById("nameInput");
const familyInput = document.getElementById("familyInput");
const descriptionsInput = document.getElementById("descriptionsInput");
const errorMessage = document.getElementById("error-message");
const overlayBackground = document.getElementById("overlay-background");
const contactListContainer = document.getElementById("contact-list");

let contactList = [];

contactIdInput.onkeydown = function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        nameInput.focus();
    }
}

nameInput.onkeydown = function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        familyInput.focus();
    }
}

familyInput.onkeydown = function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        descriptionsInput.focus();
    }
}

descriptionsInput.onkeydown = function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        saveBtn.click();
    }
}

window.onkeydown = function (e) {
    if (e.key === "Escape")
        closeOverlay();
}

chatBtn.onclick = function() {
    addBtn.classList.remove("show");
    chatBtn.classList.add("active");
    contactBtn.classList.remove("active");
}

contactBtn.onclick = function() {
    addBtn.classList.add("show");``
    contactBtn.classList.add("active");
    chatBtn.classList.remove("active");
}

addBtn.onclick = function() {
    overlay.classList.add("show");
}

closeBtn.onclick = function() {
    overlay.classList.remove("show");
}

overlay.onclick = function(e) {
    if (e.target === overlay) {
        overlay.classList.remove("show");
        closeOverlay();
    }
}

function closeOverlay() {
    overlay.classList.remove("show");
    overlayBackground.classList.remove("show");

    contactIdInput.value = "";
    nameInput.value = "";
    familyInput.value = "";
    descriptionsInput.value = "";
    errorMessage.textContent = "";

    errorMessage.textContent = "";
}



function renderContact() {
    contactListContainer.innerHTML = "";

    contactList.forEach(function(contact) {

        const firstLetter = contact.name ? contact.name[0].toUpperCase() : "?";
        const card = document.createElement("div");

        card.classList.add("contact-card");

        card.innerHTML = `
            <div class="avatar">${firstLetter}</div>
            <div class="contact-info">
                <h4>${contact.name} ${contact.family || ""}</h4>
            </div>
        `;

        contactListContainer.appendChild(card);

        console.log("Royxatdagi Ism: " + contact.name);
        console.log(card);
    }); 
}



saveBtn.onclick = function() {
    const contactId = contactIdInput.value.trim();
    const name = nameInput.value.trim();
    const family = familyInput.value.trim();
    const descriptions = descriptionsInput.value.trim();

    overlayBackground.classList.remove("show");

    if (contactId === "") {
        errorMessage.textContent = "Contact ID is required.";

        setTimeout(() => {
            overlayBackground.classList.add("show");
        }, 50);

    } else if (name === "") {
        errorMessage.textContent = "Name is required.";

        setTimeout(() => {
            overlayBackground.classList.add("show");
        }, 50);

    } else {
        const contact = {
            contactId,
            name,
            family,
            descriptions
        };

        contactList.push(contact);

        closeOverlay();

        renderContact();
    }
}