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

  //get order from cookies in case browser is refreshed
  // const order = getCookie("order", { req, res });
  return {
    props: {
      categories,
      // order
    },
  };
}

export default function Order(props) {
  // let cookieOrder
  // if (props.order) {
  //     cookieOrder = JSON.parse(props.order)
  // }
  // console.log('cookie order: ', cookieOrder)
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
  const [edibleImage, setEdibleImage] = useState()
  const [edibleImageFormDisplay, setEdibleImageFormDisplay] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  //Create cookies to store order

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


  //this function creates an order object and stores it in the browser cookies
  //the order will then be retreived and stored in the database in confirm order page
  const processOrder = async (e) => {
    e.preventDefault();
    
    //toggle loading animation
    setIsLoading(true)
    const categoryId = flavorsSelected.categoryId;
    const category = categories.find((category) => category.id === categoryId);

    let order_total;
    let add_ons = [];
    let phoneNo

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
      } else if (add_on_id == 3) {
        order_total += 50;
      }
      add_ons.push(obj);
    }

    //format the phone number to standard format (254...)
    if (phone[0] == '+') {
      phoneNo = phone.slice(1)
    } else if(phone[0] == '0'){
      phoneNo = '254' + phone.slice(1)
    } else {
      phoneNo = phone
    }

    if (edibleImage) {
      uploadEdbleImage(edibleImage)
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

    //set order cookie
    setCookie("order", order, { maxAge: 60 * 60 * 48, path: "/" });

    dispatch(createOrder(order));
    router.push("/process-order");

    // return await response.json();
  };

  return (
    <div >
      <Header />
      <div className="order z-10">
      <Menu
        categories={categories}
        flavorsSelected={flavorsSelected}
        className=""
        pathname={pathname}
        setFlavoursSelected={setFlavoursSelected}
      />

      <OrderForm 
        flavorsSelected={flavorsSelected}
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
      />
      </div>
      <Footer />
    </div>
  );
}
