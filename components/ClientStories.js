import React from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { MdOutlineStarRate } from "react-icons/md";
import ClientStory from "./ClientStory";

function ClientStories({ clientStories, updateStory }) {
  return (
    <div className="w-full flex flex-col items-center p-16">
      <table className="table-auto">
        <thead className="uppercase text-left">
          <tr>
            <th className="py-3 px-6">Customer Name</th>
            <th className="py-3 px-6">Comment</th>
            <th className="py-3 px-6">Rating</th>
            <th className="py-3 px-6">Approved</th>
          </tr>
        </thead>
        <tbody>
          {clientStories.map((story) => {
            return <ClientStory story={story} key={story.id} updateStory={updateStory}/>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ClientStories;
