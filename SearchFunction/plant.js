const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const plantId = urlParams.get("id");

const backLink = document.getElementById("backToCategory");

if (category) {
  backLink.href = `../Category/${category}.html`;
  backLink.textContent = `← Back to ${category.charAt(0).toUpperCase() + category.slice(1)}`;
} else {
  backLink.href = "../main.html";
  backLink.textContent = "← Back to Search";
}

async function fetchPlantDetails() {
  try {
    const res = await fetch("http://localhost:3000/api/plant/" + plantId);
    const plant = await res.json();

    console.log(plant); // debug

    // Helper to extract data from the 'data' array by key
    const getDataValue = (key) => {
      const entry = plant.data.find(d => d.key === key);
      return entry ? entry.value : "Unknown";
    };
    
    document.getElementById("plantImage").src = plant.images?.title || "";
    document.getElementById("plantImage").alt = plant.name || "Plant image";
    document.getElementById("plantName").textContent = plant.name || "Unknown";
    document.getElementById("sciName").textContent = plant.scientific_name || "N/A";
    document.getElementById("sunNeeds").textContent = getDataValue("Light requirement");
    document.getElementById("waterNeeds").textContent = getDataValue("Water requirement");
    document.getElementById("soilType").textContent = getDataValue("Soil type");
    document.getElementById("region").textContent = getDataValue("Native to");

  } catch (err) {
    console.error("Failed to load plant:", err);
  }
 


}

fetchPlantDetails();

