// Function to open the curtain using GSAP
function animateCurtainOpen() {
  const curtain = document.getElementById("welcome-curtain");
  const body = document.getElementById("body-root");

  if (typeof gsap !== "undefined") {
    const tl = gsap.timeline({
      onComplete: () => {
        curtain.style.display = "none";
        body.classList.remove("curtain-active");
      },
    });

    // Fade out central text
    tl.to("#curtain-center", {
      duration: 0.4,
      opacity: 0,
      scale: 0.95,
      ease: "power2.in",
    });

    // Slide left panel to the left
    tl.to(
      "#curtain-left",
      {
        duration: 0.9,
        xPercent: -100,
        ease: "power3.inOut",
      },
      "-=0.1",
    );

    // Slide right panel to the right
    tl.to(
      "#curtain-right",
      {
        duration: 0.9,
        xPercent: 100,
        ease: "power3.inOut",
      },
      "-=0.9",
    );
  } else {
    // Fallback if GSAP fails to load
    curtain.style.display = "none";
    body.classList.remove("curtain-active");
  }
}

// Focus catalog search input when navbar search button is clicked
function focusCatalogSearch() {
  const searchInput = document.getElementById("searchInput");
  const catalogSection = document.getElementById("catalog");

  if (catalogSection) {
    // Smooth scroll down to the catalog section
    catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (searchInput) {
    // Focus cursor into search bar after scroll completes
    setTimeout(() => {
      searchInput.focus();

      // Optional glow effect to highlight the input field
      searchInput.classList.add("search-highlight");
      setTimeout(() => {
        searchInput.classList.remove("search-highlight");
      }, 1500);
    }, 400);
  }
}

// Data array containing all hair products from the original website design
const products = [
  {
    id: 1,
    badge: "DOLLY BEST SELLER",
    origin: "Vietnam",
    grade: "SDD",
    texture: "Bone Straight",
    title: "Vietnam SDD Bone Straight Hair",
    subtext: "Super Double Drawn · 98% Full Ends · Glass Sheen",
    lengths: ['14"', '16"', '18"', '20"'],
    selectedLength: '16"',
    price: 685000,
    image: "./assets/dolly img 2.jpg",
  },
  {
    id: 2,
    badge: "DOLLY BEST SELLER",
    origin: "Mongolia",
    grade: "RAW",
    texture: "Bounce Wave",
    title: "Mongolia Raw Bounce Wave Bundle",
    subtext: "Organic S-Wave · Weightless Bounce · High Luster",
    lengths: ['14"', '16"', '18"', '20"'],
    selectedLength: '16"',
    price: 399000,
    image: "./assets/dolly img 3.jpg",
  },
  {
    id: 3,
    badge: "RARE BATCH",
    origin: "Vietnam",
    grade: "Baby Thin",
    texture: "Bone Straight",
    title: "Vietnam Baby Thin Raw Hair",
    subtext: "Ultra-Fine Strands · Natural Airy Movement · Zero Silicones",
    lengths: ['16"', '18"', '20"', '22"'],
    selectedLength: '18"',
    price: 445000,
    image: "./assets/dolly img 5.png",
  },
  {
    id: 4,
    badge: "DOLLY BEST SELLER",
    origin: "Vietnam",
    grade: "RAW",
    texture: "Bone Straight",
    title: "Real HD Swiss Lace Frontal (13x4 / 13x6)",
    subtext:
      "Invisible Film Lace · Pre-Plucked Hairline · Bleached Micro Knots",
    lengths: ['14"', '16"', '18"', '20"'],
    selectedLength: '16"',
    price: 237000,
    image: "./assets/dolly img 4.jpg",
  },
  {
    id: 5,
    badge: "STANDARD BATCH",
    origin: "Chinese",
    grade: "SDD",
    texture: "Bone Straight",
    title: "Chinese SDD Silky Bone Straight Bundle",
    subtext: "Heavy Glass Sheen · Pure Silk Texture · Extreme Flatness",
    lengths: ['16"', '18"', '20"', '22"'],
    selectedLength: '18"',
    price: 209000,
    image: "./assets/dolly img 7.jpg",
  },
  {
    id: 6,
    badge: "DOLLY BEST SELLER",
    origin: "Mongolia",
    grade: "RAW",
    texture: "Bounce Wave",
    title: "HD Real Swiss Lace Closure (5x5 / 6x6)",
    subtext: "Undetectable Scalp Illusion · Free Part · Hand Tied",
    lengths: ['14"', '16"', '18"', '20"'],
    selectedLength: '16"',
    price: 197000,
    image: "./assets/dolly img 6.png",
  },
];

// let cartItemsCount = 0;

// ==========================================
// 1. GLOBAL STATE & THRESHOLDS
// ==========================================
const FREE_SHIPPING_THRESHOLD = 400000;
let cart = [];

// ==========================================
// 2. DRAWER TOGGLE FUNCTIONS
// ==========================================
function openBagDrawer() {
  const drawer = document.getElementById("bag-drawer");
  const overlay = document.getElementById("bag-drawer-overlay");
  if (drawer) drawer.classList.add("active");
  if (overlay) overlay.classList.add("active");
}

function closeBagDrawer() {
  const drawer = document.getElementById("bag-drawer");
  const overlay = document.getElementById("bag-drawer-overlay");
  if (drawer) drawer.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
}

// ==========================================
// 3. PRODUCT GRID RENDERING
// ==========================================
function renderProducts(items) {
  const grid = document.getElementById("productGrid");
  const activeCount = document.getElementById("activeCount");

  if (!grid) return;

  grid.innerHTML = "";
  if (activeCount) activeCount.textContent = items.length;

  if (!items || items.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted, #736a56);">No textures found matching your filters.</p>`;
    return;
  }

  items.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card fade-in";

    card.innerHTML = `
      <div class="product-image-wrap">
        <span class="badge-tag">${product.badge || product.grade || "RAW"}</span>
        <img src="${product.image}" alt="${product.title || product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-meta">${(product.origin || "").toUpperCase()} · ${product.grade || ""} · ${(product.texture || "").toUpperCase()}</span>
        <h3 class="product-title">${product.title || product.name}</h3>
        <p class="product-subtext">${product.subtext || ""}</p>
        
        <div class="product-card-footer">
          <div>
            <span style="font-size:0.65rem; color:var(--text-muted, #736a56); display:block;">PER BUNDLE (${product.selectedLength || '16"'})</span>
            <span class="price">₦${Number(product.price).toLocaleString("en-NG")}</span>
          </div>
          <button class="add-bag-btn" onclick="addToCart('${product.id}')">+ Add to Bag</button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  initScrollObserver();
}

// ==========================================
// 4. FILTER & INTERSECTION OBSERVER LOGIC
// ==========================================
function applyFilters() {
  const searchInput = document.getElementById("searchInput");
  const originFilter = document.getElementById("originFilter");
  const textureFilter = document.getElementById("textureFilter");
  const gradeFilter = document.getElementById("gradeFilter");
  const priceRange = document.getElementById("priceRange");

  const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const originVal = originFilter ? originFilter.value : "all";
  const textureVal = textureFilter ? textureFilter.value : "all";
  const gradeVal = gradeFilter ? gradeFilter.value : "all";
  const maxPriceVal = priceRange ? parseInt(priceRange.value, 10) : 3500000;

  if (typeof products === "undefined" || !Array.isArray(products)) return;

  const filtered = products.filter((item) => {
    const titleText = (item.title || item.name || "").toLowerCase();
    const subText = (item.subtext || "").toLowerCase();

    const matchesSearch =
      titleText.includes(searchVal) || subText.includes(searchVal);
    const matchesOrigin = originVal === "all" || item.origin === originVal;
    const matchesTexture = textureVal === "all" || item.texture === textureVal;
    const matchesGrade = gradeVal === "all" || item.grade === gradeVal;
    const matchesPrice = item.price <= maxPriceVal;

    return (
      matchesSearch &&
      matchesOrigin &&
      matchesTexture &&
      matchesGrade &&
      matchesPrice
    );
  });

  renderProducts(filtered);
}

function initScrollObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.05 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

// ==========================================
// 5. CART & BAG DRAWER CONTROLLER
// ==========================================
function addToCart(productId) {
  if (typeof products === "undefined" || !Array.isArray(products)) return;

  const product = products.find((p) => String(p.id) === String(productId));
  if (!product) return;

  const existingIndex = cart.findIndex(
    (item) => String(item.id) === String(productId),
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title || product.name,
      price: Number(product.price) || 0,
      image: product.image,
      selectedLength: product.selectedLength || '16"',
      qty: 1,
    });
  }

  updateBagDrawerUI();
  openBagDrawer();
}

function updateBagDrawerUI() {
  const container = document.getElementById("drawer-items-list");
  const drawerCountBadge = document.getElementById("drawer-count-badge");
  const navCartCount = document.getElementById("cartCount");
  const subtotalEl = document.getElementById("drawer-subtotal");
  const totalEl = document.getElementById("drawer-total");

  const shippingTextEl = document.getElementById("shipping-threshold-text");
  const shippingPercentEl = document.getElementById("shipping-percentage-text");
  const shippingFillEl = document.getElementById("shipping-progress-fill");

  if (!container) return;

  let totalQty = 0;
  let subtotal = 0;
  const deliveryFee = 5000;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #8c8270;">
        <p style="font-size: 14px; margin-bottom: 8px; font-weight: 500;">Your bag is currently empty.</p>
        <p style="font-size: 12px; color: #b8ab8b;">Explore our raw collections to add bundles or closures.</p>
      </div>
    `;
  } else {
    cart.forEach((item, index) => {
      totalQty += item.qty;
      subtotal += item.price * item.qty;

      const itemCard = document.createElement("div");
      itemCard.className = "drawer-item-card";
      itemCard.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="drawer-item-img" />
        <div class="drawer-item-info">
          <div>
            <h4 class="drawer-item-name">${item.title}</h4>
            <p style="font-size: 11px; color: #8c8270; margin: 2px 0 0 0;">${item.selectedLength} Length</p>
          </div>
          <div class="drawer-item-qty-wrap">
            <div class="qty-controls">
              <button onclick="changeQty(${index}, -1)" class="qty-btn" aria-label="Decrease quantity">-</button>
              <span class="qty-val">${item.qty}</span>
              <button onclick="changeQty(${index}, 1)" class="qty-btn" aria-label="Increase quantity">+</button>
            </div>
            <span class="drawer-item-price">₦${(item.price * item.qty).toLocaleString("en-NG")}</span>
          </div>
        </div>
        <button onclick="removeItem(${index})" class="delete-item-btn" title="Remove item">&times;</button>
      `;
      container.appendChild(itemCard);
    });
  }

  // 1. Update Cart Badge Counters
  if (drawerCountBadge) drawerCountBadge.innerText = totalQty;
  if (navCartCount) navCartCount.innerText = totalQty;

  // 2. Free Shipping Bar Calculation
  const percentage = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );
  const remainingForFreeDelivery = FREE_SHIPPING_THRESHOLD - subtotal;

  if (shippingPercentEl) shippingPercentEl.innerText = `${percentage}%`;
  if (shippingFillEl) shippingFillEl.style.width = `${percentage}%`;

  if (shippingTextEl) {
    if (subtotal === 0) {
      shippingTextEl.innerText = `Add ₦${FREE_SHIPPING_THRESHOLD.toLocaleString("en-NG")} for Free Nationwide Delivery`;
    } else if (remainingForFreeDelivery > 0) {
      shippingTextEl.innerText = `Add ₦${remainingForFreeDelivery.toLocaleString("en-NG")} for Free Nationwide Delivery`;
    } else {
      shippingTextEl.innerText = `🎉 You unlocked Free Nationwide Delivery!`;
    }
  }

  // 3. Price Totals Update
  const currentDelivery =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : deliveryFee;
  const finalTotal = subtotal > 0 ? subtotal + currentDelivery : 0;

  if (subtotalEl) subtotalEl.innerText = "₦" + subtotal.toLocaleString("en-NG");
  if (totalEl) totalEl.innerText = "₦" + finalTotal.toLocaleString("en-NG");
}

function changeQty(index, delta) {
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    updateBagDrawerUI();
  }
}

function removeItem(index) {
  if (cart[index]) {
    cart.splice(index, 1);
    updateBagDrawerUI();
  }
}

// ==========================================
// 6. EVENT LISTENERS INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof products !== "undefined" && Array.isArray(products)) {
    renderProducts(products);
  }

  updateBagDrawerUI();

  const searchInput = document.getElementById("searchInput");
  const originFilter = document.getElementById("originFilter");
  const textureFilter = document.getElementById("textureFilter");
  const gradeFilter = document.getElementById("gradeFilter");
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");
  const cartToggleBtn = document.getElementById("cartToggle");

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (originFilter) originFilter.addEventListener("change", applyFilters);
  if (textureFilter) textureFilter.addEventListener("change", applyFilters);
  if (gradeFilter) gradeFilter.addEventListener("change", applyFilters);

  if (priceRange) {
    priceRange.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      if (priceValue) priceValue.textContent = `₦${val.toLocaleString()}`;
      applyFilters();
    });
  }

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener("click", openBagDrawer);
  }
});

function sendToWhatsApp() {
  if (!cart || cart.length === 0) {
    alert("Your bag is empty! Please add items before sending your receipt.");
    return;
  }

  // Replace this with your WhatsApp phone number (include country code, e.g., 234 for Nigeria)
  const phoneNumber = "2348122871953";

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 5000;
  const grandTotal = subtotal + deliveryFee;

  let message = `*DOLLY STRANDS - NEW ORDER RECEIPT*\n`;

  message += `*ORDER ITEMS:*\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.title || item.name}*\n`;
    message += `   Length: ${item.selectedLength || '16"'}\n`;
    message += `   Qty: ${item.qty} x ₦${item.price.toLocaleString("en-NG")}\n`;
    message += `   Subtotal: ₦${(item.price * item.qty).toLocaleString("en-NG")}\n\n`;
  });

  message += `*Subtotal:* ₦${subtotal.toLocaleString("en-NG")}\n`;
  message += `*Delivery Fee:* ${deliveryFee === 0 ? "FREE" : "₦" + deliveryFee.toLocaleString("en-NG")}\n`;
  message += `*GRAND TOTAL:* ₦${grandTotal.toLocaleString("en-NG")}\n`;
  message += `Hello Dolly Strands, I would like to place an order for the items above. Please confirm availability and payment details.`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}
