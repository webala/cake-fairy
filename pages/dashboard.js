import prisma from "../lib/prisma";
import { useState, useEffect } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import OrderItem from "../components/OrderItem";

export async function getServerSideProps() {
  const orders = await prisma.order.findMany({
    include: {
      order_item: true,
    },
  });
  const flavours = await prisma.flavour.findMany();
  orders.map((order) => {
    let order_date = order.order_date;
    let collection_date = order.collection_date;

    order.order_date = order_date.toString();
    order.collection_date = collection_date.toString();
    return order;
  });

  return {
    props: {
      orders,
      flavours,
    },
  };
}

export default function Dashboard(props) {
  const [orders, setOrders] = useState(props.orders);
  const [completeOrders, setCompleteOrders] = useState(
    orders.filter((order) => order.complete == true)
  );
  const [newOrders, setNewOrders] = useState(
    orders.filter((order) => order.complete == false)
  );

  const [flavours, setFlavours] = useState(props.flavours);

  const updateOrder = async (orderId, orderData) => {
    const body = {
      orderId,
      orderData,
    };
    const response = await fetch("/api/orderUpdate", {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log("status text: ", response.statusText);
      throw new Error(response.statusText);
    }

    return await response.json();
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="heading">Chefs Panel</h1>

      <div className="dashboard p-2 flex flex-col sm:flex-row justify-evenly">
        <div>
          <h1 className="heading">New Orders</h1>
          <div className="new-orders md:grid grid-cols-2 gap-3">
            {newOrders.map((order, index) => {
              return (
                <div key={index}>
                  { !order.complete && (
                    <OrderItem
                      order={order}
                      flavours={flavours}
                      section="incomplete-orders"
                      updateOrder={updateOrder}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div>
            <h1 className="heading">Complete Orders</h1>
            <div className="complete-orders md:grid grid-cols-2 gap-3">
              {completeOrders.map((order, index) => {
                return (
                  <div key={index}>
                    {order.complete && (
                      <OrderItem
                        order={order}
                        flavours={flavours}
                        section="complete-orders"
                        updateOrder={updateOrder}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
