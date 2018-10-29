import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Content from 'components/content';
import DateTime from 'components/date-time';

import classes from './index.css';

export default class Event extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    event: {},
    loading: true,
  };

  componentDidMount() {
    this.load();
  }

  load = async () => {
    const { match } = this.props;

    this.setState({ loading: true });

    const response = await fetch(`/events/${match.params.id}`);
    const loadedEvent = await response.json();

    this.setState({
      event: loadedEvent,
      loading: false,
    });
  };

  render() {
    const { event, loading } = this.state;

    if (loading) {
      return (
        <Content>
          <h2 className={classes.loader}>Загрузка...</h2>
        </Content>
      );
    }

    const {
      title,
      address,
      content,
      start_date: startDate,
      finish_date: finishDate,
      hero_image_url: heroImageUrl,
    } = event;

    return (
      <div className={classes.event}>
        <Content className={classes.eventInner}>
          <div className={classes.imageWrapper}>
            <div style={{ backgroundImage: `url(${heroImageUrl})` }} className={classes.image} />

            <div className={classes.imageInner}>
              <header className={classes.header}>
                <div className={classes.headerLeft}>
                  <DateTime startDate={startDate} finishDate={finishDate} />
                </div>
                <div className={classes.headerRight}>{address}</div>
              </header>

              <footer className={classes.footer}>{title}</footer>
            </div>
          </div>

          <div
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: _.replace(content, /src="\//g, 'src="https://events.dev.by/'),
            }}
          />
        </Content>
      </div>
    );
  }
}
