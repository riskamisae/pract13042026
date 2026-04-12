import { useEffect, useState } from "react";
import axios from "axios";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !user) return;

    axios.get(
      `http://localhost:1337/api/orders?${user.name}&populate=user`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      setOrders(res.data.data);
    })
    .catch(err => {
      console.error(err);
    });
  }, [user]);

  if (!user) return <p>Вы не авторизованы</p>;

  return (
    <div class="content-wrapper" style={{ padding: "20px" }}>
      <h1 class="home_header">Ваши заказы</h1>

      {orders.length === 0 ? (
        <p>У вас пока нет заказов</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li style={styles.items} key={order.id}>
              <h3 style={{fontWeight: "400"}}>{order.order_name}</h3>

              <ul style={{ fontSize: "12px", color: "#F28482" }}>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.count} × {item.name}
                  </li>
                ))}
              </ul>

              <p style={{fontSize: "16px", fontWeight: "600"}}>{order.tota_price}₽</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  items: {
    fontFamily: "montserrat",
    listStyle: "none",
    padding: "10px 15px",
    fontWeight: "500",
    color: "#84A59D",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    borderRadius: "15px",
    border: "1px solid rgba(132, 165, 157, .4)",
    margin: "10px 0",
  },
};

export default Orders;