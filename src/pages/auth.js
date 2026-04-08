import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;

      if (isLogin) {
        res = await axios.post("http://localhost:1337/api/auth/local", { identifier: username, password });
      } else {
        res = await axios.post("http://localhost:1337/api/auth/local/register", { username, email, password });
      }

      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user); // передаём в App

      setUsername(""); setEmail(""); setPassword("");

      navigate("/");

      alert(`${isLogin ? "Вход" : "Регистрация"} успешен!`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      const msg = err.response?.data?.error?.message || err.response?.data?.message || "Что-то пошло не так";
      alert(`Ошибка: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>{isLogin ? "Вход" : "Регистрация"}</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        {!isLogin && <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />}
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Подождите..." : isLogin ? "Войти" : "Зарегистрироваться"}</button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: "10px", background: "transparent", border: "none", color: "blue", cursor: "pointer" }}>
        {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
      </button>
    </div>
  );
}

export default Auth;