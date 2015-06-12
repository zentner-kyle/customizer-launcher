import AchievementsService from
  'components/fxos-achievements-service/dist/achievements-service';

export class IconHelper {
  static setImage(imageElement, imagePath) {
    imageElement.src = imagePath || window.DEFAULT_ICON_URL;
    imageElement.onerror = (e) => {
      console.warn('Warning, failed to load icon url', imageElement.src, e);
      imageElement.src = window.DEFAULT_ICON_URL;
    };
  }

  static getIconURL(app, icons) {
    if (!icons || !Object.keys(icons).length) {
      return '';
    }

    // The preferred size is 30 by the default. If we use HDPI device, we may
    // use the image larger than 30 * 1.5 = 45 pixels.
    var preferredIconSize = 30 * (window.devicePixelRatio || 1);
    var preferredSize = Number.MAX_VALUE;
    var max = 0;

    for (var size in icons) {
      size = parseInt(size, 10);
      if (size > max) {
        max = size;
      }

      if (size >= preferredIconSize && size < preferredSize) {
        preferredSize = size;
      }
    }
    // If there is an icon matching the preferred size, we return the result,
    // if there isn't, we will return the maximum available size.
    if (preferredSize === Number.MAX_VALUE) {
      preferredSize = max;
    }

    var url = icons[preferredSize];

    if (url) {
      return !(/^(http|https|data):/.test(url)) ? app.origin + url : url;
    } else {
      return '';
    }
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

export class AchievementsHelper {
  constructor() {
    // Create an achievements service
    this.achievementsService = new AchievementsService();

    window.addEventListener('achievement-rewarded', this);
  }

  handleEvent(aEvent) {
    this.achievementsService.reward(aEvent.detail);
  }
}
