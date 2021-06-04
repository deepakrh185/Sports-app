import { useState, useEffect } from "react";
import { selectProduct, updateFilter } from "../slices/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Product.module.css";

function Filter() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lastChange, setLastChange] = useState(null);

  const all_products = useSelector(selectProduct);

  const getUniqueValues = (data, type) => {
    const unique = data.map((item) => item[type]);
    return ["all", ...new Set(unique)];
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
      value != "all"
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

      if (hello[lastChange] !== "all") {
        filtered = all_products.filter(
          (product) => product[lastChange] === hello[lastChange]
        );
      } else {
        items.forEach((x) => {
          filtered =
            x == lastChange && hello[x] !== "all"
              ? filtered.filter((product) => product[x] === hello[x])
              : filtered;
        });
      }

      items.forEach((x) => {
        if (hello[x] !== "all") {
          filtered =
            x !== lastChange
              ? filtered.filter((product) => product[x] === hello[x])
              : filtered;
        }
      });
      dispatch(updateFilter(filtered));
    }
  }, [activeCategory, lastChange]);

  //   useEffect(() => {
  //     if (!all_products) return false;
  //     const max = all_products
  //       ?.map((product) => product.price)
  //       .reduce((a, b) => Math.max(a, b));
  //     setPriceMax(max);
  //     setPrice(max);
  //   }, [all_products]);

  return (
    <div className="flex flex-col mt-10">
      <div className="mb-4">
        <h2 className="font-bold text-base text-gray-600">Category</h2>
        <div className="flex flex-col my-5">
          {category &&
            category.map((value) => (
              <p
                key={value}
                className={`${
                  value == activeCategory && styles.active_filter
                } text-gray-500 cursor-pointer mb-2`}
                onClick={() => filterCategory(value, "category")}
              >
                {value}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
