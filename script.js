const recipes = [
  {
    name: "Chicken Fried Rice",
    ingredients: ["chicken", "rice", "egg"],
    category: "dinner",
    emoji: "🍚"
  },
  {
    name: "Chicken Broccoli Bowl",
    ingredients: ["chicken", "broccoli", "rice"],
    category: "lunch",
    emoji: "🥗"
  },
  {
    name: "Omelette",
    ingredients: ["egg", "cheese"],
    category: "breakfast",
    emoji: "🍳"
  },
  {
    name: "Grilled Cheese",
    ingredients: ["bread", "cheese", "butter"],
    category: "quick",
    emoji: "🧀"
  },
  {
    name: "Chicken Sandwich",
    ingredients: ["chicken", "bread"],
    category: "lunch",
    emoji: "🥪"
  },
  {
    name: "Veggie Rice Bowl",
    ingredients: ["rice", "broccoli"],
    category: "dinner",
    emoji: "🥦"
  },
  {
    name: "Spaghetti",
    ingredients: ["pasta", "tomato"],
    category: "dinner",
    emoji: "🍝"
  },
  {
    name: "Chicken Alfredo",
    ingredients: ["chicken", "pasta", "cream"],
    category: "dinner",
    emoji: "🍝"
  },
  {
    name: "Egg Fried Rice",
    ingredients: ["egg", "rice"],
    category: "quick",
    emoji: "🍚"
  },
  {
    name: "Chicken Wrap",
    ingredients: ["chicken", "tortilla"],
    category: "lunch",
    emoji: "🌯"
  },
  {
    name: "Cheese Quesadilla",
    ingredients: ["tortilla", "cheese"],
    category: "quick",
    emoji: "🫓"
  },
  {
    name: "Chicken Salad",
    ingredients: ["chicken", "lettuce"],
    category: "lunch",
    emoji: "🥗"
  },
  {
    name: "Egg Sandwich",
    ingredients: ["egg", "bread"],
    category: "breakfast",
    emoji: "🥪"
  },
  {
    name: "Rice and Beans",
    ingredients: ["rice", "beans"],
    category: "dinner",
    emoji: "🍛"
  }
];

let selectedIngredients = [];
let selectedCategory = "all";

function toggleIngredient(ingredient, button) {
  if (selectedIngredients.includes(ingredient)) {
    selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
    button.classList.remove("selected");
  } else {
    selectedIngredients.push(ingredient);
    button.classList.add("selected");
  }

  updateSelectedIngredients();
}

function updateSelectedIngredients() {
  const display = document.getElementById("selectedIngredients");

  if (selectedIngredients.length === 0) {
    display.textContent = "None";
  } else {
    display.textContent = selectedIngredients.join(", ");
  }
}

function addCustomIngredient() {
  const input = document.getElementById("customIngredient");
  const value = input.value.trim().toLowerCase();

  if (value === "") {
    return;
  }

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

function findMeals() {
  const results = document.getElementById("results");
  results.innerHTML = "";

  let matchesFound = false;

  recipes.forEach(recipe => {
    const ingredientsMatch = recipe.ingredients.every(ingredient =>
      selectedIngredients.includes(ingredient)
    );

    const categoryMatch =
      selectedCategory === "all" || recipe.category === selectedCategory;

    if (ingredientsMatch && categoryMatch) {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="meal-card">
          <div class="meal-title">${recipe.emoji} ${recipe.name}</div>
          <div class="meal-category">${recipe.category}</div>
          <div class="meal-ingredients">
            Ingredients: ${recipe.ingredients.join(", ")}
          </div>
        </div>
      `;
      results.appendChild(li);
      matchesFound = true;
    }
  });

  if (!matchesFound) {
    const li = document.createElement("li");
    li.textContent = "No meals found. Try more ingredients or switch the category.";
    results.appendChild(li);
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