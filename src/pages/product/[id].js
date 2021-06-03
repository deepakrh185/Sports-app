import fs from "fs/promises";
import path from "path";
import Header from "../../components/Header";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slices/basketSlice";
import Head from "next/head";
import { StarIcon, CheckCircleIcon } from "@heroicons/react/outline";
import QuantityCount from "../../components/QuantityCount";

function Detail({ product }) {
  const { title, price, description, image, images, imageBounce } = product;
  const [sideImage, setSideImage] = useState(images[0].img);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [lineClamp, setLineClamp] = useState(true);

  const dispatch = useDispatch();

  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const MAX__RATING = 2000;
  const MIN__RATING = 1000;
  const strikePrice = useState(
    Math.floor(Math.random() * (MAX__RATING - MIN__RATING + 1) + MIN__RATING)
  );
  const addItemToBasket = () => {
    const products = {
      title,
      price,
      rating,
      description,
      image,
    };
    dispatch(addToBasket(products));
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };
  return (
    <>
      <Head>
        <title>{title} | Amazon</title>
      </Head>
      <Header />

      <div className="bg-gray-100 p-4 ">
        <div className="max-w-screen-xl mx-auto">
          <span className="font-medium">
            <Link href="/">Home</Link>
          </span>{" "}
          /{" "}
          <span className="font-medium">
            <Link href="/product">Product</Link>
          </span>{" "}
          / <span className="text-green-600">{title}</span>
        </div>
      </div>
      <div
        className="relative "
        style={{ position: "sticky", top: 100, zIndex: 50 }}
      >
        <div className="absolute right-0 top-0">
          {added && (
            <div
              class=" px-4 py-3 rounded-md relative  bg-yellow-400 mr-2"
              role="alert"
            >
              <div className="flex text-white">
                <CheckCircleIcon className="h-6 mr-2 text-green-500" />
                <p class="font-medium text-black">
                  Your product is added to cart !
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-green-200 block place-items-center p-10">
        <main className="max-w-screen-xl m-auto bg-white p-8">
          <div className="flex flex-wrap ">
            <div className="px-5 mb-7 w-full md:w-7/12">
              <div className="w-full mb-4 mt-14   ">
                {imageBounce === "bounce" && (
                  <div className="items-center flex justify-center ">
                    <img
                      src={sideImage}
                      objectFit="contain"
                      className="w-full rounded-lg animate-bounce h-96 w-96 p-4 "
                    />
                  </div>
                )}
                {imageBounce === "nbounce" && (
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
                {images &&
                  images.map((image) => (
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
            <div className="px-5 mb-10 w-full md:w-5/12 bg-white">
              <h1 className="my-2 lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-green-400 mb-7">
                {title}
              </h1>
              <div className="flex items-center text-center mb-4">
                <h1 className="text-2xl">Rating : </h1>&nbsp;
                <span className="my-2 flex items-center justify-center align-center text-xl px-1 rounded-md bg-green-400 flex-shrink w-12  text-white ring-current py-1">
                  {rating}
                  <StarIcon className="h-5 fill-current text-white" />
                </span>
              </div>
              <div className="flex items-center  mb-8">
                <h1 className="text-4xl">₹{price}.00</h1>&nbsp;
                <strike className="text-2xl">₹{strikePrice}</strike>
              </div>
              {lineClamp ? (
                <p className="text-gray-600 text-base mb-1 line-clamp-3 ">
                  {description}
                </p>
              ) : (
                <p className="text-gray-600 text-base mb-5 ">{description}</p>
              )}
              {lineClamp && (
                <button
                  onClick={() => setLineClamp(false)}
                  className="text-black font-bold focus:outline-none mb-4"
                >
                  Read More
                </button>
              )}
              <QuantityCount setQuantity={setQuantity} quantity={quantity} />

              <button onClick={addItemToBasket} className="w-full button mt-4">
                {added ? "Added" : "Add to Basket"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Detail;

export async function getStaticProps(context) {
  const productId = context.params.id;
  const fileData = path.join(process.cwd(), "products.json");
  const jsonData = await fs.readFile(fileData);
  const data = JSON.parse(jsonData);

  const product = data.find((product) => product.id === productId);

  return {
    props: {
      product: {
        description: product.description,
        title: product.title,
        image: product.image,
        price: product.price,
        images: product.images,
        imageBounce: product.imageBounce,
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
