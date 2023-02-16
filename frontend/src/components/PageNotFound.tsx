import classes from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={classes.error}>
      <h1>404 - Page Not Found</h1>
      <img src="https://cdn.svgator.com/images/2022/01/cat.png" alt="Kitty playing with yarn"></img>
    </div>
  );
};

export default PageNotFound;
