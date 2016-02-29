import _ from 'lodash';

const IS_LOADING_SENTINEL = new Object();

export default class {
  constructor() {
    this.assets = {};
    this.onLoadedHandlers = [];
  }

  onLoad(handler) {
    if (this.isAllLoaded()) {
      handler();
    } else {
      this.onLoadedHandlers.push(handler);
    }
  }

  loadAsset(path) {
    if (!(path in this.assets)) {
      let newAsset = new Image();
      this.assets[path] = IS_LOADING_SENTINEL;

      newAsset.onload = () => {
        this.assets[path] = newAsset;

        if (this.isAllLoaded()) {
          this.flushHandlers();
        }
      };
      newAsset.src = path;
    }
  }

  isAllLoaded() {
    return !_.some(this.assets, (value) => {
      return value === IS_LOADING_SENTINEL;
    });
  }

  flushHandlers() {
    let handlers = this.onLoadedHandlers;
    this.onLoadedHandlers = [];

    _.forEach(handlers, (handler) => {
      handler();
    });
  }

  get(path) {
    return this.assets[path];
  }
}
