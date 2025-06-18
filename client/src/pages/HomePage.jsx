import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { fetchAddresses } from "../features/address/addressesSlice";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/products/productsSlice";
import SearchResults from "../features/search/SearchResults";
import { fetchUsers } from "../features/users/usersSlice";
import { fetchOrders } from "../features/order/orderSlice";
import bestSellers from "../assets/bestSellersAnimate.gif";
import newArrivals from "../assets/newArrivalsAnimate.gif";
import sale from "../assets/christmasSale.gif";

const HomePage = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);

  const { search } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchAddresses());
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }, []);

  return (
    <main className="container" style={{ textAlign: "center" }}>
      {status == "success" && search.length > 2 ? (
        <>
          <SearchResults />
        </>
      ) : (
        <>
          <img
            src={sale}
            alt="sale Image"
            style={{ width: "100%" }}
            // className="img-fluid"
            loading="lazy"
          />

          <div className="category_align mt-3">
            {status == "loading" && <p>loading categories...</p>}
            {status == "success" &&
              categories.map((category) => (
                <div
                  className="col-2"
                  key={category._id}
                  style={{ width: "15.5%" }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/categories/${category.category}`}
                  >
                    <img
                      src={category.imageUrl}
                      alt={category.category}
                      style={{ width: "100%" }}
                      className="align-self-center"
                      loading="lazy"
                    />
                    <p className="text-center text-dark fw-medium">
                      <small
                        style={{
                          fontSize:
                            category.category.length >= 5 ? "79%" : "14px",
                        }}
                      >
                        {category.category}
                      </small>
                    </p>
                  </Link>
                </div>
              ))}
          </div>
          <div className="row">
            <div className="col-6">
              <div className="card mb-3 border border-0">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={bestSellers}
                      alt="new arrivals"
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Best Sellers</h5>
                      <p className="card-text">
                        Explore Best Sellers of the Season.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card mb-3 border border-0">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={newArrivals}
                      alt="best sellers"
                      className="img-fluid"
                      style={{ height: "100%" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">New Arrivals</h5>
                      <p className="card-text">
                        Explore New Arrivals of the Season.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default HomePage;
