import Image from "next/image";
import Products from "./Products";

function ProductFeed({ product }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto ">
      {product.map((pro) => (
        <Products
          title={pro.title}
          image={pro.image}
          description={pro.description}
          price={pro.price}
          key={pro.key}
          id={pro.id}
        />
      ))}
    </div>
  );
}

export default ProductFeed;
