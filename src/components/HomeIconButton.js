import React from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

export default function HomeIconButton(props) {
  const history = useHistory();

  return (
    <label htmlFor="home-icon-button">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => {
          history.push("/");
          props.setLoading(true);
        }}
      >
        <HomeIcon />
      </IconButton>
    </label>
  );
}
