import prisma from "../lib/prisma";
import { useState } from "react";

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
  const [flavours, setFlavours] = useState(props.flavours);
  console.log("flavours: ", flavours);
  console.log("orders: ", orders);
  return (
    <div className="dashboard p-2">
      <div>
        <h1 className="heading">New Orders</h1>
        <div className="new-orders">
          {orders.map((order, index) => {
            const order_item = order.order_item[0]
            const flavourId = order_item.flavour_id;
            const flavour = flavours.find((flavour) => flavour.id == flavourId);
            const order_date = order.order_date.slice(4, 21)
            const collection_date = order.collection_date.slice(4, 21)
            
            console.log(flavour);
            return (
              <div key={index}>
                {!order.picked && !order.complete && (
                  <div>
                    <div className="order-item">
                        <h2>Cake Details</h2>
                        <div>
                            <p>Flavour: {flavour.name}</p>
                            <p>Cake Size: {order_item.size}</p>
                            {order_item.wording && <p>Cake Wording: {order_item.wording}</p>}
                            {order_item.preferences && <p>Other Preferences: {order_item.preferences}</p>}
                        </div>
                    </div>
                    <div className="order-details">
                        <h2>Order Details</h2>
                        <div>
                            <p>Order Date: {order_date}</p>
                            <p>Collection Date: {collection_date}</p>
                            <p>{order.delivery && <p>To be delivered</p>}</p>
                            <p>{!order.delivery && <p>To be picked</p>}</p>
                            <p>{order.deposit_paid && <p>Deposit paid</p>}</p>
                            <p>{!order.deposit_paid && <p>No deposit paid</p>}</p>
                        </div>
                    </div>
                   
                    <div className="client-details">
                        <h2>Client Details</h2>
                        <div>
                            <p>Client Name: {order.client_name}</p>
                            <p>Client Phone: {order.client_phone}</p>
                        </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="picked-orders"></div>
        <div className="complete-orders"></div>
      </div>
    </div>
  );
}
