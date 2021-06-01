import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Product.module.css";
import Tilt from "react-tilt";
import { StarIcon } from "@heroicons/react/solid";

function Products({ id, title, description, image, price }) {
  const MAX_RATING = 4;
  const MIN_RATING = 1;
  const rating = useState(
    (Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING).toFixed(1)
  );
  const MAX__RATING = 1000;
  const MIN__RATING = 900;
  const strikePrice = useState(
    Math.floor(Math.random() * (MAX__RATING - MIN__RATING + 1) + MIN__RATING)
  );
  console.log(rating);
  return (
    // <div
    //   className={`relative flex flex-col m-5 bg-white z-30 p-10 cursor-pointer bg-clip-padding bg-opacity-60 border border-gray-200  ${styles.product_bgimage}`}
    // >
    //   <h3>{title}</h3>
    //   <h1>{price}</h1>
    // </div>
    <Tilt
      className="relative flex flex-col m-5 z-30 p-10 cursor-pointer bg-green-50 rounded-md shadow-md Tilt"
      options={{
        max: 30,
        perspective: 700,
        scale: 1,
        speed: 500,
        transition: true,
      }}
    >
      <Image src={image} width={200} height={200} objectFit="contain" />
      <p>{title}</p>
      <div className="my-1 flex items-center font-medium bg-green-400 text-white px-1 rounded-md flex-shrink w-12 ">
        {rating}
        <StarIcon className="h-5" />
      </div>
      <p className="text-xs my-2 line-clamp-1">{description}</p>
      <div className="flex">
        <h1 className="font-bold">₹{price}&nbsp;</h1>
        <strike>₹{strikePrice}</strike>
      </div>
    </Tilt>
  );
}

export default Products;
