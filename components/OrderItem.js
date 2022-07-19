import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { useState } from "react";

function OrderItem({ order, flavours, section, updateOrder }) {
  const [orderPicked, setOrderpicked] = useState(order.picked);
  const [orderComplete, setOrderComplete] = useState(order.complete);
  let [className, setClassName] = useState("order mb-14 p-2");
  const order_item = order.order_item[0];
  const flavourId = order_item.flavour_id;
  const flavour = flavours.find((flavour) => flavour.id == flavourId);
  const order_date = order.order_date.slice(4, 21);
  const collection_date = order.collection_date.slice(4, 21);
  const deposit = order.order_total / 2;
  orderPicked
    ? (className = "order flex flex-col items-center mb-14 p-2 bg-amber-900")
    : (className = "order flex flex-col items-center mb-14 p-2");

  if (orderComplete) {
    className = "order flex flex-col items-center mb-14 p-2 bg-stone-900";
  }
  return (
    <div className={className}>
      <div>
        <div className="flex items-center">
          {section === "incomplete-orders" && (
            <div className="mr-2">
              <div className="pick-btn flex items-center">
                <p className="mr-2">Pick order</p>
                {orderPicked && (
                  <BsToggleOn
                    className="icon cursor-pointer"
                    onClick={async () => {
                      setOrderpicked(!orderPicked);
                      const orderData = { picked: !orderPicked };
                      const orderId = order.id;
                      await updateOrder(orderId, orderData);
                    }}
                  />
                )}
                {!orderPicked && (
                  <BsToggleOff
                    className="icon cursor-pointer"
                    onClick={async () => {
                      setOrderpicked(!orderPicked);
                      const orderData = { picked: !orderPicked };
                      const orderId = order.id;
                      await updateOrder(orderId, orderData);
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {section === "incomplete-orders" && orderPicked && (
            <div>
              <div className="complete-btn flex items-center">
                <p className="mr-2">Mark as complete</p>
                {orderComplete && (
                  <BsToggleOn
                    className="icon cursor-pointer"
                    onClick={async () => {
                      setOrderComplete(!orderComplete);
                      const orderData = { complete: !orderComplete };
                      const orderId = order.id;
                      await updateOrder(orderId, orderData);
                    }}
                  />
                )}
                {!orderComplete && (
                  <BsToggleOff
                    className="icon cursor-pointer"
                    onClick={async () => {
                      setOrderComplete(!orderComplete);
                      const orderData = { complete: !orderComplete };
                      const orderId = order.id;
                      await updateOrder(orderId, orderData);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
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
            <p>Order Date: {order_date}</p>
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

        <div className="client-details">
          <h2 className="heading-secondary text-white">Client Details</h2>
          <div>
            <p>Client Name: {order.client_name}</p>
            <p>Client Phone: {order.client_phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
