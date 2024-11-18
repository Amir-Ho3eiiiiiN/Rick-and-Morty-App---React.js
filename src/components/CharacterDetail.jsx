import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
function CharacterDetail({ characterId, isInFavorite, onAddFavorite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        setEpisodes([]);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        setCharacter(res.data);
        const episodesId = res.data.episode.map((e) => e.split("/").at(-1));
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([data].flat().slice(0, 10));
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (characterId) fetchData();
  }, [characterId]);

  return (
    <div className="basis-3/5 flex flex-col gap-4 rounded-2xl ">
      {!character || !characterId ? (
        <SaySelect />
      ) : (
        <>
          <CharacterSubInfo
            character={character}
            isInFavorite={isInFavorite}
            onAddFavorite={onAddFavorite}
          />
          <ListOfEpisodes episodes={episodes} />
        </>
      )}
    </div>
  );
}

export default CharacterDetail;

function SaySelect() {
  return (
    <h2 className="text-2xl text-gray-100 font-bold text-left">
      Please Select a Character 😉
    </h2>
  );
}

function CharacterSubInfo({ character, isInFavorite, onAddFavorite }) {
  return (
    <div className="bg-slate-700 rounded-2xl overflow-hidden flex">
      <img
        className="w-60 h-auto object-cover object-center"
        src={character.image}
      />
      <div className="px-6 py-8 flex flex-col gap-3">
        <div>
          <h3 className="text-xl text-slate-100 font-bold text-left">
            {character.gender === "Male" ? "👨" : "👩"} {character.name}
          </h3>
          <div className="flex items-center gap-1 text-slate-300 pl-1">
            <span
              className={`h-3 w-3 ${
                character.status === "Alive" ? "bg-green-500" : "bg-red-500"
              } rounded-full block`}
            ></span>
            <span> {character.status}</span>
            <span> - {character.species}</span>
          </div>
        </div>
        <div className="text-left">
          <p className="text-gray-400">Last Known location:</p>
          <h3 className="text-gray-200 font-bold text-base">
            {character.location.name}
          </h3>
        </div>
        {!isInFavorite ? (
          <button
            onClick={() => onAddFavorite(character)}
            className="bg-slate-400 px-6 py-2 text-slate-100 rounded-xl font-bold"
          >
            Add to Favorite
          </button>
        ) : (
          <p className="text-gray-400">already added to your favorite ✔</p>
        )}
      </div>
    </div>
  );
}

function ListOfEpisodes({ episodes }) {
  const [sort, setSort] = useState(false);
  let sortedEpisodes;
  if (sort) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  }
  return (
    <>
      <div className="p-4 bg-slate-700 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-slate-200">
            List of Episodes:
          </h2>
          <ArrowUpCircleIcon
            onClick={() => setSort((is) => !is)}
            className={`${
              sort ? "rotate-180" : " "
            } size-7 text-gray-400 transition-all cursor-pointer`}
          />
        </div>
        {sortedEpisodes.map((item, index) => (
          <EpisodeItem key={item.id} episode={item} num={index} />
        ))}
      </div>
    </>
  );
}

function EpisodeItem({ episode, num }) {
  return (
    <>
      <div className=" flex justify-between text-slate-100 mb-2">
        <div>
          <span className="text-base">
            {String(num + 1).padStart(2, "0")} {episode.episode} :
          </span>
          <span className="text-base font-semibold"> {episode.name}</span>
        </div>
        <span className="bg-slate-500 text-sm font-bold px-3 py-1 rounded-full">
          {episode.air_date}
        </span>
      </div>
    </>
  );
}
