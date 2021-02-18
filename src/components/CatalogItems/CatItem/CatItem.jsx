import { useHistory } from "react-router-dom";
import "./CatItem.css";

export default function CatItem(props) {
  const { data } = props;
  const history = useHistory();

  const onClickHandler = () => {
    history.push(`/catalog/${data.id}.html`);
  };

  return (
    <div className="CatItem">
      <div className="CatImgBlock">
        <img
          className="CatItemImg"
          src={data.images[0]}
          alt="Изображение появится чуть позже"
        ></img>
      </div>
      <div className="CatItemInfo">
        <div className="CatItemTitle">{data.title}</div>
        <div className="CatItemPrice">{data.price} руб.</div>
        <button className="Order" onClick={onClickHandler}>
          Заказать
        </button>
      </div>
    </div>
  );
}
