import { TrashIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";

function Header({ children }) {
  return (
    <>
      <div className="bg-slate-600 flex justify-between items-center px-4 py-4 rounded-2xl mb-4">
        <span className="font-bold text-slate-100">LOGO 😍</span>
        {children}
      </div>
    </>
  );
}

export default Header;

export function Search({ query, onChangeSearch }) {
  return (
    <input
      value={query}
      onChange={onChangeSearch}
      type="text"
      className="py-2 px-4 rounded-lg bg-slate-400 text-slate-50 text-lg font-semibold placeholder:text-slate-300 placeholder:text-lg focus:outline-none"
      placeholder="search ..."
    />
  );
}

export function NumOfResult({ num }) {
  return <span className="text-slate-300">found {num} charachters</span>;
}

export function Favorite({ favorite, onRemoveFav }) {
  const [isopen, setIsOpen] = useState(false);
  return (
    <>
      <Modal title={"List Of Your Favorite"} open={isopen} onOpen={setIsOpen}>
        {favorite.map((item) => (
          <ModalItem character={item} onRemoveFav={onRemoveFav} />
        ))}
      </Modal>
      <div className="relative flex justify-center items-center">
        <HeartIcon
          className="size-10 text-red-600 font-bold absolute right-1 cursor-pointer"
          onClick={() => setIsOpen((is) => !is)}
        />
        <span className="bg-red-600 text-white h-5 w-5 flex justify-center items-start rounded-full absolute right-0 -top-4 font-bold text-sm">
          {favorite.length}
        </span>
      </div>
    </>
  );
}

function ModalItem({ character, onRemoveFav }) {
  return (
    <div className="bg-slate-800 rounded-2xl flex overflow-hidden p-4 mb-4">
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
        <TrashIcon
          className="size-7 cursor-pointer text-red-600"
          onClick={() => onRemoveFav(character.id)}
        />
      </div>
    </div>
  );
}
