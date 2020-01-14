import React, { useState, useParams } from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  
  const [query, setQuery] = useState("");
  let history = useHistory();
  let queryParams = history.location.pathname.split('/')
  if (queryParams.length > 2 && query === ""){
    setQuery(queryParams[queryParams.length - 1])
  }
  return (
    <div className="search-bar">
      <TextField
        id="standard-search"
        label="Search Torrents"
        type="search"
        autoFocus={true}
        variant="filled"
        fullWidth={true}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={ev => {
          if (ev.key === "Enter" && query !== "") {
            // Do code here
            history.push("/search/"+encodeURI(query));
            console.log(encodeURI(query));
            ev.preventDefault();
          }
        }}
      />
    </div>
  );
}
