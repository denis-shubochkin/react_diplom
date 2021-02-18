import Hit from "../Hit/Hit";

export default function Hits(props) {
  const { items, loading, error } = props;
  return (
    <>
      {loading ? (
        <section className="top-sales">
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
      ) : null}
      {error ? (
        <section className="top-sales">
          <h3>Данные не найдены</h3>
        </section>
      ) : null}
      {items.length > 0 ? (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          <div className="Hits">
            {" "}
            {items.map((el) => (
              <Hit key={el.id} data={el} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
