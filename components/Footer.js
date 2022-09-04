import Link from "next/link";
import { BsInstagram, BsWhatsapp, BsTelephone, BsEnvelope } from "react-icons/bs";
function Footer() {
  return (
    <div className="px-4 md:px-20 xl:px-44 flex footer w-full  bg-slate-900 py-10" id="footer">
      <div className="flex flex-col justify-center items-start">
        <div className="group flex justify-center items-center mb-4 cursor-pointer">
          <BsInstagram className="group-hover:animate-bounce h-8 text-xl mr-4" />
          <a className="invisible group-hover:visible hover:text-white" href="#">@cakefairy</a>
        </div>
        <div className="group flex justify-center items-center mb-4 cursor-pointer">
          <BsWhatsapp className="group-hover:animate-bounce h-8 text-xl mr-4" />
          <p className="invisible group-hover:visible"> +25483290101</p>
        </div>
        <div className="group flex justify-center items-center mb-4 cursor-pointer">
          <BsEnvelope className="group-hover:animate-bounce h-8 text-xl mr-4" />
          <p className="invisible group-hover:visible"> cakefairy@gmail.com</p>
        </div>
        <div className="group flex justify-center items-center mb-4 cursor-pointer">
          <BsTelephone className="group-hover:animate-bounce h-8 text-xl mr-4" />
          <p className="invisible group-hover:visible"> +25483290101</p>
        </div>
      </div>
      <div className="site-map flex flex-col relative">
        <Link href='/order'>Menu</Link>
        <Link href="/terms">Terms and conditions</Link>
        <Link href='/'>Cart</Link>
      </div>
    </div>
  );
}

export default Footer;
