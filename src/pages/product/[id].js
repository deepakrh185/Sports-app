import fs from "fs/promises";
import path from "path";

function Detail({ products }) {
  console.log("products=>>>", products);
  return (
    <div>
      <h1>{products.description}</h1>
      <img src={products.image} objectFit="contain" width={200} height={200} />
    </div>
  );
}

export default Detail;

export async function getStaticProps(context) {
  const productId = context.params.id;
  const fileData = path.join(process.cwd(), "products.json");
  const jsonData = await fs.readFile(fileData);
  const data = JSON.parse(jsonData);

  const products = data.find((product) => product.id === productId);

  return {
    props: {
      products: {
        description: products.description,
        title: products.title,
        image: products.image,
        price: products.price,
      },
    },
  };
}
export async function getStaticPaths() {
  const fileData = path.join(process.cwd(), "products.json");
  const jsonFile = await fs.readFile(fileData);
  const product = JSON.parse(jsonFile);

  //   const paths = product.map((product) => {
  //     return {
  //       params: { id: product.id.toString() },
  //     };
  //   });
  const paths = product.map((product) => {
    return { params: { id: product.id } };
  });
  return {
    paths,
    fallback: false,
  };
}
