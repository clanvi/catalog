const products = [
  { id: 1, name: "Платье красное", image: "https://via.placeholder.com/150?text=Платье+1", price: "1200₽" },
  { id: 2, name: "Платье синее", image: "https://via.placeholder.com/150?text=Платье+2", price: "1300₽" },
  { id: 3, name: "Пальто бежевое", image: "https://via.placeholder.com/150?text=Пальто", price: "2500₽" },
  { id: 4, name: "Куртка демисезон", image: "https://via.placeholder.com/150?text=Куртка", price: "3000₽" },
  { id: 5, name: "Джинсы синие", image: "https://via.placeholder.com/150?text=Джинсы", price: "1800₽" },
  { id: 6, name: "Свитер вязаный", image: "https://via.placeholder.com/150?text=Свитер", price: "1600₽" },
  { id: 7, name: "Рубашка белая", image: "https://via.placeholder.com/150?text=Рубашка", price: "1100₽" },
  { id: 8, name: "Футболка черная", image: "https://via.placeholder.com/150?text=Футболка", price: "900₽" },
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
