import Testify from "./Testify"
import TestimonyItem from "./TestimonyItem"

function Testimonials() {
  return (
    <div className="p-2">
        <h1 className="text-xl p-10">Client stories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6">
            <TestimonyItem name="Daniel" testimony="Best cakes ever" />
            <TestimonyItem name="Daniel" testimony="Best cakes ever Best cakes ever Best cakes ever Best cakes ever Best cakes ever" />
            <TestimonyItem name="Daniel" testimony="Best cakes ever" />
            <TestimonyItem name="Daniel" testimony="Best cakes ever" />
            <TestimonyItem name="Daniel" testimony="Best cakes ever" />
        </div>
        <Testify />
    </div>

  )
}

export default Testimonials