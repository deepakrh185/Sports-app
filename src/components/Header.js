import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import Image from "next/image";

function Header() {
  return (
    <header>
      <div className="flex items-center bg-green-600 flex-grow ">
        <div className="md:ml-52 lg:ml-52 "></div>
        <div className="flex items-center flex-grow sm:flex-grow-0  mr-2">
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
          <div>
            <p className="link font-bold">Sign In</p>
          </div>
          <div className="link">
            <p className="font-bold md:text-sm">Your Orders</p>
          </div>
          <div className="relative flex items-center flex-shrink">
            <ShoppingCartIcon className="h-8" />
            <p className="link font-bold md:text-sm hidden sm:inline mt-2 md:mr-2 lg:mr-52 sm:mr-2 flex-shrink">
              Cart
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
