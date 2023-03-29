interface Props {
  error: string;
  close: () => void;
}

const Modal = (props: Props) => {
  return (
    <div id="myModal" className="flex fixed w-full h-full">
      <div
        onClick={props.close}
        className="flex bg-black opacity-40 fixed z-0 left-0 top-0 w-full h-full"
      ></div>
      <div className="bg-slate-50 my-[15%] mx-auto p-[0.3rem] border border-zinc-500 w-[17%] h-[3.8%] flex flex-col-reverse justify-end flex-wrap-reverse items-start align-center z-[1] rounded-md">
        <span
          onClick={props.close}
          className="text-gray-400 float-right text-lg font-bold mr-[1px]  transition-all duration-100 hover:text-black hover:no-underline hover:cursor-pointer self-auto hover:scale-[1.1]"
        >
          ✖
        </span>
        <p className="self-center">{props.error}</p>
      </div>
    </div>
  );
};

export default Modal;
