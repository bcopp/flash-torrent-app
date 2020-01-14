import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const { readdir } = fs.promises;
const { resolve, basename } = electron.remote.require("path");

/*
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
*/

// Like to have two versions of object for cacheing reasons.
// On intial search just grab normal data
// If item is clicked then grab the description page (another query)
export default function DownloadTables(props) {
  const [fileInfos, setFileInfos] = useState(null);

  if (props.loading) {
    let pathsPromise = getFilePaths(props.rootDirPath);
    pathsPromise.then(function(newPaths) {
      setFileInfos(buildLocalTorrentInfo(newPaths));
      props.setLoading(false);
    });
  }

  return props.loading ? (
    <div className="circle-progress">
      <CircularProgress />
    </div>
  ) : (
    <TableContainer component={Paper}>
      <Table className="table-tester" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{fileInfos.map(item => DownloadItem(item))}</TableBody>
      </Table>
    </TableContainer>
  );
}

function buildLocalTorrentInfo(filePaths) {
  return filePaths.map(path => {
    return {
      title: basename(path),
      size: 1,
      path: path
    };
  });
}

function DownloadItem(item) {
  return (
    <TableRow key={item.title}>
      <TableCell component="th" scope="row">
        {item.title}
      </TableCell>
      <TableCell align="right">{"Size: " + item.size}</TableCell>
      <TableCell align="right">
        <Button onClick={() => console.log("BUTTON IS CLICKED")}>Watch</Button>
      </TableCell>
    </TableRow>
  );
}

async function getFilePaths(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(dirent => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFilePaths(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}
