document.addEventListener('DOMContentLoaded', function() {
    // Vérifier l'authentification
    const isAuthenticated = sessionStorage.getItem("employeeLoggedIn");
    if (!isAuthenticated) {
        const requestedPage = window.location.href;
        sessionStorage.setItem("redirectAfterLogin", requestedPage);
        window.location.href = "login.html";
        return;
    }

    // Éléments du DOM
    const reservationForm = document.getElementById('reservationCheckInForm');
    const newClientForm = document.getElementById('newClientForm');
    const roomSelect = document.getElementById('roomId');
    const hotelSelect = document.getElementById('hotelId');
    const appliancesSelect = document.getElementById('appliances');
    const capacitySelect = document.getElementById('capacity');
    const extrasSelect = document.getElementById('extras');
    const existingDamageSelect = document.getElementById('existing_damage');
    const reservationDetails = document.getElementById('reservationDetails');

    // Charger les hôtels disponibles
    loadHotels();

    // Gestionnaire pour le formulaire de réservation existante
    reservationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const reservationId = document.getElementById('reservationId').value;

        try {
            // D'abord, récupérer les détails de la réservation
            const detailsResponse = await fetch(`http://localhost:3000/api/reservations/${reservationId}`);
            const detailsData = await detailsResponse.json();

            if (!detailsResponse.ok) {
                showAlert('danger', detailsData.error || 'Réservation non trouvée');
                return;
            }

            // Afficher les détails de la réservation
            reservationDetails.innerHTML = `
                <div class="card p-4 shadow" style="background:#f9f9f9;">
                    <h3 class="mb-3">📋 Détails de la réservation :</h3>
                    <ul>
                        <li><strong>Client :</strong> ${detailsData.client_name}</li>
                        <li><strong>NAS :</strong> ${detailsData.client_nas}</li>
                        <li><strong>Hôtel :</strong> ${detailsData.hotel_name}</li>
                        <li><strong>Chambre :</strong> ${detailsData.room_type} (${detailsData.capacity} personne${detailsData.capacity > 1 ? 's' : ''})</li>
                        <li><strong>Prix par nuit :</strong> ${detailsData.price_per_night}$</li>
                        <li><strong>Date de réservation :</strong> ${new Date(detailsData.reservation_date).toLocaleString()}</li>
                        <li><strong>Statut :</strong> ${detailsData.reservation_status}</li>
                    </ul>
                </div>
            `;
            reservationDetails.style.display = 'block';

            // Ensuite, procéder au check-in
            const response = await fetch("http://localhost:3000/api/reservations/check-in", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reservationId })
            });

            const data = await response.json();

            if (response.ok) {
                showAlert('success', 'Client enregistré avec succès !');
                reservationForm.reset();
                // Masquer les détails après un délai
                setTimeout(() => {
                    reservationDetails.style.display = 'none';
                }, 5000);
            } else {
                showAlert('danger', data.message || 'Erreur lors de l\'enregistrement');
            }
        } catch (error) {
            console.error('Erreur:', error);
            showAlert('danger', 'Erreur de connexion au serveur. Veuillez réessayer plus tard.');
        }
    });

    // Gestionnaire pour le formulaire de nouveau client
    newClientForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Récupérer les informations d'adresse
        const addressData = {
            civic_number: document.getElementById('civicNumber').value,
            postal_code: document.getElementById('postalCode').value,
            street_name: document.getElementById('streetName').value,
            town: document.getElementById('town').value,
            province: document.getElementById('province').value,
            country: document.getElementById('country').value
        };

        // Créer d'abord l'adresse
        try {
            const addressResponse = await fetch("http://localhost:3000/address", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData)
            });

            const addressResult = await addressResponse.json();

            if (!addressResponse.ok) {
                throw new Error(addressResult.message || 'Erreur lors de la création de l\'adresse');
            }

            // Créer le client avec l'adresse
            const clientData = {
                fullName: document.getElementById('fullName').value,
                nas: document.getElementById('nas').value,
                addressId: addressResult.address_id,
                roomId: document.getElementById('roomId').value
            };

            const clientResponse = await fetch("http://localhost:3000/api/clients/check-in", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clientData)
            });

            const clientResult = await clientResponse.json();

            if (!clientResponse.ok) {
                throw new Error(clientResult.message || 'Erreur lors de l\'enregistrement du client');
            }

            showAlert('success', 'Nouveau client enregistré avec succès !');
            newClientForm.reset();
        } catch (error) {
            console.error('Erreur:', error);
            showAlert('danger', error.message || 'Erreur de connexion au serveur. Veuillez réessayer plus tard.');
        }
    });

    // Fonction pour charger les hôtels
    async function loadHotels() {
        try {
            const response = await fetch("http://localhost:3000/hotels");
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des hôtels');
            }

            const hotels = await response.json();

            hotelSelect.innerHTML = '<option value="">Sélectionnez un hôtel</option>';
            hotels.forEach(hotel => {
                const option = document.createElement('option');
                option.value = hotel.hotel_id;
                option.textContent = hotel.email_address;
                hotelSelect.appendChild(option);
            });

            // Ajouter un écouteur d'événements pour charger les chambres lorsqu'un hôtel est sélectionné
            hotelSelect.addEventListener('change', function() {
                const selectedHotelId = this.value;
                if (selectedHotelId) {
                    loadRoomFilters();
                    loadAvailableRooms(selectedHotelId);
                } else {
                    resetFilters();
                    roomSelect.innerHTML = '<option value="">Sélectionnez une chambre</option>';
                }
            });
        } catch (error) {
            console.error('Erreur:', error);
            showAlert('danger', 'Erreur lors du chargement des hôtels. Veuillez rafraîchir la page.');
        }
    }

    // Fonction pour charger les filtres de chambres
    async function loadRoomFilters() {
        try {
            const response = await fetch("http://localhost:3000/roomFilters");
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des filtres');
            }

            const filters = await response.json();

            // Remplir les filtres avec les valeurs uniques
            fillFilter("appliances", filters.map(f => f.appliances));
            fillFilter("capacity", filters.map(f => f.capacity));
            fillFilter("extras", filters.map(f => f.extras));
            fillFilter("existing_damage", filters.map(f => f.existing_damage));

            // Ajouter des écouteurs d'événements pour les filtres
            appliancesSelect.addEventListener('change', applyFilters);
            capacitySelect.addEventListener('change', applyFilters);
            extrasSelect.addEventListener('change', applyFilters);
            existingDamageSelect.addEventListener('change', applyFilters);
        } catch (error) {
            console.error('Erreur:', error);
            showAlert('danger', 'Erreur lors du chargement des filtres. Veuillez réessayer.');
        }
    }

    // Fonction pour remplir un filtre avec des valeurs uniques
    function fillFilter(id, values) {
        const select = document.getElementById(id);
        select.innerHTML = '<option value="">Tous</option>';
        
        // Filtrer les valeurs nulles et créer un ensemble de valeurs uniques
        [...new Set(values)].filter(Boolean).forEach(val => {
            const option = document.createElement('option');
            option.value = val;
            option.textContent = val;
            select.appendChild(option);
        });
    }

    // Fonction pour réinitialiser les filtres
    function resetFilters() {
        ["appliances", "capacity", "extras", "existing_damage"].forEach(id => {
            document.getElementById(id).innerHTML = '<option value="">Tous</option>';
        });
    }

    // Fonction pour appliquer les filtres
    function applyFilters() {
        const hotelId = hotelSelect.value;
        if (!hotelId) {
            return;
        }

        const appliances = appliancesSelect.value;
        const capacity = capacitySelect.value;
        const extras = extrasSelect.value;
        const existingDamage = existingDamageSelect.value;

        loadAvailableRooms(hotelId, appliances, capacity, extras, existingDamage);
    }

    // Fonction pour charger les chambres disponibles pour un hôtel spécifique avec filtres
    async function loadAvailableRooms(hotelId, appliances = "", capacity = "", extras = "", existingDamage = "") {
        try {
            const url = `http://localhost:3000/availableRooms?hotel_id=${hotelId}&appliances=${encodeURIComponent(appliances)}&capacity=${capacity}&extras=${encodeURIComponent(extras)}&existing_damage=${encodeURIComponent(existingDamage)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des chambres');
            }

            const rooms = await response.json();

            roomSelect.innerHTML = '<option value="">Sélectionnez une chambre</option>';
            rooms.forEach(room => {
                const option = document.createElement('option');
                option.value = room.room_id;
                option.textContent = `Chambre ${room.room_id} - ${room.room_type || 'Standard'} (${room.capacity || '1'} personne${room.capacity > 1 ? 's' : ''})`;
                roomSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erreur:', error);
            showAlert('danger', 'Erreur lors du chargement des chambres disponibles. Veuillez réessayer.');
        }
    }

    // Fonction pour afficher les alertes
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `;

        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);

        // Supprimer l'alerte après 5 secondes
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}); 