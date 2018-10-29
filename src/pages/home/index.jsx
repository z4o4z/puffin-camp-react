import React, { Component } from 'react';
import _ from 'lodash';

import Content from 'components/content';

import Item from './components/item';

import classes from './index.css';

export default class Home extends Component {
  state = {
    events: [],
    loading: true,
    nextPage: 0,
    endReached: false,
  };

  componentDidMount() {
    this.onLoadMore();
  }

  onLoadMore = async () => {
    const { nextPage } = this.state;
    this.setState({ loading: true });

    const response = await fetch(`/events?page=${nextPage}`);
    const loadedEvents = await response.json();

    this.setState(({ events }) => ({
      events: [...events, ...loadedEvents],
      loading: false,
      nextPage: nextPage + 1,
      endReached: loadedEvents.length < 10,
    }));
  };

  render() {
    const { events, loading, endReached } = this.state;

    return (
      <div className={classes.home}>
        <Content className={classes.homeInner}>
          <div className={classes.itemsWrapper}>
            {_.map(events, event => (
              <div key={_.get(event, '_id')} className={classes.item}>
                <Item event={event} />
              </div>
            ))}
          </div>

          {loading && <h2 className={classes.loader}>Загрузка...</h2>}

          {!loading &&
            !endReached && (
              <button type="button" onClick={this.onLoadMore} className={classes.button}>
                Загрузить еще
              </button>
            )}
        </Content>
      </div>
    );
  }
}
