import { useState } from "react";
import StarRating from "./StarRating";

function Testify() {
  const [comment, setComment] = useState();
  const [name, setName] = useState();
  const [rating, setRating] = useState(0);

  const submitComment = async (e) => {
    e.preventDefault();
    const body = {
      name,
      comment,
      rating,
    };
    const response = await fetch("/api/comment", {
      method: "POST",
      body: body,
    });

    if (!response.ok) {
      console.log("Error: ", response.statusText);
      throw new Error(response.statusText);
    }

    const resData = await response.json();
    console.log("res data: ", resData);
  };
  return (
    <div className="py-10">
      <form onSubmit={submitComment}>
        <div className="flex flex-col items-center">
          <label className="text-xl mx-5 mt-5 heading">
            Share your experience with Cake Fairy
          </label>
          <div className="flex flex-col sm:w-1/2 items-center pt-10">
            <label className="text-xl mx-5 mt-5 top-0 left-10">Your Name</label>
            <input
              className="rounded h-10 m-5 w-1/2 text-black"
              type="text"
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <textarea
              className="rounded h-20 sm:h-40 m-5 w-full text-black"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <StarRating rating={rating} setRating={setRating} />
            <button
              className="rounded bg-orange-900 sm:w-1/2 p-2 hover:scale-110 transition duration-300"
              type="submit"
            >
              Leave Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Testify;
