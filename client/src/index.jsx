import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Overview from './components/Overview.jsx';

ReactDOM.render(
 React.createElement(App),
 document.getElementById('app')
);
ReactDOM.render(
 React.createElement(Overview),
 document.getElementById('overview')
);