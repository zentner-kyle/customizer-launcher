export class IconHelper {
  static setImage(imageElement, imagePath) {
    imageElement.src = imagePath || window.DEFAULT_ICON_URL;
    imageElement.onerror = (e) => {
      console.warn('Warning, failed to load icon url', imageElement.src, e);
      imageElement.src = window.DEFAULT_ICON_URL;
    };
  }
}

export class AppsHelper {
  static getAllApps() {
    return new Promise((resolve, reject) => {
      var mgmt = navigator.mozApps.mgmt;
      if (!mgmt) {
        reject(new Error('Cannot fetch apps, no permissions'));
      }

      var req = mgmt.getAll();
      req.onsuccess = () => {
        resolve(req.result);
      };
      req.onerror = e => {
        reject(e);
      };
    });
  }
}