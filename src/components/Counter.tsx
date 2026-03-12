import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>ADD</button>
        <button onClick={() => setCount(count - 1)}>REDUCE</button>
        <button onClick={() => setCount(0)}>RESET</button>
      </div>
    </>
  )
}

export default Counter