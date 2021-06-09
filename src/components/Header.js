import {
  SearchIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  UserIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { useRouter } from "next/router";
import { useUser } from "../../firebase/useUser";

function Header() {
  const { user, logout } = useUser();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div className="flex items-center justify-center bg-green-600 p-2 lg:p-0 md:p-0 sm:p-0">
        <div className="flex items-center flex-grow sm:flex-grow-0 md:ml-2 lg:ml-52 ml-2 mt-1">
          <Image
            src="/logo.png"
            width={100}
            height={80}
            className="cursor-pointer"
            objectFit="contain"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="bg-green-500 hover:bg-green-700 flex sm:flex  items-center h-10 rounded-md flex-grow cursor-pointer lg:ml-9 hidden">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink outline-none px-4"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        <div className="text-white flex items-center text-sm space-x-6 mx-2 whitespace-nowrap cursor-pointer ">
          <div className="link flex" onClick={() => router.push("/auth")}>
            <UserIcon className="h-6" />
            <p className=" link font-bold ml-2 sm:inline mt-1 text-xs">
              {user ? `${user.name}` : "Sign In"}
            </p>
          </div>
          <div className="link flex">
            <BriefcaseIcon className="h-6" />
            <p className="link font-bold ml-2 sm:inline  mt-1 text-xs ">
              Your Orders
            </p>
          </div>
          {user && (
            <div className="link flex" onClick={() => logout()}>
              <LogoutIcon className="h-6" />
              <p className="link font-bold ml-2 sm:inline  mt-1 text-xs ">
                Logout
              </p>
            </div>
          )}
          <div className="relative flex items-center flex-shrink">
            <span className="absolute top-0 right-0 left-4 md:right-10 sm:right-10 h-4 w-4 bg-green-300 text-center rounded-full text-black font-bold  text-xs">
              {items.length}
            </span>

            <ShoppingBagIcon className="h-6" />
            <p className="link font-bold  text-xs ml-2 mt-1 md:mr-2 lg:mr-52 sm:mr-2 hidden sm:inline">
              Cart
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
