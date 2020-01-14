import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import DirectoryIconButton from "./components/DirectoryIconButton";
import HomeIconButton from "./components/HomeIconButton";
import DownloadsTable from "./components/DownloadsTable";
import SearchBar from "./components/SearchBar";
import SearchTable from "./components/SearchTable";

const electron = window.require("electron");
const homedir = electron.remote.require("os").homedir();

export default function App() {
  return <MyRoute />;
}

function MyRoute() {
  console.log("Rendering Main");
  let defaultDir = homedir + "/Downloads/flash-torrent-files";
  const [loading, setLoading] = useState(true);
  const [rootDirPath, setRootDirPath] = useState(defaultDir);

  function handleSearch(value) {}
  return (
    <div className="App">
      <header className="App-header">
        <div className="app-view">
          <Router>
            <Switch>
              <Route
                path="/search/:query"
                children={
                  <div className="search-view">
                    <div className="top">
                      <Grid container spacing={1}>
                        <Grid item xs={1}>
                          <HomeIconButton setLoading={setLoading}/>
                        </Grid>
                        <Grid item xs={11}>
                          <SearchBar />
                        </Grid>
                      </Grid>
                    </div>
                    <SearchTable />
                  </div>
                }
              />
              <Route path="/">
                {() => {
                  return (
                    <div className="default-view">
                      <div className="top">
                        <Grid container spacing={1}>
                            <DirectoryIconButton
                              rootDirPath={rootDirPath}
                              setRootDirPath={setRootDirPath}
                              setLoading={setLoading}
                            />
                          <Grid item xs={11}>
                            <SearchBar query={""} />
                          </Grid>
                        </Grid>
                      </div>
                      <DownloadsTable
                        rootDirPath={rootDirPath}
                        loading={loading}
                        setLoading={setLoading}
                      />
                    </div>
                  );
                }}
              </Route>
            </Switch>
          </Router>
        </div>
      </header>
    </div>
  );
}
