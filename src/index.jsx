import React from 'react';
import { hot } from 'react-hot-loader';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import worker from './worker';

import App from './app';

import classes from './app.css';

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const rootNode = document.getElementById('root');

rootNode.classList.add(classes.root);

worker.start();

// moment.locale('ru');

render(<Root />, rootNode);

export default hot(module)(Root);
