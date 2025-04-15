let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById('cart-count').innerText = cart.length;
}

function showCart() {
  const text = cart.map(item => `${item.name} — ${item.price}₽`).join('\n');
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const result = `${text}\n\nИтого: ${total}₽`;
  Telegram.WebApp.sendData(result); // отправка данных боту
}
