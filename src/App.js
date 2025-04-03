import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


// Пример товаров с добавленными категориями
const products = [
  {
    id: 1,
    name: "Футболка",
    desc: "Хлопковая футболка",
    price: 500,
    image: "/img/bl-alt.jpg",
    colors: ["Синий", "Черный"],
    sizes: ["S", "M", "L"],
    category: "Одежда", // Категория товара
    imagesByColor: {
      Синий: "/img/bl-alt.jpg",
      Черный: "/img/bl-alt-c.jpg",
    },
  },
  {
    id: 2,
    name: "Джинсы",
    desc: "Узкие джинсы",
    price: 1200,
    image: "/img/bl-alt.jpg",
    colors: ["Синий", "Черный"],
    sizes: ["M", "L", "XL"],
    category: "Одежда", // Категория товара
    imagesByColor: {
      Синий: "/img/bl-alt.jpg",
      Черный: "/img/bl-alt-c.jpg",
    },
  },
  {
    id: 3,
    name: "Кроссовки",
    desc: "Спортивные кроссовки",
    price: 1500,
    image: "/img/bl-alt.jpg",
    colors: ["Белый", "Черный"],
    sizes: ["S", "M", "L"],
    category: "Обувь", // Категория товара
    imagesByColor: {
      Белый: "/img/bl-alt.jpg",
      Черный: "/img/bl-alt-c.jpg",
    },
  },  
  {
    id: 4,
    name: "Кроссовки",
    desc: "Спортивные кроссовки",
    price: 1500,
    image: "/img/bl-alt.jpg",
    colors: ["Белый", "Черный"],
    sizes: ["S", "M", "L"],
    category: "Обувь", // Категория товара
    imagesByColor: {
      Белый: "/img/bl-alt.jpg",
      Черный: "/img/bl-alt-c.jpg",
    },
  },  {
    id: 5,
    name: "Кроссовки",
    desc: "Спортивные кроссовки",
    price: 1500,
    image: "/img/bl-alt.jpg",
    colors: ["Белый", "Черный"],
    sizes: ["S", "M", "L"],
    category: "Обувь", // Категория товара
    imagesByColor: {
      Белый: "/img/bl-alt.jpg",
      Черный: "/img/bl-alt-c.jpg",
    },
  },
];

// Карточка товара
const ProductCard = ({ product, addToCart }) => {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [image, setImage] = useState(product.imagesByColor[color]);

  const colorStyles = {
    Белый: "#ffffff",
    Черный: "#000000",
    Синий: "#0000FF",
  };

  const handleColorChange = (color) => {
    setColor(color);
    setImage(product.imagesByColor[color]);
  };

  return (
    <div className="card">
      <img src={image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.desc}</p>
      <p><strong>{product.price} грн</strong></p>

      <div className="colors">
        {product.colors.map((c) => (
          <span
            key={c}
            className="color-circle"
            style={{
              backgroundColor: colorStyles[c],
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              margin: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleColorChange(c)}
          />
        ))}
      </div>

      <label>Размер:
        <select onChange={(e) => setSize(e.target.value)} value={size}>
          {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      <button onClick={() => addToCart({ ...product, color, size, image })}>Добавить в корзину</button>
    </div>
  );
};

// Корзина
const Cart = ({ cart, onCheckout, updateQuantity, removeItem }) => (
  <div className={`cart ${cart.length === 0 ? "empty" : ""}`}>
    <h2>Корзина</h2>
    {cart.length === 0 ? (
      <p>Корзина пуста</p>
    ) : (
      cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <p>{item.name} ({item.color}, {item.size}) - {item.price} грн</p>
            <div className="quantity">
              <button onClick={() => updateQuantity(item, -1)} disabled={item.quantity <= 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item, 1)}>+</button>
            </div>
            <button onClick={() => removeItem(item)} className="remove-btn">Удалить</button>
          </div>
        </div>
      ))
    )}
    <button onClick={onCheckout} disabled={cart.length === 0}>Оформить заказ</button>
  </div>
);


const BannerSlider = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="/img/bl-alt.jpg" alt="Акция 1" />
        <div className="banner-text">
          <h2>Акция 1</h2>
          <p>Купите футболку со скидкой 20%!</p>
        </div>
      </div>
      <div>
        <img src="/img/bl-alt.jpg" alt="Акция 2" />
        <div className="banner-text">
          <h2>Акция 2</h2>
          <p>Джинсы по супер цене!</p>
        </div>
      </div>
      <div>
        <img src="/img/bl-alt.jpg" alt="Акция 3" />
        <div className="banner-text">
          <h2>Акция 3</h2>
          <p>Получите бесплатную доставку на кроссовки!</p>
        </div>
      </div>
    </Slider>
  );
};


const DeliveryAndPayment = () => {
  return (
    <section className="delivery-payment">
      <h2>Доставка и Оплата</h2>
      <div className="delivery-payment-info">
        <div className="delivery">
          <h3>Доставка</h3>
          <p>Мы предлагаем различные варианты доставки, чтобы вам было удобно получать ваши товары:</p>
          <ul>
            <li><strong>Курьерская доставка:</strong> Доставка до двери по указанному адресу. Стоимость и время зависят от вашего местоположения.</li>
            <li><strong>Самовывоз:</strong> Вы можете забрать заказ из нашего пункта самовывоза, расположенного по адресу (вставьте адрес).</li>
            <li><strong>Доставка почтой:</strong> Доставка с помощью почтовых служб. Время и стоимость зависят от региона.</li>
          </ul>
        </div>

        <div className="payment">
          <h3>Оплата</h3>
          <p>Мы предлагаем несколько удобных способов оплаты:</p>
          <ul>
            <li><strong>Оплата картой:</strong> Оплата через безопасную платежную систему с использованием вашей банковской карты.</li>
            <li><strong>Оплата при получении:</strong> Вы можете оплатить заказ при получении, если выбрали доставку курьером или самовывоз.</li>
            <li><strong>Электронные кошельки:</strong> Мы принимаем оплату через популярные электронные кошельки, такие как PayPal, Apple Pay и другие.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

const LocationBlock = () => (
  <div className="location-block">
    <h2>Наше местоположение</h2>
    
    <div className="map-container">
      {/* Здесь можно вставить Google Maps или другое картографическое приложение */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253614.26322384012!2d30.396039952508453!3d50.450001033409795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c231c5bc4d67%3A0x94d47d171ee2e3eb!2sKyiv!5e0!3m2!1sen!2sua!4v1680302182134!5m2!1sen!2sua"
        width="100%"
        height="300"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      ></iframe>
    </div>

    <div className="contact-info">
      <h3>Контактная информация</h3>
      <p><strong>Адрес:</strong> Киев, ул. Примерная, 123</p>
      <p><strong>Телефон:</strong> +380 99 123 4567</p>
      <p><strong>Электронная почта:</strong> info@shop.com</p>
      <p><strong>Часы работы:</strong> Пн-Пт: 10:00 - 18:00, Сб: 10:00 - 14:00</p>
    </div>
  </div>
);



const App = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [isCartVisible, setIsCartVisible] = useState(false);

  const categories = ["Все", ...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategory === "Все"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id && item.color === product.color && item.size === product.size);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id && item.color === product.color && item.size === product.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (item, delta) => {
    setCart(cart.map(cartItem =>
      cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size
        ? { ...cartItem, quantity: cartItem.quantity + delta }
        : cartItem
    ));
  };

  const removeItem = (item) => {
    setCart(cart.filter(cartItem => !(cartItem.id === item.id && cartItem.color === item.color && item.size === item.size)));
  };

  const handleCheckout = () => alert('Заказ оформлен');

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Главная</Link></li>
            <button className="cart-btn" onClick={toggleCart}>
              Корзина ({cart.length})
            </button>
          </ul>
        </nav>

        <BannerSlider />

        <div className={`cart ${isCartVisible ? 'show' : ''}`}>
          {isCartVisible && <Cart cart={cart} onCheckout={handleCheckout} updateQuantity={updateQuantity} removeItem={removeItem} />}
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Магазин одежды</h1>
                <div className="category-filter">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={selectedCategory === cat ? "active" : ""}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <h2 className="category-title">
                  {selectedCategory === "Все" ? "Все товары" : selectedCategory}
                </h2>

                <div className="products">
                  {filteredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} addToCart={addToCart} />
                  ))}
                </div>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onCheckout={handleCheckout}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            }
          />
        </Routes>

        <DeliveryAndPayment /> {/* Добавляем блок о доставке и оплате */}
        
        <LocationBlock /> {/* Добавляем блок с контактной информацией и картой */}
      </div>
    </Router>
  );
};







const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
