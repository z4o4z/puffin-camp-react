import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from 'components/header';
import Content from 'components/content';

import classes from './app.css';

const Home = lazy(() => import('pages/home'));
const Event = lazy(() => import('pages/event'));

export default function App() {
  return (
    <div className={classes.app}>
      <Header />

      <Suspense
        fallback={
          <Content>
            <h2 style={{ textAlign: 'center' }}>Загрузка...</h2>
          </Content>
        }
      >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:id" exact component={Event} />
        </Switch>
      </Suspense>
    </div>
  );
}
