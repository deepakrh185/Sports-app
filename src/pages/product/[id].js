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
import { ShoppingBagIcon } from "@heroicons/react/outline";
import styles from "../../styles/Product.module.css";

function Detail({ product }) {
  const { title, price, description, image, images, imageBounce } = product;
  const [sideImage, setSideImage] = useState(images[0].img);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [lineClamp, setLineClamp] = useState(true);

  const dispatch = useDispatch();

  const MAX_RATING = 4;
  const MIN_RATING = 2.5;
  const rating = useState(
    (Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING).toFixed(1)
  );

  const MAX_REVIEWS = 50000;
  const MIN_REVIEWS = 28000;
  const reviews = useState(
    Math.round(Math.random() * (MAX_REVIEWS - MIN_REVIEWS + 1) + MIN_REVIEWS)
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
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Head>
        <title>{title} | Amazon</title>
      </Head>
      <Header />

      <div className="bg-gray-100 lg:p-6 md:p-6 p-4">
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
      <div className="bg-green-200 block place-items-center lg:p-10 md:p-10">
        <main className="max-w-screen-xl m-auto bg-white rounded-lg ">
          <div className="flex flex-wrap ">
            <div className="px-5 mb-7 w-full md:w-7/12">
              <div className="w-full mb-4 mt-14 p-8">
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
                      height={500}
                      width={400}
                      objectFit="contain"
                      className="w-full rounded-lg h-96 w-80 "
                    />
                  </div>
                )}
              </div>

              <div className={`flex`}>
                {images &&
                  images.map((image) => (
                    <div
                      className={` rounded-lg lg:p-1 md:p-1 mt-2 flex w-full p-1 hover:bg-green-400   ${styles.product_image_wrapper}`}
                      onClick={() => setSideImage(image.img)}
                      key={image.id}
                    >
                      <Image
                        width={200}
                        height={200}
                        src={image.img}
                        objectFit="cover"
                        loading="lazy"
                        className={
                          "cursor-pointer rounded-lg overflow-hidden w-full " +
                          styles.loop_product_image
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="px-6 mb-10 w-full md:w-5/12 bg-white">
              <h1 className="lg:my-6 md:my-6 lg:text-5xl md:text-4xl sm:text-3xl text-2xl text-green-500 ">
                {title}
              </h1>
              <div className="flex items-center text-center mb-4 mt-10">
                <h4 className="text-xl flex">Rating : </h4>&nbsp;
                <span className="my-1 flex items-center justify-center align-center text-xl px-1 rounded-md bg-green-400 flex-shrink w-16  text-white ring-current py-1 ">
                  {rating}
                  <StarIcon className="h-5 fill-current text-white" />
                </span>
              </div>
              <div className="flex items-center text-center mb-4">
                <h4 className="text-xl flex">Reviews : </h4>&nbsp;
                <p className="text-xl"> {reviews}</p>
              </div>

              <div className="flex items-center  mb-6">
                <h1 className="text-4xl">₹{price}.00</h1>&nbsp;
                <strike className="text-2xl">₹{strikePrice}</strike>
              </div>
              {lineClamp ? (
                <p className="text-black p-1  text-base line-clamp-3 shadow-2xl bg-white  h-18 ">
                  {description}
                </p>
              ) : (
                <p className="text-black text-base mb-5 p-1 shadow-xl bg-white rounded-lg h-18">
                  {description}
                </p>
              )}
              {lineClamp && (
                <div className="bg-white mb-2 p-1">
                  <button
                    onClick={() => setLineClamp(false)}
                    className="text-black font-extrabold focus:outline-none shadow-2xl mb-2 "
                  >
                    Read More
                  </button>
                </div>
              )}
              <QuantityCount
                setQuantity={setQuantity}
                quantity={quantity}
                className="mt-4"
              />
              <div
                className="flex items-center text-center justify-center button mt-4"
                onClick={addItemToBasket}
              >
                <button className="font-bold focus:outline-none">
                  {added ? "Added" : "Add to Cart"}
                </button>
                <ShoppingBagIcon className="h-5 ml-1" />
              </div>
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
