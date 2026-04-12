import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      showNotification("Нужно войти в аккаунт");
      navigate("/auth");
      return;
    }

    try {
      for (let bouquet of cart) {
        const formattedItems = bouquet.items.map((item) => ({
          name: item.name || item,
          count: item.count || 1,
        }));

        await axios.post(
          "http://localhost:1337/api/orders",
          {
            data: {
              order_name: bouquet.name,
              tota_price: bouquet.totalPrice,
              items: formattedItems,
              user: user.name
            }
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }

      showNotification("Заказ оформлен!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Ошибка Strapi:", err.response?.data || err);
      showNotification("Ошибка при оформлении заказа");
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
    <div class="content-wrapper" style={{ padding: "20px" }}>
      {notification && (
        <div style={styles.notification}>{notification}</div>
      )}

      <h1 class="home_header">Корзина</h1>

      {cart.length === 0 ? (
        <p style={styles.choose}>Корзина пуста</p>
      ) : (
        <>
          <ul style={{padding: "0"}}>
            {cart.map((b, i) => (
              <li style={styles.items} key={i}>
                <h3>
                  {b.name} — {b.totalPrice}₽
                </h3>
                <ul style={{ fontSize: "12px" }}>
                  {b.items.map((item, idx) => (
                    <li key={idx}>
                      {item.count} × {item.name}
                    </li>
                  ))}
                </ul>
                <button style={{fontSize: "14px"}} class="out-button" onClick={() => removeBouquet(i)}>Удалить</button>
              </li>
            ))}
          </ul>

          <h2 style={styles.total}>Итого: {totalPrice}₽</h2>

          <button style={{fontSize: "16px", color: "#fff"}} class="out-button" onClick={clearCart}>Очистить корзину</button>
          <button style={styles.order} onClick={handleOrder}>
            Оформить заказ
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  notification: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#84A59D",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "10px",
    zIndex: 1000,
    fontFamily: "montserrat"
  },
    choose: {
    fontFamily: "montserrat",
    color: "#F28482",
    fontSize: "14px",
    fontWeight: "600",
    margin: "10px 0"
  },
  items: {
    fontFamily: "montserrat",
    listStyle: "none",
    padding: "10px 15px",
    fontWeight: "500",
    color: "#84A59D",
    display: "flex",
    alignItems: "center",
    borderRadius: "15px",
    margin: "10px 0",
    justifyContent: "space-between",
  },
    total: {
    fontFamily: "montserrat",
    color: "#F28482",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px"
  },
  order: {
    backgroundColor: "#84A59D",
    color: "#fff",
    fontFamily: "montserrat",
    fontWeight: "400",
    border: "none",
    borderRadius: "7px",
    padding: "6px",
    fontSize: "16px",
    marginLeft: "10px"
  }
};

export default Cart;