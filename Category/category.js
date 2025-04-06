const keywordMap = {
    herbs: ["mint", "basil", "thyme", "oregano", "parsley", "cilantro", "chives", "sage", "rosemary", "dill", "tarragon", "lemongrass", "lavender", "fennel", "marjoram"],
    flowers: ["rose", "daisy", "tulip", "lily", "orchid", "sunflower", "violet", "poppy", "iris", "hibiscus"],
    produce: ["apple", "peach", "grape", "carrot", "lettuce", "tomato", "potato", "onion", "broccoli", "cabbage", "strawberry", "zucchini", "radish", "cucumber", "corn"]
  };
  
  async function fetchCategoryPlants(keywords) {
    const seenIds = new Set();
    const allResults = [];
  
    for (const keyword of keywords) {
      console.log(`🔎 CATEGORY search for "${keyword}"`);
      try {
        const response = await fetch("http://localhost:3000/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: keyword })
        });
  
        const data = await response.json();
        const plants = data.plants || [];
  
        plants.forEach(p => {
          if (!seenIds.has(p.id)) {
            seenIds.add(p.id);
            allResults.push(p);
          }
        });
      } catch (err) {
        console.error(`❌ Error fetching keyword '${keyword}':`, err);
      }
    }
  
    return allResults;
  }
  
  function displayCategoryResults(plants, category) {
    const container = document.getElementById("categoryContainer");
    container.innerHTML = "";
  
    // Cache the results in sessionStorage
    sessionStorage.setItem(`categoryResults-${category}`, JSON.stringify(plants));
  
    if (plants.length === 0) {
      container.innerHTML = "<p>No plants found in this category.</p>";
      return;
    }
  
    plants.forEach(plant => {
      const card = document.createElement("div");
      card.classList.add("plant-card");
  
      card.innerHTML = `
      <a href="../SearchFunction/plant.html?id=${plant.id}&category=${category}" class="plant-link">
        <h3>${plant.name}</h3>
        <p><strong>Scientific:</strong> ${plant.scientific_name || "N/A"}</p>
      </a>
    `;    
  
      container.appendChild(card);
    });
  }
  
  
  
  async function loadCategoryPage(category) {
    const keywords = keywordMap[category];
    if (!keywords) return;
  
    const loadingBar = document.getElementById("loadingBar");
    loadingBar.style.display = "block";
  
    // Check if cached in sessionStorage
    const cached = sessionStorage.getItem(`category_${category}`);
    if (cached) {
      console.log(`⚡ Loaded ${category} from cache`);
      const plants = JSON.parse(cached);
      plants.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      displayCategoryResults(plants, category); // ✅ include category here
      loadingBar.style.display = "none";
      return;
    }
  
    try {
      const plants = await fetchCategoryPlants(keywords);
  
      // 🔤 Alphabetize by name
      plants.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  
      // Save to sessionStorage
      sessionStorage.setItem(`category_${category}`, JSON.stringify(plants));
  
      displayCategoryResults(plants, category);
    } catch (err) {
      console.error("❌ Failed to load category:", err);
    } finally {
      loadingBar.style.display = "none";
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  