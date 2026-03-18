const recipes = [
  {
    name: "Morning Melt Egg Sandwich",
    ingredients: ["egg", "bread"],
    category: "breakfast",
    emoji: "🥪",
    vibe: "Quick Fix",
    cookTime: "10 min",
    difficulty: "Easy",
    description: "Simple, warm, and straight to the point. A quick breakfast that still feels like real food.",
    instructions: "Cook the egg how you like it, toast the bread, then stack it up while everything is still hot."
  },
  {
    name: "Cheesy Folded Omelette",
    ingredients: ["egg", "cheese"],
    category: "breakfast",
    emoji: "🍳",
    vibe: "Comfort",
    cookTime: "12 min",
    difficulty: "Easy",
    description: "Soft eggs with melty cheese folded into a clean little breakfast move.",
    instructions: "Beat the eggs, pour them into a hot pan, add cheese, then fold gently once the center starts to set."
  },
  {
    name: "Creamy Cheesy Scramble",
    ingredients: ["egg", "cheese", "butter"],
    category: "breakfast",
    emoji: "🍳",
    vibe: "Comfort",
    cookTime: "10 min",
    difficulty: "Easy",
    description: "Buttery scrambled eggs with cheese that feel a little richer than your average breakfast.",
    instructions: "Melt butter in the pan, scramble the eggs low and slow, then add cheese at the end so it stays creamy."
  },
  {
    name: "Bacon and Potato Breakfast Plate",
    ingredients: ["bacon", "egg", "potato"],
    category: "breakfast",
    emoji: "🥓",
    vibe: "Soulful",
    cookTime: "20 min",
    difficulty: "Easy",
    description: "That classic breakfast plate energy. Crispy, hearty, and made to hold you down.",
    instructions: "Cook the bacon first, fry or scramble the eggs, then pan-cook the potatoes until golden and tender."
  },

  {
    name: "Hot Chicken Sandwich Fix",
    ingredients: ["chicken", "bread"],
    category: "lunch",
    emoji: "🥪",
    vibe: "Quick Fix",
    cookTime: "15 min",
    difficulty: "Easy",
    description: "Simple chicken sandwich energy, but still solid enough to hit the spot.",
    instructions: "Cook or reheat the chicken, toast the bread if you want, then stack it and serve hot."
  },
  {
    name: "Chicken Wrap Run",
    ingredients: ["chicken", "tortilla"],
    category: "lunch",
    emoji: "🌯",
    vibe: "Quick Fix",
    cookTime: "15 min",
    difficulty: "Easy",
    description: "Fast lunch energy. Easy to make, easy to carry, easy to run back.",
    instructions: "Warm the tortilla, fill it with chicken, roll it tight, and toast it lightly if you want extra texture."
  },
  {
    name: "Shrimp Lunch Wrap",
    ingredients: ["shrimp", "tortilla", "lettuce"],
    category: "lunch",
    emoji: "🌯",
    vibe: "Fresh",
    cookTime: "15 min",
    difficulty: "Easy",
    description: "Light, clean, and just enough flavor to keep lunch interesting.",
    instructions: "Cook the shrimp quickly, add lettuce, wrap it all in a warm tortilla, and serve right away."
  },
  {
    name: "Beef Over Rice Lunch Bowl",
    ingredients: ["beef", "rice", "onion"],
    category: "lunch",
    emoji: "🍛",
    vibe: "Hearty",
    cookTime: "25 min",
    difficulty: "Medium",
    description: "Savory beef and onions over rice. Real lunch, not snack behavior.",
    instructions: "Cook the beef with onion until browned and flavorful, then spoon it over hot rice."
  },

  {
    name: "Takeout-Style Chicken Fried Rice",
    ingredients: ["chicken", "rice", "egg"],
    category: "dinner",
    emoji: "🍚",
    vibe: "Comfort",
    cookTime: "25 min",
    difficulty: "Easy",
    description: "That homemade fried rice move when you want takeout vibes without leaving the house.",
    instructions: "Cook the chicken, scramble the egg, then stir-fry both with rice until everything comes together hot and seasoned."
  },
  {
    name: "Sunday-Style Smothered Chicken Bowl",
    ingredients: ["chicken", "rice", "onion", "bell pepper"],
    category: "dinner",
    emoji: "🍗",
    vibe: "Soulful",
    cookTime: "35 min",
    difficulty: "Medium",
    description: "Tender chicken with onions and peppers over rice. Cozy, filling, and nap-worthy in the best way.",
    instructions: "Brown the chicken, let it cook down with onion and bell pepper, then spoon it over hot rice with all the juices."
  },
  {
    name: "Island Curry Chicken Pot",
    ingredients: ["chicken", "curry", "thyme", "onion"],
    category: "dinner",
    emoji: "🍛",
    vibe: "Island",
    cookTime: "35 min",
    difficulty: "Medium",
    description: "Curry chicken with thyme and onion that smells dangerous in the kitchen and hits even harder on the plate.",
    instructions: "Season the chicken well, bloom the curry with onion and thyme, then simmer until the chicken is tender and the sauce gets deep."
  },
  {
    name: "Stew Chicken Comfort Bowl",
    ingredients: ["chicken", "onion", "garlic", "thyme"],
    category: "dinner",
    emoji: "🍗",
    vibe: "Island",
    cookTime: "40 min",
    difficulty: "Medium",
    description: "Chicken cooked down deep with aromatics until it tastes like it took way longer than it did.",
    instructions: "Brown the chicken first, then simmer it with onion, garlic, and thyme until the flavor gets deep and the meat turns tender."
  },
  {
    name: "Creamy Chicken Alfredo Bowl",
    ingredients: ["chicken", "pasta", "cream"],
    category: "dinner",
    emoji: "🍝",
    vibe: "Date Night",
    cookTime: "30 min",
    difficulty: "Medium",
    description: "Rich, creamy, and the kind of pasta that makes dinner feel a little more serious.",
    instructions: "Cook the pasta and chicken separately, then bring them together in a warm cream sauce until smooth and coated."
  },
  {
    name: "Garlic Parmesan Comfort Pasta",
    ingredients: ["pasta", "garlic", "parmesan", "butter"],
    category: "dinner",
    emoji: "🍝",
    vibe: "Comfort",
    cookTime: "20 min",
    difficulty: "Easy",
    description: "Buttery, garlicky, cheesy pasta that feels like you knew exactly what you were doing.",
    instructions: "Cook the pasta, melt butter with garlic, then toss in parmesan until everything coats the noodles."
  },
  {
    name: "Sausage and Peppers Pasta Pot",
    ingredients: ["sausage", "pasta", "bell pepper", "onion"],
    category: "dinner",
    emoji: "🍝",
    vibe: "Italian Night",
    cookTime: "30 min",
    difficulty: "Medium",
    description: "Savory sausage, soft peppers, and pasta all doing exactly what they’re supposed to do.",
    instructions: "Cook the sausage with peppers and onion first, then toss it all with pasta while it’s still hot."
  },
  {
    name: "Garlic Shrimp Pasta Run",
    ingredients: ["shrimp", "pasta", "garlic"],
    category: "dinner",
    emoji: "🍤",
    vibe: "Date Night",
    cookTime: "22 min",
    difficulty: "Medium",
    description: "Quick shrimp pasta that still feels a little fancy.",
    instructions: "Cook the shrimp with garlic, toss them with hot pasta, and serve immediately before the shrimp lose their shine."
  },
  {
    name: "Island Curry Shrimp",
    ingredients: ["shrimp", "curry", "garlic", "onion"],
    category: "dinner",
    emoji: "🍤",
    vibe: "Island",
    cookTime: "18 min",
    difficulty: "Easy",
    description: "Quick shrimp with curry flavor that still feels rich and proper.",
    instructions: "Cook the onion and garlic first, add curry, then toss in the shrimp and cook just until done."
  },
  {
    name: "Rice and Beans Plate",
    ingredients: ["rice", "beans"],
    category: "dinner",
    emoji: "🍛",
    vibe: "Comfort",
    cookTime: "20 min",
    difficulty: "Easy",
    description: "A basic classic, but when it’s seasoned right it still goes crazy.",
    instructions: "Cook the rice, heat and season the beans, then serve them together hot."
  },
  {
    name: "Southern Beans and Rice Pot",
    ingredients: ["rice", "beans", "onion", "garlic"],
    category: "dinner",
    emoji: "🍲",
    vibe: "Soulful",
    cookTime: "30 min",
    difficulty: "Easy",
    description: "Simple ingredients, big comfort energy, and the kind of meal that feels familiar.",
    instructions: "Cook the beans down with onion and garlic, then spoon them over rice and let the flavors settle in."
  },
  {
    name: "Plantain Rice and Beans Plate",
    ingredients: ["plantain", "rice", "beans"],
    category: "dinner",
    emoji: "🍌",
    vibe: "Island",
    cookTime: "25 min",
    difficulty: "Easy",
    description: "Sweet plantain next to rice and beans is a combo that never really misses.",
    instructions: "Cook the plantain until tender and caramelized, then serve it beside hot rice and beans."
  },

  {
    name: "Salmon and Mashed Potatoes Plate",
    ingredients: ["salmon", "mashed potatoes", "butter"],
    category: "dinner",
    emoji: "🍣",
    vibe: "Comfort",
    cookTime: "30 min",
    difficulty: "Medium",
    description: "A smooth, solid dinner plate that feels like you put some thought into it.",
    instructions: "Season and cook the salmon until tender, warm up the mashed potatoes, then finish with butter."
  },
  {
    name: "Garlic Butter Salmon Bowl",
    ingredients: ["salmon", "garlic", "butter", "rice"],
    category: "dinner",
    emoji: "🐟",
    vibe: "Date Night",
    cookTime: "25 min",
    difficulty: "Medium",
    description: "Salmon over rice with buttery garlic flavor that feels smooth and lowkey fancy.",
    instructions: "Cook the salmon gently, make a quick garlic butter, then spoon it over rice with the fish on top."
  },
  {
    name: "Cajun Salmon Rice Plate",
    ingredients: ["salmon", "cajun seasoning", "rice", "butter"],
    category: "dinner",
    emoji: "🔥",
    vibe: "Bold",
    cookTime: "25 min",
    difficulty: "Easy",
    description: "Cajun salmon with enough kick to wake the plate up.",
    instructions: "Season the salmon with cajun seasoning, cook it through, then plate it over hot rice with butter."
  },
  {
    name: "Lemon Garlic Salmon Pasta",
    ingredients: ["salmon", "pasta", "garlic", "lemon"],
    category: "dinner",
    emoji: "🍝",
    vibe: "Date Night",
    cookTime: "30 min",
    difficulty: "Medium",
    description: "A brighter salmon pasta that feels a little more polished.",
    instructions: "Cook the salmon and flake it, toss pasta with garlic and lemon, then fold the salmon in gently."
  },

  {
    name: "Crispy Fried Chicken Plate",
    ingredients: ["fried chicken", "fries"],
    category: "dinner",
    emoji: "🍗",
    vibe: "Soulful",
    cookTime: "20 min",
    difficulty: "Easy",
    description: "Straight comfort food energy. Crispy, salty, and hard to argue with.",
    instructions: "Heat the fried chicken until crispy again if needed, cook the fries, and serve hot."
  },
  {
    name: "Fried Chicken and Mac Plate",
    ingredients: ["fried chicken", "macaroni", "cheddar", "milk"],
    category: "dinner",
    emoji: "🧀",
    vibe: "Soulful",
    cookTime: "30 min",
    difficulty: "Medium",
    description: "This is the kind of plate that makes you sit down and stop talking for a second.",
    instructions: "Make a quick cheddar macaroni with milk, then plate it next to hot fried chicken."
  },
  {
    name: "Wing and Fries Combo",
    ingredients: ["chicken wings", "fries"],
    category: "quick",
    emoji: "🍟",
    vibe: "Late Night",
    cookTime: "20 min",
    difficulty: "Easy",
    description: "A straight-up go-to combo when you want something fun and reckless.",
    instructions: "Cook the wings until hot and crispy, make the fries, then serve immediately."
  },

  {
    name: "Smothered Pork Chop Plate",
    ingredients: ["pork chops", "onion", "rice"],
    category: "dinner",
    emoji: "🥩",
    vibe: "Soulful",
    cookTime: "35 min",
    difficulty: "Medium",
    description: "Pork chops cooked down with onions over rice. Old-school comfort with some weight on it.",
    instructions: "Sear the pork chops, cook down the onions, then finish everything together and spoon over rice."
  },
  {
    name: "Garlic Pork Chop Plate",
    ingredients: ["pork chops", "garlic", "potato"],
    category: "dinner",
    emoji: "🍽️",
    vibe: "Comfort",
    cookTime: "30 min",
    difficulty: "Medium",
    description: "Simple pork chop dinner with enough flavor to carry the whole plate.",
    instructions: "Cook the pork chops with garlic, then serve with cooked potatoes on the side."
  },

  {
    name: "Steak and Rice Plate",
    ingredients: ["steak", "rice", "butter"],
    category: "dinner",
    emoji: "🥩",
    vibe: "Hearty",
    cookTime: "25 min",
    difficulty: "Medium",
    description: "A clean steak plate with enough richness to feel serious.",
    instructions: "Cook the steak to your liking, rest it, then slice it over rice with butter."
  },
  {
    name: "Steak Taco Night",
    ingredients: ["steak", "tortilla", "onion", "lime"],
    category: "dinner",
    emoji: "🌮",
    vibe: "Taco Night",
    cookTime: "25 min",
    difficulty: "Medium",
    description: "Steak tacos with lime and onion. Simple setup, strong finish.",
    instructions: "Cook and slice the steak, warm the tortillas, then load with onion and hit with lime."
  },

  {
    name: "Ground Beef Taco Night",
    ingredients: ["ground beef", "tortilla", "cheddar"],
    category: "dinner",
    emoji: "🌮",
    vibe: "Taco Night",
    cookTime: "20 min",
    difficulty: "Easy",
    description: "Classic beef taco energy. Fast, cheesy, and easy to keep making.",
    instructions: "Brown the ground beef, season it, warm the tortillas, then top with cheddar."
  },
  {
    name: "Chicken Taco Plate",
    ingredients: ["chicken", "tortilla", "lime"],
    category: "dinner",
    emoji: "🌮",
    vibe: "Taco Night",
    cookTime: "20 min",
    difficulty: "Easy",
    description: "Chicken tacos with lime that stay light but still got flavor.",
    instructions: "Cook the chicken, warm the tortillas, then finish with a squeeze of lime."
  },
  {
    name: "Shrimp Taco Run",
    ingredients: ["shrimp", "tortilla", "lime"],
    category: "dinner",
    emoji: "🌮",
    vibe: "Taco Night",
    cookTime: "18 min",
    difficulty: "Easy",
    description: "Shrimp tacos that come together quick and still feel fresh.",
    instructions: "Cook the shrimp fast, warm the tortillas, then plate with lime."
  },
  {
    name: "Fish Taco Plate",
    ingredients: ["fish", "tortilla", "lime"],
    category: "dinner",
    emoji: "🐟",
    vibe: "Taco Night",
    cookTime: "20 min",
    difficulty: "Easy",
    description: "Simple fish tacos with a clean finish and real weeknight potential.",
    instructions: "Cook the fish gently, break it into pieces, then load warm tortillas and finish with lime."
  },
  {
    name: "Loaded Quesadilla Deluxe",
    ingredients: ["chicken", "tortilla", "cheese", "sour cream"],
    category: "quick",
    emoji: "🫓",
    vibe: "Quick Fix",
    cookTime: "15 min",
    difficulty: "Easy",
    description: "A more serious quesadilla situation with chicken and sour cream in the mix.",
    instructions: "Fill the tortilla with chicken and cheese, toast until melted, then serve with sour cream."
  },

  {
    name: "Baked Mac and Cheese Vibes",
    ingredients: ["macaroni", "cheddar", "milk", "butter"],
    category: "dinner",
    emoji: "🧀",
    vibe: "Soulful",
    cookTime: "30 min",
    difficulty: "Medium",
    description: "Cheesy comfort food that doesn’t need a big introduction.",
    instructions: "Cook the macaroni, make a quick cheese sauce with milk and butter, then combine and serve hot."
  },
  {
    name: "Beef and Mac Skillet",
    ingredients: ["ground beef", "macaroni", "cheddar"],
    category: "dinner",
    emoji: "🍲",
    vibe: "Comfort",
    cookTime: "25 min",
    difficulty: "Easy",
    description: "A beefy skillet meal that feels like comfort food without extra drama.",
    instructions: "Cook the beef first, boil the macaroni, then mix both with cheddar until melted together."
  },
  {
    name: "Baked Ziti Night",
    ingredients: ["ziti", "mozzarella", "tomato"],
    category: "dinner",
    emoji: "🍝",
    vibe: "Italian Night",
    cookTime: "30 min",
    difficulty: "Easy",
    description: "Cheesy baked pasta energy without having to do the absolute most.",
    instructions: "Cook the ziti, toss with tomato sauce, top with mozzarella, and heat until bubbly."
  },
  {
    name: "Creamy Cajun Shrimp Pasta",
    ingredients: ["shrimp", "pasta", "cajun seasoning", "cream"],
    category: "dinner",
    emoji: "🔥",
    vibe: "Date Night",
    cookTime: "25 min",
    difficulty: "Medium",
    description: "Creamy pasta with cajun shrimp that feels spicy, rich, and a little dangerous.",
    instructions: "Cook the shrimp with cajun seasoning, make a quick cream sauce, then toss everything with pasta."
  },
  {
    name: "Rasta Pasta Vibes",
    ingredients: ["pasta", "bell pepper", "cream", "cajun seasoning"],
    category: "dinner",
    emoji: "🌶️",
    vibe: "Island",
    cookTime: "25 min",
    difficulty: "Easy",
    description: "Creamy pasta with color, kick, and island-inspired energy.",
    instructions: "Cook the pasta, soften the peppers, then mix with cream and cajun seasoning until coated."
  },
  {
    name: "Chicken Parm-ish Pasta Bowl",
    ingredients: ["chicken", "pasta", "mozzarella", "tomato"],
    category: "dinner",
    emoji: "🍝",
    vibe: "Italian Night",
    cookTime: "30 min",
    difficulty: "Medium",
    description: "That chicken-parm feeling without needing a whole restaurant setup.",
    instructions: "Cook the chicken, toss pasta with tomato sauce, then top with mozzarella and finish together hot."
  },

  {
    name: "Golden Grilled Cheese",
    ingredients: ["bread", "cheese", "butter"],
    category: "quick",
    emoji: "🧀",
    vibe: "Comfort",
    cookTime: "10 min",
    difficulty: "Easy",
    description: "Crispy outside, melty inside. No need to overthink it.",
    instructions: "Butter the bread, add cheese, then toast both sides until golden and fully melted."
  },
  {
    name: "Cheesy Quesadilla Fix",
    ingredients: ["tortilla", "cheese"],
    category: "quick",
    emoji: "🫓",
    vibe: "Quick Fix",
    cookTime: "10 min",
    difficulty: "Easy",
    description: "Fast, cheesy, and still satisfying when you need something now-now.",
    instructions: "Fill the tortilla with cheese, fold it, and toast both sides until the cheese melts through."
  },
  {
    name: "Garlic Butter Shrimp Skillet",
    ingredients: ["shrimp", "garlic", "butter"],
    category: "quick",
    emoji: "🍤",
    vibe: "Date Night",
    cookTime: "12 min",
    difficulty: "Easy",
    description: "Quick shrimp with buttery garlic flavor that feels way more expensive than it is.",
    instructions: "Melt butter, cook garlic gently, then add shrimp and cook until just pink and tender."
  },
  {
    name: "Late Night Buttered Noodles",
    ingredients: ["noodles", "butter", "parmesan"],
    category: "quick",
    emoji: "🍜",
    vibe: "Late Night",
    cookTime: "12 min",
    difficulty: "Easy",
    description: "That no-drama comfort bowl for when you just need something warm and good.",
    instructions: "Cook the noodles, toss them with butter, then hit them with parmesan while everything’s still hot."
  },
  {
    name: "Mushroom Garlic Pasta",
    ingredients: ["mushrooms", "pasta", "garlic"],
    category: "quick",
    emoji: "🍝",
    vibe: "Comfort",
    cookTime: "18 min",
    difficulty: "Easy",
    description: "Quick pasta with real flavor and a little earthy richness from the mushrooms.",
    instructions: "Cook the mushrooms with garlic first, then toss everything with hot pasta and season well."
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
  updateRecommendations();
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
      updateRecommendations();
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
    updateRecommendations();
  }

  input.value = "";
}

function selectCategory(category, button) {
  selectedCategory = category;

  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach(btn => btn.classList.remove("active-category"));

  button.classList.add("active-category");
  updateRecommendations();
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
      <div class="meal-ingredients">
        Vibe: ${recipe.vibe} • ${recipe.cookTime} • ${recipe.difficulty}
      </div>
      <div class="meal-ingredients">${recipe.description}</div>
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

function updateRecommendations() {
  const recommendedResults = document.getElementById("recommendedResults");
  recommendedResults.innerHTML = "";

  if (selectedIngredients.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Pick some ingredients and we’ll suggest meals you might like.";
    recommendedResults.appendChild(li);
    return;
  }

  const scoredRecipes = recipes
    .map(recipe => {
      const normalizedRecipeIngredients = recipe.ingredients.map(ingredient =>
        normalizeIngredient(ingredient)
      );

      const matchedCount = normalizedRecipeIngredients.filter(ingredient =>
        selectedIngredients.includes(ingredient)
      ).length;

      const categoryMatch =
        selectedCategory === "all" || recipe.category === selectedCategory;

      return {
        recipe,
        matchedCount,
        totalIngredients: normalizedRecipeIngredients.length,
        categoryMatch
      };
    })
    .filter(item => item.categoryMatch && item.matchedCount > 0)
    .sort((a, b) => b.matchedCount - a.matchedCount || a.totalIngredients - b.totalIngredients)
    .slice(0, 3);

  if (scoredRecipes.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No recommendations yet. Try a different ingredient combo.";
    recommendedResults.appendChild(li);
    return;
  }

  scoredRecipes.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="meal-card" onclick="openModal('${item.recipe.name.replace(/'/g, "\\'")}')">
        <div class="meal-header">
          <div class="meal-title">${item.recipe.emoji} ${item.recipe.name}</div>
          <span class="favorite-btn" onclick="event.stopPropagation(); saveFavorite('${item.recipe.name.replace(/'/g, "\\'")}')">❤️</span>
        </div>
        <div class="meal-category">${item.recipe.category}</div>
        <div class="meal-ingredients">Vibe: ${item.recipe.vibe} • Matched ingredients: ${item.matchedCount}</div>
        <div class="meal-ingredients">${item.recipe.description}</div>
        <div class="meal-actions">
          <button class="add-grocery-btn" onclick="event.stopPropagation(); addMealToGroceryList('${item.recipe.name.replace(/'/g, "\\'")}')">Add to Grocery List</button>
        </div>
      </div>
    `;
    recommendedResults.appendChild(li);
  });
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
  document.getElementById("modalCategory").textContent = `Category: ${recipe.category} • ${recipe.vibe} • ${recipe.cookTime} • ${recipe.difficulty}`;
  document.getElementById("modalIngredients").textContent = `Ingredients: ${recipe.ingredients.join(", ")}`;
  document.getElementById("modalInstructions").textContent = `${recipe.description} ${recipe.instructions}`;

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
  document.getElementById("recommendedResults").innerHTML = "";

  const ingredientButtons = document.querySelectorAll(".ingredient-btn");
  ingredientButtons.forEach(button => button.classList.remove("selected"));

  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach(button => button.classList.remove("active-category"));

  categoryButtons[0].classList.add("active-category");
  updateRecommendations();
}

window.onload = function () {
  loadFavorites();
  loadGroceryList();
  updateRecommendations();
};
