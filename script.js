let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById('cart-count').innerText = cart.length;
}

function showCart() {
  let summary = cart.map(item => `${item.name} — ${item.price} ₽`).join('\n');
  summary += `\n\nИтого: ${cart.reduce((sum, item) => sum + item.price, 0)} ₽`;
  alert(summary);
}
