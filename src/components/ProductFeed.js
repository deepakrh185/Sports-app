import Image from "next/image";
import Products from "./Products";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto ">
      {products.map((pro) => (
        <Products
          product={products}
          title={pro.title}
          image={pro.image}
          images={pro.images}
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
