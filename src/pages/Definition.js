import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/UseFetch";

const Definition = () => {
  // const [word, setWord] = useState();
  // const [notFound, setNotFound] = useState(false);
  let { search } = useParams();
  let navigate = useNavigate();

  const [word, errorStatus] = useFetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + search
  );

  if (errorStatus === 404) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }

  return (
    <>
      {word?.[0]?.meanings ? (
        <>
          <h1>Here is a definition</h1>
          {word[0].meanings.map((meaning) => {
            return (
              <p key={uuidv4()}>
                <strong>{meaning.partOfSpeech}: </strong>
                {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search Again</p>
          <DefinitionSearch />
        </>
      ) : null}
    </>
  );
};

export default Definition;
