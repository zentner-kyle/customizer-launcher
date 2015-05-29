import { Model } from 'components/fxos-mvc/dist/mvc';
import { AppsHelper, IconHelper } from 'js/lib/helpers';

export default class ListModel extends Model {
  getAllApps() {
    return new Promise((resolve, reject) => {
      AppsHelper.getAllApps().then(allApps => {
        resolve(allApps);
      });
    });
  }

  filterCustomizerAddon(apps) {
    return apps.filter(app =>
      app.manifestURL == 'app://customizer.gaiamobile.org/manifest.webapp');
  }

  getCustomizerAddOn(allApps) {
    return new Promise((resolve, reject) => {
      var addOnList = this.filterCustomizerAddon(allApps);
      if (addOnList && addOnList.length == 1) {
        resolve(addOnList[0]);
      } else {
        reject(new Error('Cannot fetch customizer add on'));
      }
    });
  }

  filterApps(apps) {
    var excludedApps = ['app://keyboard.gaiamobile.org/manifest.webapp',
                        'app://customizer-launcher.gaiamobile.org/manifest.webapp'];

    return apps.filter(app =>
      app.manifest.role !== 'addon' &&
      app.manifest.role !== 'theme' &&
      app.manifest.role !== 'system' &&
      excludedApps.indexOf(app.manifestURL) === -1);
  }

  fillAppDetails(app) {
    var detail = Object.create(null);
    detail.manifestURL = app.manifestURL;
    detail.name = app.manifest.name;
    detail.description = app.manifest.description;
    detail.icon = IconHelper.getIconURL(app, app.manifest.icons);
    detail.author = app.manifest.developer ? app.manifest.developer.name : '';
    detail.app = app;
    return detail;
  }

  getAppList(allApps) {
    return new Promise((resolve, reject) => {
      var installedApps = Object.create(null);
      var filterList = this.filterApps(allApps);
      filterList.forEach(app =>
        installedApps[app.manifestURL] = this.fillAppDetails(app));
      resolve(installedApps);
    });
  }
}

