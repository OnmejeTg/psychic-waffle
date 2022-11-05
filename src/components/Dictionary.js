import { useState, useEffect } from "react"

const Dictionary = () => {
    const [word, setWord] = useState()

    useEffect(()=>{})
  return (
    <div>
      <input type="text" onChange={(e)=>{
        setWord(e.target.value)
        console.log('Stated Updated', word)
      }} />
      <h1>{word}</h1>
    </div>
  )
}

export default Dictionary
