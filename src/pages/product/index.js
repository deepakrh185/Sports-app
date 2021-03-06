import Header from "../../components/Header";
import { useEffect } from "react";
import fs from "fs/promises";
import path from "path";
import { addProduct } from "../../slices/basketSlice";
import { useDispatch } from "react-redux";
import Filter from "../../components/Filter";
import FilteredProducts from "../../components/FilteredProducts";

function Product({ product }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addProduct(product));
  }, [product]);

  return (
    <div>
      <Header />
      <main className="max-w-screen-4xl  lg:mt-5 md:mt-5 items-center flex ">
        <div className="flex flex-col md:flex-row  md:m-4 ">
          <div className="md:w-3/12  w-full mb-5">
            <Filter />
          </div>
          <div className="md:w-9/12 w-full md:px-16">
            <FilteredProducts />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Product;

export async function getStaticProps() {
  const data = path.join(process.cwd(), "products.json");
  const fileData = await fs.readFile(data);
  const product = JSON.parse(fileData);

  return {
    props: {
      product,
    },
  };
}
