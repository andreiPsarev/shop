import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";



import React, { useState, useEffect, useRef } from "react";
import { Carousel } from 'antd';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
// Пример данных для слайдера
const sliderItems = [
  {
    id: 1,
    img: "/img/bl-alt.jpg",
    alt: "Слайдер 1",
    title: "Сезонные скидки!",
  },
  {
    id: 2,
    img: "/img/bl-alt-c.jpg",
    alt: "Слайдер 2",
    title: "Новая коллекция",
  },
  {
    id: 3,
    img: "/img/bl-alt.jpg",
    alt: "Слайдер 3",
    title: "Популярные товары",
  },
];


// Пример товаров с добавленными категориями
const products = [
  {
    id: 1,
    name: "Alpha Tactical Jacket",
    desc: "Helikon-Tex® ALPHA Tactical Jacket Black - легка куртка флісова з лінійки Urban Line® створена, як основний утеплюючий шар для носіння окремо або разом з верхнім одягом. Сітчаста структура матеріалу Light Grid Fleece забезпечує додатковий комфорт: зігріває або відводить зайве тепло від тіла у верхні шари одягу, підтримуючи оптимальну та комфортну температуру.",
    price: 2400,
    img: "/public/img/bl-alt.jpg",
    colors: ["Olive", "Coyote", "FolGreen", "Black"],
    sizes: ["S", "M", "L"],
    category: "Одежда", // Категория товара
    imagesByColor: {
      Olive: "/img/alph-tact/og.jpg",
      Coyote: "/img/alph-tact/c.jpg",
      FolGreen: "/img/alph-tact/fg.jpg",
      Black: "/img/alph-tact/b.jpg",
    },
  },
  {
    id: 2,
    name: "Джинсы",
    desc: "Узкие джинсы",
    price: 1200,
    img: "/img/bl-alt.jpg",
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
    img: "/img/bl-alt.jpg",
    colors: ["Белый", "Черный"],
    sizes: ["S", "M", "L"],
    category: "Обувь", // Категория товара
    imagesByColor: {
      Белый: "/img/bl-alt.jpg",
      Черный: "/img/bl-alt-c.jpg",
    },
  },
];



const Navbar = ({ cart, toggleCart }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src="/img/logo.jpg" alt="logo" width= "100"/>
        </div>
        <div className="shop-name">Магазин</div>
        <button className="cart-button" onClick={toggleCart}>
        🛒 ({cart.reduce((total, item) => total + item.quantity, 0)})
        </button>
      </div>
    </nav>
  );
};




// Карточка товара
const ProductCard = ({ product, addToCart }) => {
  const [color, setColor] = useState(product.colors[0]); // Текущий цвет
  const [size, setSize] = useState(product.sizes[0]); // Текущий размер

  const colorMap = {
    Olive: "#636B2F",
    Coyote: "#81613C",
    FolGreen: "#7EA295",
    Black: "#000000",
    Белый: "#FFFFFF",
  };

  return (
    <div className="card">
      <img src={product.imagesByColor[color]} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.desc}</p>
      <p><strong>{product.price} грн</strong></p>

      {/* Выбор цвета */}
      <p>Выберите цвет:</p>
      <div className="colors">
        {product.colors.map((c) => (
          <span
            key={c}
            className={`color-circle ${color === c ? "selected" : ""}`}
            style={{
              backgroundColor: colorMap[c], // Цвет из colorMap
            }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>

      {/* Выбор размера */}
      <label>Размер:
        <select onChange={(e) => setSize(e.target.value)} value={size}>
          {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      <button onClick={() => addToCart({ ...product, color, size })}>Добавить в корзину</button>
    </div>
  );
};




// Корзина
const Cart = ({ cart, onCheckout, updateQuantity, removeItem, toggleCart }) => (
  <div className="cart">
    <button onClick={toggleCart} className="close-btn">×</button>
    <h2>Корзина</h2>
    {cart.length === 0 ? <p>Корзина пуста</p> :
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
      ))}
    <button onClick={onCheckout} disabled={cart.length === 0}>Оформить заказ</button>
  </div>
);


const ContactAndMap = () => {
  return (
    <section className="contact-map">
      <div className="contact-info">
        <h2>Контактная информация</h2>
        <p>Адрес: ул. Примерная, 123, город</p>
        <p>Телефон: +380 123 456 789</p>
        <p>Email: info@example.com</p>
      </div>
      <div className="map-container">
        <h3>Найдите нас на карте:</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=...your_map_url_here..."
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};



const App = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [isCartVisible, setIsCartVisible] = useState(false); // Для управления видимостью корзины
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartVisible(false);
      }
    };
    if (isCartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartVisible]);
  
  const categories = ["Все", ...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategory === "Все"
    ? products
    : products.filter(p => p.category === selectedCategory);

    const addToCart = (product) => {
      const existingProduct = cart.find(
        item => item.id === product.id && item.color === product.color && item.size === product.size
      );
    
      if (existingProduct) {
        // просто увеличим количество
        setCart(cart.map(item =>
          item.id === product.id && item.color === product.color && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        // новый товар — добавляем с image
        setCart([...cart, {
          ...product,
          quantity: 1,
          image: product.imagesByColor[product.color],
        }]);
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
    setCart(cart.filter(cartItem => !(cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size)));
  };

  const handleCheckout = () => alert('Заказ оформлен');

  // Функция для отображения корзины
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <Router>
      <div className="container">
      <Navbar cart={cart} toggleCart={toggleCart} />

        <Routes>
          <Route path="/" element={
            <>
              <h1>Магазин одежды</h1>

              <Carousel autoplay autoplaySpeed={6000} effect="fade">
                {sliderItems.map(item => (
                  <div key={item.id} className="carousel-slide">
                    <img src={item.img} alt={item.alt} className="carousel-image" />
                    <div className="carousel-caption">
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                ))}
              </Carousel>


              <div className="category-filter">
                {categories.map(cat => (
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
                {filteredProducts.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
              </div>
            </>
          } />

          <Route path="/cart" element={<Cart cart={cart} onCheckout={handleCheckout} updateQuantity={updateQuantity} removeItem={removeItem} />} />
        </Routes>
        <ContactAndMap />

      </div>

      {/* Корзина с анимацией */}
      <div ref={cartRef} className={`cart ${isCartVisible ? 'show' : ''}`}>
  <button onClick={() => setIsCartVisible(false)} className="close-btn">×</button>
  <h2>Корзина</h2>
  {cart.length === 0 ? <p>Корзина пуста</p> : cart.map((item, index) => (
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
  ))}
  <button onClick={handleCheckout} disabled={cart.length === 0}>Оформить заказ</button>
</div>
    </Router>
  );
};




const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
