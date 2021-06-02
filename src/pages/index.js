import Head from "next/head";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import fs from "fs/promises";
import path from "path";

export default function Home({ product }) {
  console.log(product);
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Sports</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto  ">
        <ProductFeed product={product} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const fileData = path.join(process.cwd(), "products.json");
  const jsonFile = await fs.readFile(fileData);
  const product = JSON.parse(jsonFile);

  return {
    props: {
      product: product,
    },
  };
}
