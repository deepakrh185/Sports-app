import { useState, useEffect } from "react";
import { selectProduct, updateFilter } from "../slices/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Product.module.css";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { useRouter } from "next/router";
import { FilterIcon } from "@heroicons/react/solid";

function Filter() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lastChange, setLastChange] = useState(null);
  const [price, setPrice] = useState(0);
  const [priceMax, setPriceMax] = useState(1);
  const [routeEnable, setRouteEnable] = useState(true);
  const [showCart, setShowCart] = useState(false);

  const all_products = useSelector(selectProduct);
  const getUniqueValues = (data, type) => {
    const unique = data.map((item) => item[type]);
    return ["All", ...new Set(unique)];
  };
  const category = all_products
    ? getUniqueValues(all_products, "category")
    : null;

  const filterCategory = (value, item) => {
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
    <>
      <div
        className="flex flex-col mt-10 items-center justify-center hidden sm:hidden lg:block md:block md:px-16"
        style={{ position: "sticky", top: 112 }}
      >
        <div className="mb-4 items-center text-center 2xl:mt-8">
          <h1 className="font-bold text-3xl text-black ">Category</h1>
          <div className="flex flex-col my-5 justify-center items-center md:px-16">
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
            <h2 className="font-bold text-lg text-black">Price</h2>
            <div className="flex flex-col my-5 w-48">
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
      </div>
      <div>
        <div
          className="w-full bg-gray-800 items-center flex justify-center p-4 lg:hidden md:hidden "
          onClick={() => setShowCart(true)}
        >
          <FilterIcon className="h-5 text-white mr-2" />
          <button className="font-medium text-white focus:outline-none font-serif text-xl">
            Filter
          </button>
        </div>
        {showCart && (
          <div className="fixed w-full h-screen top-0 left-0 right-0 z-50 flex justify-start lg:hidden md:hidden sm:flex">
            <div className="relative z-30 w-64 bg-white h-screen flex flex-col">
              <div className="text-white bg-amazon_blue py-3 px-3 text-center flex items-center justify-center">
                <h1 className="font-bold text-3xl text-white ">Category</h1>
                <span className="font-medium ml-4"></span>
              </div>
              <div className="flex-grow bg-gray-50">
                <div className="flex flex-col my-5 justify-center items-center">
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
                <h2 className="font-bold text-lg text-black">Price</h2>
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
              <div className="p-3 border-t-2 border-gray-100">
                <button
                  className="w-full button"
                  onClick={() => router.push("/checkout")}
                ></button>
              </div>
            </div>
            <div
              onClick={() => setShowCart(false)}
              className="w-full h-screen bg-gray-900 bg-opacity-60 fixed top-0 right-0 z-10"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Filter;
