import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setGlobalFilter } from "../../actions/actionCreators";
import headerlogo from "../../img/header-logo.png";
import banner from "../../img/banner.jpg";
import classNames from 'classnames';

export default function About() {
  const dispatch = useDispatch();
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  const {items} = useSelector((state) => state.cart);

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

  return (
    <div className="About">
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
                  <li className="nav-item active">
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
                      onClick={openSearchBar}
                      className="header-controls-pic header-controls-search"
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

            <section className="top-sales">
              <h2 className="text-center">О магазине</h2>
              <p>
                В Интернете можно встретить немало магазинов, предлагающих
                аксессуары. Но именно к нам хочется возвращаться снова и снова.
              </p>
              <p className="h4 text-center">
                Мы предлагаем вам особые условия:
              </p>
              <ol>
                <li>
                  Индивидуальный подход специалиста. Когда поступает новая
                  коллекция обуви весна-лето или же коллекция обуви осень-зима –
                  покупателям бывает трудно сориентироваться во всем
                  многообразии новинок. Наш менеджер по телефону поможет вам
                  определиться с товарами, подходящими именно вам.
                </li>
                <li>
                  Мы периодически проводим распродажи как женских и мужских, так
                  и детских моделей. Вы будете приятно удивлены ценами на
                  аксессуары в мага- зине BosaNoga.
                </li>
                <li>
                  У нас всегда есть из чего выбрать. Неважно, какую категорию вы
                  прос- матриваете: осень-зима, или же весна-лето – вы всегда
                  сможете найти ва- рианты, подходящие вам по внешнему виду и
                  цене.
                </li>
                <li>Мы несем ответственность за все товары.</li>
                <li>
                  Молодые мамы будут рады обширному ассортименту детских
                  моделей.
                </li>
              </ol>
              <p>
                {" "}
                Если вы ищете место, где представлены обувные новинки от самых
                известных брендов, то вы зашли по верному адресу.{" "}
              </p>
              <p>
                У нас представлены модели для мужчин, женщин, а также детские
                сапоги, босоножки, ботинки и туфли. Сделав заказ в нашем
                интернет-магазине, вы сможете быть модным и стильным как
                осенью-зимой, так и весной-летом. Просто наберите номер нашего
                телефона, и мы поможем вам определиться с покупкой.{" "}
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
