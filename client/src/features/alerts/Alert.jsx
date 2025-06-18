import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAlertMessage } from "../products/productsSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { alertMessage } = useSelector((state) => state.products);

  setTimeout(() => {
    dispatch(setAlertMessage(""));
  }, 1800);

  return (
    <div className="container">
      {alertMessage && <div className="popup">{alertMessage}</div>}
    </div>
  );
};

export default Alert;
