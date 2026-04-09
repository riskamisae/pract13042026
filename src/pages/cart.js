import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      alert("Нужно войти в аккаунт");
      navigate("/auth");
      return;
    }

    try {
      for (let bouquet of cart) {
        // Приведение items к корректной структуре
        const formattedItems = bouquet.items.map((item) => ({
          name: item.name || item, // если item — строка
          count: item.count || 1, // если count не указан
        }));

        // Отправка POST запроса
        await axios.post(
        "http://localhost:1337/api/orders",
        {
            data: {
            order_name: bouquet.name,
            tota_price: bouquet.totalPrice,
            items: formattedItems,
            user: user.name       // ✅ просто id, без connect
            }
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
        );
      }

      alert("Заказ оформлен!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Ошибка Strapi:", err.response?.data || err);
      alert("Ошибка при оформлении заказа. Проверьте консоль.");
    }
  };

  const removeBouquet = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalPrice = cart.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Корзина</h1>

      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul>
            {cart.map((b, i) => (
              <li key={i}>
                <h3>
                  {b.name} — {b.totalPrice}₽
                </h3>
                <ul style={{ fontSize: "0.9em" }}>
                  {b.items.map((item, idx) => (
                    <li key={idx}>
                      {item.count} × {item.name}
                    </li>
                  ))}
                </ul>
                <button onClick={() => removeBouquet(i)}>Удалить</button>
              </li>
            ))}
          </ul>

          <h2>Итого: {totalPrice}₽</h2>

          <button onClick={clearCart}>Очистить корзину</button>
          <button onClick={handleOrder} style={{ marginLeft: "10px" }}>
            Оформить заказ
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
