import { useState, useEffect } from "react"

const Dictionary = () => {
    const [word, setWord] = useState()

    useEffect(()=>{
        console.log('Stated Updated', word)
    }, [])
  return (
    <div>
      <input type="text" onChange={(e)=>{
        setWord(e.target.value)
        
      }} />
      <h1>{word}</h1>
    </div>
  )
}

export default Dictionary
