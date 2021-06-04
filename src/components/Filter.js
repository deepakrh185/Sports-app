import { useState, useEffect } from "react";
import { selectProduct, updateFilter } from "../slices/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Product.module.css";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

function Filter() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lastChange, setLastChange] = useState(null);
  const [price, setPrice] = useState(0);
  const [priceMax, setPriceMax] = useState(1);
  const all_products = useSelector(selectProduct);

  const getUniqueValues = (data, type) => {
    const unique = data.map((item) => item[type]);
    return ["All", ...new Set(unique)];
  };
  const category = all_products
    ? getUniqueValues(all_products, "category")
    : null;

  const filterCategory = (value, item) => {
    console.log("clicked");
    if (item === "category") {
      setActiveCategory(value);
      setLastChange("category");
    }
    const filtered =
      value != "All"
        ? all_products.filter((data) => data[item].includes(value))
        : all_products;
    dispatch(updateFilter(filtered));
  };
  useEffect(() => {
    const items = ["category"];
    const hello = {
      category: activeCategory,
    };
    // const items = ['category', 'company', 'colors']
    if (all_products) {
      let filtered = all_products;

      if (hello[lastChange] !== "All") {
        filtered = all_products.filter(
          (product) => product[lastChange] === hello[lastChange]
        );
      } else {
        items.forEach((x) => {
          filtered =
            x == lastChange && hello[x] !== "All"
              ? filtered.filter((product) => product[x] === hello[x])
              : filtered;
        });
      }

      items.forEach((x) => {
        if (hello[x] !== "All") {
          filtered =
            x !== lastChange
              ? filtered.filter((product) => product[x] === hello[x])
              : filtered;
        }
      });
      dispatch(updateFilter(filtered));
    }
  }, [activeCategory, lastChange]);

  useEffect(() => {
    const max = all_products
      ?.map((product) => product.price)
      .reduce((a, b) => Math.max(a, b));
    setPriceMax(max);
    setPrice(max);
  }, [all_products]);

  const priceFilter = (value) => {
    setPrice(value);
    const filtered = all_products.filter((product) => product.price <= value);
    dispatch(updateFilter(filtered));
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="mb-4">
        <h1 className="font-bold text-3xl text-black ">Category</h1>
        <div className="flex flex-col my-5">
          {category &&
            category.map((value) => (
              <p
                key={value}
                className={`${
                  value == activeCategory && styles.active_filter
                } text-gray-500 cursor-pointer mb-8 font-medium`}
                onClick={() => filterCategory(value, "category")}
              >
                {value.toUpperCase()}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4 pr-10">
        <h2 className="font-bold text-base text-gray-600">Price</h2>
        <div className="flex flex-col my-5">
          <InputRange
            maxValue={priceMax}
            minValue={0}
            value={price}
            formatLabel={(value) => `₹ ${value}`}
            onChange={priceFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
