import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, open, onOpen, children }) {
  return (
    <div className={`${open ? "" : "hidden"}`}>
      <div
        className="h-screen w-screen absolute top-0 left-0 bg-gray-700 opacity-90"
        onClick={() => onOpen(false)}
      ></div>
      <div className="max-w-md w-11/12 rounded-2xl absolute p-4 bg-slate-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center border-b border-b-gray-500 pb-2 mb-4">
          <h3 className="text-2xl text-gray-100 font-bold">{title}</h3>
          <XCircleIcon
            className="size-7 text-red-500 cursor-pointer"
            onClick={() => onOpen(false)}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
