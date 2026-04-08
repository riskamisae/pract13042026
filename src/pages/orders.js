function Orders({ user }) {
  if (!user) return <p>Вы не авторизованы</p>;

  return (
    <div>
      <h1>Заказы пользователя {user.username}</h1>
    </div>
  );
}

export default Orders;