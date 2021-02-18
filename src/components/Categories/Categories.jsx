import Category from "./Category/Category";
import "./Categories.css";
import { changeActiveCat } from "../../actions/actionCreators";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Categories(props) {
  const {
    loading,
    error,
    categories,
    active,
    catalogPage,
    onFilter,
    globalFilter = "",
  } = props;
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const onSearchHandler = (evt) => {
    evt.preventDefault();
    onFilter(input);
  };

  const inputHandler = (evt) => {
    setInput(evt.target.value);
  };

  useEffect(() => {
    if (globalFilter !== "") {
      onFilter(globalFilter);
      setInput(globalFilter);
    }
  }, [globalFilter]);

  return (
    <>
      {loading ? (
        <section className="categoriesSection">
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
      ) : null}
      {error ? (
        <section className="categoriesSection">
          <h3>Данные не найдены</h3>
        </section>
      ) : null}
      {categories.length > 0 ? (
        <section className="categoriesSection">
          <h2 className="text-center">Каталог</h2>
          {catalogPage ? (
            <form
              className="catalog-search-form form-inline"
              onSubmit={onSearchHandler}
            >
              <input
                className="form-control"
                value={input}
                onChange={inputHandler}
                placeholder="Поиск"
              />
            </form>
          ) : null}
          <div className="Categories">
            <div
              className={active === 0 ? "Cat Active" : "Cat"}
              onClick={() => {
                dispatch(changeActiveCat(0));
              }}
            >
              Все
            </div>
            {categories.map((el) => (
              <Category key={el.id} data={el} active={active} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
