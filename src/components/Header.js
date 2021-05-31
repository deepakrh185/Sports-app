import {
  SearchIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Image from "next/image";

function Header() {
  return (
    <header>
      <div className="flex items-center bg-green-600  ">
        <div className="md:ml-2 lg:ml-52 "></div>
        <div className="flex items-center flex-grow sm:flex-grow-0  mr-2 ">
          <Image
            src="/dew.png"
            width={100}
            height={90}
            className="cursor-pointer"
          />
        </div>
        <div className="bg-green-500 hover:bg-green-700 flex sm:flex  items-center h-10 rounded-md flex-grow cursor-pointer ml-9 hidden">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink outline-none px-4"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        <div className="text-white flex items-center text-sm space-x-6 mx-6 whitespace-nowrap cursor-pointer ">
          <div className="link flex">
            <UserIcon className="h-6" />
            <p className=" link font-bold ml-2 sm:inline mt-1">Sign In</p>
          </div>
          <div className="link flex">
            <BriefcaseIcon className="h-6" />
            <p className="link font-bold ml-2 sm:inline mt-1 ">Your Orders</p>
          </div>
          <div className="relative flex items-center flex-shrink">
            <span className="absolute top-0 right-0 left-4 md:right-10 sm:right-10 h-4 w-4 bg-green-300 text-center rounded-full text-black font-bold  text-xs">
              0
            </span>
            <ShoppingBagIcon className="h-6" />
            <p className="link font-extrabold  ml-2  mt-1 md:mr-2 lg:mr-52 sm:mr-2 ">
              Cart
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
