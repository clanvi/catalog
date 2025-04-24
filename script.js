const products = [
  { id: 1, name: "Товар 1", image: "https://via.placeholder.com/150", price: "1200₽" },
  { id: 2, name: "Товар 2", image: "https://via.placeholder.com/150", price: "900₽" },
  { id: 3, name: "Товар 3", image: "https://via.placeholder.com/150", price: "700₽" },
  { id: 4, name: "Товар 4", image: "https://via.placeholder.com/150", price: "1500₽" },
];

const cart = [];

const catalogEl = document.getElementById("productCatalog");
const cartCountEl = document.getElementById("cartCount");
const cartItemsEl = document.getElementById("cartItems");
const cartModal = document.getElementById("cartModal");
const checkoutModal = document.getElementById("checkoutModal");

function renderCatalog() {
  catalogEl.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = \`
      <img src="\${product.image}" alt="\${product.name}">
      <h3>\${product.name}</h3>
      <p>\${product.price}</p>
      <button onclick="addToCart(\${product.id})">В корзину</button>
    \`;
    catalogEl.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  cartCountEl.textContent = cart.length;
}

function toggleCart() {
  cartModal.classList.toggle("hidden");
  updateCartItems();
}

function updateCartItems() {
  cartItemsEl.innerHTML = "";
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = \`\${item.name} — \${item.price}\`;
    cartItemsEl.appendChild(li);
  });
}

function toggleCheckout() {
  checkoutModal.classList.toggle("hidden");
  cartModal.classList.toggle("hidden");
}

document.getElementById("cartBtn").addEventListener("click", toggleCart);
document.getElementById("checkoutBtn").addEventListener("click", toggleCheckout);

document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Заявка отправлена!");
  cart.length = 0;
  cartCountEl.textContent = 0;
  checkoutModal.classList.add("hidden");
});

renderCatalog();
