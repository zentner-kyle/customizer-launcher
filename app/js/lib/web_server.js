import /* global HTTPServer */ 'components/fxos-web-server/dist/fxos-web-server';

export default class WebServer {
  constructor() {
    this.lastLaunchedManifestURL = null;
    if (!this.httpServer) {
      this.httpServer = new HTTPServer(3215);
    }

    this.httpServer.addEventListener('request', (evt) => {
      var request = evt.request;
      var response = evt.response;
      response.headers['Access-Control-Allow-Origin'] = '*';

      if (request.path === '/request') {
        response.send(this.lastLaunchedManifestURL);
        return;
      }

      if (request.path === '/confirm') {
        var url = (request.params && request.params.url) || '';
        if (url &&
            url === this.lastLaunchedManifestURL){
          response.send('STOP_SERVER_INVOKED');
          this.stopServer();
          return;
        }
      }
      // Default response for all other requests
      response.send(null, 404);
    });
  }

  setData(url) {
    this.lastLaunchedManifestURL = url;
  }

  startServer() {
    return new Promise((resolve, reject) => {
      this.httpServer.start();
      console.log('WebServer Started');
      resolve(true);
    });
  }

  stopServer() {
    if (!this.httpServer) {
      return;
    }
    this.httpServer.stop();
    this.lastLaunchedManifestURL = null;
    console.log('WebServer Stopped');
  }
}
