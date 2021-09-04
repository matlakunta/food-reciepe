import React, { useState } from 'react';
import Axios from 'axios';
import "./App.css";
import Recipe from './components/Recipe';
import {v4 as uuidv4} from 'uuid';

const App = () => {
const [query,setquery] = useState("");
const [recipes,setRecipes] = useState([]);

  const APP_ID = "041b59e1";

  const APP_KEY = "c8dbacd0361e8e7ccdc105d3aa2ad7be";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    const result = await Axios.get(url);
    setRecipes(result.data.hits)

    console.log(result);
    setquery("");
  };

  const onChange = e => {
    setquery(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  return (
    <div className = "App">
      <h1>Food Recipe Search</h1>
      <form className="search-form" onSubmit={onSubmit}>
        <input type="text"  placeholder="SearchFood" autoComplete="off" onChange={onChange}  value={query}/>
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes!==[] &&
        recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
