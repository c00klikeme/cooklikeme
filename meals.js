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


/* =====================================================
   BASIC HELPERS
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
    JSON.stringify(
      selectedIngredients
    )
  );

}


/* =====================================================
   INGREDIENT FAMILIES

   These let CookLikeMe understand that
   "wings" and "chicken wings" are basically
   the same main ingredient.

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


function sameIngredientFamily(
  first,
  second
) {

  const a =
    normalize(first);

  const b =
    normalize(second);


  if (a === b) {

    return true;

  }


  return INGREDIENT_FAMILIES.some(
    family =>
      family.includes(a) &&
      family.includes(b)
  );

}


function userHasIngredient(
  ingredient
) {

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


function getIngredientRole(
  ingredient
) {

  const clean =
    normalize(ingredient);


  if (
    PROTEINS.has(clean)
  ) {

    return "protein";

  }


  if (
    BASES.has(clean)
  ) {

    return "base";

  }


  if (
    STRONG_FLAVORS.has(clean)
  ) {

    return "flavor";

  }


  if (
    SEASONINGS.has(clean)
  ) {

    return "seasoning";

  }


  return "support";

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

    activeMode =
      mode;

  }

}


function setActiveMode(
  mode
) {

  activeMode =
    mode;


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

}


/* =====================================================
   INGREDIENT PICKER
===================================================== */

function renderIngredientGroups() {

  ingredientGroupsEl.innerHTML =
    "";


  const groups =
    ingredientData[activeMode];


  Object.entries(groups)
    .forEach(
      ([groupName, ingredients]) => {

        const group =
          document.createElement(
            "section"
          );


        group.className =
          "ingredient-group";


        const title =
          document.createElement(
            "h3"
          );


        title.textContent =
          groupName;


        const wrap =
          document.createElement(
            "div"
          );


        wrap.className =
          "ingredient-buttons";


        ingredients.forEach(
          ingredient => {

            const button =
              document.createElement(
                "button"
              );


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


        group.appendChild(
          title
        );


        group.appendChild(
          wrap
        );


        ingredientGroupsEl.appendChild(
          group
        );

      }
    );

}


function renderSelectedIngredients() {

  selectedIngredientsEl.innerHTML =
    "";


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
        document.createElement(
          "span"
        );


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

    selectedIngredients.push(
      clean
    );

  }


  saveSelectedIngredients();

  renderIngredientGroups();

  renderSelectedIngredients();

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


  saveSelectedIngredients();

  renderIngredientGroups();

  renderSelectedIngredients();

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

    selectedIngredients.push(
      value
    );

  }


  customIngredientInput.value =
    "";


  saveSelectedIngredients();

  renderSelectedIngredients();

  renderIngredientGroups();

}


/* =====================================================
   RECIPE MODE
===================================================== */

function getRecipesForMode() {

  return recipes.filter(
    recipe =>
      recipe.mode ===
      activeMode
  );

}


/* =====================================================
   SMART MATCHING ENGINE
===================================================== */

function scoreRecipe(
  recipe
) {

  const core =
    recipe.coreIngredients || [];


  const flavor =
    recipe.flavorIngredients || [];


  const optional =
    recipe.optionalIngredients || [];


  let score =
    0;


  let matchedProtein =
    [];


  let missingProtein =
    [];


  let matchedBase =
    [];


  let missingBase =
    [];


  let matchedFlavor =
    [];


  let missingFlavor =
    [];


  let matchedSupport =
    [];


  let missingSupport =
    [];


  let matchedSeasoning =
    [];


  let missingSeasoning =
    [];


  /*
    SCORE CORE INGREDIENTS
  */

  core.forEach(
    ingredient => {

      const role =
        getIngredientRole(
          ingredient
        );


      const matched =
        userHasIngredient(
          ingredient
        );


      if (
        role === "protein"
      ) {

        if (matched) {

          score += 35;

          matchedProtein.push(
            ingredient
          );

        }

        else {

          /*
            Missing the protein is a
            MASSIVE problem.
          */

          score -= 55;

          missingProtein.push(
            ingredient
          );

        }

      }


      else if (
        role === "base"
      ) {

        if (matched) {

          score += 18;

          matchedBase.push(
            ingredient
          );

        }

        else {

          score -= 15;

          missingBase.push(
            ingredient
          );

        }

      }


      else if (
        role === "flavor"
      ) {

        if (matched) {

          score += 14;

          matchedFlavor.push(
            ingredient
          );

        }

        else {

          score -= 5;

          missingFlavor.push(
            ingredient
          );

        }

      }


      else if (
        role === "seasoning"
      ) {

        if (matched) {

          score += 3;

          matchedSeasoning.push(
            ingredient
          );

        }

        else {

          /*
            Missing seasoning barely hurts.
          */

          score -= 0.5;

          missingSeasoning.push(
            ingredient
          );

        }

      }


      else {

        if (matched) {

          score += 9;

          matchedSupport.push(
            ingredient
          );

        }

        else {

          score -= 4;

          missingSupport.push(
            ingredient
          );

        }

      }

    }
  );


  /*
    FLAVOR INGREDIENTS
  */

  flavor.forEach(
    ingredient => {

      const role =
        getIngredientRole(
          ingredient
        );


      const matched =
        userHasIngredient(
          ingredient
        );


      if (
        role === "seasoning"
      ) {

        if (matched) {

          score += 2;

          matchedSeasoning.push(
            ingredient
          );

        }

        else {

          missingSeasoning.push(
            ingredient
          );

        }

      }

      else {

        if (matched) {

          score += 8;

          matchedFlavor.push(
            ingredient
          );

        }

        else {

          score -= 1;

          missingFlavor.push(
            ingredient
          );

        }

      }

    }
  );


  /*
    OPTIONAL INGREDIENTS

    Nice bonus, but they should
    never determine Best Match.
  */

  optional.forEach(
    ingredient => {

      if (
        userHasIngredient(
          ingredient
        )
      ) {

        score += 2;

      }

  );


  /*
    EXTRA BONUS:
    User has the right protein
    AND right base.
  */

  if (
    matchedProtein.length &&
    matchedBase.length
  ) {

    score += 20;

  }


  /*
    EXTRA BONUS:
    Protein + strong flavor
  */

  if (
    matchedProtein.length &&
    matchedFlavor.length
  ) {

    score += 12;

  }


  /*
    If recipe requires a protein
    and user doesn't have anything
    from that protein family,
    it should almost never rank.
  */

  if (
    missingProtein.length > 0 &&
    matchedProtein.length === 0
  ) {

    score -= 45;

  }


  /*
    DETERMINE MATCH QUALITY
  */

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
      "You've got the important parts of this meal already.";

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
      "You've got the main protein. You're close to making this work.";

    score += 8;

  }


  else if (
    matchedProtein.length === 0 &&
    missingProtein.length > 0
  ) {

    label =
      "Weak Match";


    explanation =
      `You're missing the main protein: ${missingProtein.join(", ")}.`;

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
   SMART PLATE GENERATOR

   This creates a meal idea directly
   from ingredients when the user's
   combination is better than a weak
   database match.

===================================================== */

function findSelectedByRole(
  role
) {

  return selectedIngredients.filter(
    ingredient =>
      getIngredientRole(
        ingredient
      ) === role
  );

}


function chooseBestProtein() {

  const proteins =
    findSelectedByRole(
      "protein"
    );


  return proteins[0] || "";

}


function chooseBestBase() {

  const bases =
    findSelectedByRole(
      "base"
    );


  /*
    Prefer specific rice/pasta choices
    over generic ones.
  */

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

  const flavors =
    findSelectedByRole(
      "flavor"
    );


  return flavors[0] || "";

}


function chooseBestSide() {

  const ignored =
    new Set([
      ...findSelectedByRole(
        "protein"
      ),

      ...findSelectedByRole(
        "base"
      ),

      ...findSelectedByRole(
        "flavor"
      ),

      ...findSelectedByRole(
        "seasoning"
      )
    ]);


  return selectedIngredients.find(
    item =>
      !ignored.has(item)
  ) || "";

}


function getSelectedSeasonings() {

  return findSelectedByRole(
    "seasoning"
  );

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


  /*
    A Smart Plate becomes useful when
    user has a protein plus at least
    one direction-setting ingredient.
  */

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
   SMART PLATE NAMING
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


  /*
    Strong sauces define the name.
  */

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


  /*
    No defining sauce.
  */

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
   SMART COOKING STEPS
===================================================== */

function createSmartInstructions({
  protein,
  base,
  flavor,
  side,
  seasonings
}) {

  const steps =
    [];


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

      /*
        Weak nonsense matches
        don't deserve to show.
      */

      .filter(
        item =>
          item.match.score > 0
      )

      .sort(
        (a, b) =>
          b.match.score -
          a.match.score
      );


  /*
    Build a fresh CookLikeMe idea
    from what the user actually has.
  */

  currentSmartPlate =
    generateSmartPlate();


  const strongestRecipe =
    scored[0] || null;


  /*
    DECIDE BEST MATCH

    Smart Plate wins when:
    - recipe match is weak
    - main protein is missing
    - or custom combination is clearly
      more relevant
  */

  let useSmartPlate =
    false;


  if (
    currentSmartPlate
  ) {

    if (!strongestRecipe) {

      useSmartPlate =
        true;

    }

    else if (
      strongestRecipe.match
        .missingProtein.length > 0
    ) {

      useSmartPlate =
        true;

    }

    else if (
      strongestRecipe.match.score < 45
    ) {

      useSmartPlate =
        true;

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
        I don't have a strong enough idea yet.
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
   SMART PLATE DISPLAY
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
          Why it works:
        </strong>

        Your ingredients already make a real plate.
        No need to force them into an unrelated recipe.

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


  let missingText =
    "";


  if (
    importantMissing.length === 0 &&
    match.missingSeasoning.length > 0
  ) {

    missingText =
      `Only missing seasoning/flavor extras: ${match.missingSeasoning
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
      "You've got what matters.";

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
          Why it works:
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
   MORE RESULTS
===================================================== */

function renderResults(
  scoredRecipes
) {

  resultsGrid.innerHTML =
    "";


  /*
    Only show actually respectable
    suggestions.
  */

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
        Your CookLikeMe Pick above may still be the move.
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


      let missingText =
        "";


      if (
        importantMissing.length === 0
      ) {

        missingText =
          "You've got the important stuff.";

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
      <strong>Find My Meals</strong>
      to see what CookLikeMe comes up with.
    </div>
  `;


  resultsGrid.innerHTML = `
    <div class="finder-empty">
      Results for
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

function formatMode(
  mode
) {

  const labels = {

    regular:
      "Food",

    healthy:
      "Healthy",

    shakes:
      "Shakes & Smoothies",

    drinks:
      "Drinks",

    desserts:
      "Desserts"

  };


  return labels[mode] ||
    mode;

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


function saveRecipe(
  recipe
) {

  const saved =
    getSavedRecipes();


  const alreadySaved =
    saved.some(
      item =>
        item.id ===
        recipe.id
    );


  if (
    !alreadySaved
  ) {

    saved.push(
      recipe
    );


    localStorage.setItem(
      "cookLikeMe_favorites",
      JSON.stringify(
        saved
      )
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
   RECIPE MODAL

   ALSO SUPPORTS NEW QUANTITY DATA
===================================================== */

function openRecipeModal(
  recipe
) {

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

        saveRecipe(
          recipe
        );

      }
    );

}


/* =====================================================
   CLOSE MODAL
===================================================== */

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

    selectedIngredients =
      [];


    saveSelectedIngredients();

    renderSelectedIngredients();

    renderIngredientGroups();

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

}


init();
