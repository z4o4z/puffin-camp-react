import React, { Component } from 'react';
import cn from 'classnames';

export default class Collapse extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.opened !== state.propOpened) {
      return {
        opened: props.opened,
        propOpened: props.opened,
      };
    }

    return null;
  }

  state = {};

  onToggle = () => {
    this.setState(({ opened }) => ({ opened: !opened }));
  };

  render() {
    const { opened } = this.state;

    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={this.onToggle}>
          Button with data-target
        </button>

        <div className={cn('collapse', { show: opened })}>
          <div className="card card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
            squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident.
          </div>
        </div>
      </div>
    );
  }
}
