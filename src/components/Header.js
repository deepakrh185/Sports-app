import {
  SearchIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  UserIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useRouter } from "next/router";
import { useUser } from "../../firebase/useUser";
import { useState } from "react";

function Header() {
  const { user, logout } = useUser();
  const totalItems = useSelector(selectTotal);
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const items = useSelector(selectItems);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      {showMenu && (
        <div className="fixed  h-screen top-0 left-0 right-0 z-50 flex justify-start lg:hidden md:hidden sm:flex   ">
          <div className="relative z-30 w-80 sm:w-96 bg-white h-screen flex flex-col">
            <div className="flex items-center">
              <Image
                src="/download.png"
                width={300}
                height={100}
                className="cursor-pointer "
                objectFit="contain"
                onClick={() => router.push("/")}
              />
            </div>
            <div className="text-white flex flex-col ml-6 mt-6  whitespace-nowrap cursor-pointer ">
              {!user ? (
                <div
                  className="link flex text-gray-500 items-center"
                  onClick={() => router.push("/auth")}
                >
                  <UserIcon className="h-6 text-gray-500 mr-1" />
                  <p className=" link font-bold text-base">
                    {user ? `${user.name}` : "Sign In"}
                  </p>
                </div>
              ) : (
                <div className="link flex text-gray-500 items-center">
                  <UserIcon className="h-6 text-gray-500 mr-1" />
                  <p className=" link font-bold text-base">
                    {user ? `${user.name}` : "Sign In"}
                  </p>
                </div>
              )}
              <div className="link flex  text-gray-500 mt-6 items-center">
                <BriefcaseIcon className="h-6 text-gray-500 mr-1" />
                <p className="link font-bold  text-base">Your Orders</p>
              </div>
              {user && (
                <div
                  className="link flex  text-gray-500 items-center mt-6"
                  onClick={() => logout()}
                >
                  <LogoutIcon className="h-6 text-gray-500 mr-1" />
                  <p className="link font-bold  text-base ">Logout</p>
                </div>
              )}
            </div>
          </div>
          <div
            className="w-full h-screen bg-gray-900 bg-opacity-60 fixed top-0 right-0 z-10"
            onClick={() => setShowMenu(false)}
          />
        </div>
      )}
      <div className="flex items-center justify-center bg-green-600  lg:p-0 md:p-0 sm:p-0">
        <div
          className="cursor-pointer lg:hidden md:hidden sm:hidden "
          onClick={() => setShowMenu(true)}
        >
          <MenuIcon className=" text-white ml-4 h-8 w-7" />
        </div>

        <div className="flex items-center  flex-grow sm:flex-grow-0 md:ml-2 lg:ml-12 ml-2 mt-1">
          <Image
            src="/logo.png"
            width={100}
            height={80}
            className="cursor-pointer "
            objectFit="contain"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="bg-green-500 hover:bg-green-700 flex   items-center h-10 rounded-md flex-grow cursor-pointer lg:ml-9 lg:flex hidden md:flex">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink outline-none px-4"
          />
          <SearchIcon className="h-12 p-4 " />
        </div>
        <div className="text-white flex items-center text-sm space-x-6 mx-2 whitespace-nowrap cursor-pointer ">
          {!user ? (
            <div
              className="link flex hidden  sm:flex"
              onClick={() => router.push("/auth")}
            >
              <UserIcon className="h-6" />
              <p className=" link font-bold ml-2 sm:inline mt-1 text-xs">
                {user ? `${user.name}` : "Sign In"}
              </p>
            </div>
          ) : (
            <div className="link flex hidden sm:flex">
              <UserIcon className="h-6" />
              <p className=" link font-bold ml-2 sm:inline mt-1 text-xs">
                {user ? `${user.name}` : "Sign In"}
              </p>
            </div>
          )}
          <div className="link flex hidden  sm:flex">
            <BriefcaseIcon className="h-6" />
            <p className="link font-bold ml-2 sm:inline  mt-1 text-xs ">
              Your Orders
            </p>
          </div>
          {user && (
            <div className="link flex hidden sm:flex" onClick={() => logout()}>
              <LogoutIcon className="h-6" />
              <p className="link font-bold ml-2 sm:inline  mt-1 text-xs ">
                Logout
              </p>
            </div>
          )}
          <div
            className="relative flex items-center flex-shrink"
            onClick={() => router.push("/cart")}
          >
            <span className="absolute top-0 right-0 left-4 md:right-10 sm:right-10 h-4 w-4 bg-green-300 text-center rounded-full text-black font-bold  text-xs">
              {totalItems}
            </span>

            <ShoppingBagIcon className="h-6 mr-4 lg:mr-0 sm:mr-0 md:mr-0" />
            <p className="link font-bold  text-xs ml-2 mt-1 md:mr-2  lg:mr-24 sm:mr-2 hidden sm:inline">
              Cart
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
