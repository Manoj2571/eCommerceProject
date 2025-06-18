import { useSelector} from "react-redux";
import Product from "../products/Product";

const Wishlist = () => {

  const { products } = useSelector((state) => state.products);
  const { loggedInUser } = useSelector((state) => state.users);

  return (
    <main className="container">
      <h2 className="text-center my-3">My Wishlist</h2>
      <div className="row">
        {loggedInUser.wishlist
          .map((product) =>
            products.find((productData) => productData._id == product)
          )
          .map((product) => (
            <Product productData={product} key={product._id} />
          ))}
      </div>
    </main>
  );
};

export default Wishlist;
