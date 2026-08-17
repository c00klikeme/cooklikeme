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
  "Proteins": ["chicken","chicken breast","chicken thighs","chicken wings","fried chicken","ground chicken","turkey","ground turkey","turkey sausage","ground beef","steak","beef strips","pork chops","pork tenderloin","sausage","italian sausage","smoked sausage","lamb chops","shrimp","salmon","fish","tilapia","cod","catfish","tuna","crab","crab meat","scallops","eggs","egg whites","bacon"],
  "Carbs & Bases": ["rice","white rice","brown rice","yellow rice","jasmine rice","basmati rice","rice and peas","quinoa","pasta","whole wheat pasta","spaghetti","penne","fettuccine","linguine","ziti","macaroni","egg noodles","potatoes","red potatoes","sweet potato","roasted potatoes","mashed potatoes","fries","sweet potato fries","grits","beans","black beans","kidney beans","red beans","chickpeas","plantain","bread","white bread","wheat bread","brioche","rolls","tortilla","flour tortilla","corn tortilla","whole wheat tortilla","wrap","oats"],
  "Dairy & Rich Stuff": ["butter","milk","almond milk","oat milk","heavy cream","half and half","cheddar","sharp cheddar","mozzarella","parmesan","american cheese","pepper jack","monterey jack","cream cheese","sour cream","greek yogurt","condensed milk","evaporated milk","whipped cream","vanilla ice cream","chocolate ice cream"],
  "Produce": ["onion","red onion","yellow onion","garlic","ginger","bell pepper","tomato","cherry tomatoes","spinach","kale","broccoli","cauliflower","cabbage","lettuce","carrots","celery","corn","green beans","mushrooms","scallion","cilantro","thyme","parsley","rosemary","basil","cucumber","avocado","zucchini","banana","strawberries","blueberries","raspberries","blackberries","mixed berries","mango","pineapple","peach","peaches","apples","lime","lemon","mint","orange","watermelon"],
  "Seasonings": ["salt","black pepper","garlic powder","onion powder","paprika","smoked paprika","cajun seasoning","creole seasoning","old bay","seasoned salt","adobo","sazon","lemon pepper","italian seasoning","oregano","red pepper flakes","curry powder","caribbean curry powder","jerk seasoning","thyme seasoning","cinnamon","nutmeg","allspice","cumin","cayenne pepper"],
  "Sauces & Flavor": ["gravy","brown gravy","chicken gravy","hot sauce","buffalo sauce","bbq sauce","soy sauce","low sodium soy sauce","teriyaki sauce","worcestershire sauce","alfredo sauce","tomato sauce","marinara","garlic butter","honey garlic sauce","jerk sauce","brown stew sauce","coconut milk","coconut cream","olive oil","lime juice","lemon juice","simple syrup","honey","grenadine","caramel sauce","ranch","mayo","mustard","ketchup"],
  "Drinks": ["rum","white rum","dark rum","spiced rum","vodka","tequila","silver tequila","whiskey","bourbon","gin","cognac","pineapple juice","orange juice","cranberry juice","mango juice","club soda","sparkling water","ginger beer","ginger ale","cola","coconut water","water","lemonade"],
  "Dessert & Baking": ["flour","all purpose flour","sugar","brown sugar","powdered sugar","vanilla extract","baking powder","baking soda","cornstarch","chocolate chips","milk chocolate","dark chocolate","cocoa powder","white chocolate","chocolate syrup","graham crackers","vanilla wafers","oreo cookies","pecans","walnuts","marshmallows","sprinkles"]
};

let groceryItems = loadGrocery();
let activeFilter = "all";
let searchQuery = "";

const groceryGroups = document.getElementById("groceryGroups");
const groceryEmpty = document.getElementById("groceryEmpty");
const groceryCount = document.getElementById("groceryCount");
const grocerySummaryText = document.getElementById("grocerySummaryText");
const customGroceryInput = document.getElementById("customGroceryInput");
const customGroceryCategory = document.getElementById("customGroceryCategory");
const addCustomGroceryBtn = document.getElementById("addCustomGroceryBtn");
const clearCheckedBtn = document.getElementById("clearCheckedBtn");
const clearGroceryBtn = document.getElementById("clearGroceryBtn");
const copyGroceryBtn = document.getElementById("copyGroceryBtn");
const grocerySearchInput = document.getElementById("grocerySearchInput");
const groceryFilterButtons = document.querySelectorAll(".grocery-filter-btn");

function normalize(value) { return String(value || "").trim().toLowerCase(); }
function titleCase(value) { return String(value || "").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "); }

function canonicalName(value) {
  const clean = normalize(value);
  const aliases = {
    "wings": "chicken wings",
    "red bell pepper": "bell pepper",
    "green bell pepper": "bell pepper",
    "yellow bell pepper": "bell pepper"
  };
  return aliases[clean] || clean;
}

function detectCategory(item) {
  const clean = canonicalName(item);
  for (const [category, ingredients] of Object.entries(CATEGORY_LOOKUP)) {
    if (ingredients.includes(clean)) return category;
  }
  return "Other";
}

function safeParse() {
  try {
    const raw = JSON.parse(localStorage.getItem("cookLikeMe_groceryList") || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function loadGrocery() {
  const raw = safeParse();
  const converted = raw.map((item, index) => {
    const name = canonicalName(typeof item === "string" ? item : item.name || item.ingredient || "");
    return {
      id: typeof item === "object" && item.id ? item.id : `grocery-${Date.now()}-${index}`,
      name,
      category: typeof item === "object" && item.category ? item.category : detectCategory(name),
      checked: typeof item === "object" ? Boolean(item.checked) : false
    };
  }).filter(item => item.name);

  const deduped = [];
  converted.forEach(item => {
    const existing = deduped.find(saved => saved.name === item.name);
    if (!existing) deduped.push(item);
    else if (item.checked) existing.checked = true;
  });
  return deduped;
}

function saveGrocery() { localStorage.setItem("cookLikeMe_groceryList", JSON.stringify(groceryItems)); }

function getVisibleItems() {
  return groceryItems.filter(item => {
    const filterMatch = activeFilter === "needed" ? !item.checked : activeFilter === "checked" ? item.checked : true;
    const searchMatch = !searchQuery || item.name.includes(searchQuery) || item.category.toLowerCase().includes(searchQuery);
    return filterMatch && searchMatch;
  });
}

function renderGrocery() {
  saveGrocery();
  const visibleItems = getVisibleItems();
  groceryGroups.innerHTML = "";
  groceryCount.textContent = `${groceryItems.length} ${groceryItems.length === 1 ? "item" : "items"}`;

  const checkedCount = groceryItems.filter(item => item.checked).length;
  const neededCount = groceryItems.length - checkedCount;

  if (!groceryItems.length) {
    grocerySummaryText.textContent = "Your grocery list is empty.";
    groceryGroups.classList.add("hidden");
    groceryEmpty.classList.remove("hidden");
    return;
  }

  groceryGroups.classList.remove("hidden");
  groceryEmpty.classList.add("hidden");
  grocerySummaryText.textContent = neededCount === 0
    ? "Everything is checked off. You're good."
    : `${neededCount} ${neededCount === 1 ? "item" : "items"} left to grab${checkedCount ? ` • ${checkedCount} checked off` : ""}.`;

  if (!visibleItems.length) {
    groceryGroups.innerHTML = `<div class="grocery-empty"><h2>Nothing here.</h2><p>Try another filter or search.</p></div>`;
    return;
  }

  const grouped = {};
  visibleItems.forEach(item => {
    const category = item.category || "Other";
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(item);
  });

  CATEGORY_ORDER.forEach(category => {
    if (!grouped[category]?.length) return;
    const groupCard = document.createElement("section");
    groupCard.className = "grocery-group-card";
    groupCard.innerHTML = `<div class="grocery-group-header"><h3>${category}</h3><span class="grocery-group-total">${grouped[category].length} ${grouped[category].length === 1 ? "item" : "items"}</span></div><div class="grocery-items"></div>`;
    const itemsWrap = groupCard.querySelector(".grocery-items");

    grouped[category].sort((a,b) => a.name.localeCompare(b.name)).forEach(item => {
      const row = document.createElement("div");
      row.className = `grocery-item ${item.checked ? "checked" : ""}`;
      row.innerHTML = `<button class="grocery-check ${item.checked ? "checked" : ""}" aria-label="Toggle ${item.name}">✓</button><span class="grocery-item-name">${titleCase(item.name)}</span><button class="grocery-remove-btn" aria-label="Remove ${item.name}">×</button>`;
      row.querySelector(".grocery-check").onclick = () => toggleChecked(item.id);
      row.querySelector(".grocery-remove-btn").onclick = () => removeItem(item.id);
      itemsWrap.appendChild(row);
    });

    groceryGroups.appendChild(groupCard);
  });
}

function addCustomItem() {
  const value = canonicalName(customGroceryInput.value);
  if (!value) return;
  const duplicate = groceryItems.find(item => item.name === value);
  if (duplicate) {
    duplicate.checked = false;
    customGroceryInput.value = "";
    renderGrocery();
    return;
  }

  groceryItems.push({
    id: `grocery-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    name: value,
    category: customGroceryCategory.value === "auto" ? detectCategory(value) : customGroceryCategory.value,
    checked: false
  });
  customGroceryInput.value = "";
  renderGrocery();
}

function toggleChecked(id) {
  groceryItems = groceryItems.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
  renderGrocery();
}
function removeItem(id) { groceryItems = groceryItems.filter(item => item.id !== id); renderGrocery(); }
function clearChecked() { groceryItems = groceryItems.filter(item => !item.checked); renderGrocery(); }
function clearGrocery() {
  if (!groceryItems.length) return;
  if (!confirm("Clear your entire grocery list?")) return;
  groceryItems = [];
  renderGrocery();
}

async function copyGroceryList() {
  if (!groceryItems.length) return;
  const needed = groceryItems.filter(item => !item.checked);
  const grouped = {};
  needed.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item.name);
  });
  const text = CATEGORY_ORDER
    .filter(category => grouped[category]?.length)
    .map(category => `${category}\n${grouped[category].sort().map(item => `• ${titleCase(item)}`).join("\n")}`)
    .join("\n\n");

  try {
    await navigator.clipboard.writeText(text || "Everything is checked off.");
    const original = copyGroceryBtn.textContent;
    copyGroceryBtn.textContent = "Copied ✓";
    setTimeout(() => copyGroceryBtn.textContent = original, 1400);
  } catch {
    alert(text);
  }
}

groceryFilterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  groceryFilterButtons.forEach(other => other.classList.toggle("active", other === button));
  renderGrocery();
}));

addCustomGroceryBtn.addEventListener("click", addCustomItem);
customGroceryInput.addEventListener("keydown", event => { if (event.key === "Enter") addCustomItem(); });
clearCheckedBtn.addEventListener("click", clearChecked);
clearGroceryBtn.addEventListener("click", clearGrocery);
copyGroceryBtn.addEventListener("click", copyGroceryList);
grocerySearchInput.addEventListener("input", () => { searchQuery = normalize(grocerySearchInput.value); renderGrocery(); });

renderGrocery();