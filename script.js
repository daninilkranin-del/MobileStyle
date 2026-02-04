// ===== МОБИЛЬНОЕ МЕНЮ =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileMenuBtn.querySelector('i')) {
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--accent-green);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `<i class="fas fa-check-circle" style="margin-right: 10px;"></i>${message}`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);

    // Добавляем CSS анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ===== КОРЗИНА =====
function updateCartCount() {
    const cartCountEl = document.getElementById('cartCount');
    if (!cartCountEl) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id == product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            brand: product.brand,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartItemQuantity(productId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id == productId);
    
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}

// ===== ЗАГРУЗКА ТОВАРОВ =====
function getProducts() {
    return [
        // Чехлы
        { id: 1, title: 'Чехол Liquid Crystal для iPhone 15 Pro', brand: 'Spigen', price: 2790, category: 'cases', compat: 'Совместимость: iPhone 15 Pro' },
        { id: 2, title: 'Чехол Pathfinder для Samsung S24 Ultra', brand: 'UAG', price: 4290, category: 'cases', compat: 'Совместимость: Galaxy S24 Ultra' },
        { id: 3, title: 'Чехол Impact Case с принтом', brand: 'Casetify', price: 3990, category: 'cases', compat: 'Совместимость: iPhone 14/15' },
        { id: 4, title: 'Чехол Defender Series для iPhone 15', brand: 'OtterBox', price: 5490, category: 'cases', compat: 'Совместимость: iPhone 15' },
        { id: 5, title: 'Чехол Limitless 5.0 из карбона', brand: 'Mous', price: 6290, category: 'cases', compat: 'Совместимость: iPhone 15 Pro Max' },
        { id: 6, title: 'Чехол Fusion-X прозрачный', brand: 'Ringke', price: 1890, category: 'cases', compat: 'Совместимость: Samsung S23' },
        { id: 7, title: 'Силиконовый чехол с MagSafe', brand: 'Apple', price: 4490, category: 'cases', compat: 'Совместимость: iPhone 15 серии' },
        { id: 8, title: 'Чехол MetArmor металлический', brand: 'ESR', price: 2590, category: 'cases', compat: 'Совместимость: iPhone 14 Pro' },
        { id: 9, title: 'Чехол Aramid Fiber Slim', brand: 'PITAKA', price: 5990, category: 'cases', compat: 'Совместимость: Google Pixel 8 Pro' },
        { id: 10, title: 'Чехол Super Frosted Shield', brand: 'Nillkin', price: 1690, category: 'cases', compat: 'Совместимость: Xiaomi 14' },
        
        // Стекла
        { id: 11, title: 'Защитное стекло InvisiGlass 9H', brand: 'Belkin', price: 2190, category: 'glass', compat: 'Совместимость: iPhone 15 Pro' },
        { id: 12, title: 'Стекло InvisibleShield Glass Elite', brand: 'ZAGG', price: 3290, category: 'glass', compat: 'Совместимость: Galaxy S24 Ultra' },
        { id: 13, title: 'Полное покрытие 3D Edge', brand: 'AmFilm', price: 890, category: 'glass', compat: 'Совместимость: iPhone 14/15' },
        { id: 14, title: 'Стекло Glas.tR EZ Fit', brand: 'Spigen', price: 1290, category: 'glass', compat: 'Совместимость: Samsung S23/S24' },
        { id: 15, title: 'Антишпионское стекло Privacy', brand: 'Esr', price: 1490, category: 'glass', compat: 'Совместимость: iPhone 15' },
        { id: 16, title: 'Термостойкое закалённое стекло', brand: 'JETech', price: 790, category: 'glass', compat: 'Совместимость: Huawei P60 Pro' },
        { id: 17, title: 'Набор из 3 стёкол', brand: 'Supershieldz', price: 1090, category: 'glass', compat: 'Совместимость: OnePlus 12' },
        { id: 18, title: 'Стекло с антибликовым покрытием', brand: 'TORRAS', price: 1390, category: 'glass', compat: 'Совместимость: Google Pixel 8' },
        { id: 19, title: 'Гидрогелевая пленка Full Glue', brand: 'Baseus', price: 990, category: 'glass', compat: 'Совместимость: Xiaomi 14 Pro' },
        { id: 20, title: 'Стекло с UV-клеем', brand: 'Whitestone Dome', price: 4490, category: 'glass', compat: 'Совместимость: iPhone 15 Pro Max' },
        
        // Зарядки
        { id: 21, title: 'Зарядка Nano II 65W GaN', brand: 'Anker', price: 3990, category: 'chargers', compat: 'Совместимость: Ноутбуки, телефоны' },
        { id: 22, title: 'Зарядное устройство 100W 4-портовое', brand: 'UGREEN', price: 4290, category: 'chargers', compat: 'Совместимость: Все USB-C устройства' },
        { id: 23, title: 'Быстрая зарядка 67W', brand: 'Xiaomi', price: 1990, category: 'chargers', compat: 'Совместимость: Xiaomi, Redmi' },
        { id: 24, title: 'Оригинальная зарядка 25W', brand: 'Samsung', price: 2490, category: 'chargers', compat: 'Совместимость: Galaxy S/Note/Z' },
        { id: 25, title: 'Компактная зарядка 30W Mini', brand: 'Baseus', price: 1590, category: 'chargers', compat: 'Совместимость: iPhone, Android' },
        { id: 26, title: 'USB-C Power Adapter 20W', brand: 'Apple', price: 2190, category: 'chargers', compat: 'Совместимость: iPhone 12–15' },
        { id: 27, title: 'Зарядка 90W с дисплеем', brand: 'RAVPower', price: 5490, category: 'chargers', compat: 'Совместимость: MacBook, iPad Pro' },
        { id: 28, title: 'Зарядное устройство 35W двойное', brand: 'AUKEY', price: 2290, category: 'chargers', compat: 'Совместимость: Два устройства одновременно' },
        { id: 29, title: 'Boost Charge Pro 30W', brand: 'Belkin', price: 3190, category: 'chargers', compat: 'Совместимость: iPhone с MagSafe' },
        { id: 30, title: 'Супербыстрая зарядка 100W', brand: 'Huawei', price: 4990, category: 'chargers', compat: 'Совместимость: Huawei Mate/P series' },
        
        // Наушники
        { id: 31, title: 'AirPods Pro (2nd gen)', brand: 'Apple', price: 24990, category: 'earphones', compat: 'Совместимость: Все Bluetooth устройства' },
        { id: 32, title: 'Galaxy Buds2 Pro', brand: 'Samsung', price: 15990, category: 'earphones', compat: 'Совместимость: Android, iOS' },
        { id: 33, title: 'WF-1000XM5', brand: 'Sony', price: 22490, category: 'earphones', compat: 'Совместимость: Все смартфоны' },
        { id: 34, title: 'Elite 8 Active', brand: 'Jabra', price: 13990, category: 'earphones', compat: 'Совместимость: Android, iOS' },
        { id: 35, title: 'Ear (2)', brand: 'Nothing', price: 9990, category: 'earphones', compat: 'Совместимость: Все устройства' },
        { id: 36, title: 'Redmi Buds 5 Pro', brand: 'Xiaomi', price: 5490, category: 'earphones', compat: 'Совместимость: Android, iOS' },
        { id: 37, title: 'FreeBuds 5', brand: 'Huawei', price: 11990, category: 'earphones', compat: 'Совместимость: Huawei, другие' },
        { id: 38, title: 'Live Pro 2 TWS', brand: 'JBL', price: 8990, category: 'earphones', compat: 'Совместимость: Все Bluetooth' },
        { id: 39, title: 'Liberty 4 NC', brand: 'Anker Soundcore', price: 7490, category: 'earphones', compat: 'Совместимость: Android, iOS' },
        { id: 40, title: 'Pixel Buds Pro', brand: 'Google', price: 16990, category: 'earphones', compat: 'Совместимость: Pixel, Android, iOS' },
        
        // Кабели
        { id: 41, title: 'Кабель PowerLine III USB-C 100W', brand: 'Anker', price: 1790, category: 'cables', compat: 'Совместимость: MacBook, iPad, Android' },
        { id: 42, title: 'Кабель USB-C to Lightning 2m', brand: 'UGREEN', price: 1490, category: 'cables', compat: 'Совместимость: iPhone, iPad' },
        { id: 43, title: 'Нейлоновый кабель 3A 1.2м', brand: 'Baseus', price: 890, category: 'cables', compat: 'Совместимость: Android, Type-C' },
        { id: 44, title: 'Оригинальный Lightning 1м', brand: 'Apple', price: 1990, category: 'cables', compat: 'Совместимость: iPhone, iPad' },
        { id: 45, title: 'Кабель USB-C 0.8м оригинал', brand: 'Samsung', price: 1290, category: 'cables', compat: 'Совместимость: Galaxy серии' },
        { id: 46, title: 'Кабель Thunderbolt 4 2м', brand: 'Belkin', price: 5990, category: 'cables', compat: 'Совместимость: MacBook, Windows' },
        { id: 47, title: 'Кабель 100W 60см плетёный', brand: 'RAVPower', price: 1190, category: 'cables', compat: 'Совместимость: Ноутбуки, телефоны' },
        { id: 48, title: 'Кабель USB-C to USB-C 1.5м', brand: 'Spigen', price: 1390, category: 'cables', compat: 'Совместимость: Все USB-C' },
        { id: 49, title: 'SuperCharge кабель 66W', brand: 'Huawei', price: 1590, category: 'cables', compat: 'Совместимость: Huawei Mate/P' },
        { id: 50, title: 'Кабель HDMI to USB-C 4K', brand: 'JSAUX', price: 2290, category: 'cables', compat: 'Совместимость: Ноутбуки, мониторы' }
    ];
}

function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const products = getProducts();
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        productCard.innerHTML = `
            <div class="product-img">
                <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-compat">${product.compat}</p>
                <div class="product-price">${product.price.toLocaleString('ru-RU')} ₽</div>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Обработчики кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-id');
            const product = getProducts().find(p => p.id == productId);
            if (product) {
                addToCart(product);
                showNotification('Товар добавлен в корзину!');
                updateCartCount();
            }
        });
    });
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// ===== ЗАГРУЗКА КОРЗИНЫ =====
function loadCartContent() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Корзина пуста</h2>
                <p>Добавьте товары в корзину, чтобы увидеть их здесь</p>
                <a href="catalog.html" class="btn btn-primary">Перейти в каталог</a>
            </div>
        `;
        return;
    }

    let html = `
        <div class="cart-items-container" id="cartItemsContainer">
    `;

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-img"></div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price.toLocaleString('ru-RU')} ₽</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn increase" data-id="${item.id}">+</button>
                        <button class="qty-btn remove" data-id="${item.id}" style="margin-left: 15px; color: var(--accent-orange);">
                            <i class="fas fa-trash"></i> Удалить
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
        </div>
        <div class="cart-total-section">
            <div class="cart-total-row">
                <span>Товаров:</span>
                <span>${cart.length}</span>
            </div>
            <div class="cart-total-row">
                <span>Итого:</span>
                <span>${total.toLocaleString('ru-RU')} ₽</span>
            </div>
            <button class="checkout-btn" id="checkoutBtn">Оформить заказ</button>
        </div>
    `;

    cartContent.innerHTML = html;

    // Обработчики кнопок
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(i => i.id == id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                loadCartContent();
            }
        });
    });

    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(i => i.id == id);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                loadCartContent();
            }
        });
    });

    document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('.remove').getAttribute('data-id');
            removeFromCart(id);
            loadCartContent();
            showNotification('Товар удалён из корзины');
        });
    });

    // Обработчик кнопки оформления заказа
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const checkoutModal = document.getElementById('checkoutModal');
            const checkoutOverlay = document.getElementById('checkoutOverlay');
            if (checkoutModal && checkoutOverlay) {
                updateCheckoutTotal();
                checkoutModal.classList.add('active');
                checkoutOverlay.classList.add('active');
            }
        });
    }
}

// ===== ПЛАВНАЯ ПРОКРУТКА =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ОБНОВЛЕНИЕ ИТОГОВОЙ СУММЫ В МОДАЛКЕ =====
function updateCheckoutTotal() {
    const checkoutTotal = document.getElementById('checkoutTotal');
    if (!checkoutTotal) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `Итого: ${total.toLocaleString('ru-RU')} ₽`;
}