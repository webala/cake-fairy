import { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { MdOutlineStarRate } from "react-icons/md";

function ClientStory({ story, updateStory }) {
  const [approved, setApproved] = useState(story.approved);

  return (
    <tr>
      <td className="py-4 px-6 text-white">{story.name}</td>
      <td className="py-4 px-6">{story.comment}</td>
      <td className="py-4 px-6">
        <div className="flex">
          {[...Array(story.rating)].map((icon, index) => (
            <MdOutlineStarRate key={index} />
          ))}
        </div>
      </td>
      <td>
        {approved && (
          <BsToggleOn
            className="icon cursor-pointer"
            onClick={async () => {
              setApproved(!approved);
              const storyData = { approved: !story.approved };
              const storyId = story.id;
              await updateStory(storyId, storyData);
            }}
          />
        )}
        {!approved && (
          <BsToggleOff
            className="icon cursor-pointer"
            onClick={async () => {
              setApproved(!approved);
              const storyData = { approved: !story.approved };
              const storyId = story.id;
              await updateStory(storyId, storyData);
            }}
          />
        )}
      </td>
    </tr>
  );
}

export default ClientStory;
