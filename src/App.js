import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/home";
import Cart from "./pages/cart";
import Auth from "./pages/auth";
import Header from "./components/header";
import Orders from "./pages/orders";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const addToCart = (bouquet) => {
    const newCart = [...cart, bouquet];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <Router>
      <Header user={user} setUser={setUser} cart={cart} /> {/* передаем корзину для счетчика */}
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/orders" element={<Orders user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;