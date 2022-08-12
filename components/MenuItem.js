import { useState } from "react";
function MenuItem({
  category,
  pathname,
  setFlavoursSelected,
  flavorsSelected,
}) {
  const [flavours, setFlavours] = useState(category.flavour);

  if (pathname === "/order") {
    return (
      <div className="flex flex-col pt-7">
        <h1 className="my-6 heading flex flex-wrap">
          <span>
            0.5kg-
            <span className="text-stone-50 mr-2">ksh{category.pfive}</span>
          </span>
          <span>
            1kg-<span className="text-stone-50 mr-2">ksh{category.one}</span>
          </span>
          <span>
            1.5kg-
            <span className="text-stone-50 mr-2">ksh{category.onepfive}</span>
          </span>
          <span>
            2kg-<span className="text-stone-50 mr-2">ksh{category.two}</span>
          </span>
          <span>
            2.5kg-
            <span className="text-stone-50 mr-2">ksh{category.twopfive}</span>
          </span>
          <span>
            3kg-<span className="text-stone-50 mr-2">ksh{category.three}</span>
          </span>
        </h1>{" "}
        {flavours.map((flavour, index) => {
          let isSelected;
          flavorsSelected?.flavourName == flavour.name
            ? (isSelected = true)
            : (isSelected = false);
          let className;
          isSelected
            ? (className = "text mx-10 text-white")
            : (className = "text mx-10");
          return (
            <div key={index} className="flex flex-row my-2 cursor-pointer">
              <p
                className={className}
                onClick={() =>
                  setFlavoursSelected({
                    flavourName: flavour.name,
                    categoryId: flavour.category_id,
                    flavourId: flavour.id,
                  })
                }
              >
                {flavour.name}
              </p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col pt-7">
        <h1 className="my-6 heading flex flex-wrap">
          <span>
            0.5kg-
            <span className="text-stone-50 mr-2">ksh{category.pfive}</span>
          </span>
          <span>
            1kg-<span className="text-stone-50 mr-2">ksh{category.one}</span>
          </span>
          <span>
            1.5kg-
            <span className="text-stone-50 mr-2">ksh{category.onepfive}</span>
          </span>
          <span>
            2kg-<span className="text-stone-50 mr-2">ksh{category.two}</span>
          </span>
          <span>
            2.5kg-
            <span className="text-stone-50 mr-2">ksh{category.twopfive}</span>
          </span>
          <span>
            3kg-<span className="text-stone-50 mr-2">ksh{category.three}</span>
          </span>
        </h1>
        {flavours.map((flavour, index) => {
          return (
            <div key={index} className="flavours">
              <p className="sm:text-xl">{flavour.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MenuItem;
