import { Controller } from 'components/fxos-mvc/dist/mvc';

import ListModel from 'js/model/list_model';
import ListView from 'js/view/list_view';
import WebServer from 'js/lib/web_server';

export default class ListController extends Controller {
  constructor() {
    this.model = new ListModel();
    this.listView = new ListView();
    this.webServer = new WebServer();
  }

  main() {    
    this.createList();
  }

  createList() {
    this.listView.render();
    document.body.appendChild(this.listView.el);

    this.model.getAppList().then(allApps => {
      this.listView.update(allApps);
      this.listView.setOpenHandler(this.handleOpen.bind(this));
    });
  }

  handleOpen(data) {
    if (data.app) {
      this.webServer.startServer().then(result => {
        if (result) {
          this.launchApp(data);
          this.webServer.setData(data.manifestURL);
        }
      });
    } else {
      throw new Error('Could not open app: ' + data);
    }
  }

  launchApp(data) {
      data.app.launch();
  }
}
