import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Order = () => {
  const dispatch = useDispatch();
  const { latestOrderId, status } = useSelector((state) => state.orders);

  return (
    <main className="container  mt-3 text-center">
      {status == "success" && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="#000"
            version="1.1"
            viewBox="0 0 310.277 310.277"
            xmlSpace="preserve"
          >
            <path
              fill="green"
              d="M155.139 0C69.598 0 0 69.598 0 155.139c0 85.547 69.598 155.139 155.139 155.139 85.547 0 155.139-69.592 155.139-155.139C310.277 69.598 240.686 0 155.139 0zm-10.962 196.567L90.571 142.96l8.437-8.437 45.169 45.169 81.34-81.34 8.437 8.437-89.777 89.778z"
            ></path>
          </svg>
          <h2 className="my-3">Thank you for your purchase</h2>
          <p>We have received your order.</p>
          <p>We will ship in 3-5 business days.</p>
          <p>Your order id is {latestOrderId}</p>
          <Link className="btn border border-success text-success" to="/">
            Back to Home
          </Link>
        </div>
      )}
    </main>
  );
};

export default Order;
