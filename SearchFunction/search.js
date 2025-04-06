async function searchPlants() {
  const query = document.getElementById('plantInput').value.trim();

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  sessionStorage.setItem("lastSearch", query); // 👈 SAVE search
  
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
  const suggestionsBox = document.getElementById("suggestions"); // ✅ must come first

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: input })
      });

      const data = await response.json();
      const plants = data.plants || [];

      suggestionsBox.innerHTML = "";
      plants.slice(0, 5).forEach(plant => {
        const item = document.createElement("div");
        item.textContent = plant.name || "Unknown Plant";
        item.onclick = () => {
          window.location.href = `SearchFunction/plant.html?id=${plant.id}&source=search`;
        };
        suggestionsBox.appendChild(item);
      });

      suggestionsBox.style.display = "block";
    } catch (error) {
      console.error("Suggestion error:", error);
      suggestionsBox.style.display = "none";
    }
  }, 300);
}



function displayResults(plants) {
  const container = document.getElementById("resultsContainer");

  // Get or create the inner wrapper
  let resultsWrapper = document.getElementById("resultsWrapper");
  if (!resultsWrapper) {
    resultsWrapper = document.createElement("div");
    resultsWrapper.id = "resultsWrapper";
    container.appendChild(resultsWrapper);
  }

  resultsWrapper.innerHTML = "";

  if (plants.length === 0) {
    container.style.display = "block";
    resultsWrapper.innerHTML = "<p>No plants found.</p>";
    return;
  }

  plants.forEach(plant => {
    const card = document.createElement("div");
    card.classList.add("plant-card");
    
    const isSaved = (JSON.parse(localStorage.getItem("myGarden") || "[]")).includes(plant.id);
    const buttonLabel = isSaved ? "✔" : "+";
    card.innerHTML = `
      <div class="card-header">
        <button class="add-button" onclick="toggleGarden('${plant.id}', this)">${buttonLabel}</button>
      </div>
      <a href="SearchFunction/plant.html?id=${plant.id}&source=search" class="plant-link">
        <h3>${plant.name}</h3>
        <p><strong>Scientific:</strong> ${plant.scientific_name || "N/A"}</p>
      </a>
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

function toggleGarden(plantId, button, event) {
  event?.stopPropagation();
  event?.preventDefault();

  const saved = JSON.parse(localStorage.getItem("myGarden") || "[]");
  const index = saved.indexOf(plantId);

  if (index === -1) {
    saved.push(plantId);
    localStorage.setItem("myGarden", JSON.stringify(saved));
    button.textContent = "✔ Added";
    button.classList.add("added");
  } else {
    saved.splice(index, 1);
    localStorage.setItem("myGarden", JSON.stringify(saved));
    button.textContent = "+";
    button.classList.remove("added");
  }
}


function addToGarden(plantId) {
  const saved = JSON.parse(localStorage.getItem("myGarden") || "[]");
  if (!saved.includes(plantId)) {
    saved.push(plantId);
    localStorage.setItem("myGarden", JSON.stringify(saved));
    alert("🌱 Added to My Garden!");
  } else {
    alert("✅ Already in your garden.");
  }
}



