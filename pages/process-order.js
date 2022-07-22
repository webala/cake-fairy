import { useSelector } from "react-redux";
import { useState } from "react";
import OrderItem from "../components/OrderItem";
import prisma from "../lib/prisma";
import inititateStkPush from "../daraja";

export async function getServerSideProps() {
  const flavours = await prisma.flavour.findMany();
  return {
    props: {
      flavours,
    },
  };
}

function ProcessOrder(props) {
  const order = useSelector((state) => state.order);
  const order_item = order.order_item;
//   const collection_date = order.collection_date.toString().slice(4, 16);
  console.log(order)
  const deposit = order.order_total / 2;
  console.log("order: ", order);
  const [flavours, setFlavours] = useState(props.flavours);
  const [clientPhone, setClientPhone] = useState(order.client_phone)
  const flavourId = order.order_item.flavour_id;
  const flavour = flavours.find((flavour) => flavour.id == flavourId);

  const handleDarajaPush = (e) => {
    e.preventDefault();
    inititateStkPush()
  };

  console.log("flavour: ", flavour);
  return (
    <div className="process-order p-4">
      <div className="order-summary">
        <h1 className="heading">Order Summary</h1>
        <div className="order-item">
          <h2 className="heading-secondary text-white">Cake Details</h2>
          <div>
            <p>Flavour: {flavour.name}</p>
            <p>Cake Size: {order_item.size} kg</p>
            {order_item.wording && <p>Cake Wording: {order_item.wording}</p>}
            {order_item.preferences && (
              <p>Other Preferences: {order_item.preferences}</p>
            )}
          </div>
        </div>
        <div className="order-details">
          <h2 className="heading-secondary text-white">Order Details</h2>
          <div>
            {/* <p>Collection Date: {collection_date}</p> */}
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

        <div className="client-details">
          <h2 className="heading-secondary text-white">Client Details</h2>
          <div>
            <p>Client Name: {order.client_name}</p>
            <p>Client Phone: {order.client_phone}</p>
          </div>
        </div>
      </div>
      <div className="process-form">
        <p>
          A deposit of ksh {deposit} is required before your order can be
          picked. Please confirm your M-Pesa number below.
        </p>
        <p>
          A push notification will be sent to your phone. Enter your password to
          complete payment.
        </p>
        <form onClick={handleDarajaPush} className='my-10'>
          <div>
            <label>M-Pesa number</label>
            <input
              type="text"
              value={clientPhone}
              placeholder="M-Pesa number"
              onChange={(e) => setClientPhone(e.target.value)}
            />
          </div>
          <button type="submit" className="rounded-md p-2 bg-orange-900 my-5">
            Complete Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProcessOrder;
