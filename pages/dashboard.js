import prisma from "../lib/prisma";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
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

  const { data: session } = useSession();

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

  if (!session) {
    return (
      <div className="absolute inset-1/4 w-96">
        <p>You have to sign in to access this page</p>
        <button className="rounded-md p-3 bg-orange-900" onClick={() => signIn()}>Sign In</button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <h1 className="heading">Chefs Panel</h1>
          <div>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        </div>
       


        <div className="dashboard p-2 flex flex-col sm:flex-row justify-evenly">
          <div>
            <h1 className="heading">New Orders</h1>
            <div className="new-orders md:grid grid-cols-2 gap-3">
              {newOrders.map((order, index) => {
                return (
                  <div key={index}>
                    {!order.complete && (
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
}
