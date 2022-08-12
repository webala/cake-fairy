import Link from "next/link";
import MenuItem from "./MenuItem";
import { AiOutlineArrowRight, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
function Menu({ categories, pathname, setFlavoursSelected, flavorsSelected }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="menu px-4 md:px-20 xl:px-44">
      {pathname !== "/order" && (
        <h1 className="text-2xl py-10 heading">Menu</h1>
      )}
      {pathname === "/order" && (
        <div>
          <h1 className="text-2xl py-10 heading">Place Order</h1>
          <p className="text-2xl text-white">
            Click on the flavour of you choice.
          </p>
        </div>
      )}
      <div className="border-yellow-300">
        {categories.map((item, index) => {
          return (
            <MenuItem
              category={item}
              key={index}
              pathname={pathname}
              setFlavoursSelected={setFlavoursSelected}
              flavorsSelected={flavorsSelected}
            />
          );
        })}
      </div>
      {pathname !== "/order" && (
        <div>
          <Link href="/order">
            <button
              onClick={() => setIsLoading(true)}
              className="order-btn group rounded bg-orange-900 sm:w-1/2 p-2 hover:scale-110 transition duration-300 text-xl m-10 flex justify-evenly items-center"
            >
              <p>Place Order</p>
              <AiOutlineArrowRight
                className={
                  isLoading
                    ? "invisible"
                    : "order-btn-icon invisible group-hover:visible duration-500"
                }
              />
              <AiOutlineLoading3Quarters
                className={isLoading ? "visible animate-spin" : "invisible"}
              />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Menu;
