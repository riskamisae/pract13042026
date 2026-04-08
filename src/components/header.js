import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css"; // <-- импорт стилей

function Header({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? { fontWeight: "700", backgroundColor: "#84A59D", color: "#F7EDE2" } : {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div class="content-wrapper header-content">
        <Link to="/" class="logo">
          BOUQU
        </Link>
        <div class="head-side">
          <div className="head-link">
            <Link to="/" style={isActive("/")}>
              Главная
            </Link>
          </div>
          <div className="head-link">
            <Link to="/cart" style={isActive("/cart")}>
              Корзина
            </Link>
          </div>
        </div>
        <div class="head-side">
          {user ? (
            <>
              <div class="head-link">
                <Link to="/orders" style={isActive("/orders")}>
                  {user.username}
                </Link>
              </div>
              <button className="out-button" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <div className="head-link">
              <Link to="/auth" style={isActive("/auth")}>
                Вход / Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;