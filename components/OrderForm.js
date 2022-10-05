import { AiOutlineLoading3Quarters } from "react-icons/ai";

function OrderForm({
  flavourId,
  setFlavourId,
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
      className="bg-backgroundSecondary   w-full flex flex-col md:flex-row md:justify-center rounded-lg p-3"
    >
      <div className="px-5">
        <div className="flex flex-col items-start mb-4">
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

        <div className="flex flex-col items-start mb-4">
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

        <div className="flex flex-col items-start mb-4">
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

        <div className="mb-4">
          <label>Select Flavor</label>
          <div>
            {flavours.map((flavour) => {
              return (
                <div key={flavour.id}>
                  <input
                    type="radio"
                    name="flavour"
                    value={flavour}
                    onClick={(e) => {
                      setFlavourId(flavour.id);
                    }}
                  />
                  <label>{flavour.name}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-start mb-4">
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
        <div className="flex flex-col items-start mb-4">
          <label className="mr-2">Pickup or delivery date</label>
          <input
            className="w-full border border-backgroundPrimary rounded h-8"
            name="date"
            type="date"
            required
            onChange={(e) => setCollectionDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-4">
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
        <div className="flex flex-col items-start mb-4">
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
        <div className="flex flex-col items-start mb-4">
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
        <div className="flex flex-col items-start mb-4">
          <label>Would you like some add-ons?</label>
          <div className="flex items-center">
            <input
              className="w-4"
              name="add-ons"
              type="checkbox"
              value={1}
              onClick={(e) => handleAddOnsChange(e)}
            />
            <label className="">Cake toppers @300</label>
          </div>
          <div className="flex items-center">
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
            <label className="">Edible image @600</label>
          </div>
          <div className="flex items-center">
            <input
              className="w-4"
              name="add-ons"
              type="checkbox"
              value={3}
              onClick={(e) => handleAddOnsChange(e)}
            />
            <label className="">Sparkling candles @50</label>
          </div>
        </div>

        <div className="flex flex-col items-start mb-4">
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
            className="rounded-md py-1 px-2 hover:scale-110 transition duration-300 ease-in-out bg-textSecondary text-backgroundPrimary flex justify-center items-center"
          >
            <p>Place order </p>
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
