import React from 'react';
import logo from './logo.svg';
import Food from './components/Food'
import Filter from './components/Filter'
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  


  return (
    <div className="App">
    
      <header className="App-header">
       
        <h1>Food App</h1>
        <Food />
      </header>
    </div>
  );
}

export default App;
