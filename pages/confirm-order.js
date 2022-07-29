import { useSelector } from "react-redux";
import prisma from "../lib/prisma";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
  const transactionDetails = await prisma.transaction_details.findMany();

  transactionDetails.map((transaction) => {
    let transactionDate = transaction.transaction_date;
    transaction.transaction_date = transactionDate.toString();
    return transaction;
  });

  return {
    props: {
      transactionDetails,
    },
  };
}

function ConfirmOrder({ transactionDetails }) {
  console.log(transactionDetails);
  const order = useSelector((state) => state.order);
  console.log("order: ", order);
  const phone = order.client_phone;
  console.log("phone: ", phone);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

   // const response = await fetch("/api/order", {
    //   method: "POST",
    //   body: JSON.stringify(order),
    // });

    // if (!response.ok) {
    //   console.log(response.statusText);
    //   throw new Error(response.statusText);
    // }

  const confirmTransaction = () => {
    const transaction = transactionDetails.find(
      (transaction) => transaction.phone_number == phone
    );
    if (transaction) {
      setOrderConfirmed(true);
    }
  };

  useEffect(() => {
    confirmTransaction();
  }, []);

  return (
    <div>
      {orderConfirmed && (
        <div>
          <p>Transaction confirmed.</p>
        </div>
      )}
      {!orderConfirmed && (
        <div>
          <p>Your transaction has not gone through. Please try again</p>
        </div>
      )}
    </div>
  );
}

export default ConfirmOrder;
