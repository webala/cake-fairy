import Testify from "./Testify"
import TestimonyItem from "./TestimonyItem"

function Testimonials() {
  return (
    <div className="testimonials">
        <h1 className="text-xl heading py-7">Client stories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6">
            <TestimonyItem name="Daniel" testimony="Best cakes ever" rating={5}/>
            <TestimonyItem name="Daniel" testimony="Best cakes ever Best cakes ever Best cakes ever Best cakes ever Best cakes ever" rating={2}/>
            <TestimonyItem name="Daniel" testimony="Best cakes ever" rating={3}/>
            <TestimonyItem name="Daniel" testimony="Best cakes ever" rating={4}/>
            <TestimonyItem name="Daniel" testimony="Best cakes ever" rating={1}/>
        </div>
        <Testify />
    </div>

  )
}

export default Testimonials