const products = [
    { id: 1, name: 'Футболка белая', price: 1200, category: 'clothes', image: 'img/tshirt.jpg' },
    { id: 2, name: 'Сумка кожаная', price: 3500, category: 'accessories', image: 'img/bag.jpg' },
    { id: 3, name: 'Шорты джинсовые', price: 1800, category: 'clothes', image: 'img/shorts.jpg' },
    { id: 4, name: 'Очки солнцезащитные', price: 2300, category: 'accessories', image: 'img/sunglasses.jpg' },
    { id: 5, name: 'Платье летнее', price: 2900, category: 'clothes', image: 'img/dress.jpg' },
    { id: 6, name: 'Кошелёк', price: 1500, category: 'accessories', image: 'img/wallet.jpg' },
    { id: 7, name: 'Рубашка в клетку', price: 2100, category: 'clothes', image: 'img/shirt.jpg' },
    { id: 8, name: 'Ремень мужской', price: 1700, category: 'accessories', image: 'img/belt.jpg' },
];

const productsContainer = document.querySelector('.products');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category');
const sortSelect = document.getElementById('sort');

function renderProducts(filtered) {
    productsContainer.innerHTML = '';
    filtered.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.price} ₽</p>
        `;
        productsContainer.appendChild(div);
    });
}

function filterAndSortProducts() {
    let filtered = [...products];

    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sort = sortSelect.value;

    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
    }

    switch (sort) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
    }

    renderProducts(filtered);
}

searchInput.addEventListener('input', filterAndSortProducts);
categoryFilter.addEventListener('change', filterAndSortProducts);
sortSelect.addEventListener('change', filterAndSortProducts);

// Первая отрисовка
renderProducts(products);

let cartCount = 0;

const cartIcon = document.getElementById('cart-icon');
const cartCountSpan = document.getElementById('cart-count');

// Функция для добавления товара в корзину
function addToCart(product) {
    cartCount++;
    cartCountSpan.textContent = cartCount;
}

// Пример добавления товара в корзину
document.querySelectorAll('.product').forEach(productDiv => {
    productDiv.addEventListener('click', () => {
        addToCart(productDiv);
    });
});

