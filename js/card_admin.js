function searchPokemon() {
    const input = document.querySelector('.searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.menu-card');

    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (!name.includes(input)) {
            card.style.display = 'none';
        } else {
            card.style.display = '';
        }
    });
}
/* =================================   ADD  ==================================*/

/* =================================   DELETE  ==================================*/
function deleteCard(pokemonName) {
    const cardToDelete = document.querySelector(`.menu-card[data-name="${pokemonName.toLowerCase()}"]`);
    if (cardToDelete) {
        cardToDelete.remove();
    } else {
        console.log("Card not found!");
    }
}
/* =================================   EDIT  ==================================*/

function editCard(oldPokemonName, newPokemonName, newImgSrc, newPrice) {
    const cardToEdit = document.querySelector(`.menu-card[data-name="${oldPokemonName.toLowerCase()}"]`);
    if (cardToEdit) {
        cardToEdit.querySelector('img').src = newImgSrc;
        cardToEdit.querySelector('img').alt = newPokemonName;
        cardToEdit.querySelector('.menu-card-title').textContent = newPokemonName;
        cardToEdit.querySelector('.menu-card-price').textContent = newPrice;
        cardToEdit.setAttribute('data-name', newPokemonName.toLowerCase());
    } else {
        console.log("Card not found!");
    }
}
/* =================================   popup add ==================================*/

// Get the modal
var addModal = document.getElementById("addPokemonModal");

// Get the button that opens the modal
var addBtn = document.getElementById("addPokemonBtn");

// Get the <span> element that closes the modal
var closeBtn = addModal.querySelector(".close");

// When the user clicks the button, open the modal
addBtn.onclick = function() {
    addModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    addModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
}

// Handle the form submission for adding a new Pokémon
document.getElementById('addPokemonForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pokemonName = document.getElementById('pokemonName').value;
    const imgSrc = document.getElementById('imgSrc').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    addCard(pokemonName, imgSrc, description, price);
    addModal.style.display = "none";
});

function addCard(pokemonName, imgSrc, description, price) {
    const menuSection = document.querySelector('.menu .row');
    const newCard = document.createElement('div');
    newCard.className = 'menu-card';
    newCard.setAttribute('data-name', pokemonName.toLowerCase());
    newCard.innerHTML = `
        <img src="${imgSrc}" alt="${pokemonName}" class="menu-">
        <h3 class="menu-card-title">${pokemonName}</h3>
        <p class="menu-card-description">${description}</p>
        <p class="menu-card-price">${price}</p>
        <button class="menu-card-btn"><i data-feather="shopping-cart"></i>Add To Cart</button>
        <button class="menu-card-btn-edit">Edit</button>
    `;
    menuSection.appendChild(newCard);
    feather.replace(); // To reapply the feather icons
}
