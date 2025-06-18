import { useSelector, useDispatch } from "react-redux";
import { setSortBy } from "../features/products/productsSlice";

const Filters = ({
  ratingInput,
  setRatingInput,
  setTypeInput,
  typeInput,
  category,
}) => {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state) => state.products);
  const { categories, status } = useSelector((state) => state.categories);

  const requiredCategory = categories.find((item) => item.category == category);

  const selectCategory = (e) => {
    const { checked, value } = e.target;

    checked
      ? setTypeInput((prev) => [...prev, value])
      : setTypeInput((prev) => prev.filter((category) => category != value));
  };

  const clearAllFilters = () => {
    setRatingInput(0);
    setTypeInput([]);
    dispatch(setSortBy(""));
  };

  return (
    <aside className="col-md-3 my-3" id="filters">
      <button
        className="d-md-none border-0 bg-transparent"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#filterContent"
        aria-expanded="false"
        aria-controls="filterContent"
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
      </button>
      <div className="collapse d-md-block" id="filterContent">
        <div className="d-flex justify-content-between flex-wrap">
          <h5 className="me-5 mt-2 fw-bold">Filters</h5>
          <button
            className="bg-transparent border px-3"
            onClick={clearAllFilters}
          >
            clear
          </button>
        </div>
        <hr />
        <label className="fw-bold mb-2">Category</label>
        <br />
        {status == "success" &&
          requiredCategory.subCategory.map((productType) => (
            <div key={productType}>
              <label key={productType}>
                <input
                  type="checkbox"
                  onChange={selectCategory}
                  value={productType}
                  checked={typeInput.includes(productType)}
                />{" "}
                {productType}
              </label>
              <br />
            </div>
          ))}
        <div>
          <label className="fw-bold my-2" htmlFor="rating">
            Rating
          </label>
          <div className="d-flex justify-content-between align-items-center">
            <input
              type="range"
              id="rating"
              min="0"
              max="5"
              value={ratingInput}
              step="0.1"
              onInput={(e) => {
                setRatingInput(e.target.value);
              }}
              width="10px"
              style={{ accentColor: "#13294b" }}
            />
            <span>{ratingInput}</span>
          </div>
        </div>
        <label className="my-2 fw-bold">Sort by</label>
        <br />
        <input
          type="radio"
          name="sortByPrice"
          value="ascendingPrice"
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          checked={sortBy == "ascendingPrice"}
        />{" "}
        Price - Low to High
        <br />
        <input
          type="radio"
          name="sortByPrice"
          value="descendingPrice"
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          checked={sortBy == "descendingPrice"}
        />{" "}
        Price - High to Low
      </div>
    </aside>
  );
};

export default Filters;
