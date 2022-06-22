import Link from "next/link";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useRouter } from "next/router";


export default function TermaAndConditions () {

    const router = useRouter()
 return (
    <div className="flex flex-col items-center">
        <div onClick={() => router.back()} className="absolute top-5 left-5 sm:left-10 hover:scale-150 transition duration-300"><AiOutlineArrowLeft /></div>
        <h1 className="text-2xl m-10">Terms and conditions</h1>
        <ol className="mb-4 px-4">
            <li className="sm:leading-10">1. Orders must be placed 48 hours before collecting time.</li>
            <li className="sm:leading-10">2. A deposit of 50% is required to place an order. </li>
            <li className="sm:leading-10">3. Themed cakes are charged differently. </li>
            <li className="sm:leading-10">4. Delivery charges are separate from the cake prices.</li>
        </ol>
        <Link href='/order'><div className="cursor-pointer rounded-md p-2 bg-orange-900 hover:scale-110 transition duraion-300">Place an order</div></Link>
    </div>
 )
}