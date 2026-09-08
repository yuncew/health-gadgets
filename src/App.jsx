import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("healthTechCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  useEffect(() => {
  const sectionIds = ["home", "products", "benefits", "contacts"];

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      threshold: 0.35,
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);
useEffect(() => {
  localStorage.setItem("healthTechCart", JSON.stringify(cart));
}, [cart]);

  const products = [
  {
    id: 1,
    name: "Умные часы Health Watch",
    description: "Контроль пульса, активности и сна",
    price: 7990,
    image: "/images/smartwatch.jpg",
  },
  {
    id: 2,
    name: "Фитнес-браслет Fit Band",
    description: "Шаги, калории и мониторинг активности",
    price: 3990,
    image: "/images/fitness-band.jpg",
  },
  {
    id: 3,
    name: "Умные весы Smart Scale",
    description: "Контроль веса и основных показателей тела",
    price: 4990,
    image: "/images/smart-scale.jpg",
  },
  {
    id: 4,
    name: "Пульсоксиметр Pulse O2",
    description: "Измерение пульса и уровня кислорода",
    price: 2490,
    image: "/images/pulse-oximeter.jpg",
  },
];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const getCartQuantity = (productId) => {
  return cart.filter((item) => item.id === productId).length;
};

const removeOneFromCart = (productId) => {
  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    setCart(cart.filter((_, i) => i !== index));
  }
};

  return (
    <div className="app">

      {/* ШАПКА */}
      <header className="header">
        <div className="logo">Health<span>Tech</span></div>

        <button
  className="mobile-menu-button"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>

<nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
  <a
    href="#home"
    className={activeSection === "home" ? "active" : ""}
    onClick={() => {
      setActiveSection("home");
      setMenuOpen(false);
    }}
  >
    Главная
  </a>

  <a
    href="#products"
    className={activeSection === "products" ? "active" : ""}
    onClick={() => {
      setActiveSection("products");
      setMenuOpen(false);
    }}
  >
    Гаджеты
  </a>

  <a
    href="#benefits"
    className={activeSection === "benefits" ? "active" : ""}
    onClick={() => {
      setActiveSection("benefits");
      setMenuOpen(false);
    }}
  >
    Преимущества
  </a>

  <a
    href="#contacts"
    className={activeSection === "contacts" ? "active" : ""}
    onClick={() => {
      setActiveSection("contacts");
      setMenuOpen(false);
    }}
  >
    Контакты
  </a>
</nav>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
        >
         Корзина ({cart.length})
        </button>
      </header>


      {/* ГЛАВНЫЙ ЭКРАН */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="subtitle">Технологии для заботы о себе</p>

          <h1>
            Умные гаджеты
            <br />
            <span>для здоровья</span>
          </h1>

          <p className="hero-text">
            Следите за активностью, сном, пульсом и другими
            показателями каждый день с помощью современных технологий.
          </p>

          <a href="#products" className="main-button">
            Выбрать гаджет
          </a>
        </div>

        <div className="hero-device">
          <div className="device-circle">
            <img src="/images/cat.jpg" alt="HealthTech" className="logo-image" />
          </div>
        </div>
      </section>


      {/* КАТАЛОГ */}
      <section className="products-section" id="products">
        <div className="section-title">
          <p>НАША КОЛЛЕКЦИЯ</p>
          <h2>Гаджеты для здоровья</h2>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>

              <div
                className="product-image"
                style={{
                  width: "100%",
                  height: "125px",
                  overflow: "hidden",
                  borderRadius: "13px",
                  background: "#eef7e8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "12px",
                      display: "block",
                    }}
                />
              </div>

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <div className="product-bottom">
  <strong>{product.price.toLocaleString("ru-RU")} ₽</strong>

  {getCartQuantity(product.id) === 0 ? (
    <button onClick={() => addToCart(product)}>
      В корзину
    </button>
  ) : (
                <div className="cart-product-controls">
                  <button
                    className="quantity-button"
                    onClick={() => removeOneFromCart(product.id)}
                  >
                    −
                  </button>

                  <span className="quantity-number">
                    {getCartQuantity(product.id)}
                  </span>

                  <button
                    className="quantity-button"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>

                  <button
                    className="in-cart-text"
                    onClick={() => setCartOpen(true)}
                  >
                    В корзину
                  </button>
                </div>
              )}
            </div>

            </div>
          ))}
        </div>
      </section>


      {/* ПРЕИМУЩЕСТВА */}
      <section className="benefits" id="benefits">
        <div className="section-title">
          <p>ПОЧЕМУ МЫ</p>
          <h2>Здоровье под контролем</h2>
        </div>

        <div className="benefits-grid">

          <div className="benefit-card">
            <div className="benefit-icon">❤️</div>
            <h3>Контроль пульса</h3>
            <p>
              Отслеживайте частоту сердечных сокращений
               в течение дня.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🌙</div>
            <h3>Мониторинг сна</h3>
            <p>
              Анализируйте продолжительность и качество
              вашего сна.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🏃</div>
            <h3>Активность</h3>
            <p>
              Считайте шаги, калории и контролируйте
              ежедневную активность.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h3>Анализ данных</h3>
            <p>
              Получайте информацию о состоянии организма
              в удобном приложении.
            </p>
          </div>

        </div>
      </section>


      {/* КАК ЭТО РАБОТАЕТ */}
      <section className="how-it-works">
        <div className="section-title">
          <p>ВСЁ ПРОСТО</p>
          <h2>Как это работает?</h2>
        </div>

        <div className="steps">

          <div className="step">
            <div className="step-number">01</div>
            <h3>Выберите гаджет</h3>
            <p>Подберите устройство под свои задачи.</p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Подключите смартфон</h3>
            <p>Синхронизируйте устройство с приложением.</p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Следите за показателями</h3>
            <p>Получайте полезную информацию каждый день.</p>
          </div>

        </div>
      </section>


      {/* ОТЗЫВ */}
      <section className="review">
        <div className="review-content">
          <p className="quote">“</p>

          <p className="review-text">
            Умные гаджеты помогают мне следить за активностью
            и лучше понимать свой режим дня.
          </p>

          <p className="review-author">
            — Анна, пользователь HealthTech
          </p>
        </div>
      </section>


      {/* ФОРМА */}
      <section className="contact" id="contacts">
        <div className="section-title">
          <p>ОСТАЛИСЬ ВОПРОСЫ?</p>
          <h2>Свяжитесь с нами</h2>
        </div>

        <form
          className="contact-form"
          onSubmit={async (event) => {
            event.preventDefault();
            
            setFormLoading(true);
            setFormSent(false);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            setFormLoading(false);
            setFormSent(true);
            event.target.reset();
          }}
        >
          <input
            type="text"
            placeholder="Ваше имя"
            required
          />

          <input
            type="email"
            placeholder="Ваш e-mail"
            required
          />

          <textarea
            placeholder="Ваш вопрос"
            rows="5"
          ></textarea>

          {formSent && (
            <div className="form-success">
              Спасибо! Ваше сообщение отправлено 💚
            </div>
          )}
          <button type="submit" disabled={formLoading}>
            {formLoading ? "Отправка..." : "Отправить сообщение"}
          </button>
        </form>
      </section>

      {/* КОРЗИНА */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>

            <div className="cart-header">
              <h2>Корзина</h2>

              <button
                className="cart-close"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <h3>Корзина пуста</h3>
                <p>Добавьте гаджет, чтобы продолжить.</p>
              </div>
            ) : (
              <div className="cart-content">

                <div className="cart-items">
  {products
    .filter((product) =>
      cart.some((item) => item.id === product.id)
    )
    .map((product) => (
      <div className="cart-item" key={product.id}>

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="cart-item-info">
          <h3>{product.name}</h3>

          <strong>
            {product.price.toLocaleString("ru-RU")} ₽
          </strong>
        </div>

        <div className="quantity-controls">

          <button
            className="quantity-button"
            onClick={() => removeOneFromCart(product.id)}
          >
            −
          </button>

          <span className="quantity">
            {getCartQuantity(product.id)}
          </span>

          <button
            className="quantity-button"
            onClick={() => addToCart(product)}
          >
            +
          </button>

        </div>

      </div>
    ))}
</div>

                <div className="cart-total">
                  <span>Итого:</span>

                  <strong>
                    {cart
                      .reduce((sum, product) => sum + product.price, 0)
                      .toLocaleString("ru-RU")} ₽
                  </strong>
                </div>

                <button
                  className="checkout-button"
                  onClick={() => {
                    setOrderSuccess(true);
                    setCart([]);
                  }}
                >
                  Оформить заказ
                </button>

              </div>
            )}

          </div>
        </div>
      )}
      {/* ПОДВАЛ */}
      {orderSuccess && (
      <div className="success-overlay">
        <div className="success-modal">
          <div className="success-icon">✓</div>

          <h3>Заказ оформлен!</h3>

          <p>
            Спасибо за покупку! 💚<br />
            Мы свяжемся с вами для подтверждения заказа.
          </p>

          <button onClick={() => setOrderSuccess(false)}>
            Понятно
          </button>
        </div>
      </div>
    )}
      <footer className="footer">
        <div className="logo">
          Health<span>Tech</span>
        </div>

        <p>
          © 2026 HealthTech. Умные технологии для здоровья.
        </p>
      </footer>

    </div>
  );
}

export default App;