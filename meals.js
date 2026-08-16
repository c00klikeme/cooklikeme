const ingredientData =
  window.COOKLIKEME_INGREDIENTS;

const recipes =
  window.COOKLIKEME_RECIPES;


let selectedIngredients =
  JSON.parse(
    localStorage.getItem(
      "cookLikeMe_selectedIngredients"
    )
  ) || [];


let activeMode =
  "regular";


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


function normalize(value) {

  return String(value)
    .trim()
    .toLowerCase();

}


function titleCase(value) {

  return String(value)
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
    .forEach(tab => {

      tab.classList.toggle(
        "active",
        tab.dataset.mode === mode
      );

    });


  renderIngredientGroups();

  renderResultsEmpty();

}


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
        item => item !== clean
      );

  } else {

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


function getRecipesForMode() {

  return recipes.filter(
    recipe =>
      recipe.mode ===
      activeMode
  );

}


/*
  MATCHING SYSTEM

  Core ingredients matter the most.

  Missing garlic or seasoning
  should not hurt a recipe
  as much as missing the protein,
  pasta, rice, etc.
*/

function scoreRecipe(recipe) {

  const userSet =
    new Set(
      selectedIngredients.map(
        normalize
      )
    );


  const core =
    recipe.coreIngredients.map(
      normalize
    );


  const flavor =
    recipe.flavorIngredients.map(
      normalize
    );


  const optional =
    recipe.optionalIngredients.map(
      normalize
    );


  const matchedCore =
    core.filter(
      ingredient =>
        userSet.has(ingredient)
    );


  const missingCore =
    core.filter(
      ingredient =>
        !userSet.has(ingredient)
    );


  const matchedFlavor =
    flavor.filter(
      ingredient =>
        userSet.has(ingredient)
    );


  const missingFlavor =
    flavor.filter(
      ingredient =>
        !userSet.has(ingredient)
    );


  const matchedOptional =
    optional.filter(
      ingredient =>
        userSet.has(ingredient)
    );


  /*
    Core ingredient = 6 points
    Flavor = 2 points
    Optional = 1 point
  */

  let score =
    matchedCore.length * 6 +
    matchedFlavor.length * 2 +
    matchedOptional.length;


  /*
    Missing core ingredients
    have a real penalty.
  */

  score -=
    missingCore.length * 3;


  let label =
    "Best Fit";


  let explanation =
    "";


  if (
    missingCore.length === 0 &&
    missingFlavor.length === 0
  ) {

    label =
      "Exact Match";

    explanation =
      "You already have the main ingredients and flavor pieces for this.";

    score += 35;

  }

  else if (
    missingCore.length === 0
  ) {

    label =
      "Main Ingredients Covered";

    explanation =
      "You have the important stuff. You're mostly missing seasoning or flavor extras.";

    score += 24;

  }

  else if (
    missingCore.length === 1
  ) {

    label =
      "Almost There";

    explanation =
      `You're only missing one main ingredient: ${missingCore[0]}.`;

    score += 14;

  }

  else {

    explanation =
      `${matchedCore.length} of ${core.length} main ingredients match.`;

  }


  return {

    score,

    label,

    explanation,

    matchedCore,

    missingCore,

    matchedFlavor,

    missingFlavor,

    matchedOptional

  };

}


function findMeals() {

  const modeRecipes =
    getRecipesForMode();


  if (
    selectedIngredients.length === 0
  ) {

    bestMatchEl.innerHTML = `
      <div class="finder-empty">
        Pick a few ingredients first.
        CookLikeMe will use those to find
        the strongest matches.
      </div>
    `;


    resultsGrid.innerHTML = `
      <div class="finder-empty">
        Your results will show up here.
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
          item.match.matchedCore.length > 0
      )
      .sort(
        (a, b) =>
          b.match.score -
          a.match.score
      );


  if (
    scored.length === 0
  ) {

    bestMatchEl.innerHTML = `
      <div class="finder-empty">
        Nothing strong enough matched yet.
        Try adding another main ingredient
        or switching lanes.
      </div>
    `;


    resultsGrid.innerHTML = `
      <div class="finder-empty">
        No matches yet.
      </div>
    `;


    resultCount.textContent =
      "0 results";


    return;

  }


  renderBestMatch(
    scored[0]
  );


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


function renderBestMatch(item) {

  const {
    recipe,
    match
  } = item;


  const missingText =
    match.missingCore.length
      ? `Missing: ${match.missingCore.join(", ")}`
      : match.missingFlavor.length
        ? `Only flavor extras missing: ${match.missingFlavor.join(", ")}`
        : "You have everything needed.";


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


function renderResults(
  scoredRecipes
) {

  resultsGrid.innerHTML = "";


  const visible =
    scoredRecipes.slice(
      0,
      12
    );


  resultCount.textContent =
    `${visible.length} ${
      visible.length === 1
        ? "result"
        : "results"
    }`;


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


      let missingText =
        "";


      if (
        match.missingCore.length === 0
      ) {

        missingText =
          "Main ingredients covered.";

      }

      else {

        missingText =
          `Missing: ${match.missingCore.join(", ")}`;

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

          <span class="meta-pill ${
            match.missingCore.length === 0
              ? "good"
              : "warning"
          }">
            ${match.matchedCore.length}/${recipe.coreIngredients.length}
            main ingredients
          </span>

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


function renderResultsEmpty() {

  bestMatchEl.innerHTML = `
    <div class="finder-empty">
      Pick ingredients and hit
      <strong>Find My Meals</strong>
      to see your strongest match.
    </div>
  `;


  resultsGrid.innerHTML = `
    <div class="finder-empty">
      Results for the
      <strong>${formatMode(activeMode)}</strong>
      lane will show here.
    </div>
  `;


  resultCount.textContent =
    "0 results";

}


function formatMode(mode) {

  const labels = {

    regular: "Food",

    healthy: "Healthy",

    shakes:
      "Shakes & Smoothies",

    drinks: "Drinks",

    desserts: "Desserts"

  };


  return labels[mode] || mode;

}


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

    saved.push(
      recipe
    );


    localStorage.setItem(
      "cookLikeMe_favorites",
      JSON.stringify(saved)
    );


    alert(
      `${recipe.title} saved.`
    );

  } else {

    alert(
      `${recipe.title} is already saved.`
    );

  }

}


function openRecipeModal(
  recipe
) {

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


    <section class="modal-section">

      <h3>
        Main Ingredients
      </h3>

      <ul class="modal-list">

        ${recipe.coreIngredients
          .map(
            ingredient => `
              <li>
                ${titleCase(ingredient)}
              </li>
            `
          )
          .join("")
        }

      </ul>

    </section>


    ${
      recipe.flavorIngredients.length
        ? `
          <section class="modal-section">

            <h3>
              Flavor & Seasoning
            </h3>

            <ul class="modal-list">

              ${recipe.flavorIngredients
                .map(
                  ingredient => `
                    <li>
                      ${titleCase(ingredient)}
                    </li>
                  `
                )
                .join("")
              }

            </ul>

          </section>
        `
        : ""
    }


    ${
      recipe.optionalIngredients.length
        ? `
          <section class="modal-section">

            <h3>
              Optional Extras
            </h3>

            <ul class="modal-list">

              ${recipe.optionalIngredients
                .map(
                  ingredient => `
                    <li>
                      ${titleCase(ingredient)}
                    </li>
                  `
                )
                .join("")
              }

            </ul>

          </section>
        `
        : ""
    }


    <section class="modal-section">

      <h3>
        How It Comes Together
      </h3>

      <ol class="modal-list">

        ${recipe.instructions
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
        Save Recipe ♥
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


function closeModal() {

  recipeModal.classList.add(
    "hidden"
  );

}


/* EVENTS */

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


/* START */

function init() {

  getModeFromURL();

  setActiveMode(
    activeMode
  );

  renderSelectedIngredients();

  renderIngredientGroups();

}


init();
