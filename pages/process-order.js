import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import {RiAlarmWarningLine} from 'react-icons/ri'
import prisma from "../lib/prisma";
import inititateStkPush from "../daraja";
import Link from "next/link";

export async function getServerSideProps({ req, res }) {
  const flavours = await prisma.flavour.findMany();

  //get order from cookies in case browser is refreshed
  const order = getCookie("order", { req, res });

  console.log(order);
  return {
    props: {
      flavours,
      order,
    },
  };
}

function ProcessOrder(props) {
  const cookieOrder = JSON.parse(props.order);
  const [flavours, setFlavours] = useState(props.flavours);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [order, setOrder] = useState(cookieOrder);
  const [deposit, setDeposit] = useState(cookieOrder.order_total / 2);
  const [order_item, setOrder_item] = useState(
    cookieOrder.order_item.create[0]
  );
  const [clientPhone, setClientPhone] = useState(cookieOrder.client_phone);
  const [flavour, setFlavour] = useState(
    flavours.find((flavour) => {
      let flavourId = cookieOrder.order_item.create[0].flavour_id;
      if (flavour.id == flavourId) {
        return flavour;
      }
    })
  );

  // if (cookieOrder) {
  //   //Set order using cookies in case browser is refreshed and state is lost
  //   setOrder(cookieOrder);
  //   setDeposit(cookieOrder.order_total / 2);
  //   setOrder_item(cookieOrder.order_item.create[0]);
  //   setFlavour(
  //     flavours.find((flavour) => {
  //       let flavourId = cookieOrder.order_item.create[0].flavour_id;
  //       if (flavour.id == flavourId) {
  //         return flavour;
  //       }
  //     })
  //   );
  // } else {
  //   //set order form redux store
  //   setOrder(storeOrder);
  // }

  const collection_date = order.collection_date.toString().slice(0, 9);

  const handleDarajaPush = async (e) => {
    e.preventDefault();
    const response = await inititateStkPush(clientPhone, deposit);
    console.log("response:", response);
    if (response.ResponseCode == 0) {
      setPaymentInitiated(true);
    }
  };

  return (
    <div className="md:flex justify-center">

      {!order && <div>
        <p>You have no order to process. Head over to the menu and place an order</p>
        <Link href='/order'>
          <button className="rounded-md p-2 bg-orange-900 my-5">See Menu</button>
        </Link>
        </div>}
      {order && (
        <div className="process-order p-4 md:flex flex-col items-center ">
          <div className="order-summary bg-stone-900 p-2 rounded-lg my-10">
            <h1 className="heading">Order Summary</h1>
            <div className="client-details">
              <h2 className="heading-secondary text-white">Customer Details</h2>
              <div>
                <p>Customer Name: {order.client_name}</p>
                <p>Customer Phone: {clientPhone}</p>
              </div>
            </div>
            <div className="order-item">
              <h2 className="heading-secondary text-white">Cake Details</h2>
              <div>
                <p>Flavour: {flavour.name}</p>
                <p>Cake Size: {order_item.size} kg</p>
                {order_item.wording && (
                  <p>Cake Wording: {order_item.wording}</p>
                )}
                {order_item.preferences && (
                  <p>Other Preferences: {order_item.preferences}</p>
                )}
              </div>
            </div>
            <div className="order-details">
              <h2 className="heading-secondary text-white">Order Details</h2>
              <div>
                <p>Collection Date: {collection_date}</p>
                <p>Order Total: {order.order_total}</p>
                <p>{order.delivery && <p>To be delivered</p>}</p>
                <p>{!order.delivery && <p>To be picked</p>}</p>
                <p>
                  {order.deposit_paid && (
                    <p className="text-green-600">Deposit: {deposit}</p>
                  )}
                </p>
                <p>
                  {!order.deposit_paid && (
                    <p className="text-red-600">Deposit: {deposit}</p>
                  )}
                </p>
              </div>
            </div>
          </div>


          <div className="process-form">
            <p className="sm:text-xl">
              A deposit of ksh {deposit} is required before your order can be
              picked. Please confirm your M-Pesa number below.
            </p>
            <p className="sm:text-xl">
              A push notification will be sent to your phone. Enter your pin to
              complete payment.
            </p>
            <form onClick={handleDarajaPush} className="my-10">
              <div>
                <label>M-Pesa number</label>
                <input
                  className="p-2 mx-2"
                  type="text"
                  value={clientPhone}
                  placeholder="M-Pesa number"
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="rounded-md p-2 bg-orange-900 my-5"
              >
                Complete Order
              </button>
            </form>
          </div>
          {paymentInitiated && (
            <div>
              <div className="flex items-center">
                <RiAlarmWarningLine className="mr-3 animate-ping text-red-600 "/>
              <p className="text-red-600 text-xl">
                Please complete the transaction by entering your m-pesa pin
                before you proceed
              </p>
              </div>
              <Link href="/confirm-order">
                <button className="rounded-md p-2 bg-orange-900 my-5">
                  All Done
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProcessOrder;
