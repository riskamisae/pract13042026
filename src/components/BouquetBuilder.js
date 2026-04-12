import { useState } from "react";

function BouquetBuilder({ flowers = [], addToCart }) {
  const [bouquetItems, setBouquetItems] = useState([]);
  const [bouquetName, setBouquetName] = useState("");
  const [notification, setNotification] = useState("");

  const addFlower = (flower) => {
    const index = bouquetItems.findIndex(item => item.id === flower.id);

    if (index !== -1) {
      const updated = [...bouquetItems];
      updated[index].count += 1;
      updated[index].totalPrice += flower.price;
      setBouquetItems(updated);
    } else {
      setBouquetItems([
        ...bouquetItems,
        {
          id: flower.id,
          name: flower.name,
          price: flower.price,
          count: 1,
          totalPrice: flower.price
        }
      ]);
    }
  };

  const removeFlower = (id) => {
    const updated = bouquetItems
      .map(item =>
        item.id === id
          ? {
              ...item,
              count: item.count - 1,
              totalPrice: item.totalPrice - item.price
            }
          : item
      )
      .filter(item => item.count > 0);

    setBouquetItems(updated);
  };

  const totalPrice = bouquetItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const handleAddToCart = () => {
    if (!bouquetName.trim()) {
      alert("Введите название букета");
      return;
    }

    addToCart({
      name: bouquetName,
      totalPrice,
      items: bouquetItems
    });

    setNotification(`Букет "${bouquetName}" добавлен в корзину`);

    setTimeout(() => {
      setNotification("");
    }, 2000);

    setBouquetItems([]);
    setBouquetName("");
  };

  return (
    <div style={styles.container}>
      {notification && (
        <div style={styles.notification}>
          {notification}
        </div>
      )}

      <input
        value={bouquetName}
        onChange={(e) => setBouquetName(e.target.value)}
        placeholder="Название букета"
        style={styles.input}
      />

      <div style={styles.grid}>
        {flowers.length === 0 ? (
          <p>Загрузка цветов...</p>
        ) : (
          flowers.map((flower) => (
            <div key={flower.id} style={styles.card}>
              {flower.image && (
                <img
                  src={flower.image}
                  alt={flower.name}
                  style={styles.image}
                />
              )}

              <h4 style={styles.title}>{flower.name}</h4>
              <p style={styles.price}>{flower.price} ₽</p>

              <button style={styles.button} onClick={() => addFlower(flower)}>
                Добавить
              </button>
            </div>
          ))
        )}
      </div>

      {bouquetItems.length === 0 ? (
        <p style={styles.choose}>Выберите цветы</p>
      ) : (
        <ul style={styles.items}>
          {bouquetItems.map((item) => (
            <li key={item.id}>
              {item.count} × {item.name} — {item.totalPrice} ₽
              <button
                style={styles.remove}
                onClick={() => removeFlower(item.id)}
              >
                −
              </button>
            </li>
          ))}
        </ul>
      )}

      <p style={styles.total}>Итого: {totalPrice} ₽</p>

      <button style={styles.button} onClick={handleAddToCart}>
        Добавить в корзину
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    border: "1px dashed rgba(132, 165, 157, .5)",
  },
  grid: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  card: {
    border: "1px solid #F28482",
    padding: "10px",
    width: "150px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "space-between",
    alignItems: "start"
  },
  title: {
    fontFamily: "montserrat",
    fontWeight: "600",
    color: "#F28482",
    margin: "0"
  },
  price: {
    color: "#84A59D",
    margin: "0",
    fontFamily: "montserrat",
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "20px"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    color: "#84A59D",
    border: "1px solid #84A59D",
    borderRadius: "15px",
    margin: "0 0 15px",
    fontFamily: "montserrat",
    outline: "none"
  },
  button: {
    backgroundColor: "#F28482",
    padding: "6px 8px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontFamily: "montserrat"
  },
  items: {
    listStyle: "none",
    padding: "0",
    fontFamily: "montserrat",
    color: "#84A59D",
    fontSize: "16px"
  },
  remove: {
    backgroundColor: "#F28482",
    padding: "4px 6px",
    color: "#fff",
    fontSize: "20px",
    marginLeft: "10px",
    border: "none",
    borderRadius: "10px",
    lineHeight: "100%"
  },
  total: {
    fontFamily: "montserrat",
    color: "#F28482",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px"
  },
  choose: {
    fontFamily: "montserrat",
    color: "#84A59D",
    fontSize: "16px",
    fontWeight: "600",
    margin: "10px 0"
  },
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
  }
};

export default BouquetBuilder;