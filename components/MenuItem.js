import { useState } from "react";
function MenuItem({ category, setFlavoursSelected, flavorsSelected }) {
  const [flavours, setFlavours] = useState(category.flavour);

  return (
    <div className="flex flex-col pt-7">
      <h1 className="my-6 heading flex flex-wrap">
        <span>
          0.5kg-
          <span className="text-textSecondary mr-2">ksh{category.pfive}</span>
        </span>
        <span>
          1kg-
          <span className="text-textSecondary mr-2">ksh{category.one}</span>
        </span>
        <span>
          1.5kg-
          <span className="text-textSecondary mr-2">
            ksh{category.onepfive}
          </span>
        </span>
        <span>
          2kg-
          <span className="text-textSecondary mr-2">ksh{category.two}</span>
        </span>
        <span>
          2.5kg-
          <span className="text-textSecondary mr-2">
            ksh{category.twopfive}
          </span>
        </span>
        <span>
          3kg-
          <span className="text-textSecondary mr-2">ksh{category.three}</span>
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

export default MenuItem;
