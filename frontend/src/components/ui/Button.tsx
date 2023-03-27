interface Props {
  children: string;
  className: string;
  type: "button" | "submit" | "reset" | undefined;
}

const Button = (props: Props) => {
  return (
    <button className={props.className} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
