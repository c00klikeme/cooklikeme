const ingredientData =
  window.COOKLIKEME_INGREDIENTS;


let builderMode =
  "regular";


let plateSelections = {

  protein: "",

  base: "",

  side: "",

  extras: [],

  flavor: "",

  seasoning: ""

};


let currentGeneratedPlate =
  null;


/* DOM */

const builderModeTabs =
  document.getElementById(
    "builderModeTabs"
  );

const proteinOptions =
  document.getElementById(
    "proteinOptions"
  );

const baseOptions =
  document.getElementById(
    "baseOptions"
  );

const sideOptions =
  document.getElementById(
    "sideOptions"
  );

const extraOptions =
  document.getElementById(
    "extraOptions"
  );

const flavorOptions =
  document.getElementById(
    "flavorOptions"
  );

const seasoningOptions =
  document.getElementById(
    "seasoningOptions"
  );

const platePreview =
  document.getElementById(
    "platePreview"
  );

const generatePlateBtn =
  document.getElementById(
    "generatePlateBtn"
  );

const resetBuilderBtn =
  document.getElementById(
    "resetBuilderBtn"
  );

const generatedSection =
  document.getElementById(
    "generatedSection"
  );

const generatedTitle =
  document.getElementById(
    "generatedTitle"
  );

const generatedDescription =
  document.getElementById(
    "generatedDescription"
  );

const generatedMeta =
  document.getElementById(
    "generatedMeta"
  );

const generatedIngredients =
  document.getElementById(
    "generatedIngredients"
  );

const generatedInstructions =
  document.getElementById(
    "generatedInstructions"
  );

const savePlateBtn =
  document.getElementById(
    "savePlateBtn"
  );

const addPlateToGroceryBtn =
  document.getElementById(
    "addPlateToGroceryBtn"
  );

const buildAnotherBtn =
  document.getElementById(
    "buildAnotherBtn"
  );


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


/* BUILDER DATA */

function getBuilderData() {

  if (
    builderMode === "healthy"
  ) {

    return {

      proteins: [
        "chicken breast",
        "ground turkey",
        "salmon",
        "shrimp",
        "tilapia",
        "tuna",
        "eggs",
        "egg whites"
      ],

      bases: [
        "brown rice",
        "quinoa",
        "sweet potato",
        "whole wheat pasta",
        "black beans",
        "chickpeas"
      ],

      sides: [
        "broccoli",
        "spinach",
        "green beans",
        "carrots",
        "kale",
        "cabbage",
        "avocado"
      ],

      extras: [
        "bell pepper",
        "onion",
        "tomato",
        "cucumber",
        "mushrooms",
        "corn",
        "cilantro",
        "scallion"
      ],

      flavors: [
        "lime",
        "lemon",
        "olive oil",
        "hot sauce",
        "low sodium soy sauce",
        "garlic"
      ],

      seasonings: [
        "jerk seasoning",
        "cajun seasoning",
        "lemon pepper",
        "smoked paprika",
        "garlic powder",
        "curry powder",
        "black pepper"
      ]

    };

  }


  return {

    proteins: [
      "chicken",
      "chicken thighs",
      "wings",
      "shrimp",
      "salmon",
      "fish",
      "steak",
      "ground beef",
      "pork chops",
      "sausage",
      "turkey",
      "lamb chops"
    ],

    bases: [
      "rice",
      "white rice",
      "yellow rice",
      "pasta",
      "macaroni",
      "mashed potatoes",
      "fries",
      "grits",
      "beans",
      "plantain"
    ],

    sides: [
      "macaroni",
      "mashed potatoes",
      "fries",
      "plantain",
      "green beans",
      "broccoli",
      "corn",
      "cabbage",
      "beans"
    ],

    extras: [
      "onion",
      "garlic",
      "bell pepper",
      "spinach",
      "mushrooms",
      "tomato",
      "scallion",
      "cilantro",
      "carrots"
    ],

    flavors: [
      "gravy",
      "garlic butter",
      "jerk sauce",
      "brown stew sauce",
      "alfredo sauce",
      "marinara",
      "hot sauce",
      "buffalo sauce",
      "honey garlic sauce",
      "bbq sauce",
      "coconut milk",
      "lime"
    ],

    seasonings: [
      "jerk seasoning",
      "cajun seasoning",
      "creole seasoning",
      "old bay",
      "lemon pepper",
      "curry powder",
      "italian seasoning",
      "smoked paprika",
      "adobo",
      "seasoned salt"
    ]

  };

}


/* RENDER OPTIONS */

function renderSingleOptions(
  element,
  options,
  type
) {

  element.innerHTML = "";


  options.forEach(
    item => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "builder-option";


      button.textContent =
        titleCase(item);


      if (
        plateSelections[type] === item
      ) {

        button.classList.add(
          "selected"
        );

      }


      button.addEventListener(
        "click",
        () => {

          plateSelections[type] =
            plateSelections[type] === item
              ? ""
              : item;


          renderBuilder();

          renderPlatePreview();

        }
      );


      element.appendChild(
        button
      );

    }
  );

}


function renderExtraOptions(
  element,
  options
) {

  element.innerHTML = "";


  options.forEach(
    item => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "builder-option";


      button.textContent =
        titleCase(item);


      if (
        plateSelections.extras.includes(
          item
        )
      ) {

        button.classList.add(
          "selected"
        );

      }


      button.addEventListener(
        "click",
        () => {

          if (
            plateSelections.extras.includes(
              item
            )
          ) {

            plateSelections.extras =
              plateSelections.extras.filter(
                extra =>
                  extra !== item
              );

          } else {

            plateSelections.extras.push(
              item
            );

          }


          renderBuilder();

          renderPlatePreview();

        }
      );


      element.appendChild(
        button
      );

    }
  );

}


/* MAIN RENDER */

function renderBuilder() {

  const data =
    getBuilderData();


  renderSingleOptions(
    proteinOptions,
    data.proteins,
    "protein"
  );


  renderSingleOptions(
    baseOptions,
    data.bases,
    "base"
  );


  renderSingleOptions(
    sideOptions,
    data.sides,
    "side"
  );


  renderExtraOptions(
    extraOptions,
    data.extras
  );


  renderSingleOptions(
    flavorOptions,
    data.flavors,
    "flavor"
  );


  renderSingleOptions(
    seasoningOptions,
    data.seasonings,
    "seasoning"
  );

}


/* PREVIEW */

function renderPlatePreview() {

  const extrasText =
    plateSelections.extras.length
      ? plateSelections.extras
          .map(titleCase)
          .join(", ")
      : "None yet";


  platePreview.innerHTML = `

    ${previewPiece(
      "Protein",
      plateSelections.protein
    )}

    ${previewPiece(
      "Base",
      plateSelections.base
    )}

    ${previewPiece(
      "Side",
      plateSelections.side
    )}

    ${previewPiece(
      "Flavor",
      plateSelections.flavor
    )}

    ${previewPiece(
      "Seasoning",
      plateSelections.seasoning
    )}

    <div class="preview-piece">

      <span>
        Extras
      </span>

      <strong class="${
        plateSelections.extras.length
          ? ""
          : "preview-empty"
      }">
        ${extrasText}
      </strong>

    </div>

  `;

}


function previewPiece(
  label,
  value
) {

  return `

    <div class="preview-piece">

      <span>
        ${label}
      </span>

      <strong class="${
        value
          ? ""
          : "preview-empty"
      }">

        ${
          value
            ? titleCase(value)
            : "Not picked"
        }

      </strong>

    </div>

  `;

}


/* GENERATE */

function generatePlate() {

  const required = [
    plateSelections.protein,
    plateSelections.base,
    plateSelections.side,
    plateSelections.flavor,
    plateSelections.seasoning
  ];


  if (
    required.some(
      item => !item
    )
  ) {

    alert(
      "Pick a protein, base, side, flavor and seasoning first."
    );

    return;

  }


  currentGeneratedPlate =
    createPlate();


  renderGeneratedPlate(
    currentGeneratedPlate
  );


  generatedSection.classList.remove(
    "hidden"
  );


  generatedSection.scrollIntoView({
    behavior: "smooth"
  });

}


/* BUILD PLATE OBJECT */

function createPlate() {

  const {
    protein,
    base,
    side,
    extras,
    flavor,
    seasoning
  } = plateSelections;


  const plateTitle =
    createPlateTitle(
      protein,
      base,
      flavor,
      seasoning
    );


  const description =
    createPlateDescription(
      protein,
      base,
      side,
      extras,
      flavor,
      seasoning
    );


  const ingredients = [
    protein,
    base,
    side,
    flavor,
    seasoning,
    ...extras
  ];


  const instructions =
    createInstructions(
      protein,
      base,
      side,
      extras,
      flavor,
      seasoning
    );


  return {

    id:
      "custom-" +
      Date.now(),

    mode:
      builderMode,

    title:
      plateTitle,

    category:
      "Custom Plate",

    tags: [
      builderMode === "healthy"
        ? "Healthy"
        : "Custom"
    ],

    time:
      builderMode === "healthy"
        ? "25–35 min"
        : "30–40 min",

    difficulty:
      "Easy",

    coreIngredients: [
      protein,
      base,
      side
    ],

    flavorIngredients: [
      flavor,
      seasoning
    ],

    optionalIngredients:
      extras,

    ingredients,

    description,

    instructions

  };

}


/* TITLE LOGIC */

function createPlateTitle(
  protein,
  base,
  flavor,
  seasoning
) {

  const proteinName =
    titleCase(protein);


  const baseName =
    titleCase(base);


  if (
    seasoning.includes("jerk")
  ) {

    return `Jerk ${proteinName} Plate`;

  }


  if (
    seasoning.includes("curry")
  ) {

    return `Curry ${proteinName} with ${baseName}`;

  }


  if (
    flavor.includes("alfredo")
  ) {

    return `Creamy ${proteinName} Alfredo Plate`;

  }


  if (
    flavor.includes("brown stew")
  ) {

    return `Brown Stew ${proteinName} Plate`;

  }


  if (
    flavor.includes("buffalo")
  ) {

    return `Buffalo ${proteinName} Plate`;

  }


  if (
    flavor.includes("garlic butter")
  ) {

    return `Garlic Butter ${proteinName} & ${baseName}`;

  }


  if (
    seasoning.includes("cajun") ||
    seasoning.includes("creole")
  ) {

    return `${titleCase(seasoning)} ${proteinName} Plate`;

  }


  return `${proteinName} with ${baseName}`;

}


/* DESCRIPTION */

function createPlateDescription(
  protein,
  base,
  side,
  extras,
  flavor,
  seasoning
) {

  const extraText =
    extras.length
      ? ` with ${extras
          .map(titleCase)
          .join(", ")}`
      : "";


  if (
    builderMode === "healthy"
  ) {

    return (
      `${titleCase(protein)} seasoned with ` +
      `${titleCase(seasoning)}, paired with ` +
      `${titleCase(base)} and ${titleCase(side)}` +
      `${extraText}. Finished with ${titleCase(flavor)} ` +
      `for a balanced plate that still has some personality.`
    );

  }


  return (
    `${titleCase(protein)} hit with ` +
    `${titleCase(seasoning)}, served with ` +
    `${titleCase(base)} and ${titleCase(side)}` +
    `${extraText}, then finished with ` +
    `${titleCase(flavor)}. Full plate, real flavor.`
  );

}


/* INSTRUCTIONS */

function createInstructions(
  protein,
  base,
  side,
  extras,
  flavor,
  seasoning
) {

  const steps = [

    `Season the ${protein} with ${seasoning}.`,

    `Cook the ${protein} until browned and fully cooked.`,

    `Prepare the ${base} while the protein cooks.`,

    `Cook or warm the ${side}.`

  ];


  if (
    extras.length
  ) {

    steps.push(
      `Prepare the ${extras.join(", ")} and add them to the plate.`
    );

  }


  steps.push(
    `Finish the ${protein} or plate with ${flavor}.`
  );


  steps.push(
    `Plate everything hot and adjust seasoning to taste.`
  );


  return steps;

}


/* GENERATED DISPLAY */

function renderGeneratedPlate(
  plate
) {

  generatedTitle.textContent =
    plate.title;


  generatedDescription.textContent =
    plate.description;


  generatedMeta.innerHTML = `

    <span class="generated-pill">
      ${
        builderMode === "healthy"
          ? "Healthy"
          : "Regular"
      }
    </span>

    <span class="generated-pill">
      ${plate.time}
    </span>

    <span class="generated-pill">
      ${plate.difficulty}
    </span>

    <span class="generated-pill">
      ${plate.ingredients.length}
      ingredients
    </span>

  `;


  generatedIngredients.innerHTML =
    plate.ingredients
      .map(
        ingredient => `
          <li>
            ${titleCase(ingredient)}
          </li>
        `
      )
      .join("");


  generatedInstructions.innerHTML =
    plate.instructions
      .map(
        instruction => `
          <li>
            ${instruction}
          </li>
        `
      )
      .join("");

}


/* SAVE */

function savePlate() {

  if (
    !currentGeneratedPlate
  ) {

    return;

  }


  const favorites =
    JSON.parse(
      localStorage.getItem(
        "cookLikeMe_favorites"
      )
    ) || [];


  const alreadySaved =
    favorites.some(
      item =>
        item.id ===
        currentGeneratedPlate.id
    );


  if (
    !alreadySaved
  ) {

    favorites.push(
      currentGeneratedPlate
    );


    localStorage.setItem(
      "cookLikeMe_favorites",
      JSON.stringify(
        favorites
      )
    );


    alert(
      `${currentGeneratedPlate.title} saved.`
    );

  }

  else {

    alert(
      "This plate is already saved."
    );

  }

}


/* GROCERY */

function addPlateToGrocery() {

  if (
    !currentGeneratedPlate
  ) {

    return;

  }


  const grocery =
    JSON.parse(
      localStorage.getItem(
        "cookLikeMe_groceryList"
      )
    ) || [];


  currentGeneratedPlate
    .ingredients
    .forEach(
      ingredient => {

        if (
          !grocery.includes(
            ingredient
          )
        ) {

          grocery.push(
            ingredient
          );

        }

      }
    );


  localStorage.setItem(
    "cookLikeMe_groceryList",
    JSON.stringify(
      grocery
    )
  );


  alert(
    "Plate ingredients added to Grocery."
  );

}


/* RESET */

function resetBuilder() {

  plateSelections = {

    protein: "",

    base: "",

    side: "",

    extras: [],

    flavor: "",

    seasoning: ""

  };


  currentGeneratedPlate =
    null;


  generatedSection.classList.add(
    "hidden"
  );


  renderBuilder();

  renderPlatePreview();

}


/* MODE CHANGE */

function changeMode(
  mode
) {

  builderMode =
    mode;


  document
    .querySelectorAll(
      ".builder-mode-btn"
    )
    .forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.mode === mode
        );

      }
    );


  resetBuilder();

}


/* EVENTS */

builderModeTabs.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".builder-mode-btn"
      );


    if (!button) {

      return;

    }


    changeMode(
      button.dataset.mode
    );

  }
);


generatePlateBtn.addEventListener(
  "click",
  generatePlate
);


resetBuilderBtn.addEventListener(
  "click",
  resetBuilder
);


savePlateBtn.addEventListener(
  "click",
  savePlate
);


addPlateToGroceryBtn.addEventListener(
  "click",
  addPlateToGrocery
);


buildAnotherBtn.addEventListener(
  "click",
  () => {

    resetBuilder();


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* START */

function initBuilder() {

  renderBuilder();

  renderPlatePreview();

}


initBuilder();
