import { useState, useEffect } from "react";

function Cart() {
  const [cart, setCart] = useState(() => {
    // Загружаем корзину из localStorage, если есть
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeBouquet = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, bouquet) => sum + bouquet.totalPrice, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Корзина</h1>

      {cart.length === 0 ? (
        <p>В корзине пока нет букетов</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((bouquet, index) => (
              <li key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3>{bouquet.name}</h3>
                  <span>{bouquet.totalPrice}₽</span>
                </div>
                <ul style={{ margin: "5px 0 0 10px", fontSize: "0.9em" }}>
                  {bouquet.items.map((item) => (
                    <li key={item.id}>
                      {item.count} × {item.name} — {item.totalPrice}₽
                    </li>
                  ))}
                </ul>
                <button
                  style={{ marginTop: "5px", background: "red", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}
                  onClick={() => removeBouquet(index)}
                >
                  Удалить букет
                </button>
              </li>
            ))}
          </ul>
          <h2>Общая сумма: {totalPrice}₽</h2>
        </>
      )}
    </div>
  );
}

export default Cart;