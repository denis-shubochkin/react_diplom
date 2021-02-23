import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import {
  addToCart,
  fetchProduct,
  setGlobalFilter,
} from "../../actions/actionCreators";
import headerlogo from "../../img/header-logo.png";
import banner from "../../img/banner.jpg";

export default function ProductCard(props) {
  const { id } = props;

  const { data, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [size, setSize] = useState(null);
  const [counter, setCounter] = useState(1);
  const history = useHistory();
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const {items} = useSelector((state) => state.cart);

  useEffect(() => {
    fetchProduct(dispatch, id);
  }, [dispatch]);

  const onClickHandler = (evt) => {
    evt.target.classList.add("selected");
    setSize(evt.target.id);
  };

  const onIncrCounter = () => {
    if (counter < 10) {
      setCounter(counter + 1);
    }
  };

  const onDecrCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const onCartHandler = () => {
    dispatch(addToCart(data, counter, size));
    history.push("/cart.html");
  };

  const openSearchBar = () => {
    if (searchVisibility && searchInput) {
      goToCatalog();
    } else if (searchVisibility && !searchInput) {
      setSearchVisibility(false);
    } else {
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

  if (data) {
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

                      <div
                        className="header-controls-pic header-controls-cart"
                        onClick={() => history.push("/cart.html")}
                      >
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
              {error ? (
                <section className="catalog-item">
                  <h3>Данные не найдены</h3>
                </section>
              ) : null}
              {loading ? (
                <section className="catalog-item">
                  <div className="preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </section>
              ) : (
                <section className="catalog-item">
                  <h2 className="text-center">{data.title}</h2>
                  <div className="row">
                    <div className="col-5">
                      <img
                        src={data.images ? data.images[0] : null}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="col-7">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td>Артикул</td>
                            <td>{data.sku}</td>
                          </tr>
                          <tr>
                            <td>Производитель</td>
                            <td>{data.manufacturer}</td>
                          </tr>
                          <tr>
                            <td>Цвет</td>
                            <td>{data.color}</td>
                          </tr>
                          <tr>
                            <td>Материалы</td>
                            <td>{data.material}</td>
                          </tr>
                          <tr>
                            <td>Сезон</td>
                            <td>{data.season}</td>
                          </tr>
                          <tr>
                            <td>Повод</td>
                            <td>{data.reason}</td>
                          </tr>
                        </tbody>
                      </table>
                      {data.sizes ? (
                        <>
                          <div className="text-center">
                            <p>
                              Размеры в наличии:{" "}
                              {data.sizes
                                .filter((el) => el.avalible)
                                .map((el, i) => (
                                  <span
                                    key={i}
                                    id={i}
                                    onClick={onClickHandler}
                                    className="catalog-item-size"
                                  >
                                    {el.size}
                                  </span>
                                ))}
                            </p>
                            {data.sizes.filter((el) => el.avalible).length >
                            0 ? (
                              <p>
                                Количество:{" "}
                                <span className="btn-group btn-group-sm pl-2">
                                  <button
                                    className="btn btn-secondary"
                                    onClick={onDecrCounter}
                                  >
                                    -
                                  </button>
                                  <span className="btn btn-outline-primary">
                                    {counter}
                                  </span>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={onIncrCounter}
                                  >
                                    +
                                  </button>
                                </span>
                              </p>
                            ) : null}
                          </div>
                          {size !== null ? (
                            <button
                              className="btn btn-danger btn-block btn-lg"
                              onClick={onCartHandler}
                            >
                              В корзину
                            </button>
                          ) : null}{" "}
                        </>
                      ) : null}
                    </div>
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
                <a
                  className="footer-contacts-phone"
                  href="tel:+7-495-790-35-03"
                >
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
}
