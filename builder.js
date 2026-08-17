const ingredientData = window.COOKLIKEME_INGREDIENTS;

let builderMode = "regular";
let plateSelections = { protein: "", base: "", side: "", extras: [], flavor: "" };
let currentGeneratedPlate = null;

const builderModeTabs = document.getElementById("builderModeTabs");
const proteinOptions = document.getElementById("proteinOptions");
const baseOptions = document.getElementById("baseOptions");
const sideOptions = document.getElementById("sideOptions");
const extraOptions = document.getElementById("extraOptions");
const flavorOptions = document.getElementById("flavorOptions");
const platePreview = document.getElementById("platePreview");
const generatePlateBtn = document.getElementById("generatePlateBtn");
const resetBuilderBtn = document.getElementById("resetBuilderBtn");
const generatedSection = document.getElementById("generatedSection");
const generatedTitle = document.getElementById("generatedTitle");
const generatedDescription = document.getElementById("generatedDescription");
const generatedMeta = document.getElementById("generatedMeta");
const generatedIngredients = document.getElementById("generatedIngredients");
const generatedInstructions = document.getElementById("generatedInstructions");
const savePlateBtn = document.getElementById("savePlateBtn");
const addPlateToGroceryBtn = document.getElementById("addPlateToGroceryBtn");
const buildAnotherBtn = document.getElementById("buildAnotherBtn");

function titleCase(value) { return String(value || "").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "); }

function getBuilderData() {
  if (builderMode === "healthy") return {
    proteins: ["chicken breast", "ground turkey", "salmon", "shrimp", "tilapia", "tuna", "eggs", "egg whites"],
    bases: ["brown rice", "quinoa", "sweet potato", "whole wheat pasta", "black beans", "chickpeas", "cauliflower rice"],
    sides: ["broccoli", "spinach", "green beans", "carrots", "kale", "cabbage", "avocado", "zucchini"],
    extras: ["bell pepper", "onion", "tomato", "cucumber", "mushrooms", "corn", "cilantro", "scallion"],
    flavors: ["lemon herb", "garlic herb", "cajun", "jerk", "lime cilantro", "hot honey", "teriyaki", "curry"]
  };
  return {
    proteins: ["chicken", "chicken thighs", "chicken wings", "shrimp", "salmon", "fish", "steak", "ground beef", "pork chops", "sausage", "turkey", "lamb chops"],
    bases: ["rice", "white rice", "yellow rice", "rice and peas", "pasta", "macaroni", "mashed potatoes", "roasted potatoes", "fries", "grits", "beans", "plantain"],
    sides: ["macaroni", "mashed potatoes", "roasted potatoes", "plantain", "green beans", "broccoli", "corn", "cabbage", "beans"],
    extras: ["onion", "garlic", "bell pepper", "spinach", "mushrooms", "tomato", "scallion", "cilantro", "carrots"],
    flavors: ["garlic butter", "jerk", "brown stew", "cajun", "curry", "alfredo", "marinara", "buffalo", "honey garlic", "bbq", "lemon pepper", "teriyaki", "smothered gravy"]
  };
}

function renderSingleOptions(element, options, type) {
  element.innerHTML = "";
  options.forEach(item => {
    const b = document.createElement("button"); b.className = "builder-option"; b.textContent = titleCase(item);
    if (plateSelections[type] === item) b.classList.add("selected");
    b.onclick = () => { plateSelections[type] = plateSelections[type] === item ? "" : item; renderBuilder(); renderPlatePreview(); };
    element.appendChild(b);
  });
}
function renderExtraOptions(element, options) {
  element.innerHTML = "";
  options.forEach(item => {
    const b = document.createElement("button"); b.className = "builder-option"; b.textContent = titleCase(item);
    if (plateSelections.extras.includes(item)) b.classList.add("selected");
    b.onclick = () => { plateSelections.extras = plateSelections.extras.includes(item) ? plateSelections.extras.filter(x => x !== item) : [...plateSelections.extras, item]; renderBuilder(); renderPlatePreview(); };
    element.appendChild(b);
  });
}
function renderBuilder() { const d = getBuilderData(); renderSingleOptions(proteinOptions,d.proteins,"protein"); renderSingleOptions(baseOptions,d.bases,"base"); renderSingleOptions(sideOptions,d.sides,"side"); renderExtraOptions(extraOptions,d.extras); renderSingleOptions(flavorOptions,d.flavors,"flavor"); }
function previewPiece(label,value){return `<div class="preview-piece"><span>${label}</span><strong class="${value?"":"preview-empty"}">${value?titleCase(value):"Not picked"}</strong></div>`;}
function renderPlatePreview(){const e=plateSelections.extras.length?plateSelections.extras.map(titleCase).join(", "):"None yet";platePreview.innerHTML=`${previewPiece("Protein",plateSelections.protein)}${previewPiece("Base",plateSelections.base)}${previewPiece("Side",plateSelections.side)}${previewPiece("Flavor",plateSelections.flavor)}<div class="preview-piece"><span>Extras</span><strong class="${plateSelections.extras.length?"":"preview-empty"}">${e}</strong></div>`;}

function getSeasoningRecommendation(protein, flavor) {
  const p=protein.toLowerCase(), f=flavor.toLowerCase();
  if(f.includes("jerk")) return ["jerk seasoning","garlic powder","onion powder","thyme","allspice","black pepper"];
  if(f.includes("curry")) return ["caribbean curry powder","garlic powder","onion powder","thyme","black pepper"];
  if(f.includes("cajun")) return ["cajun seasoning","garlic powder","onion powder","smoked paprika","black pepper"];
  if(f.includes("brown stew")) return ["all-purpose seasoning","garlic powder","onion powder","paprika","thyme","black pepper"];
  if(f.includes("lemon pepper")) return ["lemon pepper","garlic powder","onion powder","paprika"];
  if(f.includes("alfredo")||f.includes("marinara")) return ["garlic powder","onion powder","italian seasoning","black pepper","red pepper flakes"];
  if(f.includes("buffalo")) return ["garlic powder","onion powder","paprika","black pepper"];
  if(f.includes("honey garlic")||f.includes("bbq")) return ["seasoned salt","garlic powder","onion powder","smoked paprika","black pepper"];
  if(f.includes("teriyaki")) return ["garlic powder","ginger","black pepper"];
  if(f.includes("smothered")) return ["seasoned salt","garlic powder","onion powder","paprika","black pepper","thyme"];
  if(f.includes("lime cilantro")) return ["garlic powder","onion powder","paprika","cumin","black pepper"];
  if(f.includes("lemon herb")||f.includes("garlic herb")) return ["garlic powder","onion powder","paprika","black pepper","thyme"];
  if(f.includes("hot honey")) return ["garlic powder","onion powder","smoked paprika","cayenne pepper","black pepper"];
  if(p.includes("shrimp")||p.includes("fish")||p.includes("salmon")||p.includes("tilapia")||p.includes("tuna")) return ["old bay","garlic powder","onion powder","paprika","black pepper"];
  if(p.includes("steak")||p.includes("beef")||p.includes("lamb")) return ["seasoned salt","garlic powder","onion powder","black pepper","smoked paprika"];
  return ["seasoned salt","garlic powder","onion powder","paprika","black pepper"];
}

function createPlateTitle(p,b,f){const P=titleCase(p),B=titleCase(b);if(f.includes("jerk"))return `Jerk ${P} with ${B}`;if(f.includes("curry"))return `Caribbean Curry ${P} with ${B}`;if(f.includes("cajun"))return `Cajun ${P} with ${B}`;if(f.includes("alfredo"))return `Creamy ${P} Alfredo`;if(f.includes("brown stew"))return `Brown Stew ${P} Plate`;if(f.includes("buffalo"))return `Buffalo ${P} Plate`;if(f.includes("garlic butter"))return `Garlic Butter ${P} over ${B}`;if(f.includes("honey garlic"))return `Sticky Honey Garlic ${P} with ${B}`;if(f.includes("smothered"))return `Smothered ${P} with ${B}`;if(f.includes("lemon pepper"))return `Lemon Pepper ${P} with ${B}`;if(f.includes("teriyaki"))return `Teriyaki ${P} Bowl`;return `${titleCase(f)} ${P} with ${B}`;}

function cookingMethod(protein){const p=protein.toLowerCase();if(p.includes("wing"))return `Bake or air-fry the ${protein} until browned, crisp and cooked through.`;if(p.includes("shrimp"))return `Sear the ${protein} in a hot skillet just until pink and opaque; don't overcook it.`;if(p.includes("salmon")||p.includes("fish")||p.includes("tilapia")||p.includes("tuna"))return `Pan-sear or bake the ${protein} until it flakes easily and is cooked through.`;if(p.includes("steak")||p.includes("lamb"))return `Sear the ${protein} in a hot pan to your preferred doneness, then let it rest before slicing.`;if(p.includes("ground"))return `Brown the ${protein} in a skillet, breaking it apart as it cooks, and drain excess grease if needed.`;return `Sear or bake the ${protein} until browned and fully cooked.`;}

function createPlate(){
  const {protein,base,side,extras,flavor}=plateSelections, seasonings=getSeasoningRecommendation(protein,flavor);
  const ingredients=[protein,base,side,...extras,flavor];
  const description=`${titleCase(protein)} built around ${titleCase(base)} and ${titleCase(side)}, with ${titleCase(flavor)} bringing the plate together${extras.length?` and ${extras.map(titleCase).join(", ")} worked in for extra flavor and texture`:""}.`;
  const instructions=[`Season the ${protein} with ${seasonings.join(", ")}.`,cookingMethod(protein),`Prepare the ${base} and keep it hot for the plate.`,`Cook the ${side} until tender and season it to taste.`];
  if(extras.length) instructions.push(`Sauté or prepare the ${extras.join(", ")} and work them into the plate where they fit best.`);
  instructions.push(`Add the ${flavor} near the end so it coats or finishes the ${protein} without burning.`);
  instructions.push(`Plate the ${base}, ${side} and ${protein} together. Spoon any pan flavor over the top, taste, adjust and serve hot.`);
  return {id:"custom-"+Date.now(),mode:builderMode,title:createPlateTitle(protein,base,flavor),category:"Custom Plate",tags:[builderMode==="healthy"?"Healthy":"Custom"],time:"30–40 min",difficulty:"Easy",coreIngredients:[protein,base,side],flavorIngredients:[flavor],recommendedSeasonings:seasonings,optionalIngredients:extras,ingredients,description,instructions};
}

function renderGeneratedPlate(plate){generatedTitle.textContent=plate.title;generatedDescription.textContent=plate.description;generatedMeta.innerHTML=`<span>${plate.time}</span><span>${plate.difficulty}</span><span>${plate.mode==="healthy"?"Healthy":"Regular"}</span>`;generatedIngredients.innerHTML=plate.ingredients.map(i=>`<li>${titleCase(i)}</li>`).join("");const s=document.createElement("li");s.innerHTML=`<strong>Make It Hit 🔥:</strong> ${plate.recommendedSeasonings.map(titleCase).join(", ")}`;generatedIngredients.appendChild(s);generatedInstructions.innerHTML=plate.instructions.map(x=>`<li>${x}</li>`).join("");}
function generatePlate(){if([plateSelections.protein,plateSelections.base,plateSelections.side,plateSelections.flavor].some(x=>!x)){alert("Pick a protein, base, side and flavor first.");return;}currentGeneratedPlate=createPlate();renderGeneratedPlate(currentGeneratedPlate);generatedSection.classList.remove("hidden");generatedSection.scrollIntoView({behavior:"smooth"});}
function resetBuilder(){plateSelections={protein:"",base:"",side:"",extras:[],flavor:""};currentGeneratedPlate=null;generatedSection.classList.add("hidden");renderBuilder();renderPlatePreview();}
function savePlate(){if(!currentGeneratedPlate)return;const saved=JSON.parse(localStorage.getItem("cookLikeMe_savedRecipes")||"[]");if(!saved.some(x=>x.id===currentGeneratedPlate.id))saved.push(currentGeneratedPlate);localStorage.setItem("cookLikeMe_savedRecipes",JSON.stringify(saved));savePlateBtn.textContent="Saved ✓";}
function addPlateToGrocery(){if(!currentGeneratedPlate)return;const existing=JSON.parse(localStorage.getItem("cookLikeMe_groceryList")||"[]");currentGeneratedPlate.ingredients.forEach(item=>{if(!existing.some(x=>String(x).toLowerCase()===String(item).toLowerCase()))existing.push(item);});localStorage.setItem("cookLikeMe_groceryList",JSON.stringify(existing));addPlateToGroceryBtn.textContent="Added ✓";}

builderModeTabs.addEventListener("click",e=>{const b=e.target.closest("[data-mode]");if(!b)return;builderMode=b.dataset.mode;builderModeTabs.querySelectorAll("[data-mode]").forEach(t=>t.classList.toggle("active",t===b));resetBuilder();});
generatePlateBtn.addEventListener("click",generatePlate);resetBuilderBtn.addEventListener("click",resetBuilder);savePlateBtn.addEventListener("click",savePlate);addPlateToGroceryBtn.addEventListener("click",addPlateToGrocery);buildAnotherBtn.addEventListener("click",()=>{resetBuilder();window.scrollTo({top:0,behavior:"smooth"});});
renderBuilder();renderPlatePreview();