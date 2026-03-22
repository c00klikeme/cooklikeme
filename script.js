const ingredientGroupsData = {
  "Proteins": [
    "chicken", "fried chicken", "shrimp", "salmon", "fish", "tilapia",
    "ground beef", "steak", "pork chops", "sausage", "eggs", "turkey", "lamb chops"
  ],
  "Carbs & Bases": [
    "rice", "beans", "macaroni", "ziti", "pasta", "bread",
    "tortilla", "fries", "mashed potatoes", "plantain", "yellow rice",
    "white rice", "egg noodles", "wrap", "toast", "grits"
  ],
  "Dairy & Rich Stuff": [
    "cheddar", "mozzarella", "parmesan", "butter", "milk",
    "heavy cream", "sour cream", "cream cheese", "american cheese"
  ],
  "Veggies & Herbs": [
    "onion", "garlic", "spinach", "broccoli", "bell pepper",
    "tomato", "lettuce", "cabbage", "scallion", "thyme", "cilantro",
    "mushrooms", "corn", "green beans", "carrots", "celery"
  ],
  "Seasonings": [
    "salt", "black pepper", "cajun seasoning", "paprika",
    "garlic powder", "onion powder", "curry powder", "jerk seasoning",
    "italian seasoning", "red pepper flakes", "seasoned salt",
    "adobo", "old bay", "lemon pepper", "oregano", "thyme seasoning",
    "creole seasoning", "smoked paprika"
  ],
  "Sauces & Flavor Bases": [
    "tomato sauce", "alfredo sauce", "hot sauce", "soy sauce",
    "coconut milk", "bbq sauce", "gravy", "lime", "lemon",
    "brown stew sauce", "honey garlic sauce", "buffalo sauce",
    "garlic butter", "marinara", "jerk sauce"
  ]
};

const meals = [
  {
    id: "meal-1",
    title: "Smothered Chicken Over Rice",
    category: "Dinner",
    vibes: ["Soul Food", "Comfort"],
    ingredients: ["chicken", "rice", "onion", "garlic", "butter", "gravy", "black pepper", "salt"],
    description: "Tender chicken cooked down with onion and garlic, then smothered in rich gravy over hot rice. Straight comfort.",
    instructions: "Season the chicken, sear it, cook onion and garlic in the pan, add gravy, then let everything simmer until tender. Spoon over rice."
  },
  {
    id: "meal-2",
    title: "Garlic Parmesan Pasta",
    category: "Dinner",
    vibes: ["Italian Night", "Comfort"],
    ingredients: ["pasta", "garlic", "butter", "parmesan", "black pepper", "salt"],
    description: "Buttery pasta with garlic and parmesan that tastes way bigger than the ingredient list.",
    instructions: "Boil pasta. Melt butter, sauté garlic, toss in pasta, add parmesan, salt, and pepper, then mix until glossy."
  },
  {
    id: "meal-3",
    title: "Steak and Rice Plate",
    category: "Dinner",
    vibes: ["Comfort"],
    ingredients: ["steak", "rice", "butter", "garlic", "black pepper", "salt"],
    description: "Pan-seared steak with butter over hot rice. Simple, heavy, and it hits every time.",
    instructions: "Season steak, sear in butter, add garlic near the end, rest the steak, then serve over rice."
  },
  {
    id: "meal-4",
    title: "Shrimp Alfredo",
    category: "Dinner",
    vibes: ["Italian Night", "Seafood"],
    ingredients: ["shrimp", "pasta", "alfredo sauce", "garlic", "parmesan", "black pepper"],
    description: "Creamy shrimp pasta that feels like you bought it, but better because it came out your own kitchen.",
    instructions: "Cook pasta. Sauté shrimp with garlic, add alfredo sauce, toss with pasta, finish with parmesan."
  },
  {
    id: "meal-5",
    title: "Chicken Tacos",
    category: "Lunch",
    vibes: ["Taco Night", "Quick Bite"],
    ingredients: ["chicken", "tortilla", "lettuce", "tomato", "cheddar", "sour cream"],
    description: "Loaded chicken tacos with cool, creamy toppings and enough flavor to make a second round mandatory.",
    instructions: "Cook and season chicken, warm tortillas, then load up with lettuce, tomato, cheddar, and sour cream."
  },
  {
    id: "meal-6",
    title: "Steak Tacos",
    category: "Dinner",
    vibes: ["Taco Night"],
    ingredients: ["steak", "tortilla", "onion", "cilantro", "lime"],
    description: "Street-style steak tacos with onion, cilantro, and lime. Clean, sharp, and hard to mess up.",
    instructions: "Sear steak, chop it, warm tortillas, then top with onion, cilantro, and lime."
  },
  {
    id: "meal-7",
    title: "Curry Chicken with Rice",
    category: "Dinner",
    vibes: ["Island", "Spicy"],
    ingredients: ["chicken", "rice", "curry powder", "onion", "garlic", "thyme", "coconut milk"],
    description: "Island-style curry chicken with real warmth and a rich sauce over rice. This one got presence.",
    instructions: "Season chicken with curry powder, sauté onion, garlic, and thyme, add coconut milk, simmer, then serve over rice."
  },
  {
    id: "meal-8",
    title: "Plantain, Rice and Beans Plate",
    category: "Lunch",
    vibes: ["Island", "Comfort"],
    ingredients: ["plantain", "rice", "beans", "thyme", "garlic", "onion"],
    description: "Sweet plantain next to savory rice and beans. Easy plate, real flavor, no fake restaurant talk needed.",
    instructions: "Cook rice and beans with onion, garlic, and thyme. Pan-fry plantain until caramelized and serve together."
  },
  {
    id: "meal-9",
    title: "Baked Ziti Vibes",
    category: "Dinner",
    vibes: ["Italian Night", "Comfort"],
    ingredients: ["ziti", "tomato sauce", "mozzarella", "parmesan", "garlic", "italian seasoning"],
    description: "Cheesy baked ziti energy without doing the most. Saucy, baked, and made for seconds.",
    instructions: "Cook ziti, mix with tomato sauce and seasoning, layer with cheese, and bake until bubbling."
  },
  {
    id: "meal-10",
    title: "Fried Fish and Fries",
    category: "Dinner",
    vibes: ["Seafood", "Comfort"],
    ingredients: ["fish", "fries", "cajun seasoning", "salt", "black pepper", "lemon"],
    description: "Crispy fish with fries and a squeeze of lemon. Grease on the fingers type of plate.",
    instructions: "Season fish, fry until crisp, cook fries, and finish with lemon."
  },
  {
    id: "meal-11",
    title: "Beef and Mac",
    category: "Quick",
    vibes: ["Soul Food", "Comfort", "Quick Bite"],
    ingredients: ["ground beef", "macaroni", "cheddar", "onion", "garlic", "black pepper"],
    description: "Ground beef folded into cheesy mac. Fast, filling, and not playing around.",
    instructions: "Cook beef with onion and garlic, boil macaroni, stir in cheddar, then combine."
  },
  {
    id: "meal-12",
    title: "Wings and Fries",
    category: "Quick",
    vibes: ["Spicy", "Quick Bite", "Comfort"],
    ingredients: ["fried chicken", "fries", "hot sauce", "cajun seasoning"],
    description: "A hot, crispy wing-and-fries kind of mood. Loud plate, no apology.",
    instructions: "Heat or fry chicken, toss in hot sauce and cajun seasoning, then serve with fries."
  },
  {
    id: "meal-13",
    title: "Breakfast Eggs and Potatoes",
    category: "Breakfast",
    vibes: ["Comfort", "Quick Bite"],
    ingredients: ["eggs", "mashed potatoes", "butter", "black pepper", "salt"],
    description: "Warm, simple breakfast fuel that gets the job done without feeling boring.",
    instructions: "Cook eggs how you like, warm the potatoes with butter, and plate together."
  },
  {
    id: "meal-14",
    title: "Sausage and Peppers Pasta",
    category: "Dinner",
    vibes: ["Italian Night", "Comfort"],
    ingredients: ["sausage", "pasta", "bell pepper", "onion", "garlic", "tomato sauce"],
    description: "Savory sausage pasta with peppers and sauce. Weeknight food with some swagger on it.",
    instructions: "Brown sausage, cook peppers and onion, add garlic and sauce, then toss with pasta."
  },
  {
    id: "meal-15",
    title: "Salmon Rice Bowl",
    category: "Lunch",
    vibes: ["Seafood", "Quick Bite"],
    ingredients: ["salmon", "rice", "garlic", "soy sauce", "scallion", "lime"],
    description: "A smooth salmon rice bowl with a salty-sweet glaze and fresh kick on top.",
    instructions: "Cook salmon, make rice, drizzle with soy sauce, and finish with scallion and lime."
  },
  {
    id: "meal-16",
    title: "Shrimp Tacos",
    category: "Lunch",
    vibes: ["Taco Night", "Seafood", "Spicy"],
    ingredients: ["shrimp", "tortilla", "cabbage", "lime", "sour cream", "cajun seasoning"],
    description: "Shrimp tacos with crunch, heat, and cool sauce. Real good, real fast.",
    instructions: "Season and cook shrimp, warm tortillas, then stack with cabbage, sour cream, and lime."
  },
  {
    id: "meal-17",
    title: "Jerk Chicken Plate",
    category: "Dinner",
    vibes: ["Island", "Spicy"],
    ingredients: ["chicken", "rice", "jerk seasoning", "jerk sauce", "scallion", "thyme"],
    description: "Jerk chicken over rice with smoky heat and that island kick that tells the whole room what time it is.",
    instructions: "Season chicken with jerk seasoning, cook it down, brush with jerk sauce, and serve over rice with scallion and thyme."
  },
  {
    id: "meal-18",
    title: "Pork Chops and Mashed Potatoes",
    category: "Dinner",
    vibes: ["Soul Food", "Comfort"],
    ingredients: ["pork chops", "mashed potatoes", "butter", "garlic", "black pepper", "seasoned salt"],
    description: "Juicy pork chops over buttery mashed potatoes. Real dinner-table food.",
    instructions: "Season and sear pork chops, warm the potatoes with butter, then plate everything hot."
  },
  {
    id: "meal-19",
    title: "Buffalo Chicken Wrap",
    category: "Lunch",
    vibes: ["Spicy", "Quick Bite"],
    ingredients: ["fried chicken", "wrap", "buffalo sauce", "lettuce", "sour cream"],
    description: "Buffalo chicken wrap energy. Messy, quick, and absolutely not a one-bite situation.",
    instructions: "Toss chicken in buffalo sauce, load the wrap with lettuce and sour cream, then roll it up."
  },
  {
    id: "meal-20",
    title: "Turkey Rice Bowl",
    category: "Quick",
    vibes: ["Quick Bite", "Comfort"],
    ingredients: ["turkey", "rice", "onion", "garlic", "soy sauce", "black pepper"],
    description: "A fast turkey rice bowl with enough flavor to save you from another boring meal.",
    instructions: "Cook turkey with onion and garlic, add soy sauce and black pepper, then spoon over rice."
  },
  {
    id: "meal-21",
    title: "Lamb Chops and Yellow Rice",
    category: "Dinner",
    vibes: ["Comfort"],
    ingredients: ["lamb chops", "yellow rice", "garlic", "butter", "oregano", "black pepper"],
    description: "Lamb chops over yellow rice with buttery garlic flavor. Smooth plate. Grown plate.",
    instructions: "Season lamb chops, sear them, cook yellow rice, then finish with butter and garlic."
  },
  {
    id: "meal-22",
    title: "Creamy Spinach Salmon Pasta",
    category: "Dinner",
    vibes: ["Seafood", "Italian Night"],
    ingredients: ["salmon", "pasta", "heavy cream", "spinach", "garlic", "parmesan"],
    description: "Creamy salmon pasta with spinach that feels rich without getting corny about it.",
    instructions: "Cook pasta, sear salmon, sauté garlic and spinach, add cream, then fold everything together with parmesan."
  },
  {
    id: "meal-23",
    title: "Shrimp Fried Rice Vibes",
    category: "Quick",
    vibes: ["Seafood", "Quick Bite"],
    ingredients: ["shrimp", "rice", "soy sauce", "onion", "garlic", "scallion"],
    description: "Quick shrimp fried rice energy. Good use of leftovers, even better when it’s fresh.",
    instructions: "Cook shrimp, stir-fry rice with onion and garlic, add soy sauce, then finish with scallion."
  },
  {
    id: "meal-24",
    title: "Mac and Cheese Bowl",
    category: "Dinner",
    vibes: ["Soul Food", "Comfort"],
    ingredients: ["macaroni", "cheddar", "milk", "butter", "seasoned salt", "black pepper"],
    description: "Creamy mac and cheese that doesn’t need a holiday to justify itself.",
    instructions: "Boil macaroni, make a quick cheese sauce with butter and milk, then stir everything together and season."
  },
  {
    id: "meal-25",
    title: "Fish Tacos",
    category: "Lunch",
    vibes: ["Taco Night", "Seafood"],
    ingredients: ["fish", "tortilla", "cabbage", "lime", "cajun seasoning", "sour cream"],
    description: "Fish tacos with crunch, tang, and the kind of flavor that disappears fast.",
    instructions: "Season and cook the fish, warm tortillas, then top with cabbage, lime, and sour cream."
  },
  {
    id: "meal-26",
    title: "Brown Stew Chicken Plate",
    category: "Dinner",
    vibes: ["Island", "Comfort"],
    ingredients: ["chicken", "brown stew sauce", "onion", "garlic", "thyme", "rice"],
    description: "Brown stew chicken over rice with deep flavor and proper island comfort in it.",
    instructions: "Brown the chicken, cook it down with onion, garlic, thyme, and brown stew sauce, then serve over rice."
  },
  {
    id: "meal-27",
    title: "Cheesesteak Rice Plate",
    category: "Dinner",
    vibes: ["Comfort", "Quick Bite"],
    ingredients: ["steak", "rice", "onion", "bell pepper", "american cheese", "garlic"],
    description: "Cheesesteak plate energy over rice. Different lane, same satisfaction.",
    instructions: "Cook steak with onion and peppers, melt cheese into it, then serve over rice."
  },
  {
    id: "meal-28",
    title: "Eggs, Grits and Sausage",
    category: "Breakfast",
    vibes: ["Soul Food", "Comfort"],
    ingredients: ["eggs", "grits", "sausage", "butter", "salt", "black pepper"],
    description: "Warm breakfast with soul. Nothing fancy, just good.",
    instructions: "Cook the grits, brown the sausage, make the eggs, and plate it all together hot."
  }
];

const builderOptions = {
  proteins: ["chicken", "fried chicken", "shrimp", "salmon", "fish", "tilapia", "ground beef", "steak", "pork chops", "sausage", "turkey", "lamb chops"],
  bases: ["rice", "yellow rice", "white rice", "pasta", "ziti", "macaroni", "fries", "mashed potatoes", "beans", "plantain", "tortilla", "bread", "wrap", "grits", "egg noodles"],
  sides: [
    "macaroni", "fries", "plantain", "green beans", "corn", "broccoli",
    "mashed potatoes", "beans", "toast", "cabbage", "rice", "grits"
  ],
  veggies: ["onion", "garlic", "spinach", "broccoli", "bell pepper", "tomato", "lettuce", "cabbage", "scallion", "thyme", "cilantro", "mushrooms", "corn", "green beans", "carrots", "celery"],
  sauces: ["gravy", "alfredo sauce", "tomato sauce", "hot sauce", "soy sauce", "coconut milk", "bbq sauce", "lime", "lemon", "brown stew sauce", "honey garlic sauce", "buffalo sauce", "garlic butter", "marinara", "jerk sauce"],
  seasonings: ["cajun seasoning", "paprika", "garlic powder", "onion powder", "curry powder", "jerk seasoning", "italian seasoning", "red pepper flakes", "seasoned salt", "adobo", "old bay", "lemon pepper", "oregano", "creole seasoning", "smoked paprika"]
};

const groceryGroupLookup = {
  "Proteins": ingredientGroupsData["Proteins"],
  "Carbs & Bases": ingredientGroupsData["Carbs & Bases"],
  "Dairy & Rich Stuff": ingredientGroupsData["Dairy & Rich Stuff"],
  "Veggies & Herbs": ingredientGroupsData["Veggies & Herbs"],
  "Seasonings": ingredientGroupsData["Seasonings"],
  "Sauces & Flavor Bases": ingredientGroupsData["Sauces & Flavor Bases"]
};

const seasoningSet = new Set(ingredientGroupsData["Seasonings"].map(item => item.toLowerCase()));
const sauceSet = new Set(ingredientGroupsData["Sauces & Flavor Bases"].map(item => item.toLowerCase()));

let selectedIngredients = JSON.parse(localStorage.getItem("cookLikeMe_selectedIngredients")) || [];
let favorites = JSON.parse(localStorage.getItem("cookLikeMe_favorites")) || [];
let groceryList = JSON.parse(localStorage.getItem("cookLikeMe_groceryList")) || [];
let selectedCategory = "All";
let selectedVibe = "All";

const ingredientGroupsEl = document.getElementById("ingredientGroups");
const selectedIngredientsEl = document.getElementById("selectedIngredients");
const resultsEl = document.getElementById("results");
const favoritesListEl = document.getElementById("favoritesList");
const groceryListEl = document.getElementById("groceryList");
const customIngredientInput = document.getElementById("customIngredientInput");
const addCustomIngredientBtn = document.getElementById("addCustomIngredientBtn");
const findMealsBtn = document.getElementById("findMealsBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const clearIngredientsBtn = document.getElementById("clearIngredientsBtn");
const clearGroceryBtn = document.getElementById("clearGroceryBtn");
const categoryFilters = document.getElementById("categoryFilters");
const vibeFilters = document.getElementById("vibeFilters");
const clearVibesBtn = document.getElementById("clearVibesBtn");
const mealModal = document.getElementById("mealModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBackdrop = document.getElementById("modalBackdrop");
const scrollToBuilderBtn = document.getElementById("scrollToBuilderBtn");
const bestMatchTonightEl = document.getElementById("bestMatchTonight");

const builderProtein = document.getElementById("builderProtein");
const builderBase = document.getElementById("builderBase");
const builderSide = document.getElementById("builderSide");
const builderVeggies = document.getElementById("builderVeggies");
const builderSauce = document.getElementById("builderSauce");
const builderSeasoning = document.getElementById("builderSeasoning");
const builderVibe = document.getElementById("builderVibe");
const generatePlateBtn = document.getElementById("generatePlateBtn");
const plateResult = document.getElementById("plateResult");

function saveSelectedIngredients() {
  localStorage.setItem("cookLikeMe_selectedIngredients", JSON.stringify(selectedIngredients));
}

function saveFavorites() {
  localStorage.setItem("cookLikeMe_favorites", JSON.stringify(favorites));
}

function saveGroceryList() {
  localStorage.setItem("cookLikeMe_groceryList", JSON.stringify(groceryList));
}

function normalize(text) {
  return text.trim().toLowerCase();
}

function titleCase(text) {
  return text
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function renderIngredientGroups() {
  ingredientGroupsEl.innerHTML = "";

  Object.entries(ingredientGroupsData).forEach(([groupName, items]) => {
    const group = document.createElement("div");
    group.className = "ingredient-group";

    const title = document.createElement("h3");
    title.textContent = groupName;

    const buttonsWrap = document.createElement("div");
    buttonsWrap.className = "ingredient-buttons";

    items.forEach((item) => {
      const btn = document.createElement("button");
      btn.className = "ingredient-btn";
      btn.textContent = item;

      if (selectedIngredients.includes(item)) {
        btn.classList.add("active");
      }

      btn.addEventListener("click", () => toggleIngredient(item));
      buttonsWrap.appendChild(btn);
    });

    group.appendChild(title);
    group.appendChild(buttonsWrap);
    ingredientGroupsEl.appendChild(group);
  });
}

function renderSelectedIngredients() {
  selectedIngredientsEl.innerHTML = "";

  if (!selectedIngredients.length) {
    selectedIngredientsEl.innerHTML = `
      <div class="empty-state">
        No ingredients picked yet. Start with what’s already in your kitchen, then hit Find Meals.
      </div>
    `;
    return;
  }

  selectedIngredients.forEach((ingredient) => {
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerHTML = `
      <span>${ingredient}</span>
      <button data-ingredient="${ingredient}">&times;</button>
    `;

    tag.querySelector("button").addEventListener("click", () => removeIngredient(ingredient));
    selectedIngredientsEl.appendChild(tag);
  });
}

function updateFiltersUI() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.category === selectedCategory) {
      btn.classList.add("active");
    }
  });

  document.querySelectorAll(".vibe-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.vibe === selectedVibe) {
      btn.classList.add("active");
    }
  });
}

function toggleIngredient(ingredient) {
  if (selectedIngredients.includes(ingredient)) {
    selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
  } else {
    selectedIngredients.push(ingredient);
  }

  saveSelectedIngredients();
  renderIngredientGroups();
  renderSelectedIngredients();
}

function removeIngredient(ingredient) {
  selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
  saveSelectedIngredients();
  renderIngredientGroups();
  renderSelectedIngredients();
}

function addCustomIngredient() {
  const value = normalize(customIngredientInput.value);
  if (!value) return;

  if (!selectedIngredients.includes(value)) {
    selectedIngredients.push(value);
    saveSelectedIngredients();
  }

  customIngredientInput.value = "";
  renderIngredientGroups();
  renderSelectedIngredients();
}

function getFilteredMeals() {
  let filtered = meals;

  if (selectedCategory !== "All") {
    filtered = filtered.filter(meal => meal.category === selectedCategory);
  }

  if (selectedVibe !== "All") {
    filtered = filtered.filter(meal => meal.vibes && meal.vibes.includes(selectedVibe));
  }

  return filtered;
}

function scoreMeal(meal) {
  const userSet = new Set(selectedIngredients.map(normalize));
  const mealIngredients = meal.ingredients.map(normalize);

  const matched = mealIngredients.filter(ingredient => userSet.has(ingredient));
  const missing = mealIngredients.filter(ingredient => !userSet.has(ingredient));
  const missingSeasonings = missing.filter(item => seasoningSet.has(item) || sauceSet.has(item));
  const missingCore = missing.filter(item => !seasoningSet.has(item) && !sauceSet.has(item));

  let label = "Best Fit";
  let labelReason = "";
  let priorityScore = matched.length;

  if (missing.length === 0) {
    label = "Exact Match";
    labelReason = "You already have everything for this.";
    priorityScore += 100;
  } else if (missingCore.length === 0 && matched.length >= 2) {
    label = "Almost There";
    labelReason = "The main ingredients are covered — you’re mostly missing seasoning or sauce.";
    priorityScore += 75;
  } else if (missing.length <= 2 && matched.length >= 2) {
    label = "Close Match";
    labelReason = `You’re only missing ${missing.join(", ")}.`;
    priorityScore += 50;
  } else if (matched.length >= 2) {
    label = "Best Fit";
    labelReason = `${matched.length} ingredients already line up with this one.`;
    priorityScore += 20;
  } else {
    labelReason = "Not enough overlap yet.";
  }

  if (meal.vibes && meal.vibes.includes(selectedVibe) && selectedVibe !== "All") {
    priorityScore += 15;
  }

  return {
    matchedCount: matched.length,
    missingCount: missing.length,
    matched,
    missing,
    missingSeasonings,
    missingCore,
    total: mealIngredients.length,
    label,
    labelReason,
    priorityScore
  };
}

function findMeals() {
  const filteredMeals = getFilteredMeals();

  const scoredMeals = filteredMeals
    .map(meal => ({ meal, score: scoreMeal(meal) }))
    .filter(item => item.score.matchedCount >= 2 || item.score.missingCount === 0)
    .sort((a, b) => b.score.priorityScore - a.score.priorityScore);

  renderBestMatch(scoredMeals[0] || null);
  renderResults(scoredMeals);
}

function renderBestMatch(item) {
  bestMatchTonightEl.innerHTML = "";

  if (!selectedIngredients.length) {
    bestMatchTonightEl.innerHTML = `
      <div class="empty-state">
        Pick a few ingredients to unlock your strongest match, or use Surprise Me if you just want an idea.
      </div>
    `;
    return;
  }

  if (!item) {
    bestMatchTonightEl.innerHTML = `
      <div class="empty-state">
        Nothing strong is lining up yet. Add a couple more ingredients or clear your vibe filter and try again.
      </div>
    `;
    return;
  }

  const { meal, score } = item;

  let missingText = "";
  if (score.missingCount === 0) {
    missingText = "You have everything for this plate.";
  } else if (score.missingCore.length === 0 && score.missingSeasonings.length) {
    missingText = `Main ingredients are covered. Only missing: ${score.missingSeasonings.join(", ")}.`;
  } else {
    missingText = `Missing: ${score.missing.join(", ")}.`;
  }

  bestMatchTonightEl.innerHTML = `
    <div class="best-match-card">
      <div class="card-topline">${score.label}</div>
      <h3>${meal.title}</h3>
      <p>${meal.description}</p>

      <div class="card-meta">
        <span class="meta-pill good">${meal.category}</span>
        <span class="meta-pill">${meal.vibes.join(" • ")}</span>
        <span class="meta-pill">${score.matchedCount}/${score.total} matched</span>
      </div>

      <p><strong>Why it works:</strong> ${score.labelReason}</p>
      <p><strong>What you’re missing:</strong> ${missingText}</p>

      <div class="card-actions">
        <button class="btn btn-secondary" id="bestMatchViewBtn">View Meal</button>
        <button class="btn btn-ghost" id="bestMatchFavoriteBtn">${isFavorite(meal.id) ? "Saved ♥" : "Save ♥"}</button>
        <button class="btn btn-primary" id="bestMatchGroceryBtn">Add to Grocery</button>
      </div>
    </div>
  `;

  document.getElementById("bestMatchViewBtn").addEventListener("click", () => openMealModal(meal));
  document.getElementById("bestMatchFavoriteBtn").addEventListener("click", () => toggleFavorite(meal));
  document.getElementById("bestMatchGroceryBtn").addEventListener("click", () => addIngredientsToGrocery(meal.ingredients));
}

function renderResults(items) {
  resultsEl.innerHTML = "";

  if (!selectedIngredients.length) {
    resultsEl.innerHTML = `
      <div class="empty-state">
        Pick ingredients to get smarter matches, or hit Surprise Me if you want a quick idea first.
      </div>
    `;
    return;
  }

  if (!items.length) {
    resultsEl.innerHTML = `
      <div class="empty-state">
        Nothing lined up yet. Add a few more ingredients, switch the vibe, or build your own plate instead.
      </div>
    `;
    return;
  }

  items.forEach(({ meal, score }) => {
    const card = document.createElement("div");
    card.className = "meal-card";

    let missingHtml = "";
    if (score.missingCount === 0) {
      missingHtml = `<p><strong>You have everything for this one.</strong></p>`;
    } else if (score.missingCore.length === 0 && score.missingSeasonings.length) {
      missingHtml = `<p><strong>Main ingredients covered.</strong> Only missing seasonings or sauce: ${score.missingSeasonings.join(", ")}</p>`;
    } else {
      missingHtml = `<p><strong>Missing:</strong> ${score.missing.join(", ")}</p>`;
    }

    card.innerHTML = `
      <div class="card-topline">${score.label}</div>
      <h3>${meal.title}</h3>
      <p>${meal.description}</p>

      <div class="card-meta">
        <span class="meta-pill">${meal.category}</span>
        <span class="meta-pill">${meal.vibes.join(" • ")}</span>
        <span class="meta-pill ${score.label === "Exact Match" || score.label === "Almost There" ? "good" : "warn"}">${score.matchedCount}/${score.total} matched</span>
      </div>

      <p><strong>Why it works:</strong> ${score.labelReason}</p>
      ${missingHtml}

      <div class="card-actions">
        <button class="btn btn-secondary view-btn">View Meal</button>
        <button class="btn btn-ghost favorite-btn">${isFavorite(meal.id) ? "Saved ♥" : "Save ♥"}</button>
        <button class="btn btn-primary grocery-btn">Add to Grocery</button>
      </div>
    `;

    card.querySelector(".view-btn").addEventListener("click", () => openMealModal(meal));
    card.querySelector(".favorite-btn").addEventListener("click", () => toggleFavorite(meal));
    card.querySelector(".grocery-btn").addEventListener("click", () => addIngredientsToGrocery(meal.ingredients));

    resultsEl.appendChild(card);
  });
}

function openMealModal(meal) {
  modalBody.innerHTML = `
    <h2 class="modal-title">${meal.title}</h2>
    <p class="card-topline">${meal.category}</p>
    <p>${meal.description}</p>

    <div class="card-meta">
      <span class="meta-pill">${meal.ingredients.length} ingredients</span>
      <span class="meta-pill">${meal.vibes ? meal.vibes.join(" • ") : "Custom Plate"}</span>
    </div>

    <div class="modal-section-label">Ingredients</div>
    <ul class="modal-body-list">
      ${meal.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
    </ul>

    <div class="modal-section-label">How It Comes Together</div>
    <p>${meal.instructions}</p>

    <div class="card-actions">
      <button class="btn btn-ghost" id="modalFavoriteBtn">${isFavorite(meal.id) ? "Saved ♥" : "Save ♥"}</button>
      <button class="btn btn-primary" id="modalGroceryBtn">Add to Grocery</button>
    </div>
  `;

  mealModal.classList.remove("hidden");

  document.getElementById("modalFavoriteBtn").addEventListener("click", () => toggleFavorite(meal));
  document.getElementById("modalGroceryBtn").addEventListener("click", () => addIngredientsToGrocery(meal.ingredients));
}

function closeModal() {
  mealModal.classList.add("hidden");
}

function isFavorite(mealId) {
  return favorites.some(meal => meal.id === mealId);
}

function toggleFavorite(meal) {
  if (isFavorite(meal.id)) {
    favorites = favorites.filter(fav => fav.id !== meal.id);
  } else {
    favorites.push(meal);
  }

  saveFavorites();
  renderFavorites();
  findMeals();
}

function renderFavorites() {
  favoritesListEl.innerHTML = "";

  if (!favorites.length) {
    favoritesListEl.innerHTML = `
      <div class="empty-state">
        No favorites yet. Save the meals you’d actually run back.
      </div>
    `;
    return;
  }

  favorites.forEach((meal) => {
    const card = document.createElement("div");
    card.className = "favorite-card";
    card.innerHTML = `
      <h3>${meal.title}</h3>
      <p>${meal.description}</p>
      <div class="card-actions">
        <button class="btn btn-secondary">View</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    card.querySelector(".btn").addEventListener("click", () => openMealModal(meal));
    card.querySelector(".remove-btn").addEventListener("click", () => {
      favorites = favorites.filter(fav => fav.id !== meal.id);
      saveFavorites();
      renderFavorites();
      findMeals();
    });

    favoritesListEl.appendChild(card);
  });
}

function addIngredientsToGrocery(ingredients) {
  ingredients.forEach((item) => {
    const cleanItem = normalize(item);
    if (!groceryList.includes(cleanItem)) {
      groceryList.push(cleanItem);
    }
  });

  saveGroceryList();
  renderGroceryList();
}

function getGroceryGroup(item) {
  for (const [groupName, items] of Object.entries(groceryGroupLookup)) {
    if (items.includes(item)) return groupName;
  }
  return "Other";
}

function renderGroceryList() {
  groceryListEl.innerHTML = "";

  if (!groceryList.length) {
    groceryListEl.innerHTML = `
      <div class="empty-state">
        Your grocery list is empty. Add ingredients from meals or custom plates and they’ll show up here.
      </div>
    `;
    return;
  }

  const grouped = {};

  groceryList.forEach((item) => {
    const group = getGroceryGroup(item);
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(item);
  });

  Object.entries(grouped).forEach(([group, items]) => {
    const wrap = document.createElement("div");
    wrap.className = "grocery-group";
    wrap.innerHTML = `
      <h4>${group}</h4>
      <ul>
        ${items.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;
    groceryListEl.appendChild(wrap);
  });
}

function populateBuilderOptions() {
  fillSelect(builderProtein, builderOptions.proteins, false, "Pick a protein");
  fillSelect(builderBase, builderOptions.bases, false, "Pick a base");
  fillSelect(builderSide, builderOptions.sides, false, "Pick a side");
  fillSelect(builderSauce, builderOptions.sauces, false, "Pick a sauce or flavor");
  fillSelect(builderSeasoning, builderOptions.seasonings, false, "Pick a seasoning");
  fillSelect(builderVeggies, builderOptions.veggies, true);
}

function fillSelect(selectEl, options, isMultiple = false, placeholder = "") {
  selectEl.innerHTML = "";

  if (!isMultiple && placeholder) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = placeholder;
    selectEl.appendChild(option);
  }

  options.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    selectEl.appendChild(option);
  });
}

function getSelectedMultiple(selectEl) {
  return Array.from(selectEl.selectedOptions).map(option => option.value);
}

function generatePlate() {
  const protein = builderProtein.value;
  const base = builderBase.value;
  const side = builderSide.value;
  const veggies = getSelectedMultiple(builderVeggies);
  const sauce = builderSauce.value;
  const seasoning = builderSeasoning.value;
  const vibe = builderVibe.value;

  if (!protein || !base || !side || !sauce || !seasoning) {
    plateResult.classList.remove("hidden");
    plateResult.innerHTML = `
      <div class="empty-state">
        Pick a protein, base, side, sauce, and seasoning so your plate comes out like a full meal instead of half an idea.
      </div>
    `;
    return;
  }

  const plate = buildPlateData({ protein, base, side, veggies, sauce, seasoning, vibe });
  renderPlateResult(plate);
}

function buildPlateData({ protein, base, side, veggies, sauce, seasoning, vibe }) {
  const proteinCaps = titleCase(protein);
  const baseCaps = titleCase(base);
  const sideCaps = titleCase(side);

  let title = "";
  let description = "";
  let difficulty = "Easy";
  let cookTime = "25–35 mins";

  if (vibe === "Island") {
    title = `${proteinCaps} with ${baseCaps} and ${sideCaps}`;
    description = `${proteinCaps} cooked with ${seasoning} and ${sauce}, served with ${base} and ${side}. ${veggies.length ? `Finished with ${veggies.join(", ")}.` : "Built like a proper island plate."} Real plate energy.`;
    difficulty = "Medium";
    cookTime = "30–40 mins";
  } else if (vibe === "Italian Night") {
    title = `${proteinCaps} ${baseCaps} Plate with ${sideCaps}`;
    description = `${proteinCaps} hit with ${seasoning}, brought together with ${sauce}, paired with ${base}, and backed up by ${side}. Rich, warm, and easy to run back.`;
  } else if (vibe === "Taco Night") {
    title = `${proteinCaps} Taco Plate with ${sideCaps}`;
    description = `${proteinCaps} seasoned with ${seasoning}, loaded with ${sauce}, built around ${base}, and served with ${side}. ${veggies.length ? `Extras like ${veggies.join(", ")} keep it loud.` : "This one is built to disappear fast."}`;
    cookTime = "20–30 mins";
  } else if (vibe === "Seafood") {
    title = `${proteinCaps} Plate with ${baseCaps} and ${sideCaps}`;
    description = `${proteinCaps} over ${base} with ${sauce} and ${seasoning}, plus ${side} on the side. Clean flavor, full plate, no weak link.`;
    cookTime = "20–30 mins";
  } else if (vibe === "Spicy") {
    title = `Spicy ${proteinCaps} with ${baseCaps} and ${sideCaps}`;
    description = `${proteinCaps} cooked with ${seasoning} and ${sauce}, served with ${base} and ${side}. ${veggies.length ? `Extras like ${veggies.join(", ")} bring it together.` : "This one got a little bark on it."}`;
    cookTime = "20–30 mins";
  } else if (vibe === "Quick Bite") {
    title = `${proteinCaps} Quick Plate with ${sideCaps}`;
    description = `${proteinCaps}, ${base}, and ${side} brought together fast with ${sauce} and ${seasoning}. Quick, solid, and not dry.`;
    cookTime = "15–20 mins";
  } else if (vibe === "Soul Food") {
    title = `${proteinCaps} Comfort Plate with ${baseCaps}`;
    description = `${proteinCaps} seasoned right, built with ${sauce}, served with ${base} and ${side}. Heavy on comfort, light on nonsense.`;
    cookTime = "25–35 mins";
  } else {
    title = `${proteinCaps} Plate with ${baseCaps} and ${sideCaps}`;
    description = `${proteinCaps} paired with ${base} and ${side}, hit with ${seasoning} and ${sauce}, and rounded out with ${veggies.length ? veggies.join(", ") : "a few simple extras"}. Straight dinner logic.`;
  }

  const allIngredients = [protein, base, side, sauce, seasoning, ...veggies].filter(Boolean);
  const plateId = `plate-${Date.now()}`;

  return {
    id: plateId,
    title,
    category: "Custom Plate",
    vibes: [vibe],
    ingredients: allIngredients,
    description,
    instructions: generatePlateInstructions(protein, base, side, sauce, seasoning, veggies),
    vibe,
    cookTime,
    difficulty
  };
}

function generatePlateInstructions(protein, base, side, sauce, seasoning, veggies) {
  const veggieText = veggies.length ? veggies.join(", ") : "your extras";
  return `Season the ${protein} with ${seasoning} first and cook it until it gets good color. Prep the ${base} and ${side} while that goes. Bring in ${sauce} so the plate has a clear direction, then finish with ${veggieText}. Plate it hot and keep the flavor up front.`;
}

function renderPlateResult(plate) {
  plateResult.classList.remove("hidden");
  plateResult.innerHTML = `
    <div class="plate-card">
      <div class="card-topline">Build My Plate Result • ${plate.vibe}</div>
      <h3>${plate.title}</h3>
      <p>${plate.description}</p>

      <div class="card-meta">
        <span class="meta-pill">${plate.cookTime}</span>
        <span class="meta-pill">${plate.difficulty}</span>
        <span class="meta-pill">${plate.ingredients.length} items</span>
      </div>

      <p><strong>What’s in it:</strong> ${plate.ingredients.join(", ")}</p>

      <div class="card-actions">
        <button class="btn btn-secondary" id="viewGeneratedPlateBtn">View Plate</button>
        <button class="btn btn-ghost" id="saveGeneratedPlateBtn">Save ♥</button>
        <button class="btn btn-primary" id="groceryGeneratedPlateBtn">Add to Grocery</button>
      </div>
    </div>
  `;

  document.getElementById("viewGeneratedPlateBtn").addEventListener("click", () => openMealModal(plate));
  document.getElementById("saveGeneratedPlateBtn").addEventListener("click", () => toggleFavorite(plate));
  document.getElementById("groceryGeneratedPlateBtn").addEventListener("click", () => addIngredientsToGrocery(plate.ingredients));
}

function bindEvents() {
  addCustomIngredientBtn.addEventListener("click", addCustomIngredient);

  customIngredientInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addCustomIngredient();
  });

  findMealsBtn.addEventListener("click", findMeals);

  surpriseBtn.addEventListener("click", () => {
    const filteredMeals = getFilteredMeals();
    const source = filteredMeals.length ? filteredMeals : meals;
    const randomMeal = source[Math.floor(Math.random() * source.length)];
    if (randomMeal) openMealModal(randomMeal);
  });

  clearIngredientsBtn.addEventListener("click", () => {
    selectedIngredients = [];
    saveSelectedIngredients();
    renderIngredientGroups();
    renderSelectedIngredients();
    findMeals();
  });

  clearGroceryBtn.addEventListener("click", () => {
    groceryList = [];
    saveGroceryList();
    renderGroceryList();
  });

  clearVibesBtn.addEventListener("click", () => {
    selectedVibe = "All";
    updateFiltersUI();
    findMeals();
  });

  categoryFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    selectedCategory = btn.dataset.category;
    updateFiltersUI();
    findMeals();
  });

  vibeFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".vibe-btn");
    if (!btn) return;

    selectedVibe = btn.dataset.vibe;
    updateFiltersUI();
    findMeals();
  });

  closeModalBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  scrollToBuilderBtn.addEventListener("click", () => {
    document.getElementById("builderSection").scrollIntoView({ behavior: "smooth" });
  });

  generatePlateBtn.addEventListener("click", generatePlate);
}

function init() {
  renderIngredientGroups();
  renderSelectedIngredients();
  renderFavorites();
  renderGroceryList();
  populateBuilderOptions();
  bindEvents();
  findMeals();
}

init();