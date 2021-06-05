import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../slices/basketSlice";
import Product from "./Products";
import Image from "next/image";

function FilteredProducts() {
  const products = useSelector(selectFilteredProducts);
  return (
    <>
      {products?.length > 0 ? (
        <p className="mb-4 font-bold text-xl text-gray-500 justify-center flex">
          {products.length} Products Found..!
        </p>
      ) : (
        <p className="mb-4 font-bold text-xl text-gray-500 justify-center flex">
          Products Not Found..!
        </p>
      )}

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
      {!products?.length && (
        <div className="justify-center items-center flex mt-6">
          <Image src="/notFound2.png" width={400} height={500} />
        </div>
      )}
    </>
  );
}

export default FilteredProducts;
