async function searchPlants() {
  const query = document.getElementById('plantInput').value.trim();

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ q: query })
    });

    const data = await response.json();
    displayResults(data.plants || []);
  } catch (error) {
    console.error("Search error:", error);
    document.getElementById("resultsContainer").innerHTML = "Something went wrong.";
  }
}

function displayResults(plants) {
  const container = document.getElementById("resultsContainer");
  container.innerHTML = "";

  if (plants.length === 0) {
    container.innerHTML = "<p>No plants found.</p>";
    return;
  }

  plants.forEach(plant => {
    const card = document.createElement("div");
    card.classList.add("plant-card");

    card.innerHTML = `
      <h3>${plant.name || "Unknown Name"}</h3>
      <p><strong>Scientific:</strong> ${plant.scientific_name || "N/A"}</p>
    `;

    container.appendChild(card);
  });
}
