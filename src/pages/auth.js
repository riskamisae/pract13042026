import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;

      if (isLogin) {
        res = await axios.post("http://localhost:1337/api/auth/local", {
          identifier: username,
          password
        });
      } else {
        res = await axios.post(
          "http://localhost:1337/api/auth/local/register",
          { username, email, password }
        );
      }

      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      setUsername("");
      setEmail("");
      setPassword("");

      showNotification(`${isLogin ? "Вход" : "Регистрация"} успешен!`);

      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        "Что-то пошло не так";

      showNotification(`Ошибка: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      {notification && (
        <div style={styles.notification}>{notification}</div>
      )}

      <h1 class="home_header" style={{paddingBottom: "10px"}}>{isLogin ? "Вход" : "Регистрация"}</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        )}

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button style={styles.button} type="submit" disabled={loading}>
          {loading
            ? "Подождите..."
            : isLogin
            ? "Войти"
            : "Зарегистрироваться"}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{
          marginTop: "10px",
          background: "transparent",
          border: "none",
          color: "#F28482",
          cursor: "pointer"
        }}
      >
        {isLogin
          ? "Нет аккаунта? Зарегистрироваться"
          : "Уже есть аккаунт? Войти"}
      </button>
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
  input: {
    padding: "6px",
    fontFamily: "montserrat",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #F28482",
    outline: "none"
  },
  button: {
    backgroundColor: "#84A59D",
    color: "#fff",
    fontFamily: "montserrat",
    fontWeight: "600",
    border: "none",
    fontSize: "18px",
    padding: "8px",
    borderRadius: "10px"
  }
};

export default Auth;