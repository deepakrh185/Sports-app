import { useState } from "react";
import Image from "next/image";
import Tilt from "react-tilt";
import { StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

function Products({ id, title, description, image, price }) {
  const router = useRouter();
  const MAX_RATING = 4;
  const MIN_RATING = 1;
  const rating = useState(
    (Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING).toFixed(1)
  );
  const MAX__RATING = 2000;
  const MIN__RATING = 850;
  const strikePrice = useState(
    Math.floor(Math.random() * (MAX__RATING - MIN__RATING + 1) + MIN__RATING)
  );

  return (
    <main className="bg-green-200 p-4 m-5 rounded-md">
      <Tilt className="flex flex-col m-2 p-6 z-30  bg-white rounded-2xl  Tilt object-contain">
        <Image src={image} width="200" height="200" objectFit="contain" />
        <p
          className="hover:underline cursor-pointer mt-2"
          onClick={() => router.push(`/product/${id}`)}
        >
          {title}
        </p>
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
    </main>
  );
}

export default Products;
