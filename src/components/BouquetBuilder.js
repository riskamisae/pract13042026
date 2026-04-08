import { useState } from "react";

function BouquetBuilder({ catalog, addToCart }) {
  const [bouquetItems, setBouquetItems] = useState([]);
  const [bouquetName, setBouquetName] = useState("");

  const addFlower = (flower) => {
    const index = bouquetItems.findIndex(item => item.id === flower.id);
    if (index !== -1) {
      const newBouquet = [...bouquetItems];
      newBouquet[index].count += 1;
      newBouquet[index].totalPrice += flower.price;
      setBouquetItems(newBouquet);
    } else {
      setBouquetItems([...bouquetItems, { ...flower, count: 1, totalPrice: flower.price }]);
    }
  };

  const removeFlower = (id) => {
    const newBouquet = bouquetItems
      .map(item => item.id === id ? { ...item, count: item.count - 1, totalPrice: item.totalPrice - item.price } : item)
      .filter(item => item.count > 0);
    setBouquetItems(newBouquet);
  };

  const totalPrice = bouquetItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleAddToCart = () => {
    if (!bouquetName) {
      alert("Введите название букета");
      return;
    }
    const bouquet = {
      name: bouquetName,
      totalPrice,
      items: bouquetItems
    };
    addToCart(bouquet);
    setBouquetItems([]);
    setBouquetName("");
  };

  return (
    <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {catalog.map(flower => (
          <div key={flower.id} style={{ border: "1px solid #ddd", padding: "5px" }}>
            <h4>{flower.name}</h4>
            <p>{flower.price}₽</p>
            <button onClick={() => addFlower(flower)}>Добавить</button>
          </div>
        ))}
      </div>

      <h3>Ваш букет</h3>
      {bouquetItems.length === 0 ? (
        <p>Выберите цветы</p>
      ) : (
        <ul>
          {bouquetItems.map(item => (
            <li key={item.id}>
              {item.count} {item.name} — {item.totalPrice}₽
              <button style={{ marginLeft: "5px" }} onClick={() => removeFlower(item.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        placeholder="Название букета"
        value={bouquetName}
        onChange={(e) => setBouquetName(e.target.value)}
        style={{ marginTop: "10px", display: "block" }}
      />
      <p>Цена всего букета: {totalPrice}₽</p>
      <button onClick={handleAddToCart}>Добавить в корзину</button>
    </div>
  );
}

export default BouquetBuilder;