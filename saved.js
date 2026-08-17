let savedRecipes = loadSavedRecipes();
let activeSavedFilter = "all";
let savedSearchTerm = "";

const savedGrid = document.getElementById("savedGrid");
const savedCount = document.getElementById("savedCount");
const clearSavedBtn = document.getElementById("clearSavedBtn");
const savedSearchInput = document.getElementById("savedSearchInput");
const savedFilterButtons = document.querySelectorAll(".saved-filter-btn");
const savedModal = document.getElementById("savedModal");
const savedModalBackdrop = document.getElementById("savedModalBackdrop");
const savedModalContent = document.getElementById("savedModalContent");
const closeSavedModal = document.getElementById("closeSavedModal");

function normalize(value) { return String(value || "").trim().toLowerCase(); }
function titleCase(value) { return String(value || "").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "); }
function safeParse(key) { try { const value = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } }

function loadSavedRecipes() {
  const current = safeParse("cookLikeMe_savedRecipes");
  const legacy = safeParse("cookLikeMe_favorites");
  const merged = [...current];
  legacy.forEach(item => { if (!merged.some(saved => saved.id === item.id)) merged.push(item); });
  localStorage.setItem("cookLikeMe_savedRecipes", JSON.stringify(merged));
  return merged;
}

function saveRecipes() { localStorage.setItem("cookLikeMe_savedRecipes", JSON.stringify(savedRecipes)); }
function normalizeMode(item) { if (item.category === "Custom Plate" || String(item.id || "").startsWith("custom-")) return "custom"; return item.mode || "regular"; }
function formatMode(mode) { return { regular:"Food", healthy:"Healthy", shakes:"Shakes & Smoothies", drinks:"Drinks", desserts:"Desserts", custom:"Custom Plate" }[mode] || titleCase(mode); }

function ingredientName(entry) {
  if (typeof entry === "string") return normalize(entry);
  if (entry && typeof entry === "object") return normalize(entry.item || entry.name || entry.ingredient || "");
  return "";
}

function ingredientDisplay(entry) {
  if (typeof entry === "string") return titleCase(entry);
  if (entry && typeof entry === "object") {
    const name = titleCase(entry.item || entry.name || entry.ingredient || "");
    const amount = String(entry.amount || "").trim();
    return amount ? `${amount} ${name}` : name;
  }
  return "";
}

function getIngredientEntries(item) {
  if (Array.isArray(item.ingredients) && item.ingredients.length) return item.ingredients;
  return [...(item.coreIngredients || []), ...(item.flavorIngredients || []), ...(item.optionalIngredients || [])];
}

function getGroceryNames(item) {
  return getIngredientEntries(item).map(ingredientName).filter(Boolean);
}

function getFilteredSaved() {
  return savedRecipes.filter(item => {
    const modeMatch = activeSavedFilter === "all" || normalizeMode(item) === activeSavedFilter;
    if (!modeMatch) return false;
    if (!savedSearchTerm) return true;
    const haystack = [item.title, item.description, item.category, ...(item.tags || []), ...getIngredientEntries(item).map(ingredientName)].join(" ").toLowerCase();
    return haystack.includes(savedSearchTerm);
  });
}

function addNamesToGrocery(names) {
  const raw = safeParse("cookLikeMe_groceryList");
  const existingNames = raw.map(entry => typeof entry === "string" ? normalize(entry) : normalize(entry.name || entry.ingredient || ""));
  names.forEach(name => {
    const clean = normalize(name);
    if (!clean || existingNames.includes(clean)) return;
    raw.push({ id:`saved-${Date.now()}-${Math.random().toString(36).slice(2,8)}`, name:clean, checked:false });
    existingNames.push(clean);
  });
  localStorage.setItem("cookLikeMe_groceryList", JSON.stringify(raw));
}

function startCooking(item) {
  localStorage.setItem("cookLikeMe_activeRecipe", JSON.stringify(item));
  window.location.href = "cook.html";
}

function renderSaved() {
  const filtered = getFilteredSaved();
  savedCount.textContent = `${savedRecipes.length} saved`;
  savedGrid.innerHTML = "";

  if (!savedRecipes.length) {
    savedGrid.innerHTML = `<div class="saved-empty"><h2>Your cookbook is empty.</h2><p>Save something worth making again and it’ll live here.</p><div class="saved-empty-actions"><a href="meals.html" class="saved-empty-link primary">Find Meals</a><a href="builder.html" class="saved-empty-link">Build My Plate</a></div></div>`;
    return;
  }

  if (!filtered.length) {
    savedGrid.innerHTML = `<div class="saved-empty"><h2>Nothing matched that.</h2><p>Try another search or switch the filter.</p></div>`;
    return;
  }

  filtered.forEach(item => {
    const mode = normalizeMode(item);
    const card = document.createElement("article");
    card.className = "saved-card";
    card.innerHTML = `
      <div>
        <div class="saved-card-topline"><span class="saved-type">${item.category || "Recipe"}</span><span class="saved-mode">${formatMode(mode)}</span></div>
        <h3>${item.title || "Saved Recipe"}</h3>
        <p class="saved-description">${item.description || ""}</p>
        <div class="saved-meta">
          ${item.time ? `<span class="saved-pill">${item.time}</span>` : ""}
          ${item.difficulty ? `<span class="saved-pill">${item.difficulty}</span>` : ""}
          ${Array.isArray(item.tags) ? item.tags.slice(0,2).map(tag => `<span class="saved-pill">${tag}</span>`).join("") : ""}
        </div>
      </div>
      <div class="saved-card-actions">
        <button class="saved-card-btn primary cook-saved">Cook Again →</button>
        <button class="saved-card-btn view-saved">View</button>
        <button class="saved-card-btn add-grocery">Add to Grocery</button>
        <button class="saved-card-btn remove remove-saved">Remove</button>
      </div>`;
    card.querySelector(".cook-saved").onclick = () => startCooking(item);
    card.querySelector(".view-saved").onclick = () => openSavedModal(item);
    card.querySelector(".add-grocery").onclick = () => addSavedToGrocery(item);
    card.querySelector(".remove-saved").onclick = () => removeSaved(item.id);
    savedGrid.appendChild(card);
  });
}

function removeSaved(id) { savedRecipes = savedRecipes.filter(item => item.id !== id); saveRecipes(); renderSaved(); }
function addSavedToGrocery(item) { addNamesToGrocery(getGroceryNames(item)); alert(`${item.title} added to Grocery.`); }

function openSavedModal(item) {
  const ingredients = getIngredientEntries(item);
  savedModalContent.innerHTML = `
    <p class="saved-modal-type">${formatMode(normalizeMode(item))} • ${item.category || "Recipe"}</p>
    <h2>${item.title || "Saved Recipe"}</h2>
    <p class="saved-modal-description">${item.description || ""}</p>
    <div class="saved-meta">
      ${item.prepTime ? `<span class="saved-pill">Prep ${item.prepTime}</span>` : ""}
      ${item.cookTime ? `<span class="saved-pill">Cook ${item.cookTime}</span>` : ""}
      ${item.servings ? `<span class="saved-pill">Serves ${item.servings}</span>` : ""}
      ${item.time ? `<span class="saved-pill">${item.time}</span>` : ""}
      ${item.difficulty ? `<span class="saved-pill">${item.difficulty}</span>` : ""}
    </div>
    <section class="saved-modal-section"><h3>What You Need</h3><ul class="saved-modal-list">${ingredients.map(entry => `<li>${ingredientDisplay(entry)}</li>`).join("")}</ul></section>
    ${Array.isArray(item.recommendedSeasonings) && item.recommendedSeasonings.length ? `<section class="saved-modal-section"><h3>Make It Hit 🔥</h3><p class="saved-modal-description">CookLikeMe suggests ${item.recommendedSeasonings.map(titleCase).join(", ")}. Use your own usual blend if you prefer.</p></section>` : ""}
    ${Array.isArray(item.instructions) && item.instructions.length ? `<section class="saved-modal-section"><h3>How It Comes Together</h3><ol class="saved-modal-list">${item.instructions.map(step => `<li>${step}</li>`).join("")}</ol></section>` : ""}
    <div class="saved-card-actions">
      <button id="modalCookSaved" class="saved-card-btn primary">Start Cooking →</button>
      <button id="modalAddGrocery" class="saved-card-btn">Add to Grocery</button>
      <button id="modalRemoveSaved" class="saved-card-btn remove">Remove from Saved</button>
    </div>`;
  savedModal.classList.remove("hidden");
  document.getElementById("modalCookSaved").onclick = () => startCooking(item);
  document.getElementById("modalAddGrocery").onclick = () => addSavedToGrocery(item);
  document.getElementById("modalRemoveSaved").onclick = () => { removeSaved(item.id); closeModal(); };
}

function closeModal(){ savedModal.classList.add("hidden"); }

savedFilterButtons.forEach(button => button.addEventListener("click", () => {
  activeSavedFilter = button.dataset.filter;
  savedFilterButtons.forEach(other => other.classList.toggle("active", other === button));
  renderSaved();
}));

savedSearchInput.addEventListener("input", () => { savedSearchTerm = normalize(savedSearchInput.value); renderSaved(); });
clearSavedBtn.addEventListener("click", () => { if (!savedRecipes.length) return; if (!confirm("Clear everything from Saved?")) return; savedRecipes=[]; saveRecipes(); renderSaved(); });
closeSavedModal.addEventListener("click", closeModal);
savedModalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

renderSaved();