import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import prisma from "../lib/prisma";
import inititateStkPush from "../daraja";
import Link from "next/link";
import { createTransaction } from "../store/transactionSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  const flavours = props.flavours;
  const flavourId = order.order_item.flavour_id;
  const flavour = flavours.find((flavour) => (flavour.id = flavourId));
  const clientPhone = order.client_phone;
  const collection_date = order.collection_date.toString().slice(0, 10);
  const order_item = order.order_item;
  const deposit = order.order_total / 2;

  const handleDarajaPush = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response = await inititateStkPush(parseInt(clientPhone), deposit);
    if (response.ResponseCode == 0) {
      const requestId = response.CheckoutRequestID;

      const data = {
        request_id: requestId,
      };

      response = await fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const savedTransaction = await response.json();

      setCookie("transactionId", savedTransaction.id);
      const payload = {
        transactionId: savedTransaction.id,
      };
      dispatch(createTransaction(payload));
      router.push("/confirm-order");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-textPrimary bg-backgroundPrimary">
      <Header />
      {!order && (
        <div>
          <p>
            You have no order to process. Head over to the menu and place an
            order
          </p>
          <Link href="/order">
            <button className="rounded-md p-2 bg-backgroundSecondary my-5">
              See Menu
            </button>
          </Link>
        </div>
      )}
      {order && (
        <div className="process-order p-4 md:flex flex-col items-center ">
          <div className="order-summary bg-backgroundSecondary p-2 rounded-lg my-10">
            <h1 className="heading">Order Summary</h1>
            <div className="client-details">
              <h2 className="heading-secondary underline">Customer Details</h2>
              <div>
                <p>Customer Name: {order.client_name}</p>
                <p>Customer Phone: {clientPhone}</p>
              </div>
            </div>
            <div className="order-item">
              <h2 className="heading-secondary underline">Cake Details</h2>
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
              <h2 className="heading-secondary underline">Order Details</h2>
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
                  className="p-2 mx-2 border-2 border-backgroundSecondary rounded-lg"
                  type="text"
                  value={clientPhone}
                  placeholder="M-Pesa number"
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="rounded-md p-2 bg-backgroundSecondary my-5 flex justify-evenly items-center w-44"
              >
                <p> Complete Order</p>
                <AiOutlineLoading3Quarters
                  className={isLoading ? "visible animate-spin" : "invisible"}
                />
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ProcessOrder;
