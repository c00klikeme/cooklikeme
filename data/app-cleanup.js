(() => {
  const ingredientData = window.COOKLIKEME_INGREDIENTS || {};
  const recipes = Array.isArray(window.COOKLIKEME_RECIPES)
    ? window.COOKLIKEME_RECIPES
    : [];

  /* =====================================================
     CLEAN DUPLICATE PICKER OPTIONS
  ====================================================== */

  const pepperDuplicates = new Set([
    "red bell pepper",
    "green bell pepper"
  ]);

  ["regular", "healthy"].forEach(mode => {
    const groups = ingredientData[mode];
    if (!groups) return;

    Object.keys(groups).forEach(groupName => {
      if (!Array.isArray(groups[groupName])) return;

      groups[groupName] = groups[groupName].filter(
        ingredient => !pepperDuplicates.has(String(ingredient).toLowerCase())
      );
    });
  });

  /* =====================================================
     SEASONINGS BELONG IN "MAKE IT HIT"
  ====================================================== */

  const seasoningNames = new Set([
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
    "cinnamon",
    "nutmeg"
  ]);

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function ingredientName(entry) {
    if (typeof entry === "string") return normalize(entry);
    if (entry && typeof entry === "object") {
      return normalize(entry.item || entry.name || entry.ingredient || "");
    }
    return "";
  }

  function unique(items) {
    const seen = new Set();
    return items.filter(item => {
      const key = normalize(item);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function recipeText(recipe) {
    return [
      recipe.title,
      recipe.category,
      ...(recipe.tags || []),
      ...(recipe.coreIngredients || []),
      ...(recipe.flavorIngredients || []),
      ...(recipe.optionalIngredients || [])
    ]
      .map(normalize)
      .join(" ");
  }

  function hasAny(text, words) {
    return words.some(word => text.includes(word));
  }

  /* =====================================================
     COOKLIKEME SEASONING BRAIN
     These profiles are intentionally different by meal.
  ====================================================== */

  function inferSeasonings(recipe) {
    const text = recipeText(recipe);

    if (hasAny(text, ["jerk", "jamaican"])) {
      return [
        "jerk seasoning",
        "garlic powder",
        "onion powder",
        "thyme seasoning",
        "black pepper",
        "allspice"
      ];
    }

    if (hasAny(text, ["caribbean curry", "curry chicken", "curry shrimp", "curry goat", "curry"])) {
      return [
        "caribbean curry powder",
        "garlic powder",
        "onion powder",
        "thyme seasoning",
        "black pepper",
        "allspice"
      ];
    }

    if (hasAny(text, ["brown stew"])) {
      return [
        "seasoned salt",
        "garlic powder",
        "onion powder",
        "paprika",
        "thyme seasoning",
        "black pepper",
        "allspice"
      ];
    }

    if (hasAny(text, ["cajun"])) {
      return [
        "cajun seasoning",
        "garlic powder",
        "onion powder",
        "smoked paprika",
        "black pepper",
        "cayenne pepper"
      ];
    }

    if (hasAny(text, ["creole"])) {
      return [
        "creole seasoning",
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper",
        "cayenne pepper"
      ];
    }

    if (hasAny(text, ["taco", "quesadilla", "fajita", "mexican"])) {
      return [
        "chili powder",
        "cumin",
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper"
      ];
    }

    if (hasAny(text, ["alfredo", "parmesan", "italian night", "marinara", "ziti", "spaghetti", "pasta"])) {
      return [
        "garlic powder",
        "onion powder",
        "italian seasoning",
        "black pepper",
        "paprika",
        "red pepper flakes"
      ];
    }

    if (hasAny(text, ["buffalo"])) {
      return [
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper",
        "cayenne pepper"
      ];
    }

    if (hasAny(text, ["bbq", "barbecue"])) {
      return [
        "seasoned salt",
        "garlic powder",
        "onion powder",
        "smoked paprika",
        "black pepper",
        "chili powder"
      ];
    }

    if (hasAny(text, ["honey garlic"])) {
      return [
        "seasoned salt",
        "garlic powder",
        "onion powder",
        "smoked paprika",
        "black pepper"
      ];
    }

    if (hasAny(text, ["lemon pepper"])) {
      return [
        "lemon pepper",
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper"
      ];
    }

    if (hasAny(text, ["shrimp", "crab", "scallop"])) {
      return [
        "old bay",
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper",
        "cayenne pepper"
      ];
    }

    if (hasAny(text, ["salmon"])) {
      return [
        "garlic powder",
        "onion powder",
        "paprika",
        "lemon pepper",
        "black pepper"
      ];
    }

    if (hasAny(text, ["tilapia", "cod", "catfish", "fish"])) {
      return [
        "old bay",
        "garlic powder",
        "onion powder",
        "paprika",
        "lemon pepper",
        "black pepper"
      ];
    }

    if (hasAny(text, ["steak", "beef strips", "short ribs", "ground beef", "beef"])) {
      return [
        "seasoned salt",
        "garlic powder",
        "onion powder",
        "black pepper",
        "smoked paprika"
      ];
    }

    if (hasAny(text, ["pork chop", "pork tenderloin", "pulled pork", "pork"])) {
      return [
        "seasoned salt",
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper",
        "smoked paprika"
      ];
    }

    if (hasAny(text, ["sausage"])) {
      return [
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper",
        "italian seasoning"
      ];
    }

    if (hasAny(text, ["smothered", "gravy"])) {
      return [
        "seasoned salt",
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper",
        "thyme seasoning"
      ];
    }

    if (hasAny(text, ["fried chicken", "chicken wings", "wings"])) {
      return [
        "seasoned salt",
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper",
        "cayenne pepper"
      ];
    }

    if (hasAny(text, ["chicken breast", "chicken thighs", "chicken"])) {
      return [
        "seasoned salt",
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper",
        "thyme seasoning"
      ];
    }

    if (hasAny(text, ["turkey"])) {
      return [
        "seasoned salt",
        "garlic powder",
        "onion powder",
        "paprika",
        "black pepper",
        "thyme seasoning"
      ];
    }

    if (hasAny(text, ["eggs", "breakfast"])) {
      return [
        "seasoned salt",
        "black pepper",
        "garlic powder",
        "onion powder",
        "paprika"
      ];
    }

    return [
      "seasoned salt",
      "garlic powder",
      "onion powder",
      "paprika",
      "black pepper"
    ];
  }

  recipes.forEach(recipe => {
    const seasoningsAlreadyInRecipe = [];

    if (Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach(entry => {
        const name = ingredientName(entry);
        if (seasoningNames.has(name)) {
          seasoningsAlreadyInRecipe.push(name);
        }
      });

      recipe.ingredients = recipe.ingredients.filter(
        entry => !seasoningNames.has(ingredientName(entry))
      );
    }

    const coreSeasonings = [
      ...(recipe.coreIngredients || []),
      ...(recipe.flavorIngredients || [])
    ].filter(item => seasoningNames.has(normalize(item)));

    const inferred = inferSeasonings(recipe);

    recipe.recommendedSeasonings = unique([
      ...coreSeasonings,
      ...seasoningsAlreadyInRecipe,
      ...inferred
    ]).slice(0, 7);
  });
})();