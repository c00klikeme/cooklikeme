const CATEGORY_ORDER = [
  "Proteins",
  "Carbs & Bases",
  "Dairy & Rich Stuff",
  "Produce",
  "Seasonings",
  "Sauces & Flavor",
  "Drinks",
  "Dessert & Baking",
  "Other"
];


const CATEGORY_LOOKUP = {

  "Proteins": [
    "chicken",
    "chicken breast",
    "chicken thighs",
    "fried chicken",
    "wings",
    "shrimp",
    "salmon",
    "fish",
    "tilapia",
    "tuna",
    "ground beef",
    "ground turkey",
    "steak",
    "pork chops",
    "sausage",
    "turkey",
    "lamb chops",
    "eggs",
    "egg whites",
    "bacon"
  ],


  "Carbs & Bases": [
    "rice",
    "white rice",
    "brown rice",
    "yellow rice",
    "quinoa",
    "pasta",
    "whole wheat pasta",
    "spaghetti",
    "ziti",
    "macaroni",
    "egg noodles",
    "potatoes",
    "sweet potato",
    "mashed potatoes",
    "fries",
    "grits",
    "beans",
    "black beans",
    "chickpeas",
    "plantain",
    "bread",
    "tortilla",
    "whole wheat tortilla",
    "wrap",
    "oats"
  ],


  "Dairy & Rich Stuff": [
    "butter",
    "milk",
    "almond milk",
    "oat milk",
    "heavy cream",
    "cheddar",
    "mozzarella",
    "parmesan",
    "american cheese",
    "cream cheese",
    "sour cream",
    "greek yogurt",
    "condensed milk",
    "whipped cream",
    "vanilla ice cream"
  ],


  "Produce": [
    "onion",
    "garlic",
    "bell pepper",
    "tomato",
    "spinach",
    "kale",
    "broccoli",
    "cabbage",
    "lettuce",
    "carrots",
    "celery",
    "corn",
    "green beans",
    "mushrooms",
    "scallion",
    "cilantro",
    "thyme",
    "parsley",
    "cucumber",
    "avocado",
    "banana",
    "strawberries",
    "blueberries",
    "mango",
    "pineapple",
    "peach",
    "peaches",
    "apples",
    "mixed berries",
    "lime",
    "lemon",
    "mint",
    "orange"
  ],


  "Seasonings": [
    "salt",
    "black pepper",
    "garlic powder",
    "onion powder",
    "paprika",
    "smoked paprika",
    "cajun seasoning",
    "creole seasoning",
    "old bay",
    "seasoned salt",
    "adobo",
    "lemon pepper",
    "italian seasoning",
    "oregano",
    "red pepper flakes",
    "curry powder",
    "jerk seasoning",
    "thyme seasoning",
    "cinnamon",
    "nutmeg"
  ],


  "Sauces & Flavor": [
    "gravy",
    "hot sauce",
    "buffalo sauce",
    "bbq sauce",
    "soy sauce",
    "low sodium soy sauce",
    "alfredo sauce",
    "tomato sauce",
    "marinara",
    "garlic butter",
    "honey garlic sauce",
    "jerk sauce",
    "brown stew sauce",
    "coconut milk",
    "olive oil",
    "lime juice",
    "lemon juice",
    "simple syrup",
    "honey",
    "grenadine",
    "caramel sauce"
  ],


  "Drinks": [
    "rum",
    "white rum",
    "dark rum",
    "vodka",
    "tequila",
    "whiskey",
    "pineapple juice",
    "orange juice",
    "cranberry juice",
    "club soda",
    "ginger beer",
    "coconut cream",
    "coconut water",
    "water"
  ],


  "Dessert & Baking": [
    "flour",
    "sugar",
    "brown sugar",
    "vanilla extract",
    "baking powder",
    "baking soda",
    "chocolate chips",
    "cocoa powder",
    "white chocolate"
  ]

};


let groceryItems =
  loadGrocery();


let activeFilter =
  "all";


const groceryGroups =
  document.getElementById(
    "groceryGroups"
  );

const groceryEmpty =
  document.getElementById(
    "groceryEmpty"
  );

const groceryCount =
  document.getElementById(
    "groceryCount"
  );

const grocerySummaryText =
  document.getElementById(
    "grocerySummaryText"
  );

const customGroceryInput =
  document.getElementById(
    "customGroceryInput"
  );

const customGroceryCategory =
  document.getElementById(
    "customGroceryCategory"
  );

const addCustomGroceryBtn =
  document.getElementById(
    "addCustomGroceryBtn"
  );

const clearCheckedBtn =
  document.getElementById(
    "clearCheckedBtn"
  );

const clearGroceryBtn =
  document.getElementById(
    "clearGroceryBtn"
  );

const groceryFilterButtons =
  document.querySelectorAll(
    ".grocery-filter-btn"
  );


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


/*
  Older parts of CookLikeMe
  saved grocery data as strings.

  V2 Grocery upgrades them
  into objects automatically.
*/

function loadGrocery() {

  const raw =
    JSON.parse(
      localStorage.getItem(
        "cookLikeMe_groceryList"
      )
    ) || [];


  const converted =
    raw.map(
      (item, index) => {

        if (
          typeof item === "string"
        ) {

          const clean =
            normalize(item);


          return {

            id:
              `legacy-${index}-${clean}`,

            name:
              clean,

            category:
              detectCategory(clean),

            checked:
              false

          };

        }


        return {

          id:
            item.id ||
            `item-${Date.now()}-${index}`,

          name:
            normalize(
              item.name ||
              item.ingredient ||
              ""
            ),

          category:
            item.category ||
            detectCategory(
              item.name ||
              item.ingredient ||
              ""
            ),

          checked:
            Boolean(item.checked)

        };

      }
    );


  return converted.filter(
    item => item.name
  );

}


function saveGrocery() {

  localStorage.setItem(
    "cookLikeMe_groceryList",
    JSON.stringify(
      groceryItems
    )
  );

}


function detectCategory(item) {

  const clean =
    normalize(item);


  for (
    const [
      category,
      ingredients
    ]
    of Object.entries(
      CATEGORY_LOOKUP
    )
  ) {

    if (
      ingredients.includes(clean)
    ) {

      return category;

    }

  }


  return "Other";

}


/* FILTER */

function getVisibleItems() {

  if (
    activeFilter === "needed"
  ) {

    return groceryItems.filter(
      item => !item.checked
    );

  }


  if (
    activeFilter === "checked"
  ) {

    return groceryItems.filter(
      item => item.checked
    );

  }


  return groceryItems;

}


/* RENDER */

function renderGrocery() {

  saveGrocery();


  const visibleItems =
    getVisibleItems();


  groceryGroups.innerHTML =
    "";


  groceryCount.textContent =
    `${groceryItems.length} ${
      groceryItems.length === 1
        ? "item"
        : "items"
    }`;


  const checkedCount =
    groceryItems.filter(
      item => item.checked
    ).length;


  const neededCount =
    groceryItems.length -
    checkedCount;


  if (
    groceryItems.length === 0
  ) {

    grocerySummaryText.textContent =
      "Your grocery list is empty.";


    groceryGroups.classList.add(
      "hidden"
    );


    groceryEmpty.classList.remove(
      "hidden"
    );


    return;

  }


  groceryGroups.classList.remove(
    "hidden"
  );


  groceryEmpty.classList.add(
    "hidden"
  );


  grocerySummaryText.textContent =
    neededCount === 0
      ? "Everything is checked off. You're good."
      : `${neededCount} ${
          neededCount === 1
            ? "item"
            : "items"
        } left to grab.`;


  if (
    visibleItems.length === 0
  ) {

    groceryGroups.innerHTML = `
      <div class="grocery-empty">

        <h2>
          Nothing here.
        </h2>

        <p>
          Try another filter.
        </p>

      </div>
    `;


    return;

  }


  const grouped = {};


  visibleItems.forEach(
    item => {

      const category =
        item.category ||
        "Other";


      if (
        !grouped[category]
      ) {

        grouped[category] =
          [];

      }


      grouped[category].push(
        item
      );

    }
  );


  CATEGORY_ORDER.forEach(
    category => {

      if (
        !grouped[category] ||
        grouped[category].length === 0
      ) {

        return;

      }


      const groupCard =
        document.createElement(
          "section"
        );


      groupCard.className =
        "grocery-group-card";


      groupCard.innerHTML = `

        <div class="grocery-group-header">

          <h3>
            ${category}
          </h3>

          <span class="grocery-group-total">
            ${grouped[category].length}
            ${
              grouped[category].length === 1
                ? "item"
                : "items"
            }
          </span>

        </div>


        <div class="grocery-items"></div>

      `;


      const itemsWrap =
        groupCard.querySelector(
          ".grocery-items"
        );


      grouped[category]
        .sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        )
        .forEach(
          item => {

            const row =
              document.createElement(
                "div"
              );


            row.className =
              `grocery-item ${
                item.checked
                  ? "checked"
                  : ""
              }`;


            row.innerHTML = `

              <button
                class="grocery-check ${
                  item.checked
                    ? "checked"
                    : ""
                }"
                aria-label="Toggle ${item.name}"
              >
                ✓
              </button>


              <span class="grocery-item-name">
                ${titleCase(item.name)}
              </span>


              <button
                class="grocery-remove-btn"
                aria-label="Remove ${item.name}"
              >
                ×
              </button>

            `;


            row
              .querySelector(
                ".grocery-check"
              )
              .addEventListener(
                "click",
                () => {

                  toggleChecked(
                    item.id
                  );

                }
              );


            row
              .querySelector(
                ".grocery-remove-btn"
              )
              .addEventListener(
                "click",
                () => {

                  removeItem(
                    item.id
                  );

                }
              );


            itemsWrap.appendChild(
              row
            );

          }
        );


      groceryGroups.appendChild(
        groupCard
      );

    }
  );

}


/* ADD */

function addCustomItem() {

  const value =
    normalize(
      customGroceryInput.value
    );


  if (!value) {

    return;

  }


  const duplicate =
    groceryItems.some(
      item =>
        item.name === value
    );


  if (
    duplicate
  ) {

    customGroceryInput.value =
      "";

    return;

  }


  groceryItems.push({

    id:
      `grocery-${Date.now()}`,

    name:
      value,

    category:
      customGroceryCategory.value ||
      detectCategory(value),

    checked:
      false

  });


  customGroceryInput.value =
    "";


  renderGrocery();

}


/* CHECK */

function toggleChecked(id) {

  groceryItems =
    groceryItems.map(
      item => {

        if (
          item.id === id
        ) {

          return {
            ...item,
            checked:
              !item.checked
          };

        }


        return item;

      }
    );


  renderGrocery();

}


/* REMOVE */

function removeItem(id) {

  groceryItems =
    groceryItems.filter(
      item =>
        item.id !== id
    );


  renderGrocery();

}


/* CLEAR CHECKED */

function clearChecked() {

  const hasChecked =
    groceryItems.some(
      item => item.checked
    );


  if (!hasChecked) {

    return;

  }


  groceryItems =
    groceryItems.filter(
      item =>
        !item.checked
    );


  renderGrocery();

}


/* CLEAR EVERYTHING */

function clearGrocery() {

  if (
    groceryItems.length === 0
  ) {

    return;

  }


  const confirmed =
    confirm(
      "Clear your entire grocery list?"
    );


  if (!confirmed) {

    return;

  }


  groceryItems = [];


  renderGrocery();

}


/* FILTERS */

groceryFilterButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        activeFilter =
          button.dataset.filter;


        groceryFilterButtons
          .forEach(
            otherButton => {

              otherButton
                .classList.toggle(
                  "active",
                  otherButton ===
                    button
                );

            }
          );


        renderGrocery();

      }
    );

  }
);


/* EVENTS */

addCustomGroceryBtn.addEventListener(
  "click",
  addCustomItem
);


customGroceryInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      addCustomItem();

    }

  }
);


clearCheckedBtn.addEventListener(
  "click",
  clearChecked
);


clearGroceryBtn.addEventListener(
  "click",
  clearGrocery
);


/* START */

renderGrocery();
