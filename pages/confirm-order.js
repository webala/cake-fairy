import { useRouter } from "next/router";
import prisma from "../lib/prisma";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { GiConfirmed } from "react-icons/gi";
import {ImSpinner2} from 'react-icons/im'

export async function getServerSideProps({ req, res }) {
  const id = parseInt(getCookie('transactionId', {req, res}))
  const transactionDetails = await prisma.transaction_details.findUnique(
    {
      where: {
        id
      }
    }
  );
  const transactionDate = transactionDetails.transaction_date

  if (transactionDate) {
      transactionDetails.transaction_date = transactionDate.toString();
  }
  

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
  let cookieOrder = JSON.parse(order);
  const [clientPhone, setClientPhone] = useState(cookieOrder.client_phone);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [flavour, setFlavour] = useState(cookieOrder.order_item.create[0]);

  const router = useRouter();

  const confirmTransaction = async () => {
    
    if (transactionDetails.is_complete) {
      setOrderConfirmed(true);
      cookieOrder['deposit_paid'] = true
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
        transactionId: transactionDetails.id,
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
    
  };
  

  if (!transactionDetails.is_complete) {
    setTimeout(() => {
      router.reload()
    }, 10000)
  }

  useEffect( () => {
    // const setOrder = async () => {
    //   let transaction = await confirmTransaction();
    //   return transaction
    // }
    // setOrder();
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
            <p>Recipt: {transactionDetails.receipt_number}</p>
          </div>
        </div>
      )}
      {!orderConfirmed && (
        <div className="flex items-center">
          <p className="mr-2">Listening for transaction</p>
          <ImSpinner2 className="animate-spin"/> 
        </div>
      )}
    </div>
  );
}

export default ConfirmOrder;
