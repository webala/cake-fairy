import Testify from "./Testify"
import TestimonyItem from "./TestimonyItem"

function Testimonials({clientStories}) {
  return (
    <div className="testimonials">
        <h1 className="text-xl heading py-7">Client stories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:flex flex-wrap justify-between">
            {clientStories.map((story, index) => {
              return <TestimonyItem name={story.name} testimony={story.comment} rating={story.rating} key={index}/>
            })}
        </div>
        <Testify />
    </div>

  )
}

export default Testimonials