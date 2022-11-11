import { useState, useEffect } from "react"

const Dictionary = () => {
    const [word, setWord] = useState('')
    const [word2, setWord2] = useState('')

    useEffect(()=>{
        console.log('Stated Updated ' +  word )
    }, [word])

    useEffect(()=>{
        console.log('Stated Updated '+ word2)
    }, [word2])
    
  return (
    <div>
      <input type="text" onChange={(e)=>{
        setWord(e.target.value)
        
      }} />
      <h1>Get defination for {word}</h1>
      <input type="text" onChange={(e)=>{
        setWord2(e.target.value)
        
      }} />
      <h1>Get defination for {word2}</h1>
    </div>
  )
}

export default Dictionary
