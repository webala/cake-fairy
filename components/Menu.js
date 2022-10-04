import Link from "next/link";
import MenuItem from "./MenuItem";
import { AiOutlineArrowRight, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

function Menu({ categories, pathname, setFlavoursSelected, flavorsSelected }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="menu px-4 md:px-20 xl:px-64 pb-32 border-b border-backgroundSecondary" id="menu">
      <h1 className="text-2xl font-bold underline heading">Menu</h1>
      <div className="">
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

      <div>
        <Link href="/order">
          <button
            onClick={() => setIsLoading(true)}
            className="order-btn group rounded bg-backgroundSecondary p-2 hover:scale-110 transition duration-300 text-xl m-10 flex justify-evenly items-center"
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
    </div>
  );
}

export default Menu;
