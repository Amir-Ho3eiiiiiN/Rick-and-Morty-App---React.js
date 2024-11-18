import "./App.css";
import Header, { Favorite, NumOfResult, Search } from "./components/Header";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import { memo, useState } from "react";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character?name",
    query
  );
  const [selectId, setSelectId] = useState(null);
  const handlerSelectCharacter = (id) => {
    setSelectId((prevId) => (prevId === id ? null : id));
  };

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const [favorite, setFavorite] = useLocalStorage("Favorite", []);
  const isInFavorite = favorite.map((item) => item.id).includes(selectId);
  const handlerAddFavorite = (character) => {
    if (!favorite.includes(character))
      setFavorite((prvFav) => [...prvFav, character]);
  };
  const handlerRemovefav = (id) => {
    setFavorite((prevFav) => prevFav.filter((item) => item.id !== id));
  };
  return (
    <>
      <Toaster />
      <Header>
        <Search query={query} onChangeSearch={handleChangeQuery} />
        <NumOfResult num={characters.length} />
        <Favorite favorite={favorite} onRemoveFav={handlerRemovefav} />
      </Header>
      <Main>
        <CharacterList
          charachters={characters}
          isLoading={isLoading}
          selectId={selectId}
          onSelectCharacter={handlerSelectCharacter}
        />
        <CharacterDetail
          characterId={selectId}
          onAddFavorite={handlerAddFavorite}
          isInFavorite={isInFavorite}
        />
      </Main>
    </>
  );
}

export default App;

const Main = memo(function ({ children }) {
  return <div className=" rounded-lg flex p4 gap-4">{children}</div>;
});
