import Testify from "./Testify"
import TestimonyItem from "./TestimonyItem"

function Testimonials({clientStories}) {
  return (
    <div className="testimonials px-4 md:px-20 xl:px-44">
        <h1 className="text-xl heading py-7">Client stories</h1>
        <div className="flex flex-wrap justify-start items-center">
            {clientStories.map((story, index) => {
              return <TestimonyItem name={story.name} testimony={story.comment} rating={story.rating} key={index}/>
            })}
        </div>
        <Testify clientStories={clientStories} />
    </div>

  )
}

export default Testimonials