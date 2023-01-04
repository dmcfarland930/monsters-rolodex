import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';



const App = () => {

  const [searchField, setSearchField] = useState(''); 
  const [monsters, setMonsters] = useState([])
  // set default state to monsters
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  
  // Because the dependencies are empty, they will not change, and only ran on mount.
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, []);

  // This effect will be run whenever monsters or searchField changes.
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField]);

  const onSearchChange= (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString); 
  };

  return (
    <div className="App">        
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox 
        className='monster-search-box'
        placeholder='Search Monsters...'
        onChangeHandler={onSearchChange} 
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
