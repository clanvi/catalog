document.addEventListener('DOMContentLoaded', function() {
    const productsList = document.getElementById('products-list');

    const products = [
        { name: 'Товар 1', price: '1000', image: 'https://example.com/img1.jpg' },
        { name: 'Товар 2', price: '2000', image: 'https://example.com/img2.jpg' },
        { name: 'Товар 3', price: '1500', image: 'https://example.com/img3.jpg' },
        { name: 'Товар 4', price: '2500', image: 'https://example.com/img4.jpg' },
        { name: 'Товар 5', price: '3000', image: 'https://example.com/img5.jpg' },
        { name: 'Товар 6', price: '4000', image: 'https://example.com/img6.jpg' },
        { name: 'Товар 7', price: '1200', image: 'https://example.com/img7.jpg' },
        { name: 'Товар 8', price: '1800', image: 'https://example.com/img8.jpg' }
    ];

    function renderProducts(products) {
        productsList.innerHTML = '';  // Очистка списка товаров
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Цена: ${product.price} руб.</p>
                <p class="price">${product.price} руб.</p>
            `;
            productsList.appendChild(productDiv);
        });
    }

    renderProducts(products);
});
