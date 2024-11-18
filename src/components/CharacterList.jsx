import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
function CharacterList({
  charachters,
  isLoading,
  selectId,
  onSelectCharacter,
}) {
  if (isLoading)
    return (
      <div className="basis-2/5 flex flex-col gap-2">
        {" "}
        <Loader />
      </div>
    );
  return (
    <div className="basis-2/5 flex flex-col gap-2">
      {charachters.map((item) => (
        <Character
          key={item.id}
          character={item}
          selectId={selectId}
          onSelectCharacter={onSelectCharacter}
        />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ character, selectId, onSelectCharacter }) {
  return (
    <>
      <div className="bg-slate-700 rounded-2xl flex overflow-hidden p-4">
        <img
          className="w-16 h-auto rounded-lg object-cover object-center"
          src={character.image}
        />
        <div className="flex w-full justify-between items-center">
          <div className="px-4 flex flex-col justify-between gap-3">
            <h3 className="text-lg text-slate-100 font-bold">
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
          <span onClick={() => onSelectCharacter(character.id)}>
            {selectId !== character.id ? (
              <EyeIcon className="size-7 cursor-pointer text-red-600" />
            ) : (
              <EyeSlashIcon className="size-7 cursor-pointer text-red-600" />
            )}
          </span>
        </div>
      </div>
    </>
  );
}
