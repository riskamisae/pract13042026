import { useState, useEffect } from "react";
import BouquetList from "../components/BouquetList";
import BouquetBuilder from "../components/BouquetBuilder";
import axios from "axios";
import "./home.css"

const BASE_URL = "http://localhost:1337";

function Home({ addToCart }) {
  const [flowers, setFlowers] = useState([]);
  const [bouquets, setBouquets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/flowerss?populate=flower_photo")
      .then(res => {
        const data = (res.data.data || []).map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.flower_photo?.url
            ? BASE_URL + item.flower_photo.url
            : null
        }));

        setFlowers(data);
      })
      .catch(err => console.error("Flowers error:", err));


    axios
      .get("http://localhost:1337/api/bouquets?populate=bouquet_photo")
      .then(res => {
        const data = (res.data.data || []).map(bouq => ({
          id: bouq.id,
          name: bouq.name,
          price: bouq.price,
          image: bouq.bouquet_photo?.url
            ? BASE_URL + bouq.bouquet_photo.url
            : null
        }));

        setBouquets(data);
      })
      .catch(err => console.error("Bouquets error:", err));
  }, []);

  return (
    <div class="content-wrapper" style={{ padding: "20px" }}>

      <h2 class="home_header">Букеты</h2>
      <BouquetList items={bouquets} addToCart={addToCart} />

      <h2 class="home_header" style={{ marginTop: "40px" }}>Цветы</h2>
      <BouquetList items={flowers} addToCart={addToCart} />

      <h2 class="home_header" style={{ marginTop: "40px" }}>Конструктор</h2>
      <BouquetBuilder flowers={flowers} addToCart={addToCart} />

    </div>
  );
}

export default Home;