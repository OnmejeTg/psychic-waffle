import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams, Link} from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";

const Definition = () => {
  const [word, setWord] = useState();
  const [notFound, setNotFound] = useState(false);
  let { search } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
      .then((response) => {
        
        if (response.status === 404) {
          setNotFound(true);
        }
        return response.json();
      })
      .then((data) => {
        setWord(data[0].meanings);
      });
  }, []);

  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }
  return (
    <>
      {word ? (
        <>
          <h1>Here is a definition</h1>
          {word.map((meaning) => {
            return (
              <p key={uuidv4()}>
                <strong>{meaning.partOfSpeech}: </strong>
                {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search Again</p>
          <DefinitionSearch/>
        </>
      ) : null}
    </>
  );
};

export default Definition;
