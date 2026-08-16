(() => {
  const recipes = Array.isArray(window.COOKLIKEME_RECIPES) ? window.COOKLIKEME_RECIPES : [];

  const upgrades = {
    "reg-001": {
      description: "Juicy chicken thighs browned hard, then simmered in onion-garlic gravy until tender and spooned over hot rice. This is the kind of comfort plate that smells good before it even hits the table.",
      recommendedSeasonings: ["seasoned salt", "garlic powder", "onion powder", "smoked paprika", "black pepper", "thyme"]
    },
    "reg-002": {
      title: "Caribbean Curry Chicken with Rice",
      description: "Curry chicken cooked down with onion, garlic, thyme and coconut milk until the sauce gets rich enough to soak into the rice.",
      recommendedSeasonings: ["caribbean curry powder", "garlic powder", "onion powder", "black pepper", "thyme"]
    },
    "reg-003": {
      title: "Jerk Chicken with Rice & Plantain",
      description: "Smoky jerk chicken with heat, fresh scallion and thyme over rice, with sweet plantain on the side when you have it.",
      recommendedSeasonings: ["jerk seasoning", "garlic powder", "onion powder", "thyme", "black pepper"]
    },
    "reg-004": {
      title: "Brown Stew Chicken with Rice",
      description: "Deep, savory brown stew chicken with peppers, onion and thyme cooked until the sauce clings to the chicken and runs into the rice.",
      recommendedSeasonings: ["seasoned salt", "garlic powder", "onion powder", "paprika", "thyme", "black pepper"]
    },
    "reg-005": {
      title: "Garlic Butter Steak over Rice",
      description: "Pan-seared steak finished in garlic butter and sliced over hot rice, with broccoli or onions soaking up whatever is left in the pan.",
      recommendedSeasonings: ["seasoned salt", "garlic powder", "onion powder", "black pepper", "smoked paprika"]
    },
    "reg-006": {
      title: "Smothered Pork Chops & Mashed Potatoes",
      description: "Seared pork chops simmered in onion gravy until tender, with buttery mashed potatoes made for catching every drop of sauce.",
      recommendedSeasonings: ["seasoned salt", "garlic powder", "onion powder", "paprika", "black pepper"]
    },
    "reg-007": {
      title: "Garlic Parmesan Shrimp Alfredo",
      description: "Juicy seasoned shrimp tossed through creamy garlic-parmesan Alfredo and hot fettuccine. Rich, fast, and definitely not a sad weeknight pasta.",
      recommendedSeasonings: ["garlic powder", "onion powder", "black pepper", "italian seasoning", "paprika"]
    },
    "reg-008": {
      title: "Creamy Garlic Salmon Pasta",
      description: "Pan-seared salmon folded into creamy garlic-parmesan pasta with spinach and a little red pepper heat if you want it.",
      recommendedSeasonings: ["garlic powder", "onion powder", "black pepper", "paprika", "italian seasoning"]
    },
    "reg-009": {
      title: "Sausage, Peppers & Red Sauce Pasta",
      description: "Browned Italian sausage, sweet peppers and onions tossed through tomato sauce and pasta with enough garlic and parmesan to make the whole skillet hit.",
      recommendedSeasonings: ["garlic powder", "onion powder", "italian seasoning", "black pepper", "red pepper flakes"]
    }
  };

  recipes.forEach(recipe => {
    if (upgrades[recipe.id]) Object.assign(recipe, upgrades[recipe.id]);
  });

  const signatureRecipes = [
    {
      id: "sig-001",
      mode: "regular",
      title: "Honey Garlic Wings with Yellow Rice & Cabbage",
      category: "Dinner",
      tags: ["CookLikeMe Pick", "Comfort", "Wings"],
      time: "40 min",
      prepTime: "10 min",
      cookTime: "30 min",
      servings: 4,
      difficulty: "Easy",
      coreIngredients: ["chicken wings", "yellow rice", "cabbage", "honey garlic sauce"],
      flavorIngredients: ["garlic", "onion"],
      optionalIngredients: ["hot sauce"],
      recommendedSeasonings: ["seasoned salt", "garlic powder", "onion powder", "smoked paprika", "black pepper"],
      ingredients: [
        { item: "chicken wings", amount: "2 lb" },
        { item: "yellow rice", amount: "1 1/2 cups uncooked" },
        { item: "cabbage", amount: "1/2 head, sliced" },
        { item: "honey garlic sauce", amount: "1/2 cup" },
        { item: "onion", amount: "1/2 medium" },
        { item: "garlic", amount: "2 cloves" }
      ],
      description: "Crispy honey-garlic wings with buttery yellow rice and savory cabbage. Sweet, sticky, salty and built like a real dinner plate instead of random ingredients sitting next to each other.",
      instructions: [
        "Season the wings with seasoned salt, garlic powder, onion powder, smoked paprika and black pepper.",
        "Bake or air fry until browned, crisp and fully cooked.",
        "Cook the yellow rice while the wings are going.",
        "Sauté onion and cabbage until tender with a little color around the edges.",
        "Toss the hot wings in honey garlic sauce.",
        "Plate the wings with yellow rice and cabbage and add hot sauce if you want more bite."
      ]
    },
    {
      id: "sig-002",
      mode: "regular",
      title: "Cajun Garlic Butter Shrimp & Rice",
      category: "Dinner",
      tags: ["Seafood", "Quick", "Spicy"],
      time: "25 min",
      prepTime: "10 min",
      cookTime: "15 min",
      servings: 3,
      difficulty: "Easy",
      coreIngredients: ["shrimp", "rice", "garlic butter"],
      flavorIngredients: ["garlic", "lime"],
      optionalIngredients: ["broccoli", "bell pepper"],
      recommendedSeasonings: ["cajun seasoning", "garlic powder", "paprika", "black pepper"],
      ingredients: [
        { item: "shrimp", amount: "1 lb" },
        { item: "rice", amount: "1 cup uncooked" },
        { item: "garlic butter", amount: "2 tbsp" },
        { item: "lime", amount: "1/2" },
        { item: "broccoli", amount: "2 cups optional" }
      ],
      description: "Cajun shrimp cooked fast in garlic butter and piled over rice with a squeeze of lime. Add broccoli or peppers and it turns into an easy full plate.",
      instructions: [
        "Cook the rice first so it is ready when the shrimp comes out of the pan.",
        "Season shrimp with Cajun seasoning, garlic powder, paprika and black pepper.",
        "Sear the shrimp in a hot skillet until almost cooked through.",
        "Add garlic butter and toss for another minute.",
        "Finish with lime and serve over rice with your vegetable if using."
      ]
    },
    {
      id: "sig-003",
      mode: "regular",
      title: "Jerk Salmon with Rice & Peas and Plantain",
      category: "Dinner",
      tags: ["Island", "Seafood", "CookLikeMe Pick"],
      time: "35 min",
      prepTime: "10 min",
      cookTime: "25 min",
      servings: 2,
      difficulty: "Easy",
      coreIngredients: ["salmon", "rice and peas", "plantain", "jerk sauce"],
      flavorIngredients: ["lime", "scallion", "thyme"],
      optionalIngredients: ["cabbage"],
      recommendedSeasonings: ["jerk seasoning", "garlic powder", "onion powder", "thyme", "black pepper"],
      ingredients: [
        { item: "salmon", amount: "2 fillets" },
        { item: "rice and peas", amount: "2 cups cooked" },
        { item: "plantain", amount: "1 large" },
        { item: "jerk sauce", amount: "2 tbsp" },
        { item: "lime", amount: "1" }
      ],
      description: "Jerk salmon with rice and peas, sweet plantain and fresh lime. Spicy, savory and sweet all on the same plate without feeling forced.",
      instructions: [
        "Season the salmon with jerk seasoning, garlic powder, onion powder, thyme and black pepper.",
        "Pan-sear, bake or air fry until the salmon flakes easily.",
        "Brush with jerk sauce near the end so it caramelizes without burning.",
        "Heat the rice and peas and fry or sauté the plantain until golden.",
        "Serve everything together and finish the salmon with lime and scallion."
      ]
    },
    {
      id: "sig-004",
      mode: "regular",
      title: "Garlic Parmesan Chicken Pasta",
      category: "Dinner",
      tags: ["Italian Night", "Comfort"],
      time: "35 min",
      prepTime: "10 min",
      cookTime: "25 min",
      servings: 4,
      difficulty: "Easy",
      coreIngredients: ["chicken breast", "pasta", "heavy cream", "parmesan"],
      flavorIngredients: ["garlic", "butter"],
      optionalIngredients: ["spinach", "broccoli", "red pepper flakes"],
      recommendedSeasonings: ["garlic powder", "onion powder", "black pepper", "italian seasoning", "paprika"],
      ingredients: [
        { item: "chicken breast", amount: "1 lb" },
        { item: "pasta", amount: "12 oz" },
        { item: "heavy cream", amount: "1 1/4 cups" },
        { item: "parmesan", amount: "3/4 cup" },
        { item: "garlic", amount: "3 cloves" },
        { item: "butter", amount: "2 tbsp" }
      ],
      description: "Seasoned chicken sliced into creamy garlic-parmesan pasta with enough sauce to coat every bite. Add spinach or broccoli when you want the plate to feel complete.",
      instructions: [
        "Cook the pasta until just tender and save a little pasta water.",
        "Season and sear the chicken until browned and fully cooked, then rest and slice it.",
        "Melt butter in the same pan and cook the garlic briefly.",
        "Add heavy cream and parmesan and stir until smooth.",
        "Toss in the pasta, loosen with pasta water if needed, and fold in vegetables if using.",
        "Top with sliced chicken and extra parmesan."
      ]
    },
    {
      id: "sig-005",
      mode: "regular",
      title: "Steak Tips with Garlic Butter Rice & Broccoli",
      category: "Dinner",
      tags: ["Comfort", "Quick"],
      time: "30 min",
      prepTime: "10 min",
      cookTime: "20 min",
      servings: 3,
      difficulty: "Easy",
      coreIngredients: ["steak", "rice", "broccoli", "garlic butter"],
      flavorIngredients: ["garlic"],
      optionalIngredients: ["onion", "mushrooms"],
      recommendedSeasonings: ["seasoned salt", "garlic powder", "onion powder", "black pepper", "smoked paprika"],
      ingredients: [
        { item: "steak", amount: "1 lb, cut into pieces" },
        { item: "rice", amount: "2 cups cooked" },
        { item: "broccoli", amount: "2 cups" },
        { item: "garlic butter", amount: "2 tbsp" },
        { item: "onion", amount: "1/2 medium optional" }
      ],
      description: "Hard-seared steak tips over garlic-butter rice with broccoli. Fast enough for a weekday, but it still eats like somebody actually tried.",
      instructions: [
        "Pat the steak dry and season it well.",
        "Sear the steak in a hot skillet in batches so the pieces brown instead of steam.",
        "Add garlic butter during the last minute and toss the steak through it.",
        "Warm the rice and stir in a little of the garlic butter from the pan.",
        "Cook the broccoli until tender-crisp and serve everything together."
      ]
    },
    {
      id: "sig-006",
      mode: "regular",
      title: "Cajun Salmon Alfredo",
      category: "Dinner",
      tags: ["Seafood", "Italian Night", "Spicy"],
      time: "35 min",
      prepTime: "10 min",
      cookTime: "25 min",
      servings: 4,
      difficulty: "Medium",
      coreIngredients: ["salmon", "fettuccine", "alfredo sauce"],
      flavorIngredients: ["garlic", "parmesan"],
      optionalIngredients: ["spinach", "broccoli"],
      recommendedSeasonings: ["cajun seasoning", "garlic powder", "paprika", "black pepper"],
      ingredients: [
        { item: "salmon", amount: "1 lb" },
        { item: "fettuccine", amount: "12 oz" },
        { item: "alfredo sauce", amount: "2 cups" },
        { item: "garlic", amount: "3 cloves" },
        { item: "parmesan", amount: "1/2 cup" }
      ],
      description: "Cajun-seared salmon over creamy Alfredo with garlic and parmesan. Rich pasta, spicy crusted salmon, and exactly the kind of combination that makes you stop scrolling.",
      instructions: [
        "Cook the fettuccine and reserve a little pasta water.",
        "Season the salmon with Cajun seasoning, garlic powder, paprika and black pepper.",
        "Sear the salmon until browned outside and flaky inside, then set it aside.",
        "Cook garlic briefly in the same pan, then add Alfredo sauce and parmesan.",
        "Toss in the pasta and loosen with pasta water if needed.",
        "Serve the salmon over the pasta and add spinach or broccoli if using."
      ]
    },
    {
      id: "sig-007",
      mode: "regular",
      title: "Smothered Chicken with Mashed Potatoes & Green Beans",
      category: "Dinner",
      tags: ["Soul Food", "Comfort"],
      time: "45 min",
      prepTime: "10 min",
      cookTime: "35 min",
      servings: 4,
      difficulty: "Easy",
      coreIngredients: ["chicken thighs", "mashed potatoes", "green beans", "gravy"],
      flavorIngredients: ["onion", "garlic"],
      optionalIngredients: ["thyme"],
      recommendedSeasonings: ["seasoned salt", "garlic powder", "onion powder", "paprika", "black pepper", "thyme"],
      ingredients: [
        { item: "chicken thighs", amount: "1 1/2 lb" },
        { item: "mashed potatoes", amount: "3 cups" },
        { item: "green beans", amount: "2 cups" },
        { item: "gravy", amount: "2 cups" },
        { item: "onion", amount: "1/2 medium" }
      ],
      description: "Tender smothered chicken with buttery mashed potatoes and green beans. The gravy belongs on the chicken and the potatoes, so nothing on the plate is wasting sauce.",
      instructions: [
        "Season and brown the chicken thighs on both sides.",
        "Cook the onion and garlic in the same skillet until softened.",
        "Add gravy, return the chicken, cover and simmer until tender and cooked through.",
        "Warm or make the mashed potatoes and cook the green beans.",
        "Serve the chicken over or beside the mashed potatoes and spoon gravy over both."
      ]
    },
    {
      id: "sig-008",
      mode: "healthy",
      title: "Lemon Garlic Salmon Fitness Plate",
      category: "Dinner",
      tags: ["High Protein", "Seafood", "Balanced"],
      time: "30 min",
      prepTime: "10 min",
      cookTime: "20 min",
      servings: 2,
      difficulty: "Easy",
      coreIngredients: ["salmon", "brown rice", "broccoli"],
      flavorIngredients: ["lemon", "garlic", "olive oil"],
      optionalIngredients: ["avocado"],
      recommendedSeasonings: ["garlic powder", "onion powder", "paprika", "black pepper"],
      ingredients: [
        { item: "salmon", amount: "2 fillets" },
        { item: "brown rice", amount: "2 cups cooked" },
        { item: "broccoli", amount: "2 cups" },
        { item: "lemon", amount: "1" },
        { item: "garlic", amount: "2 cloves" },
        { item: "olive oil", amount: "1 tbsp" }
      ],
      description: "Lemon-garlic salmon with brown rice and roasted broccoli. Clean enough for the healthy lane, but seasoned like you still plan on enjoying dinner.",
      instructions: [
        "Season the salmon with garlic powder, onion powder, paprika and black pepper.",
        "Bake or pan-sear until flaky and browned around the edges.",
        "Cook or warm the brown rice.",
        "Roast or sauté the broccoli with olive oil and garlic.",
        "Finish the salmon with fresh lemon and serve everything together."
      ]
    },
    {
      id: "sig-009",
      mode: "healthy",
      title: "Jerk Chicken Sweet Potato Bowl",
      category: "Dinner",
      tags: ["High Protein", "Island", "Meal Prep"],
      time: "35 min",
      prepTime: "10 min",
      cookTime: "25 min",
      servings: 4,
      difficulty: "Easy",
      coreIngredients: ["chicken breast", "sweet potato", "cabbage"],
      flavorIngredients: ["lime", "scallion"],
      optionalIngredients: ["avocado"],
      recommendedSeasonings: ["jerk seasoning", "garlic powder", "onion powder", "thyme", "black pepper"],
      ingredients: [
        { item: "chicken breast", amount: "1 1/2 lb" },
        { item: "sweet potato", amount: "2 medium" },
        { item: "cabbage", amount: "2 cups shredded" },
        { item: "lime", amount: "1" },
        { item: "scallion", amount: "2 stalks" }
      ],
      description: "Jerk chicken with roasted sweet potato and cabbage for a high-protein bowl that still has island flavor and enough texture to stay interesting.",
      instructions: [
        "Season the chicken with jerk seasoning, garlic powder, onion powder, thyme and black pepper.",
        "Roast the sweet potato until browned and tender.",
        "Grill or pan-sear the chicken until fully cooked, then slice it.",
        "Sauté or lightly dress the cabbage.",
        "Build the bowl and finish with lime, scallion and avocado if using."
      ]
    }
  ];

  signatureRecipes.forEach(recipe => {
    if (!recipes.some(existing => existing.id === recipe.id)) recipes.push(recipe);
  });
})();