const products = [
  { id: 1, name: "Футболка", price: 1000, category: "clothing" },
  { id: 2, name: "Штаны", price: 2000, category: "clothing" },
  { id: 3, name: "Куртка", price: 5000, category: "clothing" },
  { id: 4, name: "Кроссовки", price: 4500, category: "shoes" }
];

const catalog = document.getElementById("catalog");
const searchInput = document.getElementById("searchInput");
const sortButtons = document.querySelectorAll(".sort-button");
const categoryButtons = document.querySelectorAll(".category-button");

let filteredProducts = [...products];

function renderCatalog(items) {
  catalog.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h4>${item.name}</h4><p>${item.price} ₽</p>`;
    card.addEventListener("click", () => openProductCard(item));
    catalog.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(query)
  );
  renderCatalog(filtered);
});

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sortType = button.getAttribute("data-sort");
    let sorted = [...filteredProducts];
    if (sortType === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    }
    renderCatalog(sorted);
  });
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    filteredProducts = products.filter((p) => p.category === category);
    renderCatalog(filteredProducts);
  });
});

let cart = [];

function openProductCard(product) {
  catalog.innerHTML = `
    <div class="product-card">
      <img src="https://via.placeholder.com/300x400" alt="${product.name}" class="main-image" />
      <div class="gallery">
        <img src="https://via.placeholder.com/80" />
        <img src="https://via.placeholder.com/80" />
        <img src="https://via.placeholder.com/80" />
      </div>
      <div class="size-selector">
        <label>Размер:</label>
        <select>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>
      </div>
      <div class="description">
        <h2>${product.name}</h2>
        <p><strong>${product.price} ₽</strong></p>
        <p>Описание товара: стильный и удобный!</p>
      </div>
      <div class="support-block">
        <p>Остались вопросы?</p>
        <button onclick="openSupport()">Написать в поддержку</button>
      </div>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Добавить в корзину</button>
    </div>
  `;
}

function openSupport() {
  alert("Переход в поддержку");
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const inCart = cart.find(item => item.id === productId);
  if (inCart) {
    inCart.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  alert("Товар добавлен в корзину!");
}

function openCart() {
  catalog.innerHTML = `
    <button onclick="renderCatalog(products)">← Назад</button>
    <h2>Корзина</h2>
    ${cart.length === 0 ? "<p>Корзина пуста</p>" : ""}
    <div class="cart-items">
      ${cart.map(item => `
        <div class="cart-item">
          <strong>${item.name}</strong><br/>
          <button onclick="decreaseQty(${item.id})">-</button>
          ${item.quantity}
          <button onclick="increaseQty(${item.id})">+</button>
          <p>${item.price * item.quantity} ₽</p>
        </div>
      `).join("")}
    </div>
  `;
}

function increaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.quantity += 1;
  openCart();
}

function decreaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(p => p.id !== id);
  }
  openCart();
}

renderCatalog(filteredProducts);
