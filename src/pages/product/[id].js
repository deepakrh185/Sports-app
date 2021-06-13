import fs from "fs/promises";
import path from "path";
import Header from "../../components/Header";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slices/basketSlice";
import Head from "next/head";
import {
  StarIcon,
  CheckCircleIcon,
  FilterIcon,
} from "@heroicons/react/outline";
import QuantityCount from "../../components/QuantityCount";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import styles from "../../styles/Product.module.css";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Detail({ product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const { title, price, description, image, images, imageBounce } = product;
  const [sideImage, setSideImage] = useState(images[0].img);
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

  return (
    <>
      <Head>
        <title>{title} | Amazon</title>
      </Head>
      <Header />
      <div
        className="w-full bg-gray-800 items-center rounded-bl-lg rounded-br-lg flex justify-center p-4 lg:hidden md:hidden "
        onClick={() => router.push("/product")}
      >
        <FilterIcon className="h-5 text-white mr-2" />
        <button className="font-medium text-white focus:outline-none font-serif text-xl">
          Filter
        </button>
      </div>
      <div className="bg-gray-200 lg:p-6 md:p-6 p-4">
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
      <div className="bg-green-200 block place-items-center lg:p-14 md:p-12">
        <main className="max-w-screen-xl m-auto bg-white rounded-lg ">
          <div className="flex flex-wrap ">
            <div className="px-5 mb-7 w-full md:w-7/12 ">
              <div className="w-full mb-4 mt-14 lg:p-6  md:p-6">
                {imageBounce === "bounce" && (
                  <div className="items-center flex justify-center hidden sm:hidden lg:flex md:flex">
                    <img
                      src={sideImage}
                      objectFit="contain"
                      className="w-full rounded-lg animate-bounce h-96 w-96 p-4 "
                    />
                  </div>
                )}
                {imageBounce === "nbounce" && (
                  <div className="items-center flex justify-center hidden sm:hidden lg:flex md:flex">
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
                      className={` rounded-lg lg:p-1 md:p-1 mt-2 flex w-full p-1 hover:bg-green-400 hidden sm:hidden lg:flex md:flex  ${styles.product_image_wrapper}`}
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
            <Carousel
              autoPlay
              setInterval={1000}
              infiniteLoop
              showStatus={true}
              showIndicators={true}
              showThumbs={false}
              stopOnHover={true}
              showArrows={true}
              className="lg:hidden md:hidden sm:flex flex justify-center items-center mb-6 -mt-20  p-1"
            >
              {images &&
                images.map((image) => (
                  <div onClick={() => setSideImage(image.img)} key={image.id}>
                    <Image
                      width={400}
                      height={600}
                      src={image.img}
                      objectFit="contain"
                      loading="lazy"
                    />
                  </div>
                ))}
            </Carousel>
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
