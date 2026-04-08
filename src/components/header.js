import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? { fontWeight: "bold", color: "blue" } : {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);        
    navigate("/");        
  };

  return (
    <header style={{ display: "flex", gap: "20px", padding: "10px 20px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
      <Link to="/" style={isActive("/")}>Главная</Link>
      <Link to="/cart" style={isActive("/cart")}>Корзина</Link>

      {user ? (
        <>
          <Link to="/orders" style={isActive("/orders")}>{user.username}</Link>
          <button
            onClick={handleLogout}
            style={{ marginLeft: "10px", background: "transparent", border: "none", color: "red", cursor: "pointer" }}
          >
            Выйти
          </button>
        </>
      ) : (
        <Link to="/auth" style={isActive("/auth")}>Вход / Регистрация</Link>
      )}
    </header>
  );
}

export default Header;