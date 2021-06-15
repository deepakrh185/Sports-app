import { useSelector } from "react-redux";
import { useEffect } from "react";
import CheckoutProducts from "../components/CheckoutProducts";
import { selectItems, selectTotalItem } from "../slices/basketSlice";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/client";
import { useUser } from "../../firebase/useUser";
import { useRouter } from "next/router";

function Cart() {
  const items = useSelector(selectItems);
  const { user } = useUser();

  const total = useSelector(selectTotalItem);
  console.log("total", total);
  const router = useRouter();
  return (
    <div>
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto ">
        <div className=" m-5  shadow-sm">
          <div className="flex flex-col p-4 ">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your cart is Empty" : "Shopping Cart"}
            </h1>

            {!!items.length &&
              items.map((item) => <CheckoutProducts key={item.id} {...item} />)}
          </div>
        </div>

        {/* Right*/}
        {items.length > 0 && (
          <div className="flex flex-col p-7 shadow-xl border-2 lg:mt-28 md:mt-28  lg:mr-6  rounded-2xl">
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items) :
                <span className="font-bold"> ₹ {total}.00</span>
              </h2>

              <button
                role="link"
                className="button font-bold focus:outline-none mt-4"
              >
                {!user ? (
                  <p onClick={() => router.push("/auth")}>
                    Sign in to checkout{" "}
                  </p>
                ) : (
                  "Proceed to checkout"
                )}
              </button>
            </>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
