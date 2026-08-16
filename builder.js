const ingredientData = window.COOKLIKEME_INGREDIENTS;

let builderMode = "regular";
let plateSelections = {
  protein: "",
  base: "",
  side: "",
  extras: [],
  flavor: ""
};
let currentGeneratedPlate = null;

const builderModeTabs = document.getElementById("builderModeTabs");
const proteinOptions = document.getElementById("proteinOptions");
const baseOptions = document.getElementById("baseOptions");
const sideOptions = document.getElementById("sideOptions");
const extraOptions = document.getElementById("extraOptions");
const flavorOptions = document.getElementById("flavorOptions");
const platePreview = document.getElementById("platePreview");
const generatePlateBtn = document.getElementById("generatePlateBtn");
const resetBuilderBtn = document.getElementById("resetBuilderBtn");
const generatedSection = document.getElementById("generatedSection");
const generatedTitle = document.getElementById("generatedTitle");
const generatedDescription = document.getElementById("generatedDescription");
const generatedMeta = document.getElementById("generatedMeta");
const generatedIngredients = document.getElementById("generatedIngredients");
const generatedInstructions = document.getElementById("generatedInstructions");
const savePlateBtn = document.getElementById("savePlateBtn");
const addPlateToGroceryBtn = document.getElementById("addPlateToGroceryBtn");
const buildAnotherBtn = document.getElementById("buildAnotherBtn");

function titleCase(value) {
  return String(value || "")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getBuilderData() {
  if (builderMode === "healthy") {
    return {
      proteins: ["chicken breast", "ground turkey", "salmon", "shrimp", "tilapia", "tuna", "eggs", "egg whites"],
      bases: ["brown rice", "quinoa", "sweet potato", "whole wheat pasta", "black beans", "chickpeas"],
      sides: ["broccoli", "spinach", "green beans", "carrots", "kale", "cabbage", "avocado"],
      extras: ["bell pepper", "onion", "tomato", "cucumber", "mushrooms", "corn", "cilantro", "scallion"],
      flavors: ["lime", "lemon", "olive oil", "hot sauce", "low sodium soy sauce", "garlic"]
    };
  }

  return {
    proteins: ["chicken", "chicken thighs", "wings", "shrimp", "salmon", "fish", "steak", "ground beef", "pork chops", "sausage", "turkey", "lamb chops"],
    bases: ["rice", "white rice", "yellow rice", "pasta", "macaroni", "mashed potatoes", "fries", "grits", "beans", "plantain"],
    sides: ["macaroni", "mashed potatoes", "fries", "plantain", "green beans", "broccoli", "corn", "cabbage", "beans"],
    extras: ["onion", "garlic", "bell pepper", "spinach", "mushrooms", "tomato", "scallion", "cilantro", "carrots"],
    flavors: ["gravy", "garlic butter", "jerk sauce", "brown stew sauce", "alfredo sauce", "marinara", "hot sauce", "buffalo sauce", "honey garlic sauce", "bbq sauce", "coconut milk", "lime"]
  };
}

function renderSingleOptions(element, options, type) {
  element.innerHTML = "";
  options.forEach(item => {
    const button = document.createElement("button");
    button.className = "builder-option";
    button.textContent = titleCase(item);
    if (plateSelections[type] === item) button.classList.add("selected");
    button.addEventListener("click", () => {
      plateSelections[type] = plateSelections[type] === item ? "" : item;
      renderBuilder();
      renderPlatePreview();
    });
    element.appendChild(button);
  });
}

function renderExtraOptions(element, options) {
  element.innerHTML = "";
  options.forEach(item => {
    const button = document.createElement("button");
    button.className = "builder-option";
    button.textContent = titleCase(item);
    if (plateSelections.extras.includes(item)) button.classList.add("selected");
    button.addEventListener("click", () => {
      if (plateSelections.extras.includes(item)) {
        plateSelections.extras = plateSelections.extras.filter(extra => extra !== item);
      } else {
        plateSelections.extras.push(item);
      }
      renderBuilder();
      renderPlatePreview();
    });
    element.appendChild(button);
  });
}

function renderBuilder() {
  const data = getBuilderData();
  renderSingleOptions(proteinOptions, data.proteins, "protein");
  renderSingleOptions(baseOptions, data.bases, "base");
  renderSingleOptions(sideOptions, data.sides, "side");
  renderExtraOptions(extraOptions, data.extras);
  renderSingleOptions(flavorOptions, data.flavors, "flavor");
}

function previewPiece(label, value) {
  return `<div class="preview-piece"><span>${label}</span><strong class="${value ? "" : "preview-empty"}">${value ? titleCase(value) : "Not picked"}</strong></div>`;
}

function renderPlatePreview() {
  const extrasText = plateSelections.extras.length
    ? plateSelections.extras.map(titleCase).join(", ")
    : "None yet";

  platePreview.innerHTML = `
    ${previewPiece("Protein", plateSelections.protein)}
    ${previewPiece("Base", plateSelections.base)}
    ${previewPiece("Side", plateSelections.side)}
    ${previewPiece("Flavor", plateSelections.flavor)}
    <div class="preview-piece"><span>Extras</span><strong class="${plateSelections.extras.length ? "" : "preview-empty"}">${extrasText}</strong></div>
  `;
}

function getSeasoningRecommendation(protein, flavor) {
  const p = String(protein).toLowerCase();
  const f = String(flavor).toLowerCase();

  if (f.includes("jerk")) return ["jerk seasoning", "garlic powder", "onion powder", "black pepper", "thyme"];
  if (f.includes("brown stew")) return ["all-purpose seasoning", "garlic powder", "onion powder", "paprika", "thyme", "black pepper"];
  if (f.includes("alfredo") || f.includes("marinara")) return ["garlic powder", "onion powder", "italian seasoning", "black pepper"];
  if (f.includes("buffalo") || f.includes("hot sauce")) return ["garlic powder", "onion powder", "paprika", "black pepper"];
  if (f.includes("bbq") || f.includes("honey garlic")) return ["garlic powder", "onion powder", "smoked paprika", "black pepper"];
  if (f.includes("coconut")) return ["curry powder", "garlic powder", "onion powder", "thyme", "black pepper"];
  if (f.includes("lime")) return ["garlic powder", "onion powder", "paprika", "black pepper", "cumin"];
  if (f.includes("soy")) return ["garlic", "ginger", "black pepper"];
  if (f.includes("gravy")) return ["seasoned salt", "garlic powder", "onion powder", "paprika", "black pepper"];

  if (p.includes("shrimp") || p.includes("fish") || p.includes("salmon") || p.includes("tilapia")) {
    return ["old bay", "garlic powder", "paprika", "black pepper"];
  }
  if (p.includes("steak") || p.includes("beef") || p.includes("lamb")) {
    return ["seasoned salt", "garlic powder", "onion powder", "black pepper"];
  }
  return ["seasoned salt", "garlic powder", "onion powder", "paprika", "black pepper"];
}

function createPlateTitle(protein, base, flavor) {
  const proteinName = titleCase(protein);
  const baseName = titleCase(base);
  if (flavor.includes("jerk")) return `Jerk ${proteinName} Plate`;
  if (flavor.includes("alfredo")) return `Creamy ${proteinName} Alfredo Plate`;
  if (flavor.includes("brown stew")) return `Brown Stew ${proteinName} Plate`;
  if (flavor.includes("buffalo")) return `Buffalo ${proteinName} Plate`;
  if (flavor.includes("garlic butter")) return `Garlic Butter ${proteinName} & ${baseName}`;
  if (flavor.includes("bbq")) return `BBQ ${proteinName} Plate`;
  if (flavor.includes("honey garlic")) return `Honey Garlic ${proteinName} Plate`;
  return `${proteinName} with ${baseName}`;
}

function createPlate() {
  const { protein, base, side, extras, flavor } = plateSelections;
  const seasonings = getSeasoningRecommendation(protein, flavor);
  const seasoningText = seasonings.map(titleCase).join(", ");
  const extraText = extras.length ? ` with ${extras.map(titleCase).join(", ")}` : "";

  const description = builderMode === "healthy"
    ? `${titleCase(protein)} with ${titleCase(base)} and ${titleCase(side)}${extraText}, finished with ${titleCase(flavor)}. CookLikeMe recommends ${seasoningText} to keep the plate flavorful without making seasoning another thing you have to build.`
    : `${titleCase(protein)} with ${titleCase(base)} and ${titleCase(side)}${extraText}, finished with ${titleCase(flavor)}. CookLikeMe recommends ${seasoningText} to bring the whole plate together.`;

  const ingredients = [protein, base, side, flavor, ...extras];
  const instructions = [
    `Season the ${protein} with ${seasonings.join(", ")}.`,
    `Cook the ${protein} until browned and fully cooked.`,
    `Prepare the ${base} while the protein cooks.`,
    `Cook or warm the ${side}.`
  ];

  if (extras.length) instructions.push(`Prepare the ${extras.join(", ")} and add them to the plate.`);
  instructions.push(`Finish the ${protein} or plate with ${flavor}.`);
  instructions.push("Taste, adjust if needed, then serve everything together while hot.");

  return {
    id: "custom-" + Date.now(),
    mode: builderMode,
    title: createPlateTitle(protein, base, flavor),
    category: "Custom Plate",
    tags: [builderMode === "healthy" ? "Healthy" : "Custom"],
    time: builderMode === "healthy" ? "25–35 min" : "30–40 min",
    difficulty: "Easy",
    coreIngredients: [protein, base, side],
    flavorIngredients: [flavor],
    recommendedSeasonings: seasonings,
    optionalIngredients: extras,
    ingredients,
    description,
    instructions
  };
}

function renderGeneratedPlate(plate) {
  generatedTitle.textContent = plate.title;
  generatedDescription.textContent = plate.description;
  generatedMeta.innerHTML = `<span>${plate.time}</span><span>${plate.difficulty}</span><span>${plate.mode === "healthy" ? "Healthy" : "Regular"}</span>`;

  generatedIngredients.innerHTML = plate.ingredients
    .map(item => `<li>${titleCase(item)}</li>`)
    .join("");

  const seasoningItem = document.createElement("li");
  seasoningItem.innerHTML = `<strong>CookLikeMe seasoning:</strong> ${plate.recommendedSeasonings.map(titleCase).join(", ")}`;
  generatedIngredients.appendChild(seasoningItem);

  generatedInstructions.innerHTML = plate.instructions
    .map(step => `<li>${step}</li>`)
    .join("");
}

function generatePlate() {
  const required = [plateSelections.protein, plateSelections.base, plateSelections.side, plateSelections.flavor];
  if (required.some(item => !item)) {
    alert("Pick a protein, base, side and flavor first.");
    return;
  }

  currentGeneratedPlate = createPlate();
  renderGeneratedPlate(currentGeneratedPlate);
  generatedSection.classList.remove("hidden");
  generatedSection.scrollIntoView({ behavior: "smooth" });
}

function resetBuilder() {
  plateSelections = { protein: "", base: "", side: "", extras: [], flavor: "" };
  currentGeneratedPlate = null;
  generatedSection.classList.add("hidden");
  renderBuilder();
  renderPlatePreview();
}

function savePlate() {
  if (!currentGeneratedPlate) return;
  const saved = JSON.parse(localStorage.getItem("cookLikeMe_savedRecipes") || "[]");
  if (!saved.some(item => item.id === currentGeneratedPlate.id)) saved.push(currentGeneratedPlate);
  localStorage.setItem("cookLikeMe_savedRecipes", JSON.stringify(saved));
  savePlateBtn.textContent = "Saved ✓";
}

function addPlateToGrocery() {
  if (!currentGeneratedPlate) return;
  const existing = JSON.parse(localStorage.getItem("cookLikeMe_groceryList") || "[]");
  const additions = [...currentGeneratedPlate.ingredients, ...currentGeneratedPlate.recommendedSeasonings];
  additions.forEach(item => {
    if (!existing.some(saved => String(saved).toLowerCase() === String(item).toLowerCase())) existing.push(item);
  });
  localStorage.setItem("cookLikeMe_groceryList", JSON.stringify(existing));
  addPlateToGroceryBtn.textContent = "Added ✓";
}

builderModeTabs.addEventListener("click", event => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  builderMode = button.dataset.mode;
  builderModeTabs.querySelectorAll("[data-mode]").forEach(tab => tab.classList.toggle("active", tab === button));
  resetBuilder();
});

generatePlateBtn.addEventListener("click", generatePlate);
resetBuilderBtn.addEventListener("click", resetBuilder);
savePlateBtn.addEventListener("click", savePlate);
addPlateToGroceryBtn.addEventListener("click", addPlateToGrocery);
buildAnotherBtn.addEventListener("click", () => {
  resetBuilder();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderBuilder();
renderPlatePreview();