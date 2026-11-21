// Fura De Nono & Grills — menu, basket and WhatsApp order flow
// Prices are copied from the menu artwork supplied by the business owner.

const BUSINESS_NAME = "Fura De Nono & Grills";
const WHATSAPP_NUMBER = "2348076615521";

const PHOTO = {
  fura: "assets/fura-from-menu.jpg",
  furaFruitsOverhead: "assets/fura-milk-fruits-overhead.webp",
  furaFruitsFront: "assets/fura-milk-fruits-front.webp",
  furaSpecial: "assets/fura-de-nono-special.webp",
  milk35: "assets/nono-milk-35cl.webp",
  milk75: "assets/nono-milk-75cl.webp",
  shake: "split:shake",
  salmon: "split:salmon",
  chicken: "https://images.unsplash.com/photo-1777891258069-454e66f8bedc?auto=format&fit=crop&w=1000&q=82",
  beef: "https://images.unsplash.com/photo-1741994246814-9caec2a78e07?auto=format&fit=crop&w=1000&q=82",
  spicyChicken: "https://images.unsplash.com/photo-1755438538504-97119f066871?auto=format&fit=crop&w=1000&q=82",
  seafood: "split:seafood",
  cupcakes: "https://images.unsplash.com/photo-1573050435329-27ff3181380c?auto=format&fit=crop&w=1000&q=82",
  veggieCupcakes: "https://images.pexels.com/photos/34501162/pexels-photo-34501162.jpeg?auto=compress&cs=tinysrgb&w=1000",
  smoothie: "https://images.unsplash.com/photo-1712056407284-c1eda76e7bcd?auto=format&fit=crop&w=1000&q=82",
  coffee: "assets/coffee-wooden-cup.webp",
  milkBunsView1: "assets/signature-milk-buns-view-1.webp",
  milkBunsView2: "assets/signature-milk-buns-view-2.webp",
  packages: "assets/menu-reference.jpg"
};

const IMAGE_PARTS = {
  seafood: [
    "assets/image-parts/seafood-01.txt",
    "assets/image-parts/seafood-02.txt",
    "assets/image-parts/seafood-03.txt"
  ],
  salmon: [
    "assets/image-parts/salmon-01.txt",
    "assets/image-parts/salmon-02.txt",
    "assets/image-parts/salmon-03.txt",
    "assets/image-parts/salmon-04.txt"
  ],
  shake: [
    "assets/image-parts/shake-01.txt",
    "assets/image-parts/shake-02.txt",
    "assets/image-parts/shake-03.txt"
  ],
  furaFruitsOverhead: ["assets/image-parts/fura-milk-fruits-overhead.txt"],
  furaFruitsFront: ["assets/image-parts/fura-milk-fruits-front.txt"]
};

const imagePartCache = new Map();

async function loadImageParts(key) {
  if (!imagePartCache.has(key)) {
    const pending = Promise.all(IMAGE_PARTS[key].map(async (path) => {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Could not load image part: ${path}`);
      return (await response.text()).trim();
    })).then((parts) => `data:image/webp;base64,${parts.join("")}`);
    imagePartCache.set(key, pending);
  }
  return imagePartCache.get(key);
}

const items = [
  { id: 1, name: "Fura Milk", category: "fura", price: 3500, desc: "Our signature fura de nono — rich, creamy and refreshing.", image: PHOTO.milk35, alt: "Nono Milk in the approved 35 CL wooden bottle", photoContain: true },
  { id: 2, name: "Fura Milk Extra", category: "fura", price: 6000, desc: "A fuller serving for an even more satisfying fura moment.", image: PHOTO.milk75, alt: "Nono Milk in the approved 75 CL wooden bottle", photoContain: true },
  { id: 3, name: "Fura Milk & Fruits", category: "fura", price: 14200, desc: "Our fura favourite with a fruity twist.", gallery: [PHOTO.furaFruitsOverhead, PHOTO.furaFruitsFront], galleryAlt: ["Overhead view of the wooden Fura Milk & Fruits mug with fruit milk inside", "Front view of the wooden Fura Milk & Fruits mug"], photoLabel: "Fura Milk & Fruits" },
  { id: 4, name: "Fura De Nono Special", category: "fura", price: 30000, desc: "A special house-style fura de nono experience.", image: PHOTO.furaSpecial, alt: "Fura De Nono Special served in the approved wooden bowl with millet balls, milk, fresh fruit and a wooden spoon", photoLabel: "Fura De Nono Special", photoContain: true },
  { id: 5, name: "Fura De Nono Shake", category: "fura", price: 12000, desc: "A cool, creamy shake inspired by our signature drink.", image: PHOTO.shake, alt: "Fura De Nono Shake in the approved wooden cup with clear dome lid and millet balls", photoContain: true },
  { id: 6, name: "Grilled Salmon", category: "grills", price: 38000, desc: "Grilled salmon, a seafood favourite.", image: PHOTO.salmon, alt: "Juicy grilled salmon on an engraved wooden serving plate with matching wooden fork and knife" },
  { id: 7, name: "Grilled Chicken", category: "grills", price: 16600, desc: "A juicy grilled chicken favourite.", gallery: ["assets/grilled-chicken-view-1.webp", "assets/grilled-chicken-view-2.webp"], galleryAlt: ["Grilled chicken fillets on the engraved wooden serving plate with lemon, asparagus, fork and knife", "Juicy grilled chicken quarter on a wooden serving plate with sauce and grilled vegetables"], photoLabel: "Grilled Chicken", gallerySwipe: true },
  { id: 8, name: "Grilled Beef", category: "grills", price: 7800, desc: "A satisfying grilled beef option.", gallery: ["assets/grilled-beef-view-1.webp", "assets/grilled-beef-view-2.webp"], galleryAlt: ["Juicy grilled beef steak on an engraved wooden serving plate with roasted potatoes, peppers and sauce", "Sliced juicy grilled beef steak on a wooden serving plate with grilled vegetables, fork and knife"], photoLabel: "Grilled Beef", gallerySwipe: true },
  { id: 9, name: "Spicy Chicken", category: "grills", price: 9400, desc: "Chicken with a bold, spicy finish.", image: PHOTO.spicyChicken, alt: "Seasoned grilled chicken skewers; reference photograph", reference: true },
  { id: 10, name: "Seafood Platter", category: "grills", price: 66700, desc: "A generous seafood selection for sharing.", image: PHOTO.seafood, alt: "Seafood platter in a wooden tray with engraved lid", photoLabel: "Seafood" },
  { id: 11, name: "Sweet Cupcakes", category: "desserts", sectionTitle: "Sweet Treats", price: 7500, desc: "A sweet little treat for any occasion.", image: PHOTO.cupcakes, alt: "Assorted cupcakes; reference photograph", reference: true },
  { id: 12, name: "Veggie Cupcakes", category: "desserts", sectionTitle: "Sweet Treats", price: 6500, desc: "A savoury veggie option from our menu.", image: PHOTO.veggieCupcakes, alt: "Savoury vegetable muffins; reference photograph", reference: true },
  { id: 13, name: "Smoothies", category: "sides", price: 4000, desc: "A refreshing sip made for your day.", image: PHOTO.smoothie, alt: "Creamy fruit smoothie", photoLabel: "Smoothies" },
  { id: 14, name: "Coffee (By Choice)", category: "sides", price: 10000, desc: "Choose your coffee preference when ordering.", image: PHOTO.coffee, alt: "Traditional coffee with a heart-shaped milk design in a wooden Fura De Nono & Grills cup and saucer; packaging concept", photoLabel: "Coffee" },
  { id: 16, name: "Signature Milk Buns", category: "desserts", sectionTitle: "Bread & Snacks", price: null, priceText: "By order", desc: "Soft, fluffy milk buns finished with our small toasted brand mark.", gallery: [PHOTO.milkBunsView1, PHOTO.milkBunsView2], galleryAlt: ["Three branded golden milk buns on a dark baking tray", "Branded golden milk buns arranged on a white cooling rack"], photoLabel: "Signature Milk Buns", gallerySwipe: true, galleryContain: true, quoteOnly: true, quoteLabel: "Ask about milk buns ↗", quoteMessage: "Hello Fura De Nono & Grills! I'd like to order your Signature Milk Buns. Please let me know the available quantity and price." },
  { id: 15, name: "Food Packages", category: "packages", price: null, priceText: "By order", desc: "Planning a gathering? Ask us about a food package.", image: PHOTO.packages, alt: "Fura De Nono & Grills menu artwork; package options are arranged by order", photoLabel: "Menu", quoteOnly: true }
];

const naira = (amount) => "₦" + amount.toLocaleString("en-NG");
let cart = [];
const grid = document.getElementById("menuGrid");

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderMenu(filter = "all") {
  const visible = items.filter((item) => filter === "all" || item.category === filter);
  if (filter === "desserts") visible.sort((a, b) => (a.id === 16 ? -1 : 0) - (b.id === 16 ? -1 : 0));
  grid.innerHTML = visible.map((item) => `
    ${filter === "desserts" && item.sectionTitle ? `<div class="menu-group-title"><span>${item.sectionTitle}</span></div>` : ""}
    <article class="menu-card${item.gallery && !item.gallerySwipe ? " menu-card-gallery" : ""}${item.gallerySwipe ? " menu-card-swipe" : ""}${item.galleryContain ? " menu-card-bread" : ""}">
      ${item.gallery
        ? `<div class="food-art ${item.category} product-image-gallery${item.gallerySwipe ? " product-image-gallery-swipe" : ""}${item.galleryContain ? " product-image-gallery-contain" : ""}">
            ${item.gallery.map((source, index) => `<div class="gallery-frame"><img ${source.startsWith("split:") ? `data-split-image="${source.slice(6)}"` : `src="${source}"`} alt="${item.galleryAlt[index]}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('photo-unavailable');"></div>`).join("")}
            <span class="photo-tag">${item.photoLabel || item.name}</span>
          </div>`
        : `<div class="food-art ${item.category}${item.photoContain ? " product-image-contain" : ""}">
            <img ${item.image.startsWith("split:") ? `data-split-image="${item.image.slice(6)}"` : `src="${item.image}"`} alt="${item.alt}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('photo-unavailable');">
            <span class="photo-tag">${item.photoLabel || item.name}</span>
          </div>`}
      <div class="card-content">
        <div class="card-top">
          <h3>${item.name}</h3>
          <span class="price">${item.price === null ? item.priceText : naira(item.price)}</span>
        </div>
        <p>${item.desc}</p>
        ${item.quoteOnly
          ? `<button class="add-btn" data-quote="${item.id}">${item.quoteLabel || "Request a package ↗"}</button>`
          : `<button class="add-btn" data-add="${item.id}">Add to bag +</button>`}
      </div>
    </article>`).join("");

  grid.querySelectorAll("img[data-split-image]").forEach(async (img) => {
    try {
      img.src = await loadImageParts(img.dataset.splitImage);
    } catch (error) {
      img.style.display = "none";
      img.parentElement.classList.add("photo-unavailable");
    }
  });
}

renderMenu();

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderMenu(button.dataset.filter);
  });
});

grid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const quoteButton = event.target.closest("[data-quote]");

  if (quoteButton) {
    const requestedItem = items.find((item) => item.id === Number(quoteButton.dataset.quote));
    const message = requestedItem?.quoteMessage || `Hello ${BUSINESS_NAME}! I'd like to ask about your food packages. Please send me the available options and prices.`;
    window.open(whatsappLink(message), "_blank", "noopener");
    return;
  }

  if (!addButton) return;
  const id = Number(addButton.dataset.add);
  const selected = cart.find((item) => item.id === id);
  if (selected) selected.qty += 1;
  else cart.push({ id, qty: 1 });
  renderCart();
});

const panel = document.getElementById("cartPanel");
const backdrop = document.getElementById("cartBackdrop");
function openCart() { panel.classList.add("open"); backdrop.classList.add("open"); }
function closeCart() { panel.classList.remove("open"); backdrop.classList.remove("open"); }
document.getElementById("cartFab").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, cartItem) => {
    const product = items.find((item) => item.id === cartItem.id);
    return sum + product.price * cartItem.qty;
  }, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = naira(total);

  document.getElementById("cartItems").innerHTML = cart.length
    ? cart.map((cartItem) => {
      const product = items.find((item) => item.id === cartItem.id);
      return `<div class="cart-row">
        <div><strong>${product.name}</strong>${naira(product.price)}
          <div class="qty">
            <button type="button" aria-label="Remove one ${product.name}" data-change="${product.id}" data-delta="-1">−</button>
            <span>${cartItem.qty}</span>
            <button type="button" aria-label="Add one ${product.name}" data-change="${product.id}" data-delta="1">+</button>
          </div>
        </div>
        <b>${naira(product.price * cartItem.qty)}</b>
      </div>`;
    }).join("")
    : '<p class="empty-cart">Your bag is waiting for something delicious.</p>';
}

document.getElementById("cartItems").addEventListener("click", (event) => {
  const button = event.target.closest("[data-change]");
  if (!button) return;
  const id = Number(button.dataset.change);
  const selected = cart.find((item) => item.id === id);
  if (!selected) return;
  selected.qty += Number(button.dataset.delta);
  if (selected.qty <= 0) cart = cart.filter((item) => item.id !== id);
  renderCart();
});

document.getElementById("whatsappOrder").addEventListener("click", () => {
  if (!cart.length) {
    alert("Add something to your bag first.");
    return;
  }
  const total = cart.reduce((sum, cartItem) => {
    const product = items.find((item) => item.id === cartItem.id);
    return sum + product.price * cartItem.qty;
  }, 0);
  const lines = cart.map((cartItem) => {
    const product = items.find((item) => item.id === cartItem.id);
    return `${cartItem.qty} x ${product.name} — ${naira(product.price * cartItem.qty)}`;
  });
  const message = `Hello ${BUSINESS_NAME}! I'd like to place an order:\n\n${lines.join("\n")}\n\nSubtotal: ${naira(total)}\nPlease confirm availability, delivery fee and payment details.`;
  window.open(whatsappLink(message), "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();
renderCart();
