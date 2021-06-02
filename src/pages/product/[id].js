import fs from "fs/promises";
import path from "path";
import Header from "../../components/Header";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/basketSlice";

function Detail({ products }) {
  const items = useSelector(selectItems);
  console.log(items[0]);
  const [sideImage, setSideImage] = useState(products.images[0].img);
  console.log(items.rating);
  console.log(products);

  return (
    <>
      <Header />
      <div className="bg-gray-200 p-4 mb-10">
        <div className="max-w-screen-xl mx-auto">
          <span className="font-medium">
            <Link href="/">Home</Link>
          </span>{" "}
          /{" "}
          <span className="font-medium">
            <Link href="/product">Product</Link>
          </span>{" "}
          / <span className="text-yellow-500">{products.title}</span>
        </div>
      </div>
      <main className="max-w-screen-xl mx-auto mt-5 ">
        <div className="flex flex-wrap ">
          <div className="px-5 mb-7 w-full md:w-7/12">
            <div className="w-full mb-4 mt-14   ">
              {products.imageBounce === "bounce" && (
                <div className="items-center flex justify-center ">
                  <img
                    src={sideImage}
                    objectFit="contain"
                    className="w-full rounded-lg animate-bounce h-96 w-96 p-4 "
                  />
                </div>
              )}
              {products.imageBounce === "nbounce" && (
                <div className="items-center flex justify-center ">
                  <Image
                    src={sideImage}
                    height={400}
                    width={700}
                    objectFit="contain"
                    className="w-full rounded-lg h-96 w-80 "
                  />
                </div>
              )}
            </div>

            <div className="flex items-center mt-8">
              {products.images &&
                products.images.map((image) => (
                  <div
                    className="mr-3 mb-3 cursor-pointer"
                    onClick={() => setSideImage(image.img)}
                    key={image.id}
                  >
                    <Image
                      src={image.img}
                      width={100}
                      height={100}
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="px-5 mb-10 w-full md:w-5/12">
            <h1 className="my-2 lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-green-300 mb-7">
              {products.title}
            </h1>
            <p className="text-gray-600 text-base mb-5">
              {products.description}
            </p>
            <h1 className="text-4xl mb-7 ">₹{products.price}.00</h1>
          </div>
        </div>
      </main>
    </>
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
        images: products.images,
        imageBounce: products.imageBounce,
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
