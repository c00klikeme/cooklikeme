let savedRecipes =
  JSON.parse(
    localStorage.getItem(
      "cookLikeMe_favorites"
    )
  ) || [];


let activeSavedFilter =
  "all";


const savedGrid =
  document.getElementById(
    "savedGrid"
  );

const savedCount =
  document.getElementById(
    "savedCount"
  );

const clearSavedBtn =
  document.getElementById(
    "clearSavedBtn"
  );

const savedFilterButtons =
  document.querySelectorAll(
    ".saved-filter-btn"
  );

const savedModal =
  document.getElementById(
    "savedModal"
  );

const savedModalBackdrop =
  document.getElementById(
    "savedModalBackdrop"
  );

const savedModalContent =
  document.getElementById(
    "savedModalContent"
  );

const closeSavedModal =
  document.getElementById(
    "closeSavedModal"
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


function saveFavorites() {

  localStorage.setItem(
    "cookLikeMe_favorites",
    JSON.stringify(
      savedRecipes
    )
  );

}


function normalizeMode(item) {

  if (
    item.category ===
    "Custom Plate"
  ) {

    return "custom";

  }


  return item.mode || "regular";

}


function formatMode(mode) {

  const labels = {

    regular: "Food",

    healthy: "Healthy",

    shakes:
      "Shakes & Smoothies",

    drinks: "Drinks",

    desserts: "Desserts",

    custom: "Custom Plate"

  };


  return labels[mode] || mode;

}


function getFilteredSaved() {

  if (
    activeSavedFilter === "all"
  ) {

    return savedRecipes;

  }


  return savedRecipes.filter(
    item =>
      normalizeMode(item) ===
      activeSavedFilter
  );

}


function renderSaved() {

  const filtered =
    getFilteredSaved();


  savedCount.textContent =
    `${savedRecipes.length} ${
      savedRecipes.length === 1
        ? "saved"
        : "saved"
    }`;


  savedGrid.innerHTML = "";


  if (
    savedRecipes.length === 0
  ) {

    savedGrid.innerHTML = `
      <div class="saved-empty">

        <h2>
          Nothing saved yet.
        </h2>

        <p>
          Save meals from Find Meals or build your own plate.
          Anything you keep will show up here.
        </p>

        <div class="saved-empty-actions">

          <a
            href="meals.html"
            class="saved-empty-link primary"
          >
            Find Meals
          </a>

          <a
            href="builder.html"
            class="saved-empty-link"
          >
            Build My Plate
          </a>

        </div>

      </div>
    `;

    return;

  }


  if (
    filtered.length === 0
  ) {

    savedGrid.innerHTML = `
      <div class="saved-empty">

        <h2>
          Nothing saved in this lane yet.
        </h2>

        <p>
          Try another filter or save something new.
        </p>

      </div>
    `;

    return;

  }


  filtered.forEach(
    item => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "saved-card";


      const mode =
        normalizeMode(item);


      card.innerHTML = `

        <div>

          <div class="saved-card-topline">

            <span class="saved-type">
              ${
                item.category ===
                "Custom Plate"
                  ? "Custom Plate"
                  : item.category || "Recipe"
              }
            </span>

            <span class="saved-mode">
              ${formatMode(mode)}
            </span>

          </div>


          <h3>
            ${item.title}
          </h3>


          <p class="saved-description">
            ${item.description || ""}
          </p>


          <div class="saved-meta">

            ${
              item.time
                ? `
                  <span class="saved-pill">
                    ${item.time}
                  </span>
                `
                : ""
            }

            ${
              item.difficulty
                ? `
                  <span class="saved-pill">
                    ${item.difficulty}
                  </span>
                `
                : ""
            }

            ${
              Array.isArray(item.tags)
                ? item.tags
                    .slice(0,2)
                    .map(
                      tag => `
                        <span class="saved-pill">
                          ${tag}
                        </span>
                      `
                    )
                    .join("")
                : ""
            }

          </div>

        </div>


        <div class="saved-card-actions">

          <button
            class="saved-card-btn primary view-saved"
          >
            View
          </button>

          <button
            class="saved-card-btn add-grocery"
          >
            Add to Grocery
          </button>

          <button
            class="saved-card-btn remove remove-saved"
          >
            Remove
          </button>

        </div>

      `;


      card
        .querySelector(
          ".view-saved"
        )
        .addEventListener(
          "click",
          () => {

            openSavedModal(
              item
            );

          }
        );


      card
        .querySelector(
          ".add-grocery"
        )
        .addEventListener(
          "click",
          () => {

            addSavedToGrocery(
              item
            );

          }
        );


      card
        .querySelector(
          ".remove-saved"
        )
        .addEventListener(
          "click",
          () => {

            removeSaved(
              item.id
            );

          }
        );


      savedGrid.appendChild(
        card
      );

    }
  );

}


function getIngredientList(item) {

  if (
    Array.isArray(
      item.ingredients
    )
  ) {

    return item.ingredients;

  }


  return [
    ...(item.coreIngredients || []),
    ...(item.flavorIngredients || []),
    ...(item.optionalIngredients || [])
  ];

}


function removeSaved(id) {

  savedRecipes =
    savedRecipes.filter(
      item =>
        item.id !== id
    );


  saveFavorites();

  renderSaved();

}


function addSavedToGrocery(item) {

  const ingredients =
    getIngredientList(item);


  const grocery =
    JSON.parse(
      localStorage.getItem(
        "cookLikeMe_groceryList"
      )
    ) || [];


  ingredients.forEach(
    ingredient => {

      const clean =
        String(ingredient)
          .trim()
          .toLowerCase();


      if (
        !grocery.includes(clean)
      ) {

        grocery.push(clean);

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
    `${item.title} added to Grocery.`
  );

}


function openSavedModal(item) {

  const ingredients =
    getIngredientList(item);


  savedModalContent.innerHTML = `

    <p class="saved-modal-type">
      ${formatMode(
        normalizeMode(item)
      )}
      •
      ${item.category || "Recipe"}
    </p>


    <h2>
      ${item.title}
    </h2>


    <p class="saved-modal-description">
      ${item.description || ""}
    </p>


    <div class="saved-meta">

      ${
        item.time
          ? `
            <span class="saved-pill">
              ${item.time}
            </span>
          `
          : ""
      }

      ${
        item.difficulty
          ? `
            <span class="saved-pill">
              ${item.difficulty}
            </span>
          `
          : ""
      }

      ${
        Array.isArray(item.tags)
          ? item.tags
              .map(
                tag => `
                  <span class="saved-pill">
                    ${tag}
                  </span>
                `
              )
              .join("")
          : ""
      }

    </div>


    <section class="saved-modal-section">

      <h3>
        Ingredients
      </h3>

      <ul class="saved-modal-list">

        ${ingredients
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


    ${
      Array.isArray(
        item.instructions
      )
        ? `
          <section class="saved-modal-section">

            <h3>
              How It Comes Together
            </h3>

            <ol class="saved-modal-list">

              ${item.instructions
                .map(
                  instruction => `
                    <li>
                      ${instruction}
                    </li>
                  `
                )
                .join("")
              }

            </ol>

          </section>
        `
        : ""
    }


    <div class="saved-card-actions">

      <button
        id="modalAddGrocery"
        class="saved-card-btn primary"
      >
        Add to Grocery
      </button>

      <button
        id="modalRemoveSaved"
        class="saved-card-btn remove"
      >
        Remove from Saved
      </button>

    </div>

  `;


  savedModal.classList.remove(
    "hidden"
  );


  document
    .getElementById(
      "modalAddGrocery"
    )
    .addEventListener(
      "click",
      () => {

        addSavedToGrocery(
          item
        );

      }
    );


  document
    .getElementById(
      "modalRemoveSaved"
    )
    .addEventListener(
      "click",
      () => {

        removeSaved(
          item.id
        );

        closeModal();

      }
    );

}


function closeModal() {

  savedModal.classList.add(
    "hidden"
  );

}


/* FILTERS */

savedFilterButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        activeSavedFilter =
          button.dataset.filter;


        savedFilterButtons
          .forEach(
            filterButton => {

              filterButton
                .classList.toggle(
                  "active",
                  filterButton ===
                    button
                );

            }
          );


        renderSaved();

      }
    );

  }
);


/* CLEAR ALL */

clearSavedBtn.addEventListener(
  "click",
  () => {

    if (
      savedRecipes.length === 0
    ) {

      return;

    }


    const confirmed =
      confirm(
        "Clear everything from Saved?"
      );


    if (!confirmed) {

      return;

    }


    savedRecipes =
      [];


    saveFavorites();

    renderSaved();

  }
);


/* MODAL */

closeSavedModal.addEventListener(
  "click",
  closeModal
);


savedModalBackdrop.addEventListener(
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

renderSaved();
