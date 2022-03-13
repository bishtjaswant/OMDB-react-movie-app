import React, { useState } from "react";


function App() {
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState('');


  const fetchMovie = () => {
 
 
    console.log('api :>> ', process.env.REACT_APP_API_KEY); 
    console.log(query);
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(data => {

        setMovie(data.Search);
          
        console.log(data)
      })
      .catch(error => console.log(error));
  }

  const debouncing = (cb, delay) => {
    let timer = null;

    return function (...args) {
      if (timer)
        clearTimeout(timer);

      timer = setTimeout(() => {
        cb.apply(this, args);
      }, delay);
    }
  }


  const getQuerySuggesstion = debouncing(setQuery, 1000);

  return (
    <div className="container">
      <div className="row">
        <div className="col m12">
          <h1 className="flow-text">search movie via Api</h1>

          <div className="row">
            <div className="col m12">
              <div className="input-field">
                <label htmlFor="movie">Movie Name</label>
                <input type="search" onChange={(e) => getQuerySuggesstion(e.target.value)} name="movie" id="movie" />
              </div>

              <button type="button" onClick={() => fetchMovie()} class="waves-effect waves-light btn">Hit</button>

            </div>


            <div className="row">

              {
                movie.map((item) => (

                  <div className="col s12 m6 l6 " style={{width:"30%" , margin:"0 10px"}}>
                    <div className="card ">
                      <div className="card-content  ">
                        <img src={item['Poster']} alt="" className="responsive-img" />
                        <span className="card-title">{item['Title']}</span>
                        <div> <strong>Release date :: </strong> <p style={{display:"inline"}}> {item['Year']} </p> </div>
                        <span class="new badge">{item['Type']}</span>
                      </div>
                      {/* <div className="card-action">
                        <a href="/">This is a link</a>
                        <a href="/">This is a link</a>
                      </div> */}
                    </div>
                  </div>

                ))
              }


            </div>


          </div>
        </div>
      </div>
    </div>
  );

}

export default App;
