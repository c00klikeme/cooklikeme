const ingredientData =
  window.COOKLIKEME_INGREDIENTS;

const recipes =
  window.COOKLIKEME_RECIPES;


/* =====================================================
   STATE
===================================================== */

let selectedIngredients =
  JSON.parse(
    localStorage.getItem(
      "cookLikeMe_selectedIngredients"
    )
  ) || [];

let activeMode =
  "regular";

let currentSmartPlate =
  null;


/* =====================================================
   DOM
===================================================== */

const modeTabs =
  document.getElementById("modeTabs");

const ingredientGroupsEl =
  document.getElementById("ingredientGroups");

const selectedIngredientsEl =
  document.getElementById("selectedIngredients");

const selectedCount =
  document.getElementById("selectedCount");

const customIngredientInput =
  document.getElementById("customIngredientInput");

const addCustomIngredientBtn =
  document.getElementById("addCustomIngredientBtn");

const clearIngredientsBtn =
  document.getElementById("clearIngredientsBtn");

const findMealsBtn =
  document.getElementById("findMealsBtn");

const surpriseBtn =
  document.getElementById("surpriseBtn");

const bestMatchEl =
  document.getElementById("bestMatch");

const resultsGrid =
  document.getElementById("resultsGrid");

const resultCount =
  document.getElementById("resultCount");

const recipeModal =
  document.getElementById("recipeModal");

const recipeModalBackdrop =
  document.getElementById("recipeModalBackdrop");

const recipeModalContent =
  document.getElementById("recipeModalContent");

const closeRecipeModal =
  document.getElementById("closeRecipeModal");


/* LIVE READOUT */

const kitchenReadoutTitle =
  document.getElementById("kitchenReadoutTitle");

const comboStrength =
  document.getElementById("comboStrength");

const readoutProtein =
  document.getElementById("readoutProtein");

const readoutBase =
  document.getElementById("readoutBase");

const readoutSide =
  document.getElementById("readoutSide");

const readoutFlavor =
  document.getElementById("readoutFlavor");

const kitchenReadoutMessage =
  document.getElementById("kitchenReadoutMessage");


/* =====================================================
   HELPERS
===================================================== */

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}


function titleCase(value) {
  return String(value || "")
    .split(" ")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}


function saveSelectedIngredients() {
  localStorage.setItem(
    "cookLikeMe_selectedIngredients",
    JSON.stringify(selectedIngredients)
  );
}


/* =====================================================
   INGREDIENT FAMILIES
===================================================== */

const INGREDIENT_FAMILIES = [

  [
    "chicken",
    "chicken breast",
    "chicken thighs",
    "chicken wings",
    "wings",
    "fried chicken",
    "ground chicken"
  ],

  [
    "turkey",
    "ground turkey",
    "turkey sausage"
  ],

  [
    "beef",
    "ground beef",
    "steak",
    "lean steak",
    "beef strips",
    "chuck roast",
    "short ribs"
  ],

  [
    "pork",
    "pork chops",
    "pork tenderloin",
    "pulled pork"
  ],

  [
    "sausage",
    "italian sausage",
    "smoked sausage"
  ],

  [
    "fish",
    "tilapia",
    "cod",
    "catfish"
  ],

  [
    "rice",
    "white rice",
    "yellow rice",
    "brown rice",
    "jasmine rice",
    "basmati rice",
    "rice and peas"
  ],

  [
    "pasta",
    "spaghetti",
    "penne",
    "fettuccine",
    "linguine",
    "ziti",
    "macaroni",
    "whole wheat pasta",
    "egg noodles"
  ],

  [
    "potatoes",
    "red potatoes",
    "roasted potatoes",
    "mashed potatoes"
  ],

  [
    "tortilla",
    "flour tortilla",
    "corn tortilla",
    "whole wheat tortilla",
    "wrap"
  ]

];


function sameIngredientFamily(first, second) {

  const a = normalize(first);
  const b = normalize(second);

  if (a === b) {
    return true;
  }

  return INGREDIENT_FAMILIES.some(
    family =>
      family.includes(a) &&
      family.includes(b)
  );
}


function userHasIngredient(ingredient) {

  return selectedIngredients.some(
    selected =>
      sameIngredientFamily(
        selected,
        ingredient
      )
  );
}


/* =====================================================
   INGREDIENT ROLES
===================================================== */

const PROTEINS = new Set([
  "chicken",
  "chicken breast",
  "chicken thighs",
  "chicken wings",
  "wings",
  "fried chicken",
  "ground chicken",
  "turkey",
  "ground turkey",
  "turkey sausage",
  "ground beef",
  "steak",
  "lean steak",
  "beef strips",
  "chuck roast",
  "short ribs",
  "pork chops",
  "pork tenderloin",
  "pulled pork",
  "bacon",
  "sausage",
  "italian sausage",
  "smoked sausage",
  "lamb chops",
  "shrimp",
  "salmon",
  "fish",
  "tilapia",
  "cod",
  "catfish",
  "tuna",
  "crab",
  "crab meat",
  "scallops",
  "eggs",
  "egg whites",
  "tofu"
]);


const BASES = new Set([
  "rice",
  "white rice",
  "yellow rice",
  "brown rice",
  "jasmine rice",
  "basmati rice",
  "rice and peas",
  "pasta",
  "spaghetti",
  "penne",
  "fettuccine",
  "linguine",
  "ziti",
  "macaroni",
  "egg noodles",
  "whole wheat pasta",
  "potatoes",
  "red potatoes",
  "sweet potato",
  "roasted potatoes",
  "mashed potatoes",
  "fries",
  "sweet potato fries",
  "grits",
  "quinoa",
  "beans",
  "black beans",
  "kidney beans",
  "red beans",
  "chickpeas",
  "plantain",
  "bread",
  "white bread",
  "wheat bread",
  "brioche",
  "rolls",
  "tortilla",
  "flour tortilla",
  "corn tortilla",
  "whole wheat tortilla",
  "wrap",
  "oats"
]);


const SEASONINGS = new Set([
  "salt",
  "sea salt",
  "black pepper",
  "white pepper",
  "garlic powder",
  "onion powder",
  "paprika",
  "smoked paprika",
  "cajun seasoning",
  "creole seasoning",
  "old bay",
  "seasoned salt",
  "adobo",
  "sazon",
  "lemon pepper",
  "italian seasoning",
  "oregano",
  "basil seasoning",
  "parsley seasoning",
  "rosemary seasoning",
  "thyme seasoning",
  "red pepper flakes",
  "cayenne pepper",
  "chili powder",
  "cumin",
  "curry powder",
  "caribbean curry powder",
  "jerk seasoning",
  "allspice",
  "brown sugar",
  "cinnamon",
  "nutmeg"
]);


const STRONG_FLAVORS = new Set([
  "gravy",
  "brown gravy",
  "chicken gravy",
  "hot sauce",
  "buffalo sauce",
  "bbq sauce",
  "soy sauce",
  "low sodium soy sauce",
  "teriyaki sauce",
  "worcestershire sauce",
  "alfredo sauce",
  "tomato sauce",
  "marinara",
  "garlic butter",
  "honey garlic sauce",
  "jerk sauce",
  "brown stew sauce",
  "coconut milk",
  "coconut cream",
  "ranch",
  "lime",
  "lime juice",
  "lemon",
  "lemon juice"
]);


function getIngredientRole(ingredient) {

  const clean =
    normalize(ingredient);

  if (PROTEINS.has(clean)) {
    return "protein";
  }

  if (BASES.has(clean)) {
    return "base";
  }

  if (STRONG_FLAVORS.has(clean)) {
    return "flavor";
  }

  if (SEASONINGS.has(clean)) {
    return "seasoning";
  }

  return "support";
}


/* =====================================================
   LIVE KITCHEN READOUT
===================================================== */

function getSelectedByRole(role) {

  return selectedIngredients.filter(
    ingredient =>
      getIngredientRole(ingredient) === role
  );
}


function getFirstSelectedByRole(role) {

  const values =
    getSelectedByRole(role);

  return values[0] || "";
}


function getBestSide() {

  const ignored =
    new Set([
      ...getSelectedByRole("protein"),
      ...getSelectedByRole("base"),
      ...getSelectedByRole("flavor"),
      ...getSelectedByRole("seasoning")
    ]);

  return selectedIngredients.find(
    item =>
      !ignored.has(item)
  ) || "";
}


function renderKitchenReadout() {

  const protein =
    getFirstSelectedByRole("protein");

  const base =
    getFirstSelectedByRole("base");

  const flavor =
    getFirstSelectedByRole("flavor");

  const side =
    getBestSide();

  const seasonings =
    getSelectedByRole("seasoning");


  readoutProtein.textContent =
    protein
      ? titleCase(protein)
      : "Not picked";


  readoutBase.textContent =
    base
      ? titleCase(base)
      : "Not picked";


  readoutSide.textContent =
    side
      ? titleCase(side)
      : "Not picked";


  readoutFlavor.textContent =
    flavor
      ? titleCase(flavor)
      : "Not picked";


  selectedCount.textContent =
    `${selectedIngredients.length} ${
      selectedIngredients.length === 1
        ? "ingredient"
        : "ingredients"
    }`;


  comboStrength.className =
    "combo-strength";


  if (
    selectedIngredients.length === 0
  ) {

    kitchenReadoutTitle.textContent =
      "Start building your combo.";

    comboStrength.textContent =
      "Waiting";

    comboStrength.classList.add(
      "neutral"
    );

    kitchenReadoutMessage.textContent =
      "Pick a protein or another main ingredient and CookLikeMe will start reading the plate.";

    return;

  }


  if (
    protein &&
    base &&
    flavor &&
    side
  ) {

    kitchenReadoutTitle.textContent =
      "This is looking like a real plate.";

    comboStrength.textContent =
      "Strong Combo";

    comboStrength.classList.add(
      "strong"
    );

    kitchenReadoutMessage.textContent =
      `${titleCase(protein)} + ${titleCase(base)} + ${titleCase(side)} + ${titleCase(flavor)} gives CookLikeMe plenty to work with. Hit Find My Best Move.`;

    return;

  }


  if (
    protein &&
    base &&
    (flavor || side)
  ) {

    kitchenReadoutTitle.textContent =
      "You’ve got the bones of a good meal.";

    comboStrength.textContent =
      "Good Combo";

    comboStrength.classList.add(
      "good"
    );

    kitchenReadoutMessage.textContent =
      flavor
        ? `${titleCase(protein)} and ${titleCase(base)} already make sense together, and ${titleCase(flavor)} gives the plate a direction.`
        : `${titleCase(protein)} and ${titleCase(base)} give you a strong starting point. Add a sauce or seasoning if you want a more specific idea.`;

    return;

  }


  if (
    protein &&
    (base || flavor)
  ) {

    kitchenReadoutTitle.textContent =
      "CookLikeMe is starting to see the move.";

    comboStrength.textContent =
      "Getting There";

    comboStrength.classList.add(
      "good"
    );

    kitchenReadoutMessage.textContent =
      base
        ? `${titleCase(protein)} + ${titleCase(base)} works. Add a side, sauce, or more flavor and the recommendation will get sharper.`
        : `${titleCase(protein)} with ${titleCase(flavor)} already gives the meal a direction. Add a base or side to round it out.`;

    return;

  }


  if (protein) {

    kitchenReadoutTitle.textContent =
      `${titleCase(protein)} is the main move.`;

    comboStrength.textContent =
      "Needs More";

    comboStrength.classList.add(
      "weak"
    );

    kitchenReadoutMessage.textContent =
      "Now add a base, side, sauce, or flavor so CookLikeMe can build something around it.";

    return;

  }


  if (
    base &&
    !protein
  ) {

    kitchenReadoutTitle.textContent =
      `${titleCase(base)} is a start.`;

    comboStrength.textContent =
      "Needs Protein";

    comboStrength.classList.add(
      "weak"
    );

    kitchenReadoutMessage.textContent =
      "Add a protein or main ingredient so CookLikeMe knows what kind of plate you’re actually building.";

    return;

  }


  if (
    seasonings.length &&
    !protein &&
    !base
  ) {

    kitchenReadoutTitle.textContent =
      "You’ve got flavor, but no meal yet.";

    comboStrength.textContent =
      "Needs Main Food";

    comboStrength.classList.add(
      "weak"
    );

    kitchenReadoutMessage.textContent =
      "Seasonings help finish a meal, but pick a protein, base, fruit, or other main ingredient first.";

    return;

  }


  kitchenReadoutTitle.textContent =
    "Keep going.";

  comboStrength.textContent =
    "Needs More";

  comboStrength.classList.add(
    "weak"
  );

  kitchenReadoutMessage.textContent =
    "Add another main ingredient and CookLikeMe will start connecting the dots.";
}


/* =====================================================
   URL MODE
===================================================== */

function getModeFromURL() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const mode =
    params.get("mode");

  const validModes = [
    "regular",
    "healthy",
    "shakes",
    "drinks",
    "desserts"
  ];

  if (
    mode &&
    validModes.includes(mode)
  ) {
    activeMode = mode;
  }
}


function setActiveMode(mode) {

  activeMode = mode;

  document
    .querySelectorAll(".mode-tab")
    .forEach(
      tab => {
        tab.classList.toggle(
          "active",
          tab.dataset.mode === mode
        );
      }
    );

  renderIngredientGroups();
  renderResultsEmpty();
  renderKitchenReadout();
}


/* =====================================================
   INGREDIENT PICKER
===================================================== */

function renderIngredientGroups() {

  ingredientGroupsEl.innerHTML = "";

  const groups =
    ingredientData[activeMode];

  Object.entries(groups)
    .forEach(
      ([groupName, ingredients]) => {

        const group =
          document.createElement("section");

        group.className =
          "ingredient-group";

        const title =
          document.createElement("h3");

        title.textContent =
          groupName;

        const wrap =
          document.createElement("div");

        wrap.className =
          "ingredient-buttons";

        ingredients.forEach(
          ingredient => {

            const button =
              document.createElement("button");

            button.className =
              "ingredient-btn";

            button.textContent =
              ingredient;

            button.classList.toggle(
              "active",
              selectedIngredients.includes(
                normalize(ingredient)
              )
            );

            button.addEventListener(
              "click",
              () => {
                toggleIngredient(
                  ingredient
                );
              }
            );

            wrap.appendChild(
              button
            );

          }
        );

        group.appendChild(title);
        group.appendChild(wrap);

        ingredientGroupsEl.appendChild(
          group
        );

      }
    );
}


function renderSelectedIngredients() {

  selectedIngredientsEl.innerHTML = "";

  if (
    selectedIngredients.length === 0
  ) {

    selectedIngredientsEl.innerHTML = `
      <span class="selected-empty">
        Nothing selected yet.
      </span>
    `;

    return;
  }

  selectedIngredients.forEach(
    ingredient => {

      const tag =
        document.createElement("span");

      tag.className =
        "selected-tag";

      tag.innerHTML = `
        ${ingredient}

        <button
          type="button"
          aria-label="Remove ${ingredient}"
        >
          ×
        </button>
      `;

      tag
        .querySelector("button")
        .addEventListener(
          "click",
          () => {
            removeIngredient(
              ingredient
            );
          }
        );

      selectedIngredientsEl.appendChild(
        tag
      );

    }
  );
}


function refreshIngredientUI() {

  saveSelectedIngredients();

  renderIngredientGroups();

  renderSelectedIngredients();

  renderKitchenReadout();
}


function toggleIngredient(
  ingredient
) {

  const clean =
    normalize(ingredient);

  if (
    selectedIngredients.includes(clean)
  ) {

    selectedIngredients =
      selectedIngredients.filter(
        item =>
          item !== clean
      );

  }

  else {

    selectedIngredients.push(clean);

  }

  refreshIngredientUI();
}


function removeIngredient(
  ingredient
) {

  selectedIngredients =
    selectedIngredients.filter(
      item =>
        item !==
        normalize(ingredient)
    );

  refreshIngredientUI();
}


function addCustomIngredient() {

  const value =
    normalize(
      customIngredientInput.value
    );

  if (!value) {
    return;
  }

  if (
    !selectedIngredients.includes(value)
  ) {
    selectedIngredients.push(value);
  }

  customIngredientInput.value = "";

  refreshIngredientUI();
}


/* =====================================================
   RECIPE MODE
===================================================== */

function getRecipesForMode() {

  return recipes.filter(
    recipe =>
      recipe.mode === activeMode
  );
}


/* =====================================================
   MATCHING
===================================================== */

function scoreRecipe(recipe) {

  const core =
    recipe.coreIngredients || [];

  const flavor =
    recipe.flavorIngredients || [];

  const optional =
    recipe.optionalIngredients || [];


  let score = 0;

  let matchedProtein = [];
  let missingProtein = [];

  let matchedBase = [];
  let missingBase = [];

  let matchedFlavor = [];
  let missingFlavor = [];

  let matchedSupport = [];
  let missingSupport = [];

  let matchedSeasoning = [];
  let missingSeasoning = [];


  core.forEach(
    ingredient => {

      const role =
        getIngredientRole(ingredient);

      const matched =
        userHasIngredient(ingredient);


      if (
        role === "protein"
      ) {

        if (matched) {
          score += 35;
          matchedProtein.push(ingredient);
        }

        else {
          score -= 55;
          missingProtein.push(ingredient);
        }

      }


      else if (
        role === "base"
      ) {

        if (matched) {
          score += 18;
          matchedBase.push(ingredient);
        }

        else {
          score -= 15;
          missingBase.push(ingredient);
        }

      }


      else if (
        role === "flavor"
      ) {

        if (matched) {
          score += 14;
          matchedFlavor.push(ingredient);
        }

        else {
          score -= 5;
          missingFlavor.push(ingredient);
        }

      }


      else if (
        role === "seasoning"
      ) {

        if (matched) {
          score += 3;
          matchedSeasoning.push(ingredient);
        }

        else {
          score -= 0.5;
          missingSeasoning.push(ingredient);
        }

      }


      else {

        if (matched) {
          score += 9;
          matchedSupport.push(ingredient);
        }

        else {
          score -= 4;
          missingSupport.push(ingredient);
        }

      }

    }
  );


  flavor.forEach(
    ingredient => {

      const role =
        getIngredientRole(ingredient);

      const matched =
        userHasIngredient(ingredient);


      if (
        role === "seasoning"
      ) {

        if (matched) {
          score += 2;
          matchedSeasoning.push(ingredient);
        }

        else {
          missingSeasoning.push(ingredient);
        }

      }

      else {

        if (matched) {
          score += 8;
          matchedFlavor.push(ingredient);
        }

        else {
          score -= 1;
          missingFlavor.push(ingredient);
        }

      }

    }
  );


  optional.forEach(
    ingredient => {

      if (
        userHasIngredient(ingredient)
      ) {
        score += 2;
      }

    }
  );


  if (
    matchedProtein.length &&
    matchedBase.length
  ) {
    score += 20;
  }


  if (
    matchedProtein.length &&
    matchedFlavor.length
  ) {
    score += 12;
  }


  if (
    missingProtein.length > 0 &&
    matchedProtein.length === 0
  ) {
    score -= 45;
  }


  let label =
    "Possible Idea";

  let explanation =
    "Some of what you have can work here.";


  const importantMissing = [
    ...missingProtein,
    ...missingBase,
    ...missingSupport
  ];


  if (
    missingProtein.length === 0 &&
    missingBase.length === 0 &&
    importantMissing.length === 0
  ) {

    label =
      "🔥 Damn Good Match";

    explanation =
      "You’ve got the important parts of this meal already.";

    score += 25;
  }


  else if (
    missingProtein.length === 0 &&
    missingBase.length === 0
  ) {

    label =
      "🔥 Strong Match";

    explanation =
      "Your protein and base are lined up. The rest is mostly flavor or extras.";

    score += 18;
  }


  else if (
    missingProtein.length === 0 &&
    missingBase.length <= 1
  ) {

    label =
      "Almost There";

    explanation =
      "You’ve got the main protein. You’re close to making this work.";

    score += 8;
  }


  else if (
    matchedProtein.length === 0 &&
    missingProtein.length > 0
  ) {

    label =
      "Weak Match";

    explanation =
      `You’re missing the main protein: ${missingProtein.join(", ")}.`;
  }


  return {
    score,
    label,
    explanation,
    matchedProtein,
    missingProtein,
    matchedBase,
    missingBase,
    matchedFlavor,
    missingFlavor,
    matchedSupport,
    missingSupport,
    matchedSeasoning,
    missingSeasoning
  };
}


/* =====================================================
   SMART PLATE
===================================================== */

function chooseBestProtein() {
  return getFirstSelectedByRole("protein");
}


function chooseBestBase() {

  const bases =
    getSelectedByRole("base");

  const preferred =
    bases.find(
      item =>
        item !== "rice" &&
        item !== "pasta"
    );

  return preferred ||
    bases[0] ||
    "";
}


function chooseBestFlavor() {
  return getFirstSelectedByRole("flavor");
}


function chooseBestSide() {
  return getBestSide();
}


function getSelectedSeasonings() {
  return getSelectedByRole("seasoning");
}


function generateSmartPlate() {

  if (
    activeMode !== "regular" &&
    activeMode !== "healthy"
  ) {
    return null;
  }

  const protein =
    chooseBestProtein();

  const base =
    chooseBestBase();

  const flavor =
    chooseBestFlavor();

  const side =
    chooseBestSide();

  const seasonings =
    getSelectedSeasonings();


  if (!protein) {
    return null;
  }


  if (
    !base &&
    !flavor &&
    !side
  ) {
    return null;
  }


  const title =
    createSmartPlateTitle({
      protein,
      base,
      flavor,
      side
    });


  const description =
    createSmartPlateDescription({
      protein,
      base,
      flavor,
      side,
      seasonings
    });


  const ingredients = [
    protein,
    base,
    side,
    flavor,
    ...seasonings
  ]
    .filter(Boolean);


  return {

    id:
      "smart-" +
      Date.now(),

    mode:
      activeMode,

    category:
      "CookLikeMe Smart Plate",

    tags: [
      "Smart Plate",
      activeMode === "healthy"
        ? "Healthy"
        : "CookLikeMe Pick"
    ],

    title,

    time:
      "25–40 min",

    prepTime:
      "10 min",

    cookTime:
      "20–30 min",

    servings:
      2,

    difficulty:
      "Easy",

    ingredients:
      ingredients.map(
        item => ({
          item,
          amount:
            "Use what you have"
        })
      ),

    coreIngredients: [
      protein,
      base,
      side
    ]
      .filter(Boolean),

    flavorIngredients: [
      flavor,
      ...seasonings
    ]
      .filter(Boolean),

    optionalIngredients:
      [],

    description,

    instructions:
      createSmartInstructions({
        protein,
        base,
        flavor,
        side,
        seasonings
      }),

    isSmartPlate:
      true
  };
}


/* =====================================================
   SMART TITLES
===================================================== */

function createSmartPlateTitle({
  protein,
  base,
  flavor,
  side
}) {

  const p =
    titleCase(protein);

  const b =
    titleCase(base);

  const s =
    titleCase(side);


  if (
    flavor ===
    "honey garlic sauce"
  ) {

    if (base && side) {
      return `Honey Garlic ${p} with ${b} & ${s}`;
    }

    if (base) {
      return `Honey Garlic ${p} with ${b}`;
    }

    return `Honey Garlic ${p}`;
  }


  if (
    flavor ===
    "buffalo sauce"
  ) {

    return base
      ? `Buffalo ${p} with ${b}`
      : `Buffalo ${p}`;
  }


  if (
    flavor ===
    "garlic butter"
  ) {

    return base
      ? `Garlic Butter ${p} with ${b}`
      : `Garlic Butter ${p}`;
  }


  if (
    flavor ===
    "jerk sauce"
  ) {

    return base
      ? `Jerk ${p} with ${b}`
      : `Jerk ${p} Plate`;
  }


  if (
    flavor ===
    "brown stew sauce"
  ) {

    return `Brown Stew ${p} Plate`;
  }


  if (
    flavor ===
    "alfredo sauce"
  ) {

    return `Creamy ${p} Alfredo`;
  }


  if (
    flavor ===
    "bbq sauce"
  ) {

    return base
      ? `BBQ ${p} with ${b}`
      : `BBQ ${p}`;
  }


  if (
    base &&
    side
  ) {

    return `${p} with ${b} & ${s}`;
  }


  if (base) {
    return `${p} with ${b}`;
  }


  if (side) {
    return `${p} with ${s}`;
  }


  return `${p} Plate`;
}


/* =====================================================
   SMART DESCRIPTION
===================================================== */

function createSmartPlateDescription({
  protein,
  base,
  flavor,
  side,
  seasonings
}) {

  const seasoningText =
    seasonings.length
      ? seasonings
          .slice(0, 3)
          .map(titleCase)
          .join(", ")
      : "your favorite seasonings";


  let description =
    `${titleCase(protein)} seasoned with ${seasoningText}`;


  if (flavor) {
    description +=
      ` and finished with ${titleCase(flavor)}`;
  }


  if (base) {
    description +=
      `, served with ${titleCase(base)}`;
  }


  if (side) {
    description +=
      ` and ${titleCase(side)}`;
  }


  description +=
    ". This is the kind of plate your ingredients were asking for.";


  return description;
}


/* =====================================================
   SMART INSTRUCTIONS
===================================================== */

function createSmartInstructions({
  protein,
  base,
  flavor,
  side,
  seasonings
}) {

  const steps = [];


  if (
    seasonings.length
  ) {

    steps.push(
      `Season the ${protein} with ${seasonings
        .slice(0, 4)
        .join(", ")}.`
    );
  }

  else {

    steps.push(
      `Season the ${protein} well with what you have.`
    );
  }


  steps.push(
    `Cook the ${protein} until browned and fully cooked.`
  );


  if (flavor) {

    steps.push(
      `Add or toss the ${protein} with ${flavor} near the end so the flavor stays bold.`
    );
  }


  if (base) {

    steps.push(
      `Prepare the ${base} while the ${protein} cooks.`
    );
  }


  if (side) {

    steps.push(
      `Cook the ${side} separately and season it so it belongs on the same plate.`
    );
  }


  steps.push(
    "Plate everything hot and adjust the seasoning or sauce to taste."
  );


  return steps;
}


/* =====================================================
   FIND MEALS
===================================================== */

function findMeals() {

  const modeRecipes =
    getRecipesForMode();


  if (
    selectedIngredients.length === 0
  ) {

    bestMatchEl.innerHTML = `
      <div class="finder-empty">
        Pick a few ingredients first.
        CookLikeMe will figure out the strongest move.
      </div>
    `;

    resultsGrid.innerHTML = `
      <div class="finder-empty">
        Your ideas will show up here.
      </div>
    `;

    resultCount.textContent =
      "0 results";

    return;
  }


  const scored =
    modeRecipes
      .map(
        recipe => ({
          recipe,
          match:
            scoreRecipe(recipe)
        })
      )

      .filter(
        item =>
          item.match.score > 0
      )

      .sort(
        (a, b) =>
          b.match.score -
          a.match.score
      );


  currentSmartPlate =
    generateSmartPlate();


  const strongestRecipe =
    scored[0] || null;


  let useSmartPlate =
    false;


  if (
    currentSmartPlate
  ) {

    if (!strongestRecipe) {
      useSmartPlate = true;
    }

    else if (
      strongestRecipe.match
        .missingProtein.length > 0
    ) {
      useSmartPlate = true;
    }

    else if (
      strongestRecipe.match.score < 45
    ) {
      useSmartPlate = true;
    }

  }


  if (
    useSmartPlate
  ) {

    renderSmartPlate(
      currentSmartPlate
    );
  }

  else if (
    strongestRecipe
  ) {

    renderBestMatch(
      strongestRecipe
    );
  }

  else {

    bestMatchEl.innerHTML = `
      <div class="finder-empty">
        I don’t have a strong enough idea yet.
        Add a protein, base, sauce, or side and try again.
      </div>
    `;
  }


  renderResults(
    scored
  );


  document
    .getElementById(
      "resultsSection"
    )
    .scrollIntoView({
      behavior: "smooth"
    });
}


/* =====================================================
   SMART RESULT
===================================================== */

function renderSmartPlate(
  plate
) {

  bestMatchEl.innerHTML = `

    <article class="best-match-card">

      <div class="recipe-topline">

        <span class="match-label">
          🔥 COOKLIKEME PICK
        </span>

        <span class="mode-label">
          ${formatMode(plate.mode)}
        </span>

      </div>


      <h3>
        ${plate.title}
      </h3>


      <p>
        ${plate.description}
      </p>


      <div class="recipe-meta">

        <span class="meta-pill">
          Smart Plate
        </span>

        <span class="meta-pill">
          ${plate.time}
        </span>

        <span class="meta-pill">
          ${plate.difficulty}
        </span>

        <span class="meta-pill good">
          Built from what you have
        </span>

      </div>


      <p class="missing-line">

        <strong>
          Why this is the move:
        </strong>

        Your ingredients already make a real plate.
        CookLikeMe isn’t forcing them into some random recipe.

      </p>


      <div class="recipe-actions">

        <button
          class="recipe-action-btn primary"
          id="smartViewRecipe"
        >
          View Plate
        </button>

        <button
          class="recipe-action-btn"
          id="smartSaveRecipe"
        >
          Save ♥
        </button>

      </div>

    </article>

  `;


  document
    .getElementById(
      "smartViewRecipe"
    )
    .addEventListener(
      "click",
      () => {
        openRecipeModal(
          plate
        );
      }
    );


  document
    .getElementById(
      "smartSaveRecipe"
    )
    .addEventListener(
      "click",
      () => {
        saveRecipe(
          plate
        );
      }
    );
}


/* =====================================================
   DATABASE BEST MATCH
===================================================== */

function renderBestMatch(
  item
) {

  const {
    recipe,
    match
  } = item;


  const importantMissing = [
    ...match.missingProtein,
    ...match.missingBase,
    ...match.missingSupport
  ];


  let missingText = "";


  if (
    importantMissing.length === 0 &&
    match.missingSeasoning.length > 0
  ) {

    missingText =
      `Only missing seasoning or flavor extras: ${match.missingSeasoning
        .slice(0, 4)
        .join(", ")}.`;
  }

  else if (
    importantMissing.length > 0
  ) {

    missingText =
      `Missing: ${importantMissing.join(", ")}`;
  }

  else {

    missingText =
      "You’ve got what matters.";
  }


  bestMatchEl.innerHTML = `

    <article class="best-match-card">

      <div class="recipe-topline">

        <span class="match-label">
          ${match.label}
        </span>

        <span class="mode-label">
          ${formatMode(recipe.mode)}
        </span>

      </div>


      <h3>
        ${recipe.title}
      </h3>


      <p>
        ${recipe.description}
      </p>


      <div class="recipe-meta">

        <span class="meta-pill">
          ${recipe.category}
        </span>

        <span class="meta-pill">
          ${recipe.time}
        </span>

        <span class="meta-pill">
          ${recipe.difficulty}
        </span>

        ${recipe.tags
          .map(
            tag => `
              <span class="meta-pill">
                ${tag}
              </span>
            `
          )
          .join("")
        }

      </div>


      <p class="missing-line">

        <strong>
          Why this works:
        </strong>

        ${match.explanation}

      </p>


      <p class="missing-line">
        ${missingText}
      </p>


      <div class="recipe-actions">

        <button
          class="recipe-action-btn primary"
          id="bestViewRecipe"
        >
          View Recipe
        </button>

        <button
          class="recipe-action-btn"
          id="bestSaveRecipe"
        >
          Save ♥
        </button>

      </div>

    </article>

  `;


  document
    .getElementById(
      "bestViewRecipe"
    )
    .addEventListener(
      "click",
      () => {
        openRecipeModal(
          recipe
        );
      }
    );


  document
    .getElementById(
      "bestSaveRecipe"
    )
    .addEventListener(
      "click",
      () => {
        saveRecipe(
          recipe
        );
      }
    );
}


/* =====================================================
   OTHER RESULTS
===================================================== */

function renderResults(
  scoredRecipes
) {

  resultsGrid.innerHTML = "";


  const visible =
    scoredRecipes
      .filter(
        item =>
          item.match.score >= 10 &&
          item.match.missingProtein.length === 0
      )
      .slice(
        0,
        12
      );


  resultCount.textContent =
    `${visible.length} ${
      visible.length === 1
        ? "result"
        : "results"
    }`;


  if (
    visible.length === 0
  ) {

    resultsGrid.innerHTML = `
      <div class="finder-empty">
        No other strong recipe matches yet.
        The CookLikeMe Pick above may still be the move.
      </div>
    `;

    return;
  }


  visible.forEach(
    item => {

      const {
        recipe,
        match
      } = item;


      const card =
        document.createElement(
          "article"
        );


      card.className =
        "recipe-card";


      const importantMissing = [
        ...match.missingBase,
        ...match.missingSupport
      ];


      let missingText = "";


      if (
        importantMissing.length === 0
      ) {

        missingText =
          "You’ve got the important stuff.";
      }

      else {

        missingText =
          `Missing: ${importantMissing.join(", ")}`;
      }


      card.innerHTML = `

        <div class="recipe-topline">

          <span class="match-label">
            ${match.label}
          </span>

          <span class="mode-label">
            ${formatMode(recipe.mode)}
          </span>

        </div>


        <h3>
          ${recipe.title}
        </h3>


        <p>
          ${recipe.description}
        </p>


        <div class="recipe-meta">

          <span class="meta-pill">
            ${recipe.time}
          </span>

          <span class="meta-pill">
            ${recipe.difficulty}
          </span>

          ${
            match.missingBase.length === 0
              ? `
                <span class="meta-pill good">
                  Main combo works
                </span>
              `
              : `
                <span class="meta-pill warning">
                  Close idea
                </span>
              `
          }

        </div>


        <p class="missing-line">
          ${missingText}
        </p>


        <div class="recipe-actions">

          <button
            class="recipe-action-btn primary view-recipe"
          >
            View Recipe
          </button>

          <button
            class="recipe-action-btn save-recipe"
          >
            Save ♥
          </button>

        </div>

      `;


      card
        .querySelector(
          ".view-recipe"
        )
        .addEventListener(
          "click",
          () => {
            openRecipeModal(
              recipe
            );
          }
        );


      card
        .querySelector(
          ".save-recipe"
        )
        .addEventListener(
          "click",
          () => {
            saveRecipe(
              recipe
            );
          }
        );


      resultsGrid.appendChild(
        card
      );

    }
  );
}


/* =====================================================
   EMPTY RESULTS
===================================================== */

function renderResultsEmpty() {

  bestMatchEl.innerHTML = `
    <div class="finder-empty">
      Pick ingredients and hit
      <strong>Find My Best Move</strong>
      when the combo starts looking good.
    </div>
  `;


  resultsGrid.innerHTML = `
    <div class="finder-empty">
      Other ideas for
      <strong>${formatMode(activeMode)}</strong>
      will show here.
    </div>
  `;


  resultCount.textContent =
    "0 results";
}


/* =====================================================
   MODE LABELS
===================================================== */

function formatMode(mode) {

  const labels = {
    regular: "Food",
    healthy: "Healthy",
    shakes: "Shakes & Smoothies",
    drinks: "Drinks",
    desserts: "Desserts"
  };

  return labels[mode] || mode;
}


/* =====================================================
   SURPRISE
===================================================== */

function surpriseMe() {

  const modeRecipes =
    getRecipesForMode();

  if (
    modeRecipes.length === 0
  ) {
    return;
  }

  const recipe =
    modeRecipes[
      Math.floor(
        Math.random() *
        modeRecipes.length
      )
    ];

  openRecipeModal(
    recipe
  );
}


/* =====================================================
   SAVED
===================================================== */

function getSavedRecipes() {

  return JSON.parse(
    localStorage.getItem(
      "cookLikeMe_favorites"
    )
  ) || [];
}


function saveRecipe(recipe) {

  const saved =
    getSavedRecipes();

  const alreadySaved =
    saved.some(
      item =>
        item.id === recipe.id
    );

  if (
    !alreadySaved
  ) {

    saved.push(recipe);

    localStorage.setItem(
      "cookLikeMe_favorites",
      JSON.stringify(saved)
    );

    alert(
      `${recipe.title} saved.`
    );
  }

  else {

    alert(
      `${recipe.title} is already saved.`
    );
  }
}


/* =====================================================
   MODAL
===================================================== */

function openRecipeModal(recipe) {

  const quantityIngredients =
    Array.isArray(
      recipe.ingredients
    )
      ? recipe.ingredients
      : [];


  recipeModalContent.innerHTML = `

    <p class="modal-category">
      ${formatMode(recipe.mode)}
      •
      ${recipe.category}
    </p>


    <h2>
      ${recipe.title}
    </h2>


    <p class="modal-description">
      ${recipe.description}
    </p>


    <div class="recipe-meta">

      ${
        recipe.prepTime
          ? `
            <span class="meta-pill">
              Prep ${recipe.prepTime}
            </span>
          `
          : ""
      }

      ${
        recipe.cookTime
          ? `
            <span class="meta-pill">
              Cook ${recipe.cookTime}
            </span>
          `
          : ""
      }

      ${
        recipe.servings
          ? `
            <span class="meta-pill">
              Serves ${recipe.servings}
            </span>
          `
          : ""
      }

      <span class="meta-pill">
        ${recipe.difficulty}
      </span>

      ${
        Array.isArray(recipe.tags)
          ? recipe.tags
              .map(
                tag => `
                  <span class="meta-pill">
                    ${tag}
                  </span>
                `
              )
              .join("")
          : ""
      }

    </div>


    ${
      quantityIngredients.length
        ? `
          <section class="modal-section">

            <h3>
              What You Need
            </h3>

            <ul class="modal-list">

              ${quantityIngredients
                .map(
                  ingredient => `
                    <li>
                      <strong>
                        ${ingredient.amount}
                      </strong>
                      ${titleCase(
                        ingredient.item
                      )}
                    </li>
                  `
                )
                .join("")
              }

            </ul>

          </section>
        `
        : `
          <section class="modal-section">

            <h3>
              What You Need
            </h3>

            <ul class="modal-list">

              ${[
                ...(recipe.coreIngredients || []),
                ...(recipe.flavorIngredients || []),
                ...(recipe.optionalIngredients || [])
              ]
                .map(
                  ingredient => `
                    <li>
                      ${titleCase(
                        ingredient
                      )}
                    </li>
                  `
                )
                .join("")
              }

            </ul>

          </section>
        `
    }


    <section class="modal-section">

      <h3>
        How It Comes Together
      </h3>

      <ol class="modal-list">

        ${(recipe.instructions || [])
          .map(
            step => `
              <li>
                ${step}
              </li>
            `
          )
          .join("")
        }

      </ol>

    </section>


    <div class="recipe-actions">

      <button
        id="modalSaveRecipe"
        class="recipe-action-btn primary"
      >
        Save ♥
      </button>

    </div>

  `;


  recipeModal.classList.remove(
    "hidden"
  );


  document
    .getElementById(
      "modalSaveRecipe"
    )
    .addEventListener(
      "click",
      () => {
        saveRecipe(recipe);
      }
    );
}


function closeModal() {

  recipeModal.classList.add(
    "hidden"
  );
}


/* =====================================================
   EVENTS
===================================================== */

modeTabs.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".mode-tab"
      );

    if (!button) {
      return;
    }

    setActiveMode(
      button.dataset.mode
    );
  }
);


addCustomIngredientBtn.addEventListener(
  "click",
  addCustomIngredient
);


customIngredientInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {
      addCustomIngredient();
    }
  }
);


clearIngredientsBtn.addEventListener(
  "click",
  () => {

    selectedIngredients = [];

    saveSelectedIngredients();

    renderSelectedIngredients();

    renderIngredientGroups();

    renderKitchenReadout();

    renderResultsEmpty();
  }
);


findMealsBtn.addEventListener(
  "click",
  findMeals
);


surpriseBtn.addEventListener(
  "click",
  surpriseMe
);


closeRecipeModal.addEventListener(
  "click",
  closeModal
);


recipeModalBackdrop.addEventListener(
  "click",
  closeModal
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {
      closeModal();
    }
  }
);


/* =====================================================
   START
===================================================== */

function init() {

  getModeFromURL();

  setActiveMode(
    activeMode
  );

  renderSelectedIngredients();

  renderIngredientGroups();

  renderKitchenReadout();
}


init();
