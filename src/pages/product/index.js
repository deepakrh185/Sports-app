import Header from "../../components/Header";
import fs from "fs/promises";
import path from "path";

function Product({product}) {
    console.log("product=>>>>>>>>",product)
  return (
    <div>
      <Header />
    </div>
  );
}

export default Product;

export async function getStaticProps() {
  const data = path.join(process.cwd(), "products.json");
  const fileData = await fs.readFile(data);
  const productData = JSON.parse(fileData);
  return {
    props: {
      product: productData,
    },
  };
}
