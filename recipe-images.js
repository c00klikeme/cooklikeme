(() => {
  const ROOT = "images/meals/";

  function slugify(value) {
    return String(value || "meal")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 90) || "meal";
  }

  function imagePath(title) {
    return `${ROOT}${slugify(title)}.webp`;
  }

  function fallbackIcon(title) {
    const value = String(title || "").toLowerCase();
    if (/shake|smoothie|protein/.test(value)) return "🥤";
    if (/drink|cocktail|mocktail|rum|tequila|vodka/.test(value)) return "🍹";
    if (/cake|dessert|cookie|brownie|cheesecake|cobbler|sweet/.test(value)) return "🍰";
    if (/salmon|shrimp|fish|tilapia|cod|seafood/.test(value)) return "🍤";
    if (/taco|wrap|quesadilla/.test(value)) return "🌮";
    if (/pasta|alfredo|ziti|spaghetti|macaroni/.test(value)) return "🍝";
    if (/wing|chicken/.test(value)) return "🍗";
    if (/steak|beef/.test(value)) return "🥩";
    if (/healthy|fitness|salad/.test(value)) return "🥗";
    return "🍽️";
  }

  function buildVisual(title, className = "recipe-photo") {
    const wrap = document.createElement("div");
    wrap.className = `${className} recipe-photo-shell`;

    const img = document.createElement("img");
    img.src = imagePath(title);
    img.alt = title ? `${title} meal` : "CookLikeMe meal";
    img.loading = "lazy";
    img.decoding = "async";

    const fallback = document.createElement("div");
    fallback.className = "recipe-photo-fallback";
    fallback.innerHTML = `<span>${fallbackIcon(title)}</span><small>CookLikeMe</small>`;

    img.addEventListener("load", () => wrap.classList.add("has-photo"));
    img.addEventListener("error", () => {
      img.remove();
      wrap.classList.add("photo-missing");
    });

    wrap.append(img, fallback);
    return wrap;
  }

  function getTitle(container) {
    const heading = container?.querySelector("h1, h2, h3");
    return heading?.textContent?.trim() || "";
  }

  function decorateCard(card) {
    if (!card || card.dataset.clmPhotoReady === "true") return;
    const title = getTitle(card);
    if (!title) return;
    card.dataset.clmPhotoReady = "true";
    card.prepend(buildVisual(title, "recipe-card-photo"));
  }

  function decorateBest(card) {
    if (!card || card.dataset.clmPhotoReady === "true") return;
    const title = getTitle(card);
    if (!title) return;
    card.dataset.clmPhotoReady = "true";
    card.prepend(buildVisual(title, "best-recipe-photo"));
  }

  function decorateModal(content) {
    if (!content || content.dataset.clmPhotoReady === "true") return;
    const title = getTitle(content);
    if (!title) return;
    content.dataset.clmPhotoReady = "true";
    content.prepend(buildVisual(title, "recipe-modal-photo"));
  }

  function decorateSaved(card) {
    if (!card || card.dataset.clmPhotoReady === "true") return;
    const title = getTitle(card);
    if (!title) return;
    card.dataset.clmPhotoReady = "true";
    card.prepend(buildVisual(title, "saved-recipe-photo"));
  }

  function decorateBuilder() {
    const section = document.getElementById("generatedSection");
    const card = section?.querySelector(".generated-card");
    if (!card) return;
    const title = document.getElementById("generatedTitle")?.textContent?.trim();
    if (!title) return;

    const old = card.querySelector(".builder-recipe-photo");
    if (old?.dataset.photoTitle === title) return;
    if (old) old.remove();

    const visual = buildVisual(title, "builder-recipe-photo");
    visual.dataset.photoTitle = title;
    const kicker = card.querySelector(".section-kicker");
    if (kicker) kicker.after(visual);
    else card.prepend(visual);
  }

  function decorateCookMode() {
    const hero = document.querySelector(".cook-hero .page-shell");
    const title = document.getElementById("cookTitle")?.textContent?.trim();
    if (!hero || !title || title === "Ready when you are." || title === "No recipe loaded.") return;

    const old = hero.querySelector(".cook-recipe-photo");
    if (old?.dataset.photoTitle === title) return;
    if (old) old.remove();

    const visual = buildVisual(title, "cook-recipe-photo");
    visual.dataset.photoTitle = title;
    hero.prepend(visual);
  }

  function decorate() {
    document.querySelectorAll(".recipe-card").forEach(decorateCard);
    document.querySelectorAll(".best-match-card").forEach(decorateBest);
    document.querySelectorAll(".saved-card").forEach(decorateSaved);
    decorateModal(document.getElementById("recipeModalContent"));
    decorateModal(document.getElementById("savedModalContent"));
    decorateBuilder();
    decorateCookMode();
  }

  const observer = new MutationObserver(() => requestAnimationFrame(decorate));
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  window.CLMRecipeVisuals = { slugify, imagePath, decorate };
  document.addEventListener("DOMContentLoaded", decorate);
  setTimeout(decorate, 150);
})();