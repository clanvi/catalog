
// Данные для товаров (можно заменить на динамическую загрузку с API)
const products = [
    { id: 1, name: 'Платье', category: 'clothes', price: 1500, img: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Сумка', category: 'accessories', price: 800, img: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Куртка', category: 'clothes', price: 2500, img: 'https://via.placeholder.com/200' },
    { id: 4, name: 'Очки', category: 'accessories', price: 500, img: 'https://via.placeholder.com/200' }
];

let cart = [];

const categoryFilter = document.getElementById('category');
const productContainer = document.querySelector('.products');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');

// Функция для отрисовки товаров
function renderProducts() {
    productContainer.innerHTML = '';
    const filteredProducts = products.filter(product => categoryFilter.value === 'all' || product.category === categoryFilter.value);
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}₽</p>
            <button onclick="addToCart(${product.id})">Добавить в корзину</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Функция для добавления товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartButton();
    updateCartModal();
}

// Обновление кнопки корзины
function updateCartButton() {
    cartButton.textContent = `Корзина (${cart.length})`;
}

// Обновление содержимого модального окна корзины
function updateCartModal() {
    cartItems.innerHTML = '';
    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${product.name} - ${product.price}₽`;
        cartItems.appendChild(cartItem);
    });
}

// Закрытие модального окна
closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Открытие корзины
cartButton.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

// Отображение товаров при изменении фильтра
categoryFilter.addEventListener('change', renderProducts);

// Инициализация
renderProducts();
