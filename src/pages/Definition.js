import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Definition = () => {
  const [word, setWord] = useState();

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
      .then((response) => response.json())
      .then((data) => {
        setWord(data[0].meanings);
        console.log(data[0].meanings);
      });
  }, []);

  return (
    <>
      <h1>Here is a definition</h1>
      {word
        ? word.map((meaning) => {
            return (
              <p key={uuidv4()}>
                <strong>{meaning.partOfSpeech}: </strong>
                {meaning.definitions[0].definition}
              </p>
            );
          })
        : null}
    </>
  );
};

export default Definition;