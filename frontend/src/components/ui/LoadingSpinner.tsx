import { JsxElement } from "typescript";
import classes from "./LoadingSpinner.module.css";

interface Props {
  children?: JsxElement | JsxElement[];
}

const LoadingSpinner = (props: Props) => {
  return (
    <div className={classes["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
