import { Controller } from 'components/fxos-mvc/dist/mvc';
import 'gaia-component';
import MainView from 'js/view/main_view';
import ListController from 'js/controller/list_controller';

export default class MainController extends Controller {

	constructor() {
		this.view = new MainView({ el: document.body });
		this.listController = new ListController();
		super();
	}

	main() {
	   this.view.render();
	   this.listController.main();
	}
}
