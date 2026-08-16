(() => {
  const ingredientData = window.COOKLIKEME_INGREDIENTS || {};
  const recipes = Array.isArray(window.COOKLIKEME_RECIPES)
    ? window.COOKLIKEME_RECIPES
    : [];

  /* =====================================================
     CLEAN DUPLICATE PICKER OPTIONS
     Keep one general bell pepper choice instead of
     separate bell pepper / red bell pepper / green bell pepper.
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
     SEASONINGS BELONG IN "MAKE IT HIT", NOT "WHAT YOU NEED"
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

  recipes.forEach(recipe => {
    const currentSuggestions = Array.isArray(recipe.recommendedSeasonings)
      ? [...recipe.recommendedSeasonings]
      : [];

    if (Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach(entry => {
        const name = ingredientName(entry);
        if (
          seasoningNames.has(name) &&
          !currentSuggestions.some(item => normalize(item) === name)
        ) {
          currentSuggestions.push(name);
        }
      });

      recipe.ingredients = recipe.ingredients.filter(
        entry => !seasoningNames.has(ingredientName(entry))
      );
    }

    if (currentSuggestions.length) {
      recipe.recommendedSeasonings = currentSuggestions;
    }
  });
})();