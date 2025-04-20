document.addEventListener('DOMContentLoaded', function() {
    const productsList = document.getElementById('products-list');
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');

    let cart = [];
    let products = [
        { id: 1, name: 'Товар 1', price: 1000, category: 'clothes', image: 'https://via.placeholder.com/200' },
        { id: 2, name: 'Товар 2', price: 2000, category: 'clothes', image: 'https://via.placeholder.com/200' },
        { id: 3, name: 'Товар 3', price: 1500, category: 'accessories', image: 'https://via.placeholder.com/200' },
        { id: 4, name: 'Товар 4', price: 2500, category: 'accessories', image: 'https://via.placeholder.com/200' },
        { id: 5, name: 'Товар 5', price: 3000, category: 'clothes', image: 'https://via.placeholder.com/200' },
        { id: 6, name: 'Товар 6', price: 4000, category: 'clothes', image: 'https://via.placeholder.com/200' },
        { id: 7, name: 'Товар 7', price: 1200, category: 'accessories', image: 'https://via.placeholder.com/200' },
        { id: 8, name: 'Товар 8', price: 1800, category: 'accessories', image: 'https://via.placeholder.com/200' }
    ];

    function renderProducts(productsToRender) {
        productsList.innerHTML = '';
        productsToRender.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Цена: ${product.price} руб.</p>
                <button data-id="${product.id}">Добавить в корзину</button>
            `;
            productsList.appendChild(productDiv);
        });

        const addToCartButtons = document.querySelectorAll('.product button');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(button.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                cart.push(product);
                updateCart();
            });
        });
    }

    function updateCart() {
        cartButton.textContent = `Корзина (${cart.length})`;
        cartItems.innerHTML = '';
        cart.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.price} руб.`;
            cartItems.appendChild(li);
        });
    }

    closeCartButton.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    cartButton.addEventListener('click', function() {
        cartModal.style.display = 'flex';
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
        renderProducts
