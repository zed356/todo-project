import classes from "./Modal.module.css";

interface Props {
  error: string;
  close: () => void;
}

const Modal = (props: Props) => {
  return (
    <div onClick={props.close} id="myModal" className={classes.modal}>
      <div className={classes["modal-content"]}>
        <span className={classes["close"]}>&times;</span>
        <p>{props.error}</p>
      </div>
    </div>
  );
};

export default Modal;
