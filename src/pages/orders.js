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
    <div style={{ padding: "20px" }}>
      <h1>Ваши заказы</h1>

      {orders.length === 0 ? (
        <p>У вас пока нет заказов</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <h3>{order.order_name}</h3>
              <p>{order.tota_price}₽</p>

              <ul style={{ fontSize: "0.9em" }}>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.count} × {item.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;