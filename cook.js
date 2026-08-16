const recipe = (() => {
  try {
    return JSON.parse(localStorage.getItem("cookLikeMe_activeRecipe") || "null");
  } catch {
    return null;
  }
})();

const $ = id => document.getElementById(id);
let currentStep = 0;
let completedSteps = new Set();

function titleCase(value) {
  return String(value || "").trim().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function ingredientDisplay(entry) {
  if (typeof entry === "string") return titleCase(entry);
  const name = titleCase(entry?.item || entry?.name || entry?.ingredient || "");
  const amount = String(entry?.amount || "").trim();
  return amount ? `${amount} ${name}` : name;
}

function getIngredients(item) {
  if (Array.isArray(item.ingredients) && item.ingredients.length) return item.ingredients;
  return [
    ...(item.coreIngredients || []),
    ...(item.flavorIngredients || []),
    ...(item.optionalIngredients || [])
  ];
}

function showMissingRecipe() {
  $("cookTitle").textContent = "No recipe loaded.";
  $("cookDescription").textContent = "Open a recipe from Find Meals and tap Start Cooking.";
  document.querySelector(".cook-grid").innerHTML = `<div class="cook-panel missing-recipe"><h2>Pick something good first.</h2><p>Cook Mode needs a recipe to walk you through.</p><a class="cook-btn primary" href="meals.html">Find a Meal</a></div>`;
}

function renderRecipe() {
  if (!recipe) {
    showMissingRecipe();
    return;
  }

  $("cookTitle").textContent = recipe.title || "Cook Mode";
  $("cookDescription").textContent = recipe.description || "Follow it one move at a time.";

  const meta = [
    recipe.prepTime ? `Prep ${recipe.prepTime}` : "",
    recipe.cookTime ? `Cook ${recipe.cookTime}` : "",
    recipe.time || "",
    recipe.servings ? `Serves ${recipe.servings}` : "",
    recipe.difficulty || ""
  ].filter(Boolean);
  $("cookMeta").innerHTML = meta.map(item => `<span>${item}</span>`).join("");

  $("cookIngredients").innerHTML = getIngredients(recipe)
    .map(item => `<li>${ingredientDisplay(item)}</li>`)
    .join("");

  if (Array.isArray(recipe.recommendedSeasonings) && recipe.recommendedSeasonings.length) {
    $("seasoningPanel").classList.remove("hidden");
    $("cookSeasonings").textContent = recipe.recommendedSeasonings.map(titleCase).join(", ");
  }

  const steps = Array.isArray(recipe.instructions) ? recipe.instructions.filter(Boolean) : [];
  if (!steps.length) {
    $("currentStepText").textContent = "This recipe does not have cooking steps yet.";
    $("doneStepBtn").disabled = true;
    $("nextStepBtn").disabled = true;
    return;
  }

  $("allSteps").innerHTML = steps.map((step, index) => `<li data-step="${index}"><span>${index + 1}</span><p>${step}</p></li>`).join("");
  renderStep();
}

function steps() {
  return Array.isArray(recipe?.instructions) ? recipe.instructions.filter(Boolean) : [];
}

function renderStep() {
  const list = steps();
  if (!list.length) return;

  currentStep = Math.max(0, Math.min(currentStep, list.length - 1));
  $("stepCounter").textContent = `Step ${currentStep + 1} of ${list.length}`;
  $("currentStepTitle").textContent = `Step ${currentStep + 1}`;
  $("currentStepText").textContent = list[currentStep];

  const percent = Math.round((completedSteps.size / list.length) * 100);
  $("progressText").textContent = `${percent}% done`;
  $("cookProgress").style.width = `${percent}%`;

  $("prevStepBtn").disabled = currentStep === 0;
  $("nextStepBtn").disabled = currentStep === list.length - 1;
  $("doneStepBtn").textContent = completedSteps.has(currentStep) ? "✓ Step complete" : "Done with this step";
  $("doneStepBtn").classList.toggle("complete", completedSteps.has(currentStep));

  document.querySelectorAll("#allSteps li").forEach((item, index) => {
    item.classList.toggle("active", index === currentStep);
    item.classList.toggle("complete", completedSteps.has(index));
    item.onclick = () => {
      currentStep = index;
      renderStep();
      window.scrollTo({ top: document.querySelector(".cook-main").offsetTop - 90, behavior: "smooth" });
    };
  });

  $("finishCard").classList.toggle("hidden", completedSteps.size !== list.length);
}

$("prevStepBtn").addEventListener("click", () => {
  currentStep--;
  renderStep();
});

$("nextStepBtn").addEventListener("click", () => {
  currentStep++;
  renderStep();
});

$("doneStepBtn").addEventListener("click", () => {
  const list = steps();
  if (!list.length) return;

  if (completedSteps.has(currentStep)) completedSteps.delete(currentStep);
  else completedSteps.add(currentStep);

  if (completedSteps.has(currentStep) && currentStep < list.length - 1) currentStep++;
  renderStep();
});

renderRecipe();