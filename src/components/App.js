import React, { useState, useEffect } from "react";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import "../stylesheet.css";

// const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
// sはキーワードを意味する
// const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=f1929b89";
// iはimdbIDを意味する
const MOVIE_API_URL = "http://www.omdbapi.com/?s=game&apikey=f1929b89";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [lists, setLists]=useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [count, setCount] = useState(0);
  const [hitsAmount, setHitsAmount] = useState(0);

  // 初回レンダリング
  useEffect(() => {
    // エラーメッセージが出た際に、更新ボタンを押した時用のエラーメッセージの初期化
    setErrorMessage(null);

    fetch(MOVIE_API_URL)
      // 1つ目のthenは{}で括って複数行にはできず、必ず1行にしなければならない
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        // setLists(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchTitle, genre) => {
    // エラーメッセージが出た後に検索した時用のエラーメッセージの初期化
    setErrorMessage(null);
    // result表示用仕込み
    setCount(count + 1);
    setSearchName(searchTitle);

    setLoading(true);
    fetch(`http://www.omdbapi.com/?s=${searchTitle}&apikey=f1929b89`)
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

      // if(genre==="movie"){
      //   const temp=movies.filter(movie=>{
      //     return movie.Type===genre
      //   })
      //   setLists(temp);
      // } else if(genre==="series"){
      //     setLists(movies.filter(movie=>{
      //       return movie.Type===genre
      //     }))
      // } else {
      //     setLists(movies)
      // }
      // 1回分時差がある理由は？
      // console.log(movies);
      // console.log("list")
      // console.log(lists);
  };

  return (
    <div className="App">
      <Header text="Movie Search" />
      <Search search={search} />

      <div>
        {loading && !errorMessage ? (
          <p>loading...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <div className="movies">
            {count > 0 && (
              <div className="result">
                <p>Search Title: "{searchName}" </p>
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

            {/* {lists.map((movie, index) => { */}
            {movies.map((movie, index) => {
              return <Movie movie={movie} key={`${index}-${movie.Title}`} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
