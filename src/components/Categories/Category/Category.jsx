import { useDispatch } from "react-redux";
import { changeActiveCat } from "../../../actions/actionCreators";
import "./Category.css";
import classNames from 'classnames';

export default function Category(props) {
  const { data, active } = props;
  const dispatch = useDispatch();
  return (
    <div
      className={classNames('Cat',{Active: active === data.id})}
      onClick={() => {
        dispatch(changeActiveCat(data.id));
      }}
    >
      {data.title}
    </div>
  );
}
