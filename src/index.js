
import "babel-polyfill";
import React from 'react';
import {render} from  'react-dom';
// import configStores from './redux/store'

// const store = configStores();
// import Root from './containers';
import Header from './components/Header/Header'
render(<Header/>,document.getElementById('root'));
