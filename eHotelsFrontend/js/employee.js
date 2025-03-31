window.onload = async function () {
  try {
    const response = await fetch('http://localhost:3000/hotels');
    const hotels = await response.json();

    console.log("Liste des hôtels récupérés JSON :", JSON.stringify(hotels, null, 2));
    const select = document.getElementById('Hotel_id');

    if (!Array.isArray(hotels)) {
      console.error(" La réponse n’est pas un tableau :", hotels);
      return;
    }

    hotels.forEach(hotel => {
      const option = document.createElement('option');
      option.value = hotel.hotel_id;               
      option.textContent = hotel.email_address;             
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Erreur de chargement des hôtels :", err);
  }
};

async function deleteHotel() {
    const hotelId = document.getElementById('Hotel_id').value;

    if (!hotelId) {
        alert("Veuillez entrer un ID d'hôtel.");
        return;
    }

    const confirmation = confirm("⚠️ Voulez-vous vraiment supprimer cet hôtel ? Cette action est irréversible !");
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/delete-hotel/${hotelId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.success) {
            alert("✅ Hôtel supprimé avec succès !");
        } else {
            alert("❌ Erreur : " + data.message);
        }
    } catch (error) {
        alert("❌ Erreur de connexion au serveur.");
    }
}

window.deleteHotel = deleteHotel;

// sign in script 
async function signup(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.success) {
    alert("✅ Compte créé avec succès !");
    window.location.href = 'login.html';
  } else {
    alert("❌ " + data.message);
  }
}

function goToProtectedPage(targetPage) {
  const isAuthenticated = sessionStorage.getItem("isLoggedIn");

  if (isAuthenticated === "true") {
    window.location.href = targetPage;
  } else {
    // Sauvegarder la page demandée
    sessionStorage.setItem("redirectAfterLogin", targetPage);
    window.location.href = "login.html";
  }
}

async function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      sessionStorage.setItem("employeeLoggedIn", "true");

      const redirectPage = sessionStorage.getItem("redirectAfterLogin");
      sessionStorage.removeItem("redirectAfterLogin");

      if (redirectPage) {
        window.location.href = redirectPage;
      } else {
        window.location.href = "employee-home.html";
      }
    } else {
      alert("❌ Identifiants incorrects !");
    }
  } catch (err) {
    alert("❌ Erreur serveur !");
  }
}
function logout() {
  sessionStorage.removeItem("employeeLoggedIn");
  window.location.href = "index.html";
}