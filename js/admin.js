function addCard(event) {
  event.preventDefault();

  // Ambil data dari form
  const cardName = document.getElementById("card-name").value;
  const cardPrice = document.getElementById("card-price").value;
  const cardQuantity = document.getElementById("card-quantity").value;
  const cardImage = document.getElementById("card-image").files[0];

  // Ambil ID terakhir dari localStorage, atau mulai dari 1 jika belum ada
  let lastId = parseInt(localStorage.getItem("lastCardId")) || 0;
  const newCardId = lastId + 1;

  // Buat object kartu baru
  const reader = new FileReader();
  reader.onload = function (e) {
    const newCard = {
      id: newCardId, // Tambahkan ID auto increment
      name: cardName,
      price: cardPrice,
      quantity: cardQuantity,
      image: e.target.result,
    };

    // Ambil kartu yang sudah ada di localStorage, atau buat array baru
    const cards = JSON.parse(localStorage.getItem("pokemonCards")) || [];

    // Tambahkan kartu baru ke array
    cards.push(newCard);

    // Simpan kembali ke localStorage
    localStorage.setItem("pokemonCards", JSON.stringify(cards));

    // Update ID terakhir yang digunakan di localStorage
    localStorage.setItem("lastCardId", newCardId);

    // Tampilkan kembali kartu pada tabel
    displayCards();

    // Reset form setelah submit
    document.getElementById("card-form").reset();

    // Tutup modal setelah menambahkan kartu
    document.getElementById("addCardModal").style.display = "none";
  };

  reader.readAsDataURL(cardImage);
}

function displayCards() {
  const cards = JSON.parse(localStorage.getItem("pokemonCards")) || [];
  const tableBody = document.querySelector("#card-table tbody");
  tableBody.innerHTML = ""; // Bersihkan tabel

  cards.forEach((card, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${card.id}</td>
        <td>${card.name}</td>
        <td>${card.price}</td>
        <td>${card.quantity}</td>
        <td><img src="${card.image}" alt="${card.name}" style="width: 50px; height: 50px;"></td>
        <td>
          <button class="btn-edit" onclick="editCard(${card.id})">Edit</button>
          <button class="btn-delete" onclick="deleteCard(${card.id})">Delete</button>
        </td>
      `;
    tableBody.appendChild(row);
  });
}

function editCard(cardId) {
  const cards = JSON.parse(localStorage.getItem("pokemonCards")) || [];
  const cardToEdit = cards.find(card => card.id === cardId);

  if (cardToEdit) {
    // Isi form dengan data kartu yang akan diedit
    document.getElementById("card-name").value = cardToEdit.name;
    document.getElementById("card-price").value = cardToEdit.price;
    document.getElementById("card-quantity").value = cardToEdit.quantity;

    // Set event handler baru untuk menyimpan perubahan
    document.getElementById("card-form").onsubmit = function (event) {
      event.preventDefault();
      saveCardEdit(cardId);
    };

    // Tampilkan modal
    document.getElementById("addCardModal").style.display = "block";
  }
}

function saveCardEdit(cardId) {
  const cards = JSON.parse(localStorage.getItem("pokemonCards")) || [];
  const cardIndex = cards.findIndex(card => card.id === cardId);

  if (cardIndex !== -1) {
    // Perbarui data kartu
    cards[cardIndex].name = document.getElementById("card-name").value;
    cards[cardIndex].price = document.getElementById("card-price").value;
    cards[cardIndex].quantity = document.getElementById("card-quantity").value;

    // Simpan perubahan ke localStorage
    localStorage.setItem("pokemonCards", JSON.stringify(cards));

    // Tampilkan kembali kartu pada tabel
    displayCards();

    // Reset form dan event handler
    document.getElementById("card-form").reset();
    document.getElementById("card-form").onsubmit = addCard;

    // Tutup modal
    document.getElementById("addCardModal").style.display = "none";
  }
}

function deleteCard(cardId) {
  const cards = JSON.parse(localStorage.getItem("pokemonCards")) || [];
  const filteredCards = cards.filter(card => card.id !== cardId);

  // Simpan perubahan ke localStorage
  localStorage.setItem("pokemonCards", JSON.stringify(filteredCards));

  // Tampilkan kembali kartu pada tabel
  displayCards();
}
