import React, { useState } from "react";

const Search = props => {
  const [searchTitle, setSearchTitle] = useState("");
  const [genre, setGenre] = useState("");

  const handleSearchInputChanges = e => {
    setSearchTitle(e.target.value);
  };
  const handleSelectGenre = e => {
    setGenre(e.target.value);
  };
  const handleClickSearchFunction = e => {
    e.preventDefault();
    props.search(searchTitle, genre);
    setSearchTitle("");
  };

  return (
    <div className="search-container">
      <form className="search">
        <input
          type="text"
          value={searchTitle}
          placeholder="ex). game"
          onChange={handleSearchInputChanges}
        ></input>
        {/* <select name="genre" onChange={handleSelectGenre}>
            <option value="">SELECT GENRE</option>
            <option value="movie">MOVIE</option>
            <option value="series">DRAMA</option>
        </select> */}
        <input
          type="submit"
          value="SEARCH"
          onClick={handleClickSearchFunction}
        ></input>
      </form>
      <p className="message">Sharing a few of our favourite movies</p>
    </div>
  );
};

export default Search;
