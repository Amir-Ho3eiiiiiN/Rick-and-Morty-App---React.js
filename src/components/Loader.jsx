import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div className="text-slate-300 flex items-center gap-4">
      <p> Loading Data...</p>
      <LoaderIcon className="size-5" />
    </div>
  );
}

export default Loader;
