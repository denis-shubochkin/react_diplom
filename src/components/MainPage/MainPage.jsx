import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHits,
  fetchCatalog,
  fetchCatItems,
  setGlobalFilter,
} from "../../actions/actionCreators";
import headerlogo from "../../img/header-logo.png";
import banner from "../../img/banner.jpg";

import "../../css/style.css";
import Hits from "../Hits/Hits";
import Categories from "../Categories/Categories";
import CatalogItems from "../CatalogItems/CatalogItems";
import { useHistory } from "react-router-dom";

let counter = 6;

export default function MainPage() {
  const searchBar = useRef(null);
  const { hitsItems, hitsLoading, hitsError } = useSelector(
    (state) => state.hitsList
  );
  const { categories, active, catLoading, catError } = useSelector(
    (state) => state.catList
  );
  const {
    catItems,
    catItemsLoading,
    catItemsError,
    loadButStatus,
  } = useSelector((state) => state.catItemsList);
  const dispatch = useDispatch();
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchHits(dispatch);
    fetchCatalog(dispatch);
  }, [dispatch]);

  useEffect(() => {
    fetchCatItems(dispatch, active);
    counter = 6;
  }, [active]);

  const onLoadMoreHandler = () => {
    console.log(active);
    console.log(counter);
    fetchCatItems(dispatch, active, counter);
    counter += 6;
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
    <div className="Main">
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <a className="navbar-brand" href="/">
                <img src={headerlogo} alt="Bosa Noga" />
              </a>
              <div className="collapase navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
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
            <Hits loading={hitsLoading} error={hitsError} items={hitsItems} />
            <Categories
              loading={catLoading}
              error={catError}
              categories={categories}
              active={active}
            />
            <CatalogItems
              loading={catItemsLoading}
              error={catItemsError}
              items={catItems}
              onLoadMore={onLoadMoreHandler}
              loadButStatus={loadButStatus}
            />
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
                аксессуаров. Все права защищены.<br></br>Доставка по всей
                России!
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
