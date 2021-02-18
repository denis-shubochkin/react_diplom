import { useDispatch } from "react-redux";
import { changeActiveCat } from "../../../actions/actionCreators";
import "./Category.css";

export default function Category(props) {
  const { data, active } = props;
  const dispatch = useDispatch();
  return (
    <div
      className={active === data.id ? "Cat Active" : "Cat"}
      onClick={() => {
        dispatch(changeActiveCat(data.id));
      }}
    >
      {data.title}
    </div>
  );
}
