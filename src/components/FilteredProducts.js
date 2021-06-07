import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../slices/basketSlice";
import Product from "./Products";
import Image from "next/image";

function FilteredProducts() {
  const products = useSelector(selectFilteredProducts);
  return (
    <div className="items-center flex flex-col ">
      {products?.length > 0 ? (
        <div className="items-center flex flex-col">
          <p className="mb-4 font-bold text-xl text-gray-500 ">
            {products.length} Products Found..!
          </p>
          <div className="grid grid-flow-row-dense md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {!!products?.length &&
              products.map((product) => (
                <Product
                  setShowCart={() => {}}
                  key={product.id}
                  title={product.title}
                  {...product}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col ml-52">
          <p className="font-bold text-xl text-gray-500 grid place-content-center">
            Products Not Found..!
          </p>
          <div className="flex justify-center flex-wrap mt-12">
            <Image
              src="/notFound2.png"
              width={500}
              height={500}
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FilteredProducts;
