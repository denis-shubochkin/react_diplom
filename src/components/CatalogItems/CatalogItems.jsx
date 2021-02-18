import CatItem from "./CatItem/CatItem";
import "./CatalogItems.css";

export default function CatalogItems(props) {
  const { loading, error, items, onLoadMore, loadButStatus } = props;

  return (
    <>
      {loading ? (
        <section className="catalog">
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
      ) : null}
      {error ? (
        <section className="catalog">
          <h3>Данные не найдены</h3>
        </section>
      ) : null}
      {items.length > 0 ? (
        <section className="catalog">
          <div className="CatItems">
            {" "}
            {items.map((el) => (
              <CatItem key={el.id} data={el} />
            ))}
          </div>
          {loadButStatus ? (
            <button className="LoadMore" onClick={() => onLoadMore()}>
              Загрузить еще
            </button>
          ) : null}
        </section>
      ) : null}
    </>
  );
}
