import { AiOutlineLoading3Quarters } from "react-icons/ai";

function OrderForm({
  flavorsSelected,
  setFlavoursSelected,
  setClientName,
  setCollectionDate,
  setCollectionTime,
  setDelivery,
  setPhone,
  setWording,
  setPreferences,
  setEdibleImage,
  setEdibleImageFormDisplay,
  setSize,
  processOrder,
  size,
  edibleImageFormDisplay,
  handleAddOnsChange,
  isLoading,
  flavours,
}) {
  return (
    <form
      onSubmit={async (e) => {
        await processOrder(e);
      }}
      className="bg-backgroundSecondary  my-32 w-full flex flex-col md:flex-row md:justify-center rounded-lg p-3"
    >
      <div className="px-5">
        <div className="flex flex-col items-start my-4">
          <label className="mr-2">Name</label>
          <input
            className="w-full border border-backgroundPrimary rounded h-8"
            name="name"
            type="text"
            placeholder="Jane Doe"
            required
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start my-4">
          <label className="mr-2">Phone</label>
          <input
            className="w-full border border-backgroundPrimary rounded h-8"
            name="phone"
            type="text"
            placeholder="254700000000"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start my-4">
          <label className="mr-2">Would you like your cake delivered?</label>
          <div className="flex">
            <div className="mx-4 flex items-center">
              <label className="mr-2">Yes</label>
              <input
                className=""
                name="delivery"
                type="radio"
                value={true}
                onClick={(e) => setDelivery(e.target.value)}
              />
            </div>
            <div className="mx-4 flex items-center">
              <label className="mr-2">I'll pick it up myself</label>
              <input
                className=""
                name="delivery"
                type="radio"
                value={false}
                onClick={(e) => setDelivery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <label>Select Flavor</label>

          <div>
            {flavours.map((flavour) => {
              return (
                <div>
                  <input
                    type="radio"
                    name="flavour"
                    value={flavour}
                    onClick={(e) => setFlavoursSelected(e.target.value)}
                  />
                  <label>{flavour.name}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="">Cake Size</label>
          <div className="flex flex-wrap">
            <div className="flex flex-wrap mx-1 items-center">
              <label>0.5kg</label>
              <input
                className=""
                name="cake-size"
                type="radio"
                value={0.5}
                onClick={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mx-1 items-center">
              <label>1kg</label>
              <input
                className=""
                name="cake-size"
                type="radio"
                value={1}
                onClick={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mx-1 items-center">
              <label>1.5kg</label>
              <input
                className=""
                name="cake-size"
                type="radio"
                value={1.5}
                onClick={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mx-1 items-center">
              <label>2kg</label>
              <input
                className=""
                name="cake-size"
                type="radio"
                value={2}
                onClick={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mx-1 items-center">
              <label>2.5kg</label>
              <input
                className=""
                name="cake-size"
                type="radio"
                value={2.5}
                onClick={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mx-1 items-center">
              <label>3kg</label>
              <input
                className=""
                name="cake-size"
                type="radio"
                value={3.5}
                onClick={(e) => setSize(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col px-5 ">
        <div className="flex flex-col items-start my-4">
          <label className="mr-2">Pickup or delivery date</label>
          <input
            className="w-full border border-backgroundPrimary rounded h-8"
            name="date"
            type="date"
            required
            onChange={(e) => setCollectionDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start my-4">
          <label className="mr-2">Time of delivery or collection</label>
          <input
            className="w-full border border-backgroundPrimary rounded h-8"
            name="time"
            type="text"
            placeholder="10am"
            required
            onChange={(e) => setCollectionTime(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start my-4">
          <label className="mr-2">
            Wording on Cake(Not more than 25 characters)
          </label>
          <input
            className="w-full border border-backgroundPrimary rounded h-8"
            name="wording"
            type="text"
            placeholder="Happy 16th"
            required
            onChange={(e) => setWording(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start my-4">
          <label className="mr-2">
            Do you have any other preferences? eg color, decorations
          </label>
          <textarea
            className="w-full border border-backgroundPrimary rounded h-20"
            name="preferences"
            type="text"
            placeholder="(optional)"
            onChange={(e) => setPreferences(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start my-4">
          <label className="mr-2">Would you like some add-ons?</label>
          <div className="flex items-center">
            <label className="mx-2">Cake toppers @300</label>
            <input
              className="w-4"
              name="add-ons"
              type="checkbox"
              value={1}
              onClick={(e) => handleAddOnsChange(e)}
            />
          </div>
          <div className="flex items-center">
            <label className="mx-2">Edible images @600</label>
            <input
              className="w-4"
              name="add-ons"
              type="checkbox"
              value={2}
              onClick={(e) => {
                setEdibleImageFormDisplay(!edibleImageFormDisplay);
                handleAddOnsChange(e);
              }}
            />
          </div>
          <div className="flex items-center">
            <label className="mx-2">Sparkling candles @50</label>
            <input
              className="w-4"
              name="add-ons"
              type="checkbox"
              value={3}
              onClick={(e) => handleAddOnsChange(e)}
            />
          </div>
        </div>

        <div className="flex flex-col items-start my-4">
          <label className="mb-2">Upload edible image</label>
          <input
            type="file"
            name="edible-image"
            onChange={(e) => setEdibleImage(e.target.files[0])}
          />
        </div>

        <div>
          <button
            type="submit"
            className="rounded-md p-3 bg-orange-900 flex justify-evenly items-center w-44"
          >
            <p>Process order </p>
            <AiOutlineLoading3Quarters
              className={isLoading ? "visible animate-spin" : "invisible"}
            />
          </button>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;
