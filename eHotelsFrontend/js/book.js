document.addEventListener("DOMContentLoaded", () => {
    // Afficher le formulaire de réservation seulement si les dates sont remplies
    document.querySelector("button.book_btn").addEventListener("click", (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page

        // Récupérer les valeurs des dates d'arrivée et de départ
        let arrivalDate = document.querySelector("input[name='arrival_date']").value;
        let departureDate = document.querySelector("input[name='departure_date']").value;

        // Vérifier si les dates sont remplies
        if (!arrivalDate || !departureDate) {
            alert("Veuillez remplir les dates d'arrivée et de départ avant de réserver.");
            return;
        }

        // Stocker les dates dans des variables globales pour les récupérer plus tard
        localStorage.setItem("arrivalDate", arrivalDate);
        localStorage.setItem("departureDate", departureDate);

        // Afficher le formulaire
        document.getElementById("bookingForm").style.display = "block";
        chargerChainesHotels();
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


    // Gérer le clic sur "Confirmer la réservation"
    
        const confirmButton = document.getElementById("confirmReservation");
    
        // Ajouter une animation visuelle lorsqu'on clique sur le bouton
        confirmButton.addEventListener("click", async (e) => {
            e.preventDefault(); // Empêcher le rechargement de la page
    
            // Effet visuel : changement de couleur
            confirmButton.style.backgroundColor = "#4CAF50"; // Vert
            confirmButton.textContent = "En cours...";
    
            // Récupérer les données du formulaire
            let reservationData = {
                fullName: document.getElementById("fullName").value,
                nas: document.getElementById("nas").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                hotel_id: document.getElementById("hotel").value,
                room_id: document.getElementById("room").value,
                reservation_date: new Date().toISOString(),
                arrivalDate: localStorage.getItem("arrivalDate"),
                departureDate: localStorage.getItem("departureDate")
            };
    
            try {
                let response = await fetch("http://localhost:3000/reservation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reservationData)
                });
    
                let result = await response.json();
    
                if (response.ok) {
                    // Effet visuel : Succès
                    confirmButton.style.backgroundColor = "#008CBA"; // Bleu
                    confirmButton.textContent = "✅ Réservation Confirmée !";
    
                    alert("✅ Réservation confirmée avec succès !");
                    document.getElementById("reservationForm").reset(); // Réinitialiser le formulaire
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error("Erreur lors de la réservation:", error);
                alert("❌ Une erreur s'est produite lors de la réservation.");
                confirmButton.style.backgroundColor = "#f44336"; // Rouge en cas d'erreur
                confirmButton.textContent = "Réessayer";
            }
    
            // Rétablir le bouton après 2 secondes
            setTimeout(() => {
                confirmButton.style.backgroundColor = "#FF9800"; // Orange original
                confirmButton.textContent = "Confirmer la réservation";
            }, 2000);
        });
    
    
});
