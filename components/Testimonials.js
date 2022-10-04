import Testify from "./Testify"
import TestimonyItem from "./TestimonyItem"

function Testimonials({clientStories}) {
  return (
    <div className="testimonials px-4 md:px-20 xl:px-64 flex flex-col items-center">
      <div className="w-full">
        <h1 className="text-2xl font-bold underline heading py-7">Our clients love our cakes</h1>
        <div className="flex flex-wrap justify-start items-center">
            {clientStories.map((story, index) => {
              return <TestimonyItem name={story.name} testimony={story.comment} rating={story.rating} key={index}/>
            })}
        </div>
      </div>
      <Testify clientStories={clientStories} />
    </div>

  )
}

export default Testimonials