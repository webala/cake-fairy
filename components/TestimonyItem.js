function TestimonyItem({name, testimony}) {
  return (
    <div className="bg-orange-900 m-2 rounded-md p-2 flex flex-col justify-evenly">
        <h2>{name} says, </h2>
        <div>
            <p>{testimony}</p>
        </div>   
    </div>
  )
}

export default TestimonyItem