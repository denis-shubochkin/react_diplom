import { useHistory } from "react-router-dom";
import "./Hit.css";

export default function Hit(props) {
  const { data } = props;
  const history = useHistory();

  const onClickHandler = () => {
    history.push(`/catalog/${data.id}.html`);
    console.log(1);
  };

  return (
    <div className="Hit">
      <img className="HitImg" src={data.images[0]} alt="HitImg"></img>
      <div className="HitInfo">
        <div className="HitTitle">{data.title}</div>
        <div className="HitPrice">{data.price} руб.</div>
        <button className="Order" onClick={onClickHandler}>
          Заказать
        </button>
      </div>
    </div>
  );
}
