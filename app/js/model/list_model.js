import { Model } from 'components/fxos-mvc/dist/mvc';
import { AppsHelper } from 'js/lib/helpers';


export default class ListModel extends Model {
  filterApps(apps) {
    var excludedApps = ['Keyboard', 'Settings'];

    return apps.filter(app =>
      app.manifest.role !== 'addon' &&
      app.manifest.role !== 'theme' &&
      excludedApps.indexOf(app.manifest.name) === -1);
  }

  fillAppDetails(app) {
    var detail = Object.create(null);
    detail.manifestURL = app.manifestURL;
    detail.name = app.manifest.name;
    detail.description = app.manifest.description;
    detail.type = app.manifest.role;
    detail.url = '';
    detail.icon = '';
    detail.author = app.manifest.developer ? app.manifest.developer.name : '';
    return detail;
  }

  getAppList() {
    return new Promise((resolve, reject) => {
      var installedApps = Object.create(null);
      AppsHelper.getAllApps().then(allApps => {
        var filterList = this.filterApps(allApps);
        filterList.forEach(app => {
          installedApps[app.manifestURL] = this.fillAppDetails(app);
        });

        this.logObject(installedApps);
        resolve(installedApps);
      });
    });
  }

  logObject(app) {
    for (let i in app)
    {
      console.log('property & values: ', i + ' : & : ');
      console.log(app[i]);
    }
  }
}

