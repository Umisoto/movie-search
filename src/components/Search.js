import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion'

const Search = props => {
  const initSearchConditions={title: "", genre: "", year: ""}
  const [searchConditions, setSearchConditions]=useState(initSearchConditions)

  const handleChangeTitle = e => {
    setSearchConditions({...searchConditions, title: e.target.value});
  };
  const handleSelectGenre=e=>{
    setSearchConditions({...searchConditions, genre: e.target.value});
  }
  const handleChangeYear=e=>{
    setSearchConditions({...searchConditions, year: e.target.value});
  }
  const handleClickSearchFunction = e => {
    e.preventDefault();
    props.search(searchConditions.title, searchConditions.genre, searchConditions.year);
    setSearchConditions(initSearchConditions);
  };

  return (
    <div className="search-container">
      <form className="search">
        <div className="primary-search">
          <input
            type="text"
            value={searchConditions.title}
            placeholder={props.primaryPlaceholder}
            onChange={handleChangeTitle}
          />
          <input
            type="submit"
            value="SEARCH"
            disabled={!searchConditions.title}
            onClick={handleClickSearchFunction}
          />
        </div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Advanced search</Accordion.Header>
            <Accordion.Body>
              <span>Genre: </span>
              <select name="genre" onChange={handleSelectGenre}>
                  <option value="">Select type</option>
                  <option value="movie">movie</option>
                  <option value="series">series</option>
              </select>
              <span> Year: </span>
              <input type="number" value={searchConditions.year} onChange={handleChangeYear} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </form>
      <p className="message">Find out a few of your favorite movies/series</p>
    </div>
  );
};

export default Search;
