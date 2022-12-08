import React from 'react';
import ReactDOM from 'react-dom/client';
import {Map,set} from './map.js';
import SearchBar from './Component/Search/Search.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchBar></SearchBar>
  </React.StrictMode>
);
