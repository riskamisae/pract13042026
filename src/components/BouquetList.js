import { useState } from "react";

function BouquetList({ items, addToCart }) {
  const [notification, setNotification] = useState("");

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      totalPrice: item.price,
      items: item.items || []
    });

    // показываем уведомление
    setNotification(`"${item.name}" добавлен в корзину`);

    // скрываем через 2 секунды
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  if (!items || items.length === 0) {
    return <p>Пусто</p>;
  }

  return (
    <>
      {notification && (
        <div style={styles.notification}>
          {notification}
        </div>
      )}

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />
            )}

            <h3 style={styles.title}>{item.name}</h3>

            <p style={styles.price}>{item.price} ₽</p>

            <button
              style={styles.button}
              onClick={() => handleAddToCart(item)}
            >
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    border: "1px dashed rgba(132, 165, 157, .5)",
    borderRadius: "20px",
    padding: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.4)"
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "20px"
  },
  title: {
    fontSize: "18px",
    margin: "10px 0 5px",
    fontFamily: "Montserrat",
    color: "#84A59D",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0",
    fontFamily: "montserrat",
    color: "#F28482"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#84A59D",
    color: "#F7EDE2",
    fontFamily: "montserrat",
    fontWeight: "400",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },
  notification: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#84A59D",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "10px",
    fontFamily: "montserrat",
    zIndex: 1000
  }
};

export default BouquetList;