import Menu from "../components/Menu";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createOrder } from "../store/orderSlice";
import { setCookie, getCookie } from "cookies-next";
import prisma from "../lib/prisma";
import { uploadEdbleImage } from "../firebase";
import OrderForm from "../components/OrderForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

export async function getServerSideProps(req, res) {
  const categories = await prisma.category_price.findMany({
    include: {
      flavour: true,
    },
  });

  const flavours = await prisma.flavour.findMany();

  //get order from cookies in case browser is refreshed
  // const order = getCookie("order", { req, res });
  return {
    props: {
      categories,
      flavours
    },
  };
}

export default function Order(props) {
  
  const [flavourId, setFlavourId] = useState();
  const [size, setSize] = useState();
  const [clientName, setClientName] = useState();
  const [phone, setPhone] = useState();
  const [delivery, setDelivery] = useState();
  const [collectionDate, setCollectionDate] = useState();
  const [collectionTime, setCollectionTime] = useState();
  const [wording, setWording] = useState();
  const [preferences, setPreferences] = useState();
  const [addOns, setAddOns] = useState([]);
  const [edibleImage, setEdibleImage] = useState();
  const [edibleImageFormDisplay, setEdibleImageFormDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const flavours = props.flavours;
  const categories = props.categories

  const dispatch = useDispatch();
  const router = useRouter()


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

  //this function creates an order object and stores it in the browser cookies
  //the order will then be retreived and stored in the database in confirm order page
  const processOrder = async (e) => {
    e.preventDefault();
    //toggle loading animation
    setIsLoading(true);
    const flavourSelected = flavours.find((flavour) => flavour.id = flavourId)
    const categoryId = flavourSelected.category_id;
    console.log('CategoryID: ', categoryId)
    const category = categories.find((category) => category.id === categoryId);
    console.log('Category: ', category)

    let order_total;
    let add_ons = [];
    let phoneNo;
    let edibleImageLocation = null;

    //Calculate the order total using database values and depending on cake size
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

    //create add ons object and update order total depending on add ons selected
    for (let i = 0; i < addOns.length; i++) {
      let add_on_id = parseInt(addOns[i]);
      let obj = { add_on_id };
      if (add_on_id == 1) {
        order_total += 300;
      } else if (add_on_id == 2) {
        order_total += 600;
        if (edibleImage) {
          edibleImageLocation = uploadEdbleImage(edibleImage);
        }
      } else if (add_on_id == 3) {
        order_total += 50;
      }
      add_ons.push(obj);
    }

    //format the phone number to standard format (254...)
    if (phone[0] == "+") {
      phoneNo = phone.slice(1);
    } else if (phone[0] == "0") {
      phoneNo = "254" + phone.slice(1);
    } else {
      phoneNo = phone;
    }

    //create order object
    const order = {
      client_name: clientName,
      client_phone: phoneNo,
      collection_date: new Date(collectionDate),
      collection_time: collectionTime,
      order_total: order_total,
      delivery: delivery == "true" ? true : false,
      order_item: {
        create: [
          {
            flavour_id: flavourId,
            size: parseInt(size),
            wording: wording,
            preferences: preferences ? preferences : "",
            edible_image: edibleImageLocation,
          },
        ],
      },
      order_item_add_ons: {
        create: add_ons,
      },
    };

    let response = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(order),
    });

    const savedOrder = await response.json()
    console.log('Saved Order: ', savedOrder)

    //set order cookie
    setCookie("order_id", savedOrder.id, { maxAge: 60 * 60 * 48, path: "/" });

    dispatch(createOrder(order));
    router.push("/process-order");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-backgroundPrimary text-textPrimary">
      <Header />

      <div className="px-4 md:px-20 xl:px-64 my-32">
        <h1 className="heading text-2xl mb-5 underline">Place order</h1>
        <OrderForm
          flavourId={flavourId}
          setFlavourId={setFlavourId}
          setSize={setSize}
          size={size}
          setClientName={setClientName}
          setCollectionDate={setCollectionDate}
          setCollectionTime={setCollectionTime}
          setPhone={setPhone}
          setAddOns={setAddOns}
          setDelivery={setDelivery}
          edibleImageFormDisplay={edibleImageFormDisplay}
          setEdibleImage={setEdibleImage}
          setEdibleImageFormDisplay={setEdibleImageFormDisplay}
          setWording={setWording}
          setPreferences={setPreferences}
          handleAddOnsChange={handleAddOnsChange}
          processOrder={processOrder}
          isLoading={isLoading}
          flavours={flavours}
        />
      </div>
      <Footer />
    </div>
  );
}
