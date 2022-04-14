/* Importing the makeStyles function from the material-ui library. */
import { makeStyles } from "@material-ui/core";

/**
 * It creates a style object that can be used by the component.
 */
const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid #4D9A9A",
      borderRadius: 5,
      padding: 10,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "#4D9A9A" : "",
      color: selected ? "white" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "#4D9A9A",
        color: "white",
      },
      width: "23%",
      textAlign: "center",
    },
  });

  /* Creating a style object that can be used by the component. */
  const classes = useStyles();

  /* Returning a span element with the onClick event handler and the className property. */
  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
