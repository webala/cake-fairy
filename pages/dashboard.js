import prisma from "../lib/prisma";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import OrderItem from "../components/OrderItem";
import Orders from "../components/Orders";
import ClientStories from "../components/ClientStories";
import Transactions from "../components/Transactions";

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

  const clientStories = await prisma.client_stories.findMany();
  const transactions = await prisma.transaction_details.findMany();
  return {
    props: {
      orders,
      flavours,
      clientStories,
      transactions,
    },
  };
}

export default function Dashboard(props) {
  const [orders, setOrders] = useState(props.orders);
  const [clientStories, setClientStories] = useState(props.clientStories);
  const [transactions, setTransactions] = useState(props.transactions);
  const [completeOrders, setCompleteOrders] = useState(
    orders.filter((order) => order.complete == true)
  );
  const [newOrders, setNewOrders] = useState(
    orders.filter((order) => order.complete == false)
  );

  const [flavours, setFlavours] = useState(props.flavours);
  const [page, setPage] = useState("order");

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

  const updateStory = async (storyId, storyData) => {
    const body = {
      storyId,
      storyData,
    };

    const response = await fetch("/api/comment", {
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
        <button
          className="rounded-md p-3 bg-orange-900"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center w-full">
        <h1 className="heading">Chefs Panel</h1>
        <div className="flex items-center justify-evenly w-full">
          <button
            className={
              page === "order"
                ? "underline underline-offset-8"
                : "hover:underline underline-offset-8 transition ease-in duration-300"
            }
            onClick={() => setPage("order")}
          >
            Orders
          </button>
          <button
            className={
              page === "stories"
                ? "underline underline-offset-8"
                : "hover:underline underline-offset-8 transition ease-in duration-300"
            }
            onClick={() => setPage("stories")}
          >
            Client stories
          </button>
          <button
            className={
              page === "transactions"
                ? "underline underline-offset-8"
                : "hover:underline underline-offset-8 transition ease-in duration-300"
            }
            onClick={() => setPage("transactions")}
          >
            Transaction records
          </button>
          <button
            className="hover:underline underline-offset-8"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
        {page === "order" && (
          <Orders
            newOrders={newOrders}
            completeOrders={completeOrders}
            flavours={flavours}
            updateOrder={updateOrder}
          />
        )}
        {page === "stories" && (
          <ClientStories
            clientStories={clientStories}
            updateStory={updateStory}
          />
        )}
        {page === "transactions" && (
          <Transactions transactions={transactions} />
        )}
      </div>
    );
  }
}
