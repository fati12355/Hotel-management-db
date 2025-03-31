document.addEventListener("DOMContentLoaded", () => {
    console.log("📢 book.js chargé avec succès !");

    const bookBtn = document.querySelector("button.book_btn");

    if (bookBtn) {
        console.log("✅ Bouton 'Book Now' trouvé !");
        bookBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("📌 Bouton 'Book Now' cliqué !");

            // Vérifier si les dates d'arrivée et de départ sont bien remplies
            let arrivalDate = document.querySelector("input[name='arrival_date']").value;
            let departureDate = document.querySelector("input[name='departure_date']").value;

            if (!arrivalDate || !departureDate) {
                alert("Veuillez remplir les dates d'arrivée et de départ avant de réserver.");
                return;
            }
            let today = new Date().toISOString().split("T")[0];
            if (arrivalDate < today) {
                alert("❌ La date d'arrivée ne peut pas être antérieure à aujourd'hui.");
                return;
            }


            // Stocker les dates dans localStorage pour les récupérer plus tard
            localStorage.setItem("arrivalDate", arrivalDate);
            localStorage.setItem("departureDate", departureDate);

            // 🔄 Rediriger vers l'étape 1 (adresse)
            window.location.href = "step1.html";
        });
    } else {
        console.error("❌ ERREUR: Bouton 'Book Now' non trouvé !");
    }
});



// Charger les chaînes d'hôtels depuis le backend
async function chargerChainesHotels() {
    try {
        const response = await fetch("http://localhost:3000/hotelChains");
        const hotelChains = await response.json();

        let select = document.getElementById("hotelChain");
        select.innerHTML = "<option value=''>Sélectionner une chaîne</option>";

        hotelChains.forEach(chain => {
            let option = document.createElement("option");
            option.value = chain.hotelchain_id;
            option.textContent = chain.hotel_chain_name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des chaînes d'hôtels:", error);
    }
}

// Charger les hôtels d'une chaîne sélectionnée
document.getElementById("hotelChain").addEventListener("change", async (e) => {
    let hotelchain_id = e.target.value.trim();

    console.log("🔍 Valeur de hotelchain_id AVANT requête:", hotelchain_id); // LOG DEBUG

    if (!hotelchain_id || isNaN(hotelchain_id)) {
        console.error("❌ Erreur: hotelchain_id invalide !");
        return;
    }

    try {
        const url = `http://localhost:3000/hotels?hotelchain_id=${hotelchain_id}`;
        console.log("📡 Envoi de requête vers:", url); // LOG DEBUG

        const response = await fetch(url);
        const hotels = await response.json();
        console.log("✅ Réponse reçue:", hotels); // LOG DEBUG

        let select = document.getElementById("hotel");
        select.innerHTML = "<option value=''>Sélectionner un hôtel</option>";

        hotels.forEach(hotel => {
            let option = document.createElement("option");
            option.value = hotel.hotel_id;
            option.textContent = hotel.email_address;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("❌ Erreur lors du chargement des hôtels:", error);
    }
});


// Charger les chambres disponibles pour l'hôtel sélectionné
// Charger les chambres disponibles pour l'hôtel sélectionné
document.getElementById("hotel").addEventListener("change", async (e) => {
    let hotel_id = e.target.value.trim(); // Récupère l'hôtel sélectionné

    console.log("🔍 Hôtel sélectionné :", hotel_id); // Debugging

    if (!hotel_id || isNaN(hotel_id)) {
        console.error("❌ Erreur: hotelId invalide !");
        return;
    }

    try {
        const url = `http://localhost:3000/rooms?hotel_id=${hotel_id}`;
        console.log("📡 Envoi de requête vers :", url);

        const response = await fetch(url);
        const rooms = await response.json();
        console.log("✅ Réponse reçue:", rooms);

        let select = document.getElementById("room");
        select.innerHTML = "<option value=''>Sélectionner une chambre</option>";

        rooms.forEach(room => {
            let option = document.createElement("option");
            option.value = room.room_id;
            option.textContent = `Chambre ${room.room_id} - ${room.price}$`;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("❌ Erreur lors du chargement des chambres:", error);
    }
});

document.getElementById("confirmClient").addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent page reload

    let clientData = {
        full_name: document.getElementById("fullName").value,
        nas: document.getElementById("nas").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    try {
        let response = await fetch("http://localhost:3000/registerClient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clientData)
        });

        let result = await response.json();

        if (response.ok) {
            alert(result.message);
            localStorage.setItem("client_id", result.client_id); // Save client ID for later

            // Enable the reservation button after client is registered
            document.getElementById("confirmReservation").disabled = false;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error("❌ Error registering client:", error);
        alert("❌ Failed to register client.");
    }
});


// Gérer le clic sur "Confirmer la réservation"

document.getElementById("confirmReservation").addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent page reload

    let client_id = localStorage.getItem("client_id"); // Get saved client ID
    if (!client_id) {
        alert("❌ Please register client before confirming reservation.");
        return;
    }

    let reservationData = {
        client_id: parseInt(client_id), // Use registered client ID
        room_id: document.getElementById("room").value,
        reservation_date: new Date().toISOString()
    };

    try {
        let response = await fetch("http://localhost:3000/reservation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservationData)
        });

        let result = await response.json();

        if (response.ok) {
            alert("✅ Reservation confirmed!");
            document.getElementById("reservationForm").reset(); // Reset form
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error("❌ Error during reservation:", error);
        alert("❌ Failed to confirm reservation.");
    }
});


