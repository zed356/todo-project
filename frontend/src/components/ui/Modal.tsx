import classes from "./Modal.module.css";

interface Props {
  error: string;
  close: () => void;
}

const Modal = (props: Props) => {
  return (
    <div id="myModal" className={classes.modal}>
      <div onClick={props.close} className={classes.background}></div>
      <div className={classes["modal-content"]}>
        <span onClick={props.close} className={classes["close"]}>
          &times;
        </span>
        <p>{props.error}</p>
      </div>
    </div>
  );
};

export default Modal;
