const TIMEOUT = 3000;

export const TOAST_TYPE = {
  SUCCESS: 0,
  INFO: 1,
  WARNING: 2,
  ERROR: 3,
  LOADING: 4,
};

class ToastManager {
  constructor() {
    this.timeout = TIMEOUT;
  }

  subscribe(controllerObj) {
    this.controller = controllerObj;
  }

  show(data) {
    if (!this.controller) return;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    let { duration } = data || {};
    if (duration > 0) {
      this.timeout = duration;
    } else {
      this.timeout = TIMEOUT;
    }
    this.controller.set(data);
    this._processing();
  }

  _processing() {
    this.timer = setTimeout(() => {
      this.close();
    }, this.timeout);
  }

  close() {
    if (!this.controller) return;
    this.controller.set(null);
  }
}

const _toastManager = new ToastManager();
export default _toastManager;
