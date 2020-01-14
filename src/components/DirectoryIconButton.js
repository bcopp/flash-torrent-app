import React from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import FolderOpenTwoToneIcon from "@material-ui/icons/FolderOpenTwoTone";
import Grid from "@material-ui/core/Grid";
const electron = window.require("electron");

export default function DirectoryIconButton(props) {
  let options = {
    title: "Select a downloads folder",
    defaultPath: props.rootDirPath,
    properties: ["openDirectory"]
  };
  return (
    <Grid item xs={1} className="icon-wrapper">
      <label htmlFor="directory-icon-button">
        <IconButton
          color="primary"
          aria-label="upload picture"
          //component="span"
          onClick={() => {
            //Synchronous
            let fp = electron.remote.dialog.showOpenDialog(options);
            fp.then(function(val) {
              if (val.canceled !== true) {
                props.setRootDirPath(val.filePaths[0]);
                props.setLoading(true);
              }
            });
          }}
        >
          <FolderOpenTwoToneIcon />
        </IconButton>
      </label>
    </Grid>
  );
}

async function getPath() {}
