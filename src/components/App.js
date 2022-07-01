import React, { useState, useEffect } from "react";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import "../stylesheet.css";

// const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=f1929b89";
// iはimdbIDを意味する
const MOVIE_API_URL = "http://www.omdbapi.com/?s=game&apikey=f1929b89";
// sはキーワードを意味する

const App = () => {
  const initialSearchResult={
    title: "",
    genre: "",
    year: ""
  }
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchResult, setSearchResult] = useState(initialSearchResult);
  const [fetchURL, setFetchURL]=useState(MOVIE_API_URL)
  const [count, setCount] = useState(0);
  const [hitsAmount, setHitsAmount] = useState(0);

  useEffect(() => {
    fetch(fetchURL)
      .then(response => response.json())
      .then(jsonResponse => {
        setHitsAmount(jsonResponse.totalResults);
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  }, [fetchURL]);

  const search = (title, genre, year) => {
    // エラーメッセージが出た後に検索した時用のエラーメッセージの初期化
    setErrorMessage(null);
    // result表示用仕込み
    setCount(count + 1);
    setSearchResult({title, genre, year});
    setLoading(true);

    if(year && genre){
      setFetchURL(`http://www.omdbapi.com/?s=${title}&type=${genre}&y=${year}&apikey=f1929b89`)
    } else if(genre){
      setFetchURL(`http://www.omdbapi.com/?s=${title}&type=${genre}&apikey=f1929b89`)
    } else if(year){
      setFetchURL(`http://www.omdbapi.com/?s=${title}&y=${year}&apikey=f1929b89`)
    } else{
      setFetchURL(`http://www.omdbapi.com/?s=${title}&apikey=f1929b89`)
    }
  };

  return (
    <div>
      <Header text="Movie Search" />
      <Search search={search} primaryPlaceholder="ex). game" />

      <div>
        {loading && !errorMessage ? (
          <div className="proceeding-message">
              <p>Loading...</p>
          </div>
        ) : errorMessage ? (
          <div className="proceeding-message">
            <p>{errorMessage}</p>
          </div>
        ) : (
          <div className="movies">
            {count > 0 && (
              // 初回レンダリング時はcountを0にしているため非表示
              <div className="result">
                <div>
                <p className="result-message" >Search Title: "{searchResult.title}", </p>
                <p className="result-message" >Genre: "{searchResult.genre}", </p>
                <p className="result-message" >Year: "{searchResult.year}" </p>
                </div>
                <p>Hits: {hitsAmount}</p>
                <div className="items-amount">
                  {hitsAmount <= 10 ? (
                    <p>Display {hitsAmount} items</p>
                  ) : (
                    <p>Display 10 items</p>
                  )}
                </div>
              </div>
            )}

            <div className="movies-container">
              {movies.map((movie, index) => {
                return <Movie movie={movie} key={`${index}-${movie.Title}`} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
