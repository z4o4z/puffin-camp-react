/* eslint-disable no-console */

const UPDATE_TIMEOUT = 3600000;

class Worker {
  reg = null;

  hiddenKey = null;

  contentUpdated = false;

  onVisibilityChange = () => {
    if (document[this.hiddenKey] && this.contentUpdated) {
      window.location.reload();
    }
  };

  onUpdateFound = () => {
    const { installing } = this.reg;

    installing.onstatechange = () => {
      const { state } = installing;

      if (state === 'installed') {
        if (navigator.serviceWorker.controller) {
          console.log('New or updated content is available.');
          this.contentUpdated = true;

          this.onVisibilityChange();
        } else {
          console.log('Content is now available offline!');
        }
      } else if (state === 'redundant') {
        console.error('The installing service worker became redundant.');
      }
    };
  };

  addVisibilityListener() {
    let visibilityChange;

    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.hiddenKey = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.hiddenKey = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hiddenKey = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    if (!visibilityChange) {
      return;
    }

    document.addEventListener(visibilityChange, this.onVisibilityChange, false);
  }

  async registerWorker() {
    const isServiceWorkerAvailable = 'serviceWorker' in navigator;

    if (!isServiceWorkerAvailable || process.env.NODE_ENV === 'development') {
      return;
    }

    try {
      this.reg = await navigator.serviceWorker.register('/service-worker.js');

      this.reg.onupdatefound = this.onUpdateFound;
    } catch (err) {
      console.error('Error during service worker registration:', err);
    }
  }

  startWatchingOnUpdates() {
    if (!this.reg) {
      return;
    }

    setInterval(async () => {
      console.log('updating SW');

      try {
        await this.reg.update();
      } catch (err) {
        console.info('something went wrong when updating SW');
      }
    }, UPDATE_TIMEOUT);
  }

  async start() {
    this.addVisibilityListener();

    await this.registerWorker();

    this.startWatchingOnUpdates();
  }
}

export default new Worker();
