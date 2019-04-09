import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Overview from './components/Overview.jsx';

// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<Overview />, document.getElementById('app'));
window.Overview = Overview;
window.Sidebar = App;