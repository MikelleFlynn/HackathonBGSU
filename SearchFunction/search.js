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

let debounceTimer;

function showSuggestions() {
  const input = document.getElementById("plantInput").value.trim();
  const suggestionsBox = document.getElementById("suggestions");

  clearTimeout(debounceTimer); // throttle input

  if (!input) {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
    return;
  }

  debounceTimer = setTimeout(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ q: input })
      });

      const data = await response.json();
      const plants = data.plants || [];

      // limit to 5 suggestions
      const suggestions = plants.slice(0, 5);

      if (suggestions.length === 0) {
        suggestionsBox.style.display = "none";
        return;
      }

      suggestionsBox.innerHTML = "";
      suggestions.forEach(plant => {
        const item = document.createElement("div");
        item.textContent = plant.name || "Unknown Plant";
        item.onclick = () => {
          document.getElementById("plantInput").value = plant.name;
          suggestionsBox.style.display = "none";
          searchPlants();
        };
        suggestionsBox.appendChild(item);
      });

      suggestionsBox.style.display = "block";
    } catch (error) {
      console.error("Suggestion error:", error);
      suggestionsBox.style.display = "none";
    }
  }, 300); // debounce by 300ms
}


function displayResults(plants) {
  const container = document.getElementById("resultsContainer");

  // Clear only the plant results — not the whole container
  // So first, make sure the container has an inner wrapper:
  let resultsWrapper = document.getElementById("resultsWrapper");

  // If it doesn't exist yet, create it
  if (!resultsWrapper) {
    resultsWrapper = document.createElement("div");
    resultsWrapper.id = "resultsWrapper";
    container.appendChild(resultsWrapper);
  }

  // Now clear only the inner results, not the close button
  resultsWrapper.innerHTML = "";

  if (plants.length === 0) {
    container.style.display = "block";
    resultsWrapper.innerHTML = "<p>No plants found.</p>";
    return;
  }

  plants.forEach(plant => {
    const card = document.createElement("div");
    card.classList.add("plant-card");

    card.innerHTML = `
      <h3>${plant.name || "Unknown Name"}</h3>
      <p><strong>Scientific:</strong> ${plant.scientific_name || "N/A"}</p>
    `;

    resultsWrapper.appendChild(card);
  });

  container.style.display = "block";
}

function closeResults() {
  document.getElementById("resultsContainer").style.display = "none";
}

// Close results when clicking outside the results container
document.addEventListener("click", function (event) {
  const results = document.getElementById("resultsContainer");

  // If it's not visible, do nothing
  if (results.style.display !== "block") return;

  // If the click was *inside* the container, do nothing
  if (results.contains(event.target) || event.target.id === "plantInput") return;

  // Otherwise, hide the results
  results.style.display = "none";
});

document.addEventListener("click", function (e) {
  const box = document.getElementById("suggestions");
  if (!document.getElementById("plantInput").contains(e.target)) {
    box.style.display = "none";
  }
});


