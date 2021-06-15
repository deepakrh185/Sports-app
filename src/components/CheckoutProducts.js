import QuantityCount from "./QuantityCount";
import { useState } from "react";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { selectItems } from "../slices/basketSlice";
import { getSession, useSession } from "next-auth/client";
import {
  StarIcon,
  CheckCircleIcon,
  FilterIcon,
} from "@heroicons/react/outline";

function CheckoutProducts({
  id,
  title,
  price,
  image,
  rating,
  strikePrice,
  quantity,
}) {
  const dispatch = useDispatch();
  const [quantityUp, setQuantityUp] = useState(quantity);

  const removeBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div
      className={`grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 grid-cols-1
       mb-12  border-2 shadow-xl p-6 rounded-2xl mt-6`}
    >
      <Image src={image} width={400} height={300} objectFit="contain" />
      <div className="flex flex-col col-span-3 lg:ml-12 md:ml-12 sm:ml-10">
        <h1 className=" text-green-500 text-xl font-normal sm:font-semibold mb-4 mt-4 md:font-semibold lg:font-semibold ">
          {title}
        </h1>
        <div className="flex">
          <div className="flex items-center text-center mb-4 mt-1">
            <h4 className="text-xl font-medium flex">Rating : </h4>&nbsp;
            <span className="my-1 flex items-center justify-center align-center text-xl p-1 rounded-md bg-green-400 flex-shrink w-16  text-white ring-current">
              {rating}
              <StarIcon className="ml-1 h-5 fill-current text-white" />
            </span>
          </div>
        </div>
        <div className="flex items-center  mb-6">
          <h1 className="text-2xl">₹{price * quantity}.00</h1>&nbsp;
          <strike className="text-xl">₹{strikePrice}</strike>
        </div>
        <div className="flex">
          <QuantityCount
            id={id}
            dispatch
            setQuantity={setQuantityUp}
            quantity={quantityUp}
          />
          <button
            className="border-2 sm:ml-8 ml-2 lg:ml-8 md:ml-8 p-2 rounded-lg text-black font-bold"
            onClick={removeBasket}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProducts;
