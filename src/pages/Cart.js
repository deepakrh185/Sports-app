import { useSelector } from "react-redux";
import CheckoutProducts from "../components/CheckoutProducts";
import { selectItems } from "../slices/basketSlice";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/client";

function Cart() {
  const items = useSelector(selectItems);
  const [session] = useSession();

  return (
    <div>
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto ">
        <div className="flex-grow  shadow-sm">
          <div className="flex flex-col p-5 space-y-10  ">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your cart is Empty" : "Shopping Cart"}
            </h1>

            {!!items.length &&
              items.map((item) => <CheckoutProducts key={item.id} {...item} />)}
          </div>
        </div>

        {/* Right*/}
        {items.length > 0 && (
          <div className="flex flex-col p-7 shadow-xl border-2 m-28">
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items) :{" "}
                <span className="font-bold"></span>
              </h2>

              <button
                role="link"
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
