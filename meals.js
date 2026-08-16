const ingredientData = window.COOKLIKEME_INGREDIENTS || {};
const recipes = Array.isArray(window.COOKLIKEME_RECIPES) ? window.COOKLIKEME_RECIPES : [];

let activeMode = "regular";
let selectedIngredients = [];

try {
  selectedIngredients = JSON.parse(localStorage.getItem("cookLikeMe_selectedIngredients") || "[]");
  if (!Array.isArray(selectedIngredients)) selectedIngredients = [];
} catch {
  selectedIngredients = [];
}

const $ = id => document.getElementById(id);

const modeTabs = $("modeTabs");
const ingredientGroupsEl = $("ingredientGroups");
const selectedIngredientsEl = $("selectedIngredients");
const selectedCount = $("selectedCount");
const customIngredientInput = $("customIngredientInput");
const addCustomIngredientBtn = $("addCustomIngredientBtn");
const clearIngredientsBtn = $("clearIngredientsBtn");
const findMealsBtn = $("findMealsBtn");
const surpriseBtn = $("surpriseBtn");
const bestMatchEl = $("bestMatch");
const resultsGrid = $("resultsGrid");
const resultCount = $("resultCount");
const recipeModal = $("recipeModal");
const recipeModalBackdrop = $("recipeModalBackdrop");
const recipeModalContent = $("recipeModalContent");
const closeRecipeModal = $("closeRecipeModal");

const kitchenReadoutTitle = $("kitchenReadoutTitle");
const comboStrength = $("comboStrength");
const readoutProtein = $("readoutProtein");
const readoutBase = $("readoutBase");
const readoutSide = $("readoutSide");
const readoutFlavor = $("readoutFlavor");
const kitchenReadoutMessage = $("kitchenReadoutMessage");

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function titleCase(value) {
  return normalize(value)
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function saveSelected() {
  localStorage.setItem("cookLikeMe_selectedIngredients", JSON.stringify(selectedIngredients));
}

const families = [
  ["chicken", "chicken breast", "chicken thighs", "chicken wings", "wings", "fried chicken", "ground chicken"],
  ["turkey", "ground turkey", "turkey sausage"],
  ["ground beef", "steak", "lean steak", "beef strips", "chuck roast", "short ribs"],
  ["pork chops", "pork tenderloin", "pulled pork"],
  ["sausage", "italian sausage", "smoked sausage"],
  ["fish", "tilapia", "cod", "catfish"],
  ["rice", "white rice", "yellow rice", "brown rice", "jasmine rice", "basmati rice", "rice and peas"],
  ["pasta", "spaghetti", "penne", "fettuccine", "linguine", "ziti", "macaroni", "egg noodles", "whole wheat pasta"],
  ["potatoes", "red potatoes", "roasted potatoes", "mashed potatoes", "sweet potato"],
  ["tortilla", "flour tortilla", "corn tortilla", "whole wheat tortilla", "wrap"]
];

function sameIngredient(a, b) {
  a = normalize(a);
  b = normalize(b);
  if (a === b) return true;
  return families.some(group => group.includes(a) && group.includes(b));
}

function userHas(ingredient) {
  return selectedIngredients.some(item => sameIngredient(item, ingredient));
}

const proteins = new Set([
  "chicken","chicken breast","chicken thighs","chicken wings","wings","fried chicken","ground chicken",
  "turkey","ground turkey","turkey sausage","ground beef","steak","lean steak","beef strips","chuck roast","short ribs",
  "pork chops","pork tenderloin","pulled pork","bacon","sausage","italian sausage","smoked sausage","lamb chops",
  "shrimp","salmon","fish","tilapia","cod","catfish","tuna","crab","crab meat","scallops","eggs","egg whites","tofu"
]);

const bases = new Set([
  "rice","white rice","yellow rice","brown rice","jasmine rice","basmati rice","rice and peas",
  "pasta","spaghetti","penne","fettuccine","linguine","ziti","macaroni","egg noodles","whole wheat pasta",
  "potatoes","red potatoes","sweet potato","roasted potatoes","mashed potatoes","fries","sweet potato fries",
  "grits","quinoa","beans","black beans","kidney beans","red beans","chickpeas","plantain",
  "bread","white bread","wheat bread","brioche","rolls","tortilla","flour tortilla","corn tortilla","whole wheat tortilla","wrap","oats"
]);

const flavors = new Set([
  "gravy","brown gravy","chicken gravy","hot sauce","buffalo sauce","bbq sauce","soy sauce","low sodium soy sauce",
  "teriyaki sauce","worcestershire sauce","alfredo sauce","tomato sauce","marinara","garlic butter",
  "honey garlic sauce","jerk sauce","brown stew sauce","coconut milk","coconut cream","ranch","mayo","mustard","ketchup",
  "honey","olive oil","lime","lime juice","lemon","lemon juice"
]);

const recipeOnlySeasonings = new Set([
  "salt","sea salt","black pepper","white pepper","garlic powder","onion powder","paprika","smoked paprika",
  "cajun seasoning","creole seasoning","old bay","seasoned salt","adobo","sazon","lemon pepper",
  "italian seasoning","oregano","basil seasoning","parsley seasoning","rosemary seasoning","thyme seasoning",
  "red pepper flakes","cayenne pepper","chili powder","cumin","curry powder","caribbean curry powder",
  "jerk seasoning","allspice","brown sugar","cinnamon","nutmeg"
]);

function roleOf(item) {
  const value = normalize(item);
  if (proteins.has(value)) return "protein";
  if (bases.has(value)) return "base";
  if (flavors.has(value)) return "flavor";
  if (recipeOnlySeasonings.has(value)) return "seasoning";
  return "support";
}

function selectedByRole(role) {
  return selectedIngredients.filter(item => roleOf(item) === role);
}

function firstByRole(role) {
  return selectedByRole(role)[0] || "";
}

function bestSide() {
  return selectedIngredients.find(item => roleOf(item) === "support") || "";
}

function formatMode(mode) {
  return {
    regular: "Food",
    healthy: "Healthy",
    shakes: "Shakes & Smoothies",
    drinks: "Drinks",
    desserts: "Desserts"
  }[mode] || titleCase(mode);
}

function modeFromUrl() {
  const mode = new URLSearchParams(location.search).get("mode");
  if (ingredientData[mode]) activeMode = mode;
}

function setMode(mode) {
  if (!ingredientData[mode]) return;
  activeMode = mode;
  document.querySelectorAll(".mode-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });
  renderIngredientGroups();
  renderSelectedIngredients();
  renderKitchenReadout();
  renderEmptyResults();
}

function renderIngredientGroups() {
  ingredientGroupsEl.innerHTML = "";
  const groups = ingredientData[activeMode];

  if (!groups || typeof groups !== "object") {
    ingredientGroupsEl.innerHTML = `<div class="finder-empty">Ingredient list could not load.</div>`;
    return;
  }

  Object.entries(groups).forEach(([groupName, ingredients]) => {
    const section = document.createElement("section");
    section.className = "ingredient-group";

    const h3 = document.createElement("h3");
    h3.textContent = groupName;

    const buttons = document.createElement("div");
    buttons.className = "ingredient-buttons";

    (ingredients || []).forEach(ingredient => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ingredient-btn";
      button.textContent = ingredient;
      button.classList.toggle("active", selectedIngredients.includes(normalize(ingredient)));
      button.addEventListener("click", () => toggleIngredient(ingredient));
      buttons.appendChild(button);
    });

    section.append(h3, buttons);
    ingredientGroupsEl.appendChild(section);
  });
}

function renderSelectedIngredients() {
  selectedIngredientsEl.innerHTML = "";
  selectedCount.textContent = `${selectedIngredients.length} ${selectedIngredients.length === 1 ? "ingredient" : "ingredients"}`;

  if (!selectedIngredients.length) {
    selectedIngredientsEl.innerHTML = `<span class="selected-empty">Nothing selected yet.</span>`;
    return;
  }

  selectedIngredients.forEach(ingredient => {
    const tag = document.createElement("span");
    tag.className = "selected-tag";
    tag.innerHTML = `${ingredient} <button type="button" aria-label="Remove ${ingredient}">×</button>`;
    tag.querySelector("button").addEventListener("click", () => {
      selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
      refreshPicker();
    });
    selectedIngredientsEl.appendChild(tag);
  });
}

function refreshPicker() {
  saveSelected();
  renderSelectedIngredients();
  renderIngredientGroups();
  renderKitchenReadout();
}

function toggleIngredient(ingredient) {
  const value = normalize(ingredient);
  selectedIngredients = selectedIngredients.includes(value)
    ? selectedIngredients.filter(item => item !== value)
    : [...selectedIngredients, value];
  refreshPicker();
}

function addCustomIngredient() {
  const value = normalize(customIngredientInput.value);
  if (!value) return;
  if (!selectedIngredients.includes(value)) selectedIngredients.push(value);
  customIngredientInput.value = "";
  refreshPicker();
}

function renderKitchenReadout() {
  if (!selectedIngredients.length) {
    readoutProtein.textContent = "Not picked";
    readoutBase.textContent = "Not picked";
    readoutSide.textContent = "Not picked";
    readoutFlavor.textContent = "Not picked";
    kitchenReadoutTitle.textContent = "Start building your combo.";
    comboStrength.textContent = "Waiting";
    comboStrength.className = "combo-strength neutral";
    kitchenReadoutMessage.textContent = "Pick a few main ingredients and CookLikeMe will start reading the plate.";
    return;
  }

  if (!["regular", "healthy"].includes(activeMode)) {
    readoutProtein.textContent = titleCase(selectedIngredients[0] || "Not picked");
    readoutBase.textContent = titleCase(selectedIngredients[1] || "Not picked");
    readoutSide.textContent = titleCase(selectedIngredients[2] || "Not picked");
    readoutFlavor.textContent = titleCase(selectedIngredients[3] || "Not picked");
    kitchenReadoutTitle.textContent = `${selectedIngredients.length} ingredients selected.`;
    comboStrength.textContent = selectedIngredients.length >= 3 ? "Ready" : "Keep Going";
    comboStrength.className = `combo-strength ${selectedIngredients.length >= 3 ? "strong" : "good"}`;
    kitchenReadoutMessage.textContent = "Hit Find My Best Move when you’re ready.";
    return;
  }

  const protein = firstByRole("protein");
  const base = firstByRole("base");
  const side = bestSide();
  const flavor = firstByRole("flavor");

  readoutProtein.textContent = protein ? titleCase(protein) : "Not picked";
  readoutBase.textContent = base ? titleCase(base) : "Not picked";
  readoutSide.textContent = side ? titleCase(side) : "Not picked";
  readoutFlavor.textContent = flavor ? titleCase(flavor) : "Not picked";

  let strength = 0;
  if (protein) strength += 2;
  if (base) strength += 1;
  if (side) strength += 1;
  if (flavor) strength += 1;

  if (protein && base && (side || flavor)) {
    kitchenReadoutTitle.textContent = "That’s looking like a real meal.";
    comboStrength.textContent = strength >= 5 ? "Strong Combo" : "Good Combo";
    comboStrength.className = `combo-strength ${strength >= 5 ? "strong" : "good"}`;
    kitchenReadoutMessage.textContent = "You’ve got enough for CookLikeMe to give you a strong direction.";
  } else if (protein) {
    kitchenReadoutTitle.textContent = `${titleCase(protein)} is the main move.`;
    comboStrength.textContent = "Getting There";
    comboStrength.className = "combo-strength good";
    kitchenReadoutMessage.textContent = "Add a base, side, or sauce to make the recommendation sharper.";
  } else {
    kitchenReadoutTitle.textContent = "Pick a main protein if you have one.";
    comboStrength.textContent = "Needs More";
    comboStrength.className = "combo-strength weak";
    kitchenReadoutMessage.textContent = "CookLikeMe can still suggest ideas, but a main ingredient will make the result much better.";
  }
}

function scoreRecipe(recipe) {
  const core = recipe.coreIngredients || [];
  const flavor = recipe.flavorIngredients || [];
  const optional = recipe.optionalIngredients || [];

  let score = 0;
  const missingMain = [];
  const matchedMain = [];
  const missingOther = [];

  core.forEach(item => {
    const role = roleOf(item);
    const matched = userHas(item);

    if (role === "seasoning") {
      if (matched) score += 1;
      return;
    }

    if (role === "protein") {
      if (matched) {
        score += 50;
        matchedMain.push(item);
      } else {
        score -= 70;
        missingMain.push(item);
      }
      return;
    }

    if (role === "base") {
      if (matched) {
        score += 24;
        matchedMain.push(item);
      } else {
        score -= 12;
        missingOther.push(item);
      }
      return;
    }

    if (role === "flavor") {
      if (matched) score += 18;
      else score -= 2;
      return;
    }

    if (matched) score += 10;
    else missingOther.push(item);
  });

  flavor.forEach(item => {
    if (roleOf(item) === "seasoning") return;
    if (userHas(item)) score += roleOf(item) === "flavor" ? 10 : 5;
  });

  optional.forEach(item => {
    if (userHas(item)) score += 2;
  });

  const selectedProtein = firstByRole("protein");
  const selectedBase = firstByRole("base");
  const selectedFlavor = firstByRole("flavor");

  if (selectedProtein && core.some(item => roleOf(item) === "protein" && userHas(item))) score += 25;
  if (selectedBase && core.some(item => roleOf(item) === "base" && userHas(item))) score += 12;
  if (selectedFlavor && [...core, ...flavor].some(item => roleOf(item) === "flavor" && userHas(item))) score += 10;

  return { score, missingMain, missingOther, matchedMain };
}

function getSeasoningSuggestion(protein, flavor) {
  const p = normalize(protein);
  const f = normalize(flavor);

  if (f.includes("jerk")) return ["jerk seasoning", "garlic powder", "onion powder", "thyme", "black pepper"];
  if (f.includes("brown stew")) return ["seasoned salt", "garlic powder", "onion powder", "paprika", "thyme"];
  if (f.includes("alfredo") || f.includes("marinara")) return ["garlic powder", "black pepper", "italian seasoning"];
  if (f.includes("buffalo") || f.includes("bbq") || f.includes("honey garlic")) return ["garlic powder", "onion powder", "smoked paprika", "black pepper"];
  if (f.includes("coconut")) return ["curry powder", "garlic powder", "onion powder", "thyme"];
  if (p.includes("shrimp") || p.includes("fish") || p.includes("salmon") || p.includes("tilapia")) return ["old bay", "garlic powder", "paprika", "black pepper"];
  if (p.includes("steak") || p.includes("beef") || p.includes("lamb")) return ["seasoned salt", "garlic powder", "onion powder", "black pepper"];
  return ["seasoned salt", "garlic powder", "onion powder", "paprika", "black pepper"];
}

function smartPlate() {
  if (!["regular", "healthy"].includes(activeMode)) return null;

  const protein = firstByRole("protein");
  const base = firstByRole("base");
  const side = bestSide();
  const flavor = firstByRole("flavor");

  if (!protein || (!base && !side && !flavor)) return null;

  const seasonings = getSeasoningSuggestion(protein, flavor);
  const p = titleCase(protein);
  const b = titleCase(base);
  const s = titleCase(side);

  let title = `${p}${base ? ` with ${b}` : ""}${side ? ` & ${s}` : ""}`;

  if (flavor === "honey garlic sauce") title = `Honey Garlic ${p}${base ? ` with ${b}` : ""}${side ? ` & ${s}` : ""}`;
  else if (flavor === "jerk sauce") title = `Jerk ${p}${base ? ` with ${b}` : ""}${side ? ` & ${s}` : ""}`;
  else if (flavor === "garlic butter") title = `Garlic Butter ${p}${base ? ` with ${b}` : ""}`;
  else if (flavor === "buffalo sauce") title = `Buffalo ${p}${base ? ` with ${b}` : ""}`;
  else if (flavor === "bbq sauce") title = `BBQ ${p}${base ? ` with ${b}` : ""}`;
  else if (flavor === "brown stew sauce") title = `Brown Stew ${p}${base ? ` with ${b}` : ""}`;
  else if (flavor === "alfredo sauce") title = `Creamy ${p} Alfredo`;

  const ingredientList = [protein, base, side, flavor].filter(Boolean);

  return {
    id: `smart-${Date.now()}`,
    mode: activeMode,
    title,
    category: "CookLikeMe Pick",
    tags: ["Smart Plate"],
    time: "25–40 min",
    prepTime: "10 min",
    cookTime: "20–30 min",
    servings: 2,
    difficulty: "Easy",
    ingredients: ingredientList.map(item => ({ item, amount: "Use what you have" })),
    coreIngredients: [protein, base, side].filter(Boolean),
    flavorIngredients: [flavor].filter(Boolean),
    optionalIngredients: [],
    description: `${p}${flavor ? ` finished with ${titleCase(flavor)}` : ""}${base ? `, served with ${b}` : ""}${side ? ` and ${s}` : ""}. CookLikeMe recommends ${seasonings.map(titleCase).join(", ")} to season it.`,
    instructions: [
      `Season the ${protein} with ${seasonings.join(", ")}.`,
      `Cook the ${protein} until browned and fully cooked.`,
      base ? `Prepare the ${base}.` : null,
      side ? `Cook or season the ${side} as your side.` : null,
      flavor ? `Finish with ${flavor}.` : null,
      "Taste, adjust, and serve everything hot."
    ].filter(Boolean),
    recommendedSeasonings: seasonings,
    isSmartPlate: true
  };
}

function renderEmptyResults() {
  bestMatchEl.innerHTML = `<div class="finder-empty">Pick ingredients, then hit <strong>Find My Best Move</strong>.</div>`;
  resultsGrid.innerHTML = `<div class="finder-empty">Other strong ideas will show here.</div>`;
  resultCount.textContent = "0 results";
}

function findMeals() {
  if (!selectedIngredients.length) {
    renderEmptyResults();
    bestMatchEl.innerHTML = `<div class="finder-empty">Pick at least one ingredient first.</div>`;
    return;
  }

  const modeRecipes = recipes.filter(recipe => recipe.mode === activeMode);
  const ranked = modeRecipes
    .map(recipe => ({ recipe, match: scoreRecipe(recipe) }))
    .sort((a, b) => b.match.score - a.match.score);

  const smart = smartPlate();
  const best = ranked[0];

  const smartShouldLead = smart && (!best || best.match.score < 65 || best.match.missingMain.length > 0);

  if (smartShouldLead) {
    renderBestCard(smart, {
      label: "🔥 CookLikeMe Pick",
      explanation: "Built directly from the food you selected.",
      missing: []
    });
  } else if (best && best.match.score > 0) {
    const missing = [...best.match.missingMain, ...best.match.missingOther];
    renderBestCard(best.recipe, {
      label: best.match.score >= 100 ? "🔥 Damn Good Match" : best.match.score >= 65 ? "Strong Match" : "Good Idea",
      explanation: best.match.missingMain.length
        ? "This is close, but you’re missing a main ingredient."
        : "The important parts of this meal line up with what you have.",
      missing
    });
  } else {
    bestMatchEl.innerHTML = `<div class="finder-empty">Nothing strong enough yet. Add another main ingredient and try again.</div>`;
  }

  renderOtherResults(ranked);
  $("resultsSection").scrollIntoView({ behavior: "smooth" });
}

function renderBestCard(recipe, meta) {
  bestMatchEl.innerHTML = `
    <article class="best-match-card">
      <div class="recipe-topline">
        <span class="match-label">${meta.label}</span>
        <span class="mode-label">${formatMode(recipe.mode)}</span>
      </div>
      <h3>${recipe.title}</h3>
      <p>${recipe.description || ""}</p>
      <div class="recipe-meta">
        ${recipe.category ? `<span class="meta-pill">${recipe.category}</span>` : ""}
        ${recipe.time ? `<span class="meta-pill">${recipe.time}</span>` : ""}
        ${recipe.difficulty ? `<span class="meta-pill">${recipe.difficulty}</span>` : ""}
      </div>
      <p class="missing-line"><strong>Why this works:</strong> ${meta.explanation}</p>
      ${meta.missing.length ? `<p class="missing-line">Missing: ${meta.missing.slice(0, 4).map(titleCase).join(", ")}</p>` : ""}
      <div class="recipe-actions">
        <button class="recipe-action-btn primary" id="bestViewRecipe">View Recipe</button>
        <button class="recipe-action-btn" id="bestSaveRecipe">Save ♥</button>
      </div>
    </article>
  `;

  $("bestViewRecipe").addEventListener("click", () => openRecipeModal(recipe));
  $("bestSaveRecipe").addEventListener("click", () => saveRecipe(recipe));
}

function renderOtherResults(ranked) {
  const visible = ranked
    .filter(item => item.match.score > 15 && item.match.missingMain.length === 0)
    .slice(0, 9);

  resultCount.textContent = `${visible.length} ${visible.length === 1 ? "result" : "results"}`;
  resultsGrid.innerHTML = "";

  if (!visible.length) {
    resultsGrid.innerHTML = `<div class="finder-empty">No other strong recipe matches yet.</div>`;
    return;
  }

  visible.forEach(({ recipe, match }) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    const missing = match.missingOther.slice(0, 3);
    card.innerHTML = `
      <div class="recipe-topline">
        <span class="match-label">${match.score >= 65 ? "Strong Match" : "Good Idea"}</span>
        <span class="mode-label">${formatMode(recipe.mode)}</span>
      </div>
      <h3>${recipe.title}</h3>
      <p>${recipe.description || ""}</p>
      <div class="recipe-meta">
        ${recipe.time ? `<span class="meta-pill">${recipe.time}</span>` : ""}
        ${recipe.difficulty ? `<span class="meta-pill">${recipe.difficulty}</span>` : ""}
      </div>
      ${missing.length ? `<p class="missing-line">Missing: ${missing.map(titleCase).join(", ")}</p>` : `<p class="missing-line">You’ve got the important stuff.</p>`}
      <div class="recipe-actions">
        <button class="recipe-action-btn primary view-recipe">View Recipe</button>
        <button class="recipe-action-btn save-recipe">Save ♥</button>
      </div>
    `;
    card.querySelector(".view-recipe").addEventListener("click", () => openRecipeModal(recipe));
    card.querySelector(".save-recipe").addEventListener("click", () => saveRecipe(recipe));
    resultsGrid.appendChild(card);
  });
}

function surpriseMe() {
  const modeRecipes = recipes.filter(recipe => recipe.mode === activeMode);
  if (!modeRecipes.length) return;
  openRecipeModal(modeRecipes[Math.floor(Math.random() * modeRecipes.length)]);
}

function saveRecipe(recipe) {
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem("cookLikeMe_savedRecipes") || "[]");
    if (!Array.isArray(saved)) saved = [];
  } catch {
    saved = [];
  }

  if (!saved.some(item => item.id === recipe.id)) {
    saved.push(recipe);
    localStorage.setItem("cookLikeMe_savedRecipes", JSON.stringify(saved));
    alert(`${recipe.title} saved.`);
  } else {
    alert(`${recipe.title} is already saved.`);
  }
}

function openRecipeModal(recipe) {
  const quantityIngredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const fallbackIngredients = [
    ...(recipe.coreIngredients || []),
    ...(recipe.flavorIngredients || []),
    ...(recipe.optionalIngredients || [])
  ];

  recipeModalContent.innerHTML = `
    <p class="modal-category">${formatMode(recipe.mode)}${recipe.category ? ` • ${recipe.category}` : ""}</p>
    <h2>${recipe.title}</h2>
    <p class="modal-description">${recipe.description || ""}</p>

    <div class="recipe-meta">
      ${recipe.prepTime ? `<span class="meta-pill">Prep ${recipe.prepTime}</span>` : ""}
      ${recipe.cookTime ? `<span class="meta-pill">Cook ${recipe.cookTime}</span>` : ""}
      ${recipe.servings ? `<span class="meta-pill">Serves ${recipe.servings}</span>` : ""}
      ${recipe.difficulty ? `<span class="meta-pill">${recipe.difficulty}</span>` : ""}
    </div>

    <section class="modal-section">
      <h3>What You Need</h3>
      <ul class="modal-list">
        ${
          quantityIngredients.length
            ? quantityIngredients.map(entry => {
                if (typeof entry === "string") return `<li>${titleCase(entry)}</li>`;
                return `<li><strong>${entry.amount || ""}</strong> ${titleCase(entry.item || "")}</li>`;
              }).join("")
            : fallbackIngredients.map(item => `<li>${titleCase(item)}</li>`).join("")
        }
      </ul>
    </section>

    ${Array.isArray(recipe.recommendedSeasonings) && recipe.recommendedSeasonings.length ? `
      <section class="modal-section">
        <h3>Make It Hit 🔥</h3>
        <p class="modal-description">CookLikeMe suggests ${recipe.recommendedSeasonings.map(titleCase).join(", ")}. Season it your way if you already have a blend you like.</p>
      </section>
    ` : ""}

    <section class="modal-section">
      <h3>How It Comes Together</h3>
      <ol class="modal-list">
        ${(recipe.instructions || []).map(step => `<li>${step}</li>`).join("")}
      </ol>
    </section>

    <div class="recipe-actions">
      <button id="modalSaveRecipe" class="recipe-action-btn primary">Save ♥</button>
    </div>
  `;

  recipeModal.classList.remove("hidden");
  $("modalSaveRecipe").addEventListener("click", () => saveRecipe(recipe));
}

function closeModal() {
  recipeModal.classList.add("hidden");
}

modeTabs.addEventListener("click", event => {
  const button = event.target.closest(".mode-tab");
  if (button) setMode(button.dataset.mode);
});

addCustomIngredientBtn.addEventListener("click", addCustomIngredient);
customIngredientInput.addEventListener("keydown", event => {
  if (event.key === "Enter") addCustomIngredient();
});

clearIngredientsBtn.addEventListener("click", () => {
  selectedIngredients = [];
  refreshPicker();
  renderEmptyResults();
});

findMealsBtn.addEventListener("click", findMeals);
surpriseBtn.addEventListener("click", surpriseMe);
closeRecipeModal.addEventListener("click", closeModal);
recipeModalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

function init() {
  modeFromUrl();
  setMode(activeMode);
}

init();