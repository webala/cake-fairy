import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import prisma from "../lib/prisma";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { GiConfirmed } from "react-icons/gi";
import { BiErrorAlt } from "react-icons/bi";
import { FcRefresh } from "react-icons/fc";

export async function getServerSideProps({ req, res }) {
  const transactionDetails = await prisma.transaction_details.findMany();

  transactionDetails.map((transaction) => {
    let transactionDate = transaction.transaction_date;
    transaction.transaction_date = transactionDate.toString();
    return transaction;
  });

  //get order from cookies in case browser is refreshed
  const order = getCookie("order", { req, res });
  return {
    props: {
      transactionDetails,
      order,
    },
  };
}

function ConfirmOrder({ transactionDetails, order }) {
  const cookieOrder = JSON.parse(order);
  console.log("cookie order: ", cookieOrder);
  console.log(transactionDetails);
  const [clientPhone, setClientPhone] = useState(cookieOrder.client_phone);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [transaction, setTransaction] = useState();

  const router = useRouter();

  const confirmTransaction = async () => {
    const transaction = transactionDetails.find(
      (transaction) => transaction.phone_number == clientPhone
    );
    if (transaction) {
      setOrderConfirmed(true);
      let response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(cookieOrder),
      });

      const savedOrder = await response.json();
      console.log("id:", savedOrder.id);
      if (!response.ok) {
        console.log(response.statusText);
        throw new Error(response.statusText);
      }

      const data = {
        transactionId: transaction.id,
        transactionData: {
          order_id: savedOrder.id,
        },
      };
      response = await fetch("/api/transactionUpdate", {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log(response.statusText);
        throw new Error(response.statusText);
      }

      const updatedTransaction = await response.json();
      console.log("updated transaction: ", updatedTransaction);
    }
    return transaction;
  };
  console.log("transaction: ", transaction);

  useEffect( () => {
    const getTransaction = async () => {
      let transaction = await confirmTransaction();
      return transaction
    }
    setTransaction(getTransaction());
  }, []);

  return (
    <div className="flex justify-center mt-16 p-3">
      {orderConfirmed && (
        <div>
          <div className="flex items-center my-5">
            <GiConfirmed className="mr-2 text-green-600" />
            <p>Transaction confirmed.</p>
          </div>
          <div>
            <p>Recipt: {transaction.receipt_number}</p>
          </div>
        </div>
      )}
      {!orderConfirmed && (
        <div className="flex flex-col items-center">
          <BiErrorAlt className="text-red-600 text-2xl" />
          <div className="flex flex-col items-center mr-2">
            <p>Transaction incomplete. Please try again.</p> <br />
            <p>
              If your transaction has gone through, try refreshing the page.
            </p>
          </div>
          <FcRefresh
            className="text-2xl hover:scale-125 transition duration-300 cursor-pointer"
            onClick={() => router.reload()}
          />
        </div>
      )}
    </div>
  );
}

export default ConfirmOrder;