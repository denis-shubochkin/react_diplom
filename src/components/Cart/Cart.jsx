import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, sendOrder, setGlobalFilter } from "../../actions/actionCreators";
import headerlogo from "../../img/header-logo.png";
import banner from "../../img/banner.jpg";
import { useHistory } from "react-router-dom";
import classNames from 'classnames';

export default function Cart() {
  //const [itemsInCart, setitemsInCart] = useState([]);
  const [inputPhone, setInputPhone] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const { sended, loading, error } = useSelector((state) => state.sendOrder);
  const {items} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const searchBar = useRef(null);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [searchInput, setSearchInput] = useState("");


  // useEffect(() => {
  //   // let keys = Object.keys(localStorage);
  //   // for (let key of keys) {
  //   //   setitemsInCart((prev) => [
  //   //     ...prev,
  //   //     JSON.parse(localStorage.getItem(key)),
  //   //   ]);
  //   // }

  // }, []);

  useEffect(() => {
    if (sended) {
     dispatch(clearCart());
    }
  }, [sended]);

  const onDelHandler = (el) => {
    dispatch(removeFromCart(el))
  };

  const onInputPhone = (evt) => {
    setInputPhone(evt.target.value);
  };

  const onInputAddress = (evt) => {
    setInputAddress(evt.target.value);
  };

  const onOrderHandler = (evt) => {
    evt.preventDefault();
    let arr = [];
    items.forEach((el) =>
      arr.push({
        id: el.data.id,
        price: el.data.price * el.qt,
        count: el.qt,
      })
    );
    const result = {
      owner: {
        phone: inputPhone,
        address: inputAddress,
      },
      items: arr,
    };

    sendOrder(dispatch, result);
  };

  const openSearchBar = () => {
    if (searchVisibility && searchInput) {
      goToCatalog();
    } else if (searchVisibility && !searchInput) {
      searchBar.current.classList.add("invisible");
      setSearchVisibility(false);
    } else {
      searchBar.current.classList.remove("invisible");
      searchBar.current.querySelector('input').focus();
      setSearchVisibility(true);
    }
  };

  const goToCatalog = () => {
    dispatch(setGlobalFilter(searchInput));
    history.push("/catalog.html");
  };

  const onSearchSubmit = (evt) => {
    evt.preventDefault();
    goToCatalog();
  };

  const onSearchInput = (evt) => {
    setSearchInput(evt.target.value);
  };

  return (
    <>
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <a className="navbar-brand" href="/">
                <img src={headerlogo} alt="Bosa Noga" />
              </a>

              <div className="collapase navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Главная
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/catalog.html">
                      Каталог
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about.html">
                      О магазине
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/contacts.html">
                      Контакты
                    </a>
                  </li>
                </ul>
                <div>
                  <div className="header-controls-pics">
                    <div
                      data-id="search-expander"
                      className="header-controls-pic header-controls-search"
                      onClick={openSearchBar}
                    ></div>

                    <div className="header-controls-pic header-controls-cart">
                      {items.length > 0 ? (
                        <div className="header-controls-cart-full">
                          {items.length}
                        </div>
                      ) : null}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </div>
                  <form
                    data-id="search-form"
                    className={classNames("header-controls-search-form","form-inline", {"invisible": !searchVisibility})}
                    onSubmit={onSearchSubmit}
                  >
                    <input
                      className="form-control"
                      onChange={onSearchInput}
                      value={searchInput}
                      placeholder="Поиск"
                    />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="row">
          <div className="col">
            <div className="banner">
              <img src={banner} className="img-fluid" alt="К весне готовы!" />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>

            {sended ? null : (
              <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Название</th>
                      <th scope="col">Размер</th>
                      <th scope="col">Кол-во</th>
                      <th scope="col">Стоимость</th>
                      <th scope="col">Итого</th>
                      <th scope="col">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((el, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>
                          <a href={`/products/${el.data.id}.html`}>
                            {el.data.title}
                          </a>
                        </td>
                        <td>{el.data.sizes[el.size].size}</td>
                        <td>{el.qt}</td>
                        <td>{el.data.price} руб.</td>
                        <td>{el.data.price * el.qt} руб.</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onDelHandler(el)}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan="5" className="text-right">
                        Общая стоимость
                      </td>
                      <td>
                        {items.reduce(function (prev, el) {
                          return prev + el.data.price * el.qt;
                        }, 0)}{" "}
                        руб.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            )}
            {loading ? (
              <section className="order">
                <div className="preloader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </section>
            ) : null}
            {error ? (
              <section className="order">
                <h3>Ошибка отправки заказа, попробуйте снова</h3>
              </section>
            ) : null}
            {sended ? (
              <h3 className="Sended">Заказ успешно отправлен!</h3>
            ) : (
              <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card">
                  <form className="card-body" onSubmit={onOrderHandler}>
                    <div className="form-group">
                      <label htmlFor="phone">Телефон</label>
                      <input
                        className="form-control"
                        id="phone"
                        placeholder="Ваш телефон"
                        onChange={onInputPhone}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Адрес доставки</label>
                      <input
                        className="form-control"
                        id="address"
                        placeholder="Адрес доставки"
                        onChange={onInputAddress}
                        required
                      />
                    </div>
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreement"
                        required
                      />
                      <label className="form-check-label" htmlFor="agreement">
                        Согласен с правилами доставки
                      </label>
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">
                      Оформить
                    </button>
                  </form>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="container bg-light footer">
        <div className="row">
          <div className="col">
            <section>
              <h5>Информация</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a href="/about.html" className="nav-link">
                    О магазине
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/catalog.html" className="nav-link">
                    Каталог
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/contacts.html" className="nav-link">
                    Контакты
                  </a>
                </li>
              </ul>
            </section>
          </div>
          <div className="col">
            <section>
              <h5>Принимаем к оплате:</h5>
              <div className="footer-pay">
                <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                <div className="footer-pay-systems footer-pay-systems-visa"></div>
                <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
              </div>
            </section>
            <section>
              <div className="footer-copyright">
                2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
                аксессуаров. Все права защищены.
                <br />
                Доставка по всей России!
              </div>
            </section>
          </div>
          <div className="col text-right">
            <section className="footer-contacts">
              <h5>Контакты:</h5>
              <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">
                +7 495 79 03 5 03
              </a>
              <span className="footer-contacts-working-hours">
                Ежедневно: с 09-00 до 21-00
              </span>
              <a
                className="footer-contacts-email"
                href="mailto:office@bosanoga.ru"
              >
                office@bosanoga.ru
              </a>
              <div className="footer-social-links">
                <div className="footer-social-link footer-social-link-twitter"></div>
                <div className="footer-social-link footer-social-link-vk"></div>
              </div>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
}
