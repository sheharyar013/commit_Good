import classes from "./loader.module.css";

export const Loader = (props) => (
  <>
    <div id={classes.overlayer}></div>
    <div className={classes.preloader} style={props?.style}>
      <div className={classes.loader}>
        <span className={classes["loader-inner"]}></span>
      </div>
      <p> Loading...</p>
    </div>
  </>
);
