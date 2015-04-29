import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-header/dist/gaia-header';

export default class MainView extends View {

  render() {
    super();
  }

  template() {
    var string = `
      <gaia-header>
        <h1>Customizer Launcher</h1>
      </gaia-header>`;
    return string;
  }
}
