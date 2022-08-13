import { AiOutlineLoading3Quarters } from "react-icons/ai";


function OrderForm({
    flavorsSelected,
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
    isLoading
}) {
  return (
    <form
        onSubmit={async (e) => {
          await processOrder(e);
        }}
        className="order-details-form flex flex-col items-center"
      >
        <div className="cart flex flex-col sm:items-center bg-stone-900 md:w-5/12">
          {flavorsSelected && (
            <div className="p-2">
              <div className="mb-5 ">
                <h1 className="heading">Your order</h1>
                <p className="text">
                  You have selected{" "}
                  <span className="text text-white">
                    {flavorsSelected.flavourName}
                  </span>
                </p>
              </div>
              <label className="text">Select Cake Size</label>
              <div className="flex justify-between flex-wrap">
                <div className="flex items-center mr-2">
                  <label className="mr-1">0.5kg</label>
                  <input
                    className="w-4"
                    name="size"
                    type="radio"
                    value={0.5}
                    onClick={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="flex items-center mr-2">
                  <label className="mr-1">1kg</label>
                  <input
                    className="w-4"
                    name="size"
                    type="radio"
                    value={1}
                    onClick={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="flex items-center mr-2">
                  <label className="mr-1">1.5kg</label>
                  <input
                    className="w-4"
                    name="size"
                    type="radio"
                    value={1.5}
                    onClick={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="flex items-center mr-2">
                  <label className="mr-1">2kg</label>
                  <input
                    className="w-4"
                    name="size"
                    type="radio"
                    value={2}
                    onClick={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="flex items-center mr-2">
                  <label className="mr-1">2.5kg</label>
                  <input
                    className="w-4"
                    name="size"
                    type="radio"
                    value={2.5}
                    onClick={(e) => setSize(e.target.value)}
                  />
                </div>
                <div className="flex items-center mr-2">
                  <label className="mr-1">3kg</label>
                  <input
                    className="w-4"
                    name="size"
                    type="radio"
                    value={3}
                    onClick={(e) => setSize(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {size && (
          <div className="order-details flex flex-col bg-stone-900 p-3">
            <p className="text-2xl text-white">
              Please fill in the form below to process your order
            </p>
            <div className="flex flex-col items-start  my-4">
              <label className="mr-2">Name</label>
              <input
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
                name="phone"
                type="text"
                placeholder="254700000000"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start my-4">
              <label className="mr-2">
                Would you like your cake delivered?
              </label>
              <div className="flex">
                <div className="mx-4 flex items-center">
                  <label className="mr-2">Yes</label>
                  <input
                    className="w-4"
                    name="delivery"
                    type="radio"
                    value={true}
                    onClick={(e) => setDelivery(e.target.value)}
                  />
                </div>
                <div className="mx-4 flex items-center">
                  <label className="mr-2">I'll pick it up myself</label>
                  <input
                    className="w-4"
                    name="delivery"
                    type="radio"
                    value={false}
                    onClick={(e) => setDelivery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start my-4">
              <label className="mr-2">Pickup or delivery date</label>
              <input
                name="date"
                type="date"
                required
                onChange={(e) => setCollectionDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start my-4">
              <label className="mr-2">Time of delivery or collection</label>
              <input
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
                className=""
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
                  onClick={(e) =>{
                    setEdibleImageFormDisplay(!edibleImageFormDisplay)
                    handleAddOnsChange(e)
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
           {edibleImageFormDisplay && <div className="flex flex-col items-start my-4">
              <label className="mb-2">Upload edible image</label>
              <input type='file' name="edible-image" onChange={(e) => setEdibleImage(e.target.files[0])}/>
            </div>}
            <div>
              <button type="submit" className="rounded-md p-3 bg-orange-900 flex justify-evenly items-center w-44">
                <p>Process order </p>
                <AiOutlineLoading3Quarters
                className={isLoading ? "visible animate-spin" : "invisible"}
              />
              </button>
            </div>
          </div>
        )}
          
      </form>
  )
}

export default OrderForm