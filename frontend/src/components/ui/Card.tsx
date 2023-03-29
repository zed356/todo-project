type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

const Card = (props: Props) => {
  return <div className="border border-sky-600 rounded-lg p-2">{props.children}</div>;
};

export default Card;
