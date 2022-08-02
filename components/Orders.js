import React from "react";
import OrderItem from "./OrderItem";

function Orders({ newOrders, completeOrders, flavours, updateOrder }) {
  return (
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
  );
}

export default Orders;
