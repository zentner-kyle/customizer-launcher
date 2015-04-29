import { RoutingController } from 'components/fxos-mvc/dist/mvc';
import 'gaia-component';
import MainView from 'js/view/main_view';
import ListController from 'js/controller/list_controller';

export default class MainController extends RoutingController {

	constructor() {
		this.view = new MainView({ el: document.body });
		this.listController = new ListController();
		super({
			apps: this.listController
		});
	}

	main() {
	   this.view.render();
	   window.location.hash = '#apps';
	   document.body.classList.remove('loading');
	}
}
