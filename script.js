const recipes = [
  {
    name: "Egg Sandwich",
    ingredients: ["egg", "bread"],
    category: "breakfast",
    emoji: "🥪",
    instructions: "Cook the egg, place it on bread, and serve as a quick breakfast sandwich."
  },
  {
    name: "Omelette",
    ingredients: ["egg", "cheese"],
    category: "breakfast",
    emoji: "🍳",
    instructions: "Beat the eggs, pour into a pan, add cheese, fold, and cook until set."
  },
  {
    name: "Cheesy Scrambled Eggs",
    ingredients: ["egg", "cheese", "butter"],
    category: "breakfast",
    emoji: "🍳",
    instructions: "Scramble eggs in butter, add cheese near the end, and cook until creamy."
  },
  {
    name: "Bacon Egg Breakfast Plate",
    ingredients: ["bacon", "egg", "potato"],
    category: "breakfast",
    emoji: "🥓",
    instructions: "Cook the bacon, fry or scramble the eggs, and serve with pan-fried potatoes."
  },
  {
    name: "Ham and Egg Breakfast",
    ingredients: ["ham", "egg", "bread"],
    category: "breakfast",
    emoji: "🍽️",
    instructions: "Warm the ham, cook the egg, and serve with toasted bread."
  },
  {
    name: "Spinach Egg Scramble",
    ingredients: ["egg", "spinach", "cheese"],
    category: "breakfast",
    emoji: "🍳",
    instructions: "Cook spinach first, add beaten eggs, then finish with cheese."
  },

  {
    name: "Chicken Sandwich",
    ingredients: ["chicken", "bread"],
    category: "lunch",
    emoji: "🥪",
    instructions: "Cook or reheat the chicken, then place it between slices of bread and serve."
  },
  {
    name: "Chicken Salad",
    ingredients: ["chicken", "lettuce"],
    category: "lunch",
    emoji: "🥗",
    instructions: "Chop the chicken, toss it with lettuce, and serve as a light salad."
  },
  {
    name: "Chicken Wrap",
    ingredients: ["chicken", "tortilla"],
    category: "lunch",
    emoji: "🌯",
    instructions: "Fill the tortilla with cooked chicken, wrap it up, and serve warm or cold."
  },
  {
    name: "Shrimp Wrap",
    ingredients: ["shrimp", "tortilla", "lettuce"],
    category: "lunch",
    emoji: "🌯",
    instructions: "Cook the shrimp, add lettuce, wrap everything in a tortilla, and serve."
  },
  {
    name: "Turkey Sandwich",
    ingredients: ["turkey", "bread", "cheese"],
    category: "lunch",
    emoji: "🥪",
    instructions: "Layer turkey and cheese onto bread, then serve cold or toasted."
  },
  {
    name: "Beef and Rice Bowl",
    ingredients: ["beef", "rice", "onion"],
    category: "lunch",
    emoji: "🍛",
    instructions: "Cook the beef with onion, then serve it over warm rice."
  },

  {
    name: "Chicken Fried Rice",
    ingredients: ["chicken", "rice", "egg"],
    category: "dinner",
    emoji: "🍚",
    instructions: "Cook the chicken, scramble the egg, then stir-fry everything together with rice."
  },
  {
    name: "Chicken Broccoli Bowl",
    ingredients: ["chicken", "broccoli", "rice"],
    category: "dinner",
    emoji: "🥦",
    instructions: "Cook the chicken and broccoli, then serve them over warm rice."
  },
  {
    name: "Spaghetti",
    ingredients: ["pasta", "tomato"],
    category: "dinner",
    emoji: "🍝",
    instructions: "Boil the pasta, heat the tomato sauce, and mix them together."
  },
  {
    name: "Chicken Alfredo",
    ingredients: ["chicken", "pasta", "cream"],
    category: "dinner",
    emoji: "🍝",
    instructions: "Cook the pasta and chicken, then combine them with a warm cream sauce."
  },
  {
    name: "Garlic Parmesan Pasta",
    ingredients: ["pasta", "garlic", "parmesan", "butter"],
    category: "dinner",
    emoji: "🍝",
    instructions: "Cook the pasta, melt butter with garlic, then toss with parmesan."
  },
  {
    name: "Mozzarella Tomato Pasta",
    ingredients: ["pasta", "tomato", "mozzarella", "basil"],
    category: "dinner",
    emoji: "🍝",
    instructions: "Cook pasta, stir in tomato, mozzarella, and basil for a simple Italian-style bowl."
  },
  {
    name: "Shrimp Pasta",
    ingredients: ["shrimp", "pasta", "garlic"],
    category: "dinner",
    emoji: "🍤",
    instructions: "Cook the shrimp with garlic, then toss with hot pasta."
  },
  {
    name: "Beef Pasta",
    ingredients: ["beef", "pasta", "tomato"],
    category: "dinner",
    emoji: "🍝",
    instructions: "Cook the beef, stir in tomato sauce, and serve over pasta."
  },
  {
    name: "Sausage Peppers Pasta",
    ingredients: ["sausage", "pasta", "bell pepper", "onion"],
    category: "dinner",
    emoji: "🍝",
    instructions: "Cook sausage with peppers and onion, then mix with cooked pasta."
  },

  {
    name: "Rice and Beans",
    ingredients: ["rice", "beans"],
    category: "dinner",
    emoji: "🍛",
    instructions: "Cook the rice, heat the beans, and serve them together."
  },
  {
    name: "Southern Beans and Rice",
    ingredients: ["rice", "beans", "onion", "garlic"],
    category: "dinner",
    emoji: "🍲",
    instructions: "Cook beans with onion and garlic, then serve over rice."
  },
  {
    name: "Smothered Chicken and Rice",
    ingredients: ["chicken", "rice", "onion", "bell pepper"],
    category: "dinner",
    emoji: "🍗",
    instructions: "Cook chicken with onion and bell pepper, then serve over rice."
  },
  {
    name: "Cabbage and Sausage",
    ingredients: ["cabbage", "sausage", "onion"],
    category: "dinner",
    emoji: "🥬",
    instructions: "Cook the sausage with onion, add cabbage, and cook until tender."
  },
  {
    name: "Turkey Cabbage Skillet",
    ingredients: ["turkey", "cabbage", "onion"],
    category: "dinner",
    emoji: "🍲",
    instructions: "Cook turkey with onion, then add cabbage and let everything soften together."
  },
  {
    name: "Corn and Potato Skillet",
    ingredients: ["corn", "potato", "butter"],
    category: "dinner",
    emoji: "🌽",
    instructions: "Cook the potatoes until tender, then add corn and butter for a quick skillet meal."
  },

  {
    name: "Grenadian-Style Curry Chicken",
    ingredients: ["chicken", "curry", "thyme", "onion"],
    category: "dinner",
    emoji: "🍛",
    instructions: "Season and cook the chicken with curry, thyme, and onion until rich and tender."
  },
  {
    name: "Grenadian-Style Curry Shrimp",
    ingredients: ["shrimp", "curry", "garlic", "onion"],
    category: "dinner",
    emoji: "🍤",
    instructions: "Cook the shrimp quickly with curry, garlic, and onion until fragrant."
  },
  {
    name: "Coconut Rice and Peas",
    ingredients: ["rice", "coconut milk", "peas", "thyme"],
    category: "dinner",
    emoji: "🥥",
    instructions: "Cook rice in coconut milk with peas and thyme for a rich island-style side."
  },
  {
    name: "Stew Chicken Bowl",
    ingredients: ["chicken", "onion", "garlic", "thyme"],
    category: "dinner",
    emoji: "🍗",
    instructions: "Cook the chicken low and slow with onion, garlic, and thyme until flavorful."
  },
  {
    name: "Plantain and Rice Plate",
    ingredients: ["plantain", "rice", "beans"],
    category: "dinner",
    emoji: "🍌",
    instructions: "Cook the plantain until tender or caramelized, then serve with rice and beans."
  },
  {
    name: "Cabbage and Carrots Side",
    ingredients: ["cabbage", "carrots", "onion"],
    category: "quick",
    emoji: "🥕",
    instructions: "Cook cabbage, carrots, and onion together until soft and well seasoned."
  },

  {
    name: "Grilled Cheese",
    ingredients: ["bread", "cheese", "butter"],
    category: "quick",
    emoji: "🧀",
    instructions: "Butter the bread, add cheese, and toast both sides in a pan until golden."
  },
  {
    name: "Cheese Quesadilla",
    ingredients: ["tortilla", "cheese"],
    category: "quick",
    emoji: "🫓",
    instructions: "Add cheese to a tortilla, fold it, and toast in a pan until melted."
  },
  {
    name: "Egg Fried Rice",
    ingredients: ["egg", "rice"],
    category: "quick",
    emoji: "🍚",
    instructions: "Scramble the egg, add cooked rice, and stir-fry together in a pan."
  },
  {
    name: "Garlic Butter Shrimp",
    ingredients: ["shrimp", "garlic", "butter"],
    category: "quick",
    emoji: "🍤",
    instructions: "Cook shrimp quickly in butter and garlic until just done."
  },
  {
    name: "Buttered Noodles",
    ingredients: ["noodles", "butter", "parmesan"],
    category: "quick",
    emoji: "🍜",
    instructions: "Cook the noodles, toss with butter, and finish with parmesan."
  },
  {
    name: "Tomato Basil Toast",
    ingredients: ["bread", "tomato", "basil"],
    category: "quick",
    emoji: "🍅",
    instructions: "Toast the bread, top with tomato and basil, and serve warm."
  },
  {
    name: "Mushroom Garlic Pasta",
    ingredients: ["mushrooms", "pasta", "garlic"],
    category: "quick",
    emoji: "🍝",
    instructions: "Cook mushrooms with garlic, then toss with hot pasta for a fast dinner."
  },
  {
    name: "Corn Cheese Quesadilla",
    ingredients: ["corn", "tortilla", "cheese"],
    category: "quick",
    emoji: "🌮",
    instructions: "Fill a tortilla with corn and cheese, then toast until melted."
  }
];

let selectedIngredients = [];
let selectedCategory = "all";
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let groceryList = JSON.parse(localStorage.getItem("groceryList")) || [];
let currentModalMeal = null;

function normalizeIngredient(value) {
  return value.trim().toLowerCase();
}

function toggleIngredient(ingredient, button) {
  const normalizedIngredient = normalizeIngredient(ingredient);

  if (selectedIngredients.includes(normalizedIngredient)) {
    selectedIngredients = selectedIngredients.filter(item => item !== normalizedIngredient);
    button.classList.remove("selected");
  } else {
    selectedIngredients.push(normalizedIngredient);
    button.classList.add("selected");
  }

  updateSelectedIngredients();
}

function updateSelectedIngredients() {
  const display = document.getElementById("selectedIngredients");

  if (selectedIngredients.length === 0) {
    display.textContent = "None";
    return;
  }

  display.innerHTML = "";

  selectedIngredients.forEach(ingredient => {
    const tag = document.createElement("span");
    tag.className = "ingredient-tag";
    tag.innerHTML = `${ingredient} ✖`;

    tag.onclick = () => {
      selectedIngredients = selectedIngredients.filter(i => i !== ingredient);

      const buttons = document.querySelectorAll(".ingredient-btn");
      buttons.forEach(btn => {
        if (normalizeIngredient(btn.textContent) === ingredient) {
          btn.classList.remove("selected");
        }
      });

      updateSelectedIngredients();
    };

    display.appendChild(tag);
  });
}

function addCustomIngredient() {
  const input = document.getElementById("customIngredient");
  const value = normalizeIngredient(input.value);

  if (value === "") return;

  if (!selectedIngredients.includes(value)) {
    selectedIngredients.push(value);
    updateSelectedIngredients();
  }

  input.value = "";
}

function selectCategory(category, button) {
  selectedCategory = category;

  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach(btn => btn.classList.remove("active-category"));

  button.classList.add("active-category");
}

function createMealCard(recipe, showInstructions = true, missingIngredients = []) {
  const li = document.createElement("li");

  li.innerHTML = `
    <div class="meal-card" onclick="openModal('${recipe.name.replace(/'/g, "\\'")}')">
      <div class="meal-header">
        <div class="meal-title">${recipe.emoji} ${recipe.name}</div>
        <span class="favorite-btn" onclick="event.stopPropagation(); saveFavorite('${recipe.name.replace(/'/g, "\\'")}')">❤️</span>
      </div>
      <div class="meal-category">${recipe.category}</div>
      <div class="meal-ingredients">Ingredients: ${recipe.ingredients.join(", ")}</div>
      ${
        missingIngredients.length > 0
          ? `<div class="meal-missing">Missing: ${missingIngredients.join(", ")}</div>`
          : ""
      }
      ${
        showInstructions
          ? `<div class="meal-instructions">${recipe.instructions}</div>`
          : ""
      }
      <div class="meal-actions">
        <button class="add-grocery-btn" onclick="event.stopPropagation(); addMealToGroceryList('${recipe.name.replace(/'/g, "\\'")}')">Add to Grocery List</button>
      </div>
    </div>
  `;

  return li;
}

function findMeals() {
  const results = document.getElementById("results");
  results.innerHTML = "";

  let exactMatches = [];
  let closeMatches = [];

  recipes.forEach(recipe => {
    const normalizedRecipeIngredients = recipe.ingredients.map(ingredient =>
      normalizeIngredient(ingredient)
    );

    const missingIngredients = normalizedRecipeIngredients.filter(
      ingredient => !selectedIngredients.includes(ingredient)
    );

    const categoryMatch =
      selectedCategory === "all" || recipe.category === selectedCategory;

    if (!categoryMatch) return;

    if (missingIngredients.length === 0) {
      exactMatches.push(recipe);
    } else if (
      selectedIngredients.length > 0 &&
      missingIngredients.length <= 2 &&
      missingIngredients.length < normalizedRecipeIngredients.length
    ) {
      closeMatches.push({
        recipe,
        missingIngredients
      });
    }
  });

  if (exactMatches.length > 0) {
    exactMatches.forEach(recipe => {
      results.appendChild(createMealCard(recipe, true));
    });
    return;
  }

  if (closeMatches.length > 0) {
    const title = document.createElement("h3");
    title.textContent = "Close Matches (You're Almost There)";
    title.className = "close-match-title";
    results.appendChild(title);

    closeMatches.forEach(item => {
      results.appendChild(createMealCard(item.recipe, false, item.missingIngredients));
    });
    return;
  }

  const li = document.createElement("li");
  li.textContent = "No exact meals found yet. Try more ingredients or hit Surprise Me.";
  results.appendChild(li);
}

function surpriseMeal() {
  const results = document.getElementById("results");
  results.innerHTML = "";

  const filteredMeals = recipes.filter(recipe => {
    return selectedCategory === "all" || recipe.category === selectedCategory;
  });

  if (filteredMeals.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No meals available in this category.";
    results.appendChild(li);
    return;
  }

  const randomMeal = filteredMeals[Math.floor(Math.random() * filteredMeals.length)];
  results.appendChild(createMealCard(randomMeal, true));
}

function saveFavorite(mealName) {
  if (!favorites.includes(mealName)) {
    favorites.push(mealName);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
    alert("Saved to favorites!");
  }
}

function removeFavorite(mealName) {
  favorites = favorites.filter(name => name !== mealName);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

function loadFavorites() {
  const list = document.getElementById("favoritesList");
  list.innerHTML = "";

  if (favorites.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No favorites yet";
    list.appendChild(li);
    return;
  }

  favorites.forEach(name => {
    const li = document.createElement("li");
    li.className = "favorite-item";
    li.innerHTML = `
      <span>${name}</span>
      <button class="remove-favorite-btn" onclick="removeFavorite('${name.replace(/'/g, "\\'")}')">Remove</button>
    `;
    list.appendChild(li);
  });
}

function addMealToGroceryList(mealName) {
  const recipe = recipes.find(item => item.name === mealName);
  if (!recipe) return;

  recipe.ingredients.forEach(ingredient => {
    if (!groceryList.includes(ingredient)) {
      groceryList.push(ingredient);
    }
  });

  localStorage.setItem("groceryList", JSON.stringify(groceryList));
  loadGroceryList();
  alert("Added ingredients to grocery list!");
}

function removeGroceryItem(itemName) {
  groceryList = groceryList.filter(item => item !== itemName);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
  loadGroceryList();
}

function clearGroceryList() {
  groceryList = [];
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
  loadGroceryList();
}

function loadGroceryList() {
  const list = document.getElementById("groceryList");
  list.innerHTML = "";

  if (groceryList.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No grocery items yet";
    list.appendChild(li);
    return;
  }

  groceryList.forEach(item => {
    const li = document.createElement("li");
    li.className = "grocery-item";
    li.innerHTML = `
      <span>${item}</span>
      <button class="remove-grocery-btn" onclick="removeGroceryItem('${item.replace(/'/g, "\\'")}')">Remove</button>
    `;
    list.appendChild(li);
  });
}

function openModal(mealName) {
  const recipe = recipes.find(r => r.name === mealName);
  if (!recipe) return;

  currentModalMeal = recipe;

  document.getElementById("modalTitle").textContent = `${recipe.emoji} ${recipe.name}`;
  document.getElementById("modalCategory").textContent = `Category: ${recipe.category}`;
  document.getElementById("modalIngredients").textContent = `Ingredients: ${recipe.ingredients.join(", ")}`;
  document.getElementById("modalInstructions").textContent = recipe.instructions;

  document.getElementById("mealModal").style.display = "block";
}

function closeModal() {
  document.getElementById("mealModal").style.display = "none";
}

function modalSaveFavorite() {
  if (currentModalMeal) {
    saveFavorite(currentModalMeal.name);
  }
}

function modalAddToGrocery() {
  if (currentModalMeal) {
    addMealToGroceryList(currentModalMeal.name);
  }
}

function clearResults() {
  selectedIngredients = [];
  selectedCategory = "all";

  document.getElementById("results").innerHTML = "";
  document.getElementById("selectedIngredients").textContent = "None";
  document.getElementById("customIngredient").value = "";

  const ingredientButtons = document.querySelectorAll(".ingredient-btn");
  ingredientButtons.forEach(button => button.classList.remove("selected"));

  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach(button => button.classList.remove("active-category"));

  categoryButtons[0].classList.add("active-category");
}

window.onload = function () {
  loadFavorites();
  loadGroceryList();
};