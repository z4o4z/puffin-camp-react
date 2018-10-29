import React from 'react';
import { Route, Link } from 'react-router-dom';

import Content from '../content';

import classes from './index.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <Content className={classes.headerInner}>
        <div>
          <Route path="/" exact>
            {match => (match ? <h1>Puffin Camp</h1> : <Link to="/">Puffin Camp</Link>)}
          </Route>
        </div>
      </Content>
    </header>
  );
}
