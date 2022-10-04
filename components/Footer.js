import Link from "next/link";
import { BsInstagram, BsWhatsapp, BsTelephone, BsEnvelope, BsTwitter } from "react-icons/bs";
function Footer() {
  return (
    <div
      className="px-4 md:px-20 justify-evenly xl:px-44 flex flex-col items-center footer w-full  bg-backgroundSecondary py-10"
      id="footer"
    >
      <div className="flex flex-col  sm:flex-row w-full justify-evenly">
        <div className="flex flex-col md:flex-row ">
          <p className="mx-2">
            <Link href="/">Home</Link>
          </p>
          <p className="mx-2">
            <Link href="/">About</Link>
          </p>
          <p className="mx-2">
            <Link href="/">Menu</Link>
          </p>
        </div>
        <div className="flex flex-col md:flex-row">
          <p className="mx-2">
            <Link href="/">Terms of Service</Link>
          </p>
          <p className="mx-2">
            <Link href="/">Refund Policy</Link>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center my-10">
        <p>DM us</p>
        <div className="flex justify-between my-4">
          <a className="mx-5 hover:animate-bounce text-xl">
            <BsInstagram />
          </a>
          <a className="mx-5 hover:animate-bounce text-xl">
            <BsTwitter />
          </a>
          <a className="mx-5 hover:animate-bounce text-xl">
            <BsWhatsapp />
          </a>
        </div>
        <p>+254791055897</p>
      </div>
    </div>
  );
}

export default Footer;
