import { useState } from 'react'

function SearchFilter() {
    let list_of_names = [
        "James",
        "Gordon",
        "Lesley",
        "Jessica",
        "Betty"
    ]

    const [names, setNames] = useState(list_of_names)

    function filterNames (value: string) {
        console.log(list_of_names)
        console.log(value)
        let filtered = list_of_names.filter(item => {
                let stringifiedValue = String(value).toLowerCase()
                return item.toLowerCase().includes(stringifiedValue)  
            }
        )
        console.log(filtered)
        setNames(filtered)
    }

  return (
    <>
      <div>
        <label htmlFor='filter'>Filter names here:</label>
        <input name='filter' onInput={(e) => filterNames(e.currentTarget.value)}/>
        {names.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
      </div>
    </>
  )
}

export default SearchFilter