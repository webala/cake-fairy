import Menu from "../components/Menu";
import { useState } from "react";
import { useRouter } from "next/router";
import {  useDispatch } from "react-redux";
import { createOrder } from "../store/orderSlice";

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

import prisma from "../lib/prisma";

export async function getServerSideProps() {
  const categories = await prisma.category_price.findMany({
    include: {
      flavour: true,
    },
  });

  return {
    props: {
      categories: categories,
    },
  };
}

export default function Order(props) {
  const [categories, setCategories] = useState(props.categories);
  const [flavorsSelected, setFlavoursSelected] = useState();
  const [size, setSize] = useState();
  const [clientName, setClientName] = useState();
  const [phone, setPhone] = useState();
  const [delivery, setDelivery] = useState();
  const [collectionDate, setCollectionDate] = useState();
  const [collectionTime, setCollectionTime] = useState();
  const [wording, setWording] = useState();
  const [preferences, setPreferences] = useState();
  const [addOns, setAddOns] = useState([]);

  const router = useRouter();
  const pathname = router.pathname;
  // console.log("flaovursSelected:", flavorsSelected)

  const dispatch = useDispatch();

  const handleAddOnsChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      let newAddOns = [...addOns, value];
      setAddOns(newAddOns);
    } else {
      let newAddOns = addOns.filter((item) => item !== value);
      setAddOns(newAddOns);
    }
  };

  const processOrder = async (e) => {
    e.preventDefault();
    const categoryId = flavorsSelected.categoryId;
    const category = categories.find((category) => category.id === categoryId);
    
    let order_total;
    let add_ons = [];

    for (let i = 0; i < addOns.length; i++) {
      let obj = { add_on_id: parseInt(addOns[i]) };
      add_ons.push(obj);
    }

    

    if (size == 0.5) {
      order_total = category.pfive;
    } else if (size == 1) {
      order_total = category.one;
    } else if (size == 1.5) {
      order_total = category.onepfive;
    } else if (size == 2) {
      order_total = category.two;
    } else if (size == 2.5) {
      order_total = category.twopfive;
    } else if (size == 3) {
      order_total = category.three;
    }

  

    const order = {
      client_name: clientName,
      client_phone: phone,
      collection_date: new Date(collectionDate),
      collection_time: collectionTime,
      order_total: order_total,
      delivery: delivery == "true" ? true : false,
      order_item: {
        create: [
          {
            flavour_id: flavorsSelected.flavourId,
            size: parseInt(size),
            wording: wording,
            preferences: preferences ? preferences : "",
          },
        ],
      },
      order_item_add_ons: {
        create: add_ons,
      },
    };

    // const response = await fetch("/api/order", {
    //   method: "POST",
    //   body: JSON.stringify(order),
    // });

    // if (!response.ok) {
    //   console.log(response.statusText);
    //   throw new Error(response.statusText);
    // }

    dispatch(createOrder(order));
    router.push('/process-order')

    // return await response.json();
  };

  return (
    <div className="order p-4">
      <Menu
        categories={categories}
        flavorsSelected={flavorsSelected}
        className=""
        pathname={pathname}
        setFlavoursSelected={setFlavoursSelected}
      />

      <form
        onSubmit={async (e) => {
          await processOrder(e);
        }}
        className="order-details-form"
      >
        <div className="cart flex flex-col sm:items-center bg-stone-900">
          {flavorsSelected && (
            <div className="my-4 p-2">
              <div className="mb-5 ">
                <h1 className="heading">Cart</h1>
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
          <div className="order-details flex flex-col sm:items-center bg-stone-900 p-3">
            <p className="text-2xl text-white">
              Please fill in the form below to process your order
            </p>
            <div className="flex flex-col items-start md:items-center my-4">
              <label className="mr-2">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Jane Doe"
                required
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start md:items-center my-4">
              <label className="mr-2">Phone</label>
              <input
                name="phone"
                type="text"
                placeholder="0700000000"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start md:items-center my-4">
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
            <div className="flex flex-col items-start md:items-center my-4">
              <label className="mr-2">Pickup or delivery date</label>
              <input
                name="date"
                type="date"
                required
                onChange={(e) => setCollectionDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start md:items-center my-4">
              <label className="mr-2">Time of delivery or collection</label>
              <input
                name="time"
                type="text"
                placeholder="10am"
                required
                onChange={(e) => setCollectionTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start md:items-center my-4">
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
            <div className="flex flex-col items-start md:items-center my-4">
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
            <div className="flex flex-col items-start sm:items-center my-4">
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
                  onClick={(e) => handleAddOnsChange(e)}
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
            <div>
              <button type="submit" className="rounded-md p-3 bg-orange-900">
               Process order
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
