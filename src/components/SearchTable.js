import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Paper
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const electron = window.require("electron");
const exec = electron.remote.require("child_process").exec;
const appRootPath = electron.remote.app.getAppPath();

// Like to have two versions of object for cacheing reasons.
// On intial search just grab normal data
// If item is clicked then grab the description page (another query)
export default function SearchTables() {
  let { query } = useParams();
  const [searchItems, setSearchItems] = useState([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    let resultsPromise = Search(query);
    resultsPromise
      .then(function(infos) {
        infos = TruncateSearchInfos(JSON.parse(infos));
        setSearchItems(infos);
        setLoading(false);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  return loading ? (
    <div className="circle-progress">
      <CircularProgress />
    </div>
  ) : (
    <TableContainer component={Paper}>
      <Table className="table-tester" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{searchItems.map(item => SearchItem(item))}</TableBody>
      </Table>
    </TableContainer>
  );
}

function SearchItem(item) {
  return (
    <TableRow key={item.title}>
      <TableCell component="th" scope="row">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {item.Title}
          </Grid>
          <Grid item xs={3}>
            Seeders: {item.Seeders}
          </Grid>
          <Grid item xs={3}>
            Leechers: {item.Leechers}
          </Grid>
          <Grid item xs={3}>
            Size: {item.Size}
          </Grid>
          <Grid item xs={3}>
            By: {item.By}
          </Grid>
        </Grid>
      </TableCell>

      <TableCell align="right"></TableCell>
      <TableCell align="right">
        <Button onClick={() => console.log("BUTTON IS CLICKED")}>Watch</Button>
      </TableCell>
    </TableRow>
  );
}

function TruncateSearchInfos(infos) {
  return infos.map(info => {
    info.Size = info.Size.split("(")[0];
    return info;
  });
}

function Search(query) {
  console.log("Starting fl-torent");
  return new Promise((resolve, reject) => {
    return exec(
      appRootPath + "/external/search -q " + query,
      (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        } else if (stderr) {
          console.error(stderr);
          return;
        }
        console.log(stdout);
        resolve(stdout ? stdout : stderr);
      }
    );
  });
}
