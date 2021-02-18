import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setGlobalFilter } from "../../actions/actionCreators";
import headerlogo from "../../img/header-logo.png";
import banner from "../../img/banner.jpg";

export default function Contacts() {
  const searchBar = useRef(null);
  const dispatch = useDispatch();
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

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
    <div className="Contacts">
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
                  <li className="nav-item active">
                    <a className="nav-link" href="/contacts.html">
                      Контакты
                    </a>
                  </li>
                </ul>
                <div>
                  <div className="header-controls-pics">
                    <div
                      data-id="search-expander"
                      onClick={openSearchBar}
                      className="header-controls-pic header-controls-search"
                    ></div>
                    <div
                      className="header-controls-pic header-controls-cart"
                      onClick={() => history.push("/cart.html")}
                    >
                      {localStorage.length > 0 ? (
                        <div className="header-controls-cart-full">
                          {localStorage.length}
                        </div>
                      ) : null}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </div>
                  <form
                    data-id="search-form"
                    ref={searchBar}
                    className="header-controls-search-form form-inline invisible"
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

            <section className="top-sales">
              <h2 className="text-center">Контакты</h2>
              <p>
                Наш головной офис расположен в г.Москва, по адресу: Варшавское
                шоссе, д. 17, бизнес-центр W Plaza.
              </p>
              <h5 className="text-center">Координаты для связи:</h5>
              <p>
                Телефон: <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>{" "}
                (ежедневно: с 09-00 до 21-00)
              </p>
              <p>
                Email:{" "}
                <a href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
              </p>
            </section>
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
    </div>
  );
}
