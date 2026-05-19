import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./component/PremiumDesign.css";
import App from './App';
import * as serviceWorker from './serviceWorker';

console.log("Reload");

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
