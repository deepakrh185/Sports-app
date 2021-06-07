import { useSelector, useDispatch } from "react-redux";
import { selectFilteredProducts } from "../../slices/basketSlice";
import Image from "next/image";
import Tilt from "react-tilt";
import { StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { selectProduct, updateFilter } from "../../slices/basketSlice";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

function Value() {
  const [price, setPrice] = useState(0);
  const [priceMax, setPriceMax] = useState(1);
  const all_products = useSelector(selectProduct);
  const products = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    const max = products
      ?.map((product) => product?.price)
      .reduce((a, b) => Math.max(a, b));
    setPriceMax(max);
    setPrice(max);
  }, [products]);

  const priceFilter = (value) => {
    setPrice(value);
    const filtered = products?.filter((product) => product.price <= value);
    dispatch(updateFilter(filtered));
  };
  console.log(products);
  const router = useRouter();

  return (
    <>
      <Header />
      {products?.length > 0 ? (
        <p className="mb-4 mt-2 font-bold text-xl text-gray-500 justify-center flex">
          {products.length} Products Found..!
        </p>
      ) : (
        <p className="mb-4 font-bold text-xl text-gray-500 justify-center flex">
          Products Not Found..!
        </p>
      )}

      <div className="grid grid-flow-row-dense md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {products &&
          products.map((product) => (
            <main className="bg-green-200 p-4 m-5 rounded-md">
              <Tilt className="flex flex-col m-2 p-6 z-30  bg-white rounded-2xl  Tilt object-contain">
                <Carousel
                  infiniteLoop
                  showStatus={false}
                  showIndicators={false}
                  showThumbs={false}
                  stopOnHover={false}
                  showArrows={true}
                >
                  {product.images &&
                    product.images.map((image) => (
                      <Image
                        src={image.img}
                        width="200"
                        height="200"
                        objectFit="contain"
                      />
                    ))}
                </Carousel>
                <p
                  className="hover:underline cursor-pointer mt-2 "
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  {product.title}
                </p>
                <div className="my-1 flex items-center font-medium bg-green-400 text-white px-1 rounded-md flex-shrink w-12 ">
                  {product.rating}
                  <StarIcon className="h-5" />
                </div>
                <p className="text-xs my-2 line-clamp-1">
                  {product.description}
                </p>
                <div className="flex">
                  <h1 className="font-bold">₹{product.price}&nbsp;</h1>
                </div>
              </Tilt>
            </main>
          ))}
      </div>
      {!products?.length && (
        <div className="justify-center items-center flex mt-6">
          <Image src="/notFound2.png" width={400} height={500} />
        </div>
      )}
    </>
  );
}

export default Value;
