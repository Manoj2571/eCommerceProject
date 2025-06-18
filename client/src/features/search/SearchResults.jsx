import { useSelector } from "react-redux";
import Product from "../products/Product";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { category } = useParams();
  const { products, status, search } = useSelector((state) => state.products);

  const searchedProducts = category
    ? products.filter(
        (product) =>
          product.category === category &&
          product.name.toLowerCase().includes(search.toLowerCase())
      )
    : products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <main className="container mt-3">
      <div className="row">
        {status == "success" &&
          searchedProducts &&
          searchedProducts?.map((obj) => (
            <Product productData={obj} key={obj.id} />
          ))}
        {status == "success" && searchedProducts?.length == 0 && (
          <p>No Results Found.</p>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
