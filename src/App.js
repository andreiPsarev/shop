import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";

import React, { useState, useEffect } from "react";

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

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderItems.length);
    }, 5000); // 5000 мс для переключения слайдов

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, []);

  return (
    <div className="slider">
      <div className="slider-content">
        <img
          src={sliderItems[currentSlide].img}
          alt={sliderItems[currentSlide].alt}
          className="slider-image"
        />
        <h2 className="slider-title">{sliderItems[currentSlide].title}</h2>
      </div>
    </div>
  );
};


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

// Карточка товара
const ProductCard = ({ product, addToCart }) => {
  const [color, setColor] = useState(product.colors[0]); // Текущий цвет
  const [size, setSize] = useState(product.sizes[0]); // Текущий размер

  const colorMap = {
    Синий: "#0000FF",
    Черный: "#000000",
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






const App = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [isCartVisible, setIsCartVisible] = useState(false); // Для управления видимостью корзины

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
        <nav className="navbar">
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><button onClick={toggleCart}>Корзина ({cart.length})</button></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1>Магазин одежды</h1>

              <Slider /> {/* Вставляем слайдер */}


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
      </div>

      {/* Корзина с анимацией */}
      <div className={`cart ${isCartVisible ? 'show' : ''}`}>
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
