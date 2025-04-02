import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// Пример товаров
const products = [
  {
    id: 1,
    name: "Футболка",
    desc: "Хлопковая футболка",
    price: 500,
    img: "/img/bl-alt.jpg", // Базовое изображение
    colors: ["Синий", "Черный"],
    sizes: ["S", "M", "L"],
    imagesByColor: {
      Синий: "/img/bl-alt.jpg", // Изображение для синих джинсов
      Черный: "/img/bl-alt-c.jpg", // Изображение для черных джинсов
    },
  },
  {
    id: 2,
    name: "Джинсы",
    desc: "Узкие джинсы",
    price: 1200,
    img: "/img/bl-alt.jpg", // Базовое изображение
    colors: ["Синий", "Черный"],
    sizes: ["M", "L", "XL"],
    imagesByColor: {
      Синий: "/img/bl-alt.jpg", // Изображение для синих джинсов
      Черный: "/img/bl-alt-c.jpg", // Изображение для черных джинсов
    },
  },  
  {
    id: 3,
    name: "Джинсы",
    desc: "Узкие джинсы",
    price: 1200,
    img: "/img/bl-alt.jpg", // Базовое изображение
    colors: ["Синий", "Черный"],
    sizes: ["M", "L", "XL"],
    imagesByColor: {
      Синий: "/img/bl-alt.jpg", // Изображение для синих джинсов
      Черный: "/img/bl-alt-c.jpg", // Изображение для черных джинсов
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
    Синий: "#0000FF", // Для синего
  };

  const handleColorChange = (color) => {
    setColor(color);
    setImage(product.imagesByColor[color]); // Обновляем изображение при смене цвета
  };

  return (
    <div className="card">
      <img src={image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.desc}</p>
      <p><strong>{product.price} грн</strong></p>

      {/* Цвет */}
      <div className="colors">
        {product.colors.map((c) => (
          <span
            key={c}
            className="color-circle"
            style={{ 
              backgroundColor: colorStyles[c], // Используем цвет для кружков
              borderRadius: "50%", // Это сделает кружок кругом
              width: "20px", // Размер кружка
              height: "20px", // Размер кружка
              margin: "5px", // Отступ между кружками
              cursor: "pointer", // Указатель при наведении
            }}
            onClick={() => handleColorChange(c)} // При клике на кружок меняем цвет и фото
          />
        ))}
      </div>

      {/* Размер */}
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
const Cart = ({ cart, onCheckout, onClose }) => (
  <div className="cart">
    <button onClick={onClose} className="close-btn">X</button>
    <h2>Корзина</h2>
    {cart.length === 0 ? <p>Корзина пуста</p> :
      cart.map((item, index) => (
        <p key={index}>{item.name} ({item.color}, {item.size}) - {item.price} грн</p>
      ))}
    <button onClick={onCheckout} disabled={cart.length === 0}>Оформить заказ</button>
  </div>
);

// Оформление заказа
const Checkout = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="checkout">
      <h2>Оформление заказа</h2>
      <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="tel" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={() => onSubmit(name, phone)} disabled={!name || !phone}>Подтвердить заказ</button>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => setCart([...cart, product]);
  const handleCheckout = () => alert('Заказ оформлен');
  const submitOrder = (name, phone) => {
    console.log("Заказ отправлен:", { name, phone, cart });
    alert(`Заказ отправлен! Имя: ${name}, Телефон: ${phone}`);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="container">
      {/* Навигационная панель */}
      <nav className="navbar">
        <ul>
          <li><a href="#home">Главная</a></li>
          <li><a href="#shop">Магазин</a></li>
          <li><a href="#contact">Контакты</a></li>
        </ul>
        {/* Переносим кнопку корзины в навбар */}
        <button className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 Корзина ({cart.length})
        </button>
      </nav>

      <h1>Магазин одежды</h1>

      {/* Корзина */}
      {isCartOpen && <Cart cart={cart} onCheckout={handleCheckout} onClose={() => setIsCartOpen(false)} />}

      <div className="products">
        {products.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
