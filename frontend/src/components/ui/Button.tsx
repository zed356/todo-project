interface Props {
  children: string;
  type: "button" | "submit" | "reset" | undefined;
}

const Button = (props: Props) => {
  return (
    <button
      className="m-auto mt-2 align-middle w-20 border-[1px] border-sky-600 rounded-md hover:bg-green-300 active:bg-green-200"
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
