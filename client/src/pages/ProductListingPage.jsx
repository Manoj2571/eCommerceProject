import Filters from "../components/Filters";
import Product from "../features/products/Product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "../features/search/SearchResults";
import { fetchProducts } from "../features/products/productsSlice";

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const [ratingInput, setRatingInput] = useState(0);
  const [typeInput, setTypeInput] = useState([]);

  const { products, status, error, sortBy, search } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  let { category } = useParams();

  let filteredProducts = products.filter(
    (product) => product.category == category
  );

  if (!(typeInput.length == 0 && ratingInput == 0)) {
    let filteredArray = [];
    for (let input of typeInput) {
      const filtered = filteredProducts.filter(
        (product) => product.productType == input
      );
      filteredArray = [...filteredArray, ...filtered];
    }

    filteredProducts =
      typeInput.length == 0
        ? filteredProducts.filter((product) => product.rating >= ratingInput)
        : filteredArray.filter((product) => product.rating >= ratingInput);
  }

  const sortedProducts = !sortBy
    ? filteredProducts
    : sortBy == "ascendingPrice"
    ? filteredProducts.sort((a, b) => a.price - b.price)
    : filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <>
      {status == "success" && search.length > 2 ? (
        <>
          <SearchResults />
        </>
      ) : (
        <>
          <main className="container">
            {/* <div
              className="my-3"
              typeof="button"
              data-bs-target="#filters"
              data-bs-toggle="collapse"
              aria-controls="filters"
              aria-expanded="false"
              aria-label="Filter Products"
            >
              <svg
                role="img"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                className="navbar-toggler-icon"
              >
                <path d="M5.915 4a1.5 1.5 0 0 1-2.83 0H1.5a.5.5 0 0 1 0-1h1.585a1.5 1.5 0 0 1 2.83 0H14.5a.5.5 0 0 1 0 1H5.915ZM1 8.5a.5.5 0 0 1 .5-.5h8.585a1.5 1.5 0 0 1 2.83 0H14.5a.5.5 0 0 1 0 1h-1.585a1.5 1.5 0 0 1-2.83 0H1.5a.5.5 0 0 1-.5-.5ZM1.5 13a.5.5 0 0 0 0 1h3.585a1.5 1.5 0 0 0 2.83 0H14.5a.5.5 0 0 0 0-1H7.915a1.5 1.5 0 0 0-2.83 0H1.5Z"></path>
              </svg>
            </div> */}
            <div className="row">
              <Filters
                ratingInput={ratingInput}
                setRatingInput={setRatingInput}
                setTypeInput={setTypeInput}
                typeInput={typeInput}
                category={category}
              />
              <div className="col-12 col-md-9 mt-3">
                <div className="row">
                  {status == "loading" && <p className="mt-3">Loading...</p>}
                  {status == "success" &&
                    sortedProducts?.map((obj) => (
                      <Product productData={obj} key={obj._id} />
                    ))}
                  {status == "success" && sortedProducts?.length == 0 && (
                    <p>No products found</p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductListingPage;
