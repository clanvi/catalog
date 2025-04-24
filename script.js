// Массив данных о товарах
const products = [
    {id: 1, name: "Платье", price: 3000, imageUrl: 'https://via.placeholder.com/300x300?text=Product'},
    {id: 2, name: "Сумочка", price: 1500, imageUrl: 'https://via.placeholder.com/300x300?text=Product'},
    // Добавьте больше продуктов здесь...
];

let cartItems = [];

document.addEventListener('DOMContentLoaded', () => {
    const productCatalogElement = document.getElementById("product-catalog");

    function createProductCard(product) {
        let cardHTML = `
            <div class="product-card" data-id="${product.id}">
                <img src="<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>p</mi><mi>r</mi><mi>o</mi><mi>d</mi><mi>u</mi><mi>c</mi><mi>t</mi><mi mathvariant="normal">.</mi><mi>i</mi><mi>m</mi><mi>a</mi><mi>g</mi><mi>e</mi><mi>U</mi><mi>r</mi><mi>l</mi></mrow><mi mathvariant="normal">&quot;</mi><mi>a</mi><mi>l</mi><mi>t</mi><mo>=</mo><mi mathvariant="normal">&quot;</mi></mrow><annotation encoding="application/x-tex">{product.imageUrl}&quot; alt=&quot;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal">p</span><span class="mord mathnormal">ro</span><span class="mord mathnormal">d</span><span class="mord mathnormal">u</span><span class="mord mathnormal">c</span><span class="mord mathnormal">t</span><span class="mord">.</span><span class="mord mathnormal">ima</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.10903em;">U</span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span></span><span class="mord">&quot;</span><span class="mord mathnormal">a</span><span class="mord mathnormal">lt</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord">&quot;</span></span></span></span>{product.name}"/>
                <h3>${product.name}</h3>
                <p>${product.price} руб.</p>
            </div>
        `;
        return cardHTML;
    }

    // Создаем карточки товаров
    products.forEach((product) => {
        productCatalogElement.innerHTML += createProductCard(product);
    });

    // Обработчик события нажатия на карточку товара
    productCatalogElement.addEventListener('click', event => {
        if(event.target.closest('.product-card')) {
            showProductDetails(event.target.closest('.product-card').dataset.id);
        }
    });
});

function showProductDetails(id) {
    const selectedProduct = products.find(p => p.id == id);

    document.querySelector('#modal-image').src = selectedProduct.imageUrl;
    document.querySelector('#modal-name').innerText = selectedProduct.name;
    document.querySelector('#modal-price').innerText = `${selectedProduct.price}`;

    document.getElementById('product-details-modal').hidden = false;
}

function closeModal() {
    document.getElementById('product-details-modal').hidden = true;
}

function addToCart() {
    const modalID = document.querySelector('#product-details-modal > img').getAttribute('src');
    const currentProduct = products.find(p => p.imageUrl === modalID);

    cartItems.push(currentProduct);
    updateCart();
    closeModal(); 
}

function proceedToCheckout() {
    document.getElementById('checkout-page').hidden = false;
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    cartItems.forEach(item => {
        cartList.innerHTML += `<li><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mrow><mi>i</mi><mi>t</mi><mi>e</mi><mi>m</mi><mi mathvariant="normal">.</mi><mi>n</mi><mi>a</mi><mi>m</mi><mi>e</mi></mrow><mo>:</mo></mrow><annotation encoding="application/x-tex">{item.name}: </annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6595em;"></span><span class="mord"><span class="mord mathnormal">i</span><span class="mord mathnormal">t</span><span class="mord mathnormal">e</span><span class="mord mathnormal">m</span><span class="mord">.</span><span class="mord mathnormal">nam</span><span class="mord mathnormal">e</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span></span></span></span>{item.price} руб.</li>`;
    });

    document.getElementById('cart-container').hidden = false;  
}