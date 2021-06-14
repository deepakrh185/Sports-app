import QuantityCount from "./QuantityCount";
import { useState } from "react";
import { addToBasket } from "../slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { selectItems } from "../slices/basketSlice";
import { getSession, useSession } from "next-auth/client";

function CheckoutProducts({ id, title, price, description, image, shipping }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [session] = useSession();

  const addItemToBasket = () => {
    const products = {
      title,
      price,
      rating,
      description,
      image,
    };
    dispatch(addToBasket(products));
  };
  return (
    <div className="grid grid-cols-5 p-4 border-2 shadow-xl">
      <Image src={image} width={400} height={500} objectFit="contain" />
      <div className="flex flex-col  p-4">
        <h1 className=" text-green-500 w-96 text-xl mb-4">{title}</h1>
        <h1 className="text-2xl">₹{price}.00</h1>&nbsp;
        <QuantityCount
          setQuantity={setQuantity}
          quantity={quantity}
          className="mt-4"
        />
      </div>
    </div>
  );
}

export default CheckoutProducts;
