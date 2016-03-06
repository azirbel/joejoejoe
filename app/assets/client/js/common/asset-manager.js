import _ from 'lodash';

const IS_LOADING_SENTINEL = new Object();

export default class AssetManager {
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

  loadImage(path) {
    if (!(path in this.assets)) {
      let newAsset = new Image();
      this.assets[path] = IS_LOADING_SENTINEL;

      newAsset.onload = () => {
        this.assets[path] = newAsset;

        this.tryFlush();
      };
      //TODO: handle fail
      newAsset.src = path;
    }
  }

  loadAsset(path) {
    if (!(path in this.assets)) {
      this.assets[path] = IS_LOADING_SENTINEL;

      let request = new XMLHttpRequest();

      request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
          this.assets[path] = request.responseText;
          this.tryFlush();
        }
      };
      //TODO: handle fail
      request.open('GET', path, true);
      request.send();
    }
  }

  tryFlush() {
    if (this.isAllLoaded()) {
      this.flushHandlers();
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
