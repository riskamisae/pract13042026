import { useState, useEffect } from "react";
import BouquetBuilder from "../components/BouquetBuilder";
import axios from "axios";

function Home({ addToCart }) {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    // TODO: заменить URL на ваш Strapi endpoint
    axios.get("http://localhost:1337/api/flowerss") // <-- сюда вставить айди и endpoint Strapi
      .then(res => {
        // пример: данные в res.data.data
        setCatalog(res.data.data.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price
        })));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Каталог цветов</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {catalog.map(flower => (
          <div key={flower.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <h3>{flower.name}</h3>
            <p>Цена: {flower.price}₽</p>
            {/* Передаём в конструктор через addToBouquet */}
          </div>
        ))}
      </div>

      <h2>Конструктор букетов</h2>
      <BouquetBuilder catalog={catalog} addToCart={addToCart} />
    </div>
  );
}

export default Home;