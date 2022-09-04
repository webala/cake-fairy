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
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log("Error: ", response.statusText);
      throw new Error(response.statusText);
    }

    
    const resData = await response.json();
    console.log("res data: ", resData);
    setName("");
    setRating(0);
    setComment("");
  };
  return (
    <div className="py-10 w-full">
      <form onSubmit={submitComment}>
        <div className="flex flex-col items-start">
          <label className="text-xl mx-5 mt-5 heading">
            Share your experience with Cake Fairy
          </label>
          <div className="flex flex-col sm:w-full items-start pt-10">
            <label className="text-xl mt-5">Your Name</label>
            <input
              className="rounded h-10 w-1/2 md:w-56 text-black"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
            <label className="text-xl mt-5">What did you like about our service?</label>
            <textarea
              className="rounded h-20 sm:h-40 my-5 w-2/3 md:w-64 text-black"
              type="text"
              onChange={(e) => setComment(e.target.value)}
              required
              value={comment}
            />
            <div className="relative left-28">
              <StarRating rating={rating} setRating={setRating} />
            </div>
            <button
              className="rounded bg-orange-900 w-1/2  md:w-44 p-2 hover:scale-110 transition duration-300"
              type="submit"
            >
              Review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Testify;
