import { useState } from "react";
import Head from "next/head";
import About from "../components/About";
import Header from "../components/Header";
import Landing from "../components/Landing";
import Menu from "../components/Menu";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
// import prisma from '../lib/prisma'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const categories = await prisma.category_price.findMany({
    include: {
      flavour: true,
    },
  });
  console.log("categories", categories);
  return {
    props: {
      categories: categories,
    },
  };
}

export default function Home(props) {
  console.log("props: ", props);
  const [categories, setCategories] = useState(props.categories);
  const [flavours, setFlavours] = useState(props.flavours);

  return (
    <div className="main">
      <Head>
        <title>Cake Fairy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Landing />
      <Services />
      <Menu categories={categories} className="" />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
}
