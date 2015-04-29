import { View } from 'components/fxos-mvc/dist/mvc';
import 'components/gaia-list/gaia-list';
import { IconHelper } from 'js/lib/helpers';

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export default class ListView extends View {
  constructor() {
    this.el = document.createElement('gaia-list');
    this.el.className = 'app-list';
    
    this.elements = Object.create(null);
  }

  update(list) {
    for (let manifestURL in list) {
      let data = list[manifestURL];
      if (!this.elements[manifestURL]) {
        this.elements[manifestURL] = this.addElement(data);
      }
    }
  }

  addElement(data) {
    var item = document.createElement('li');
    item.classList.add('app');
    item.innerHTML = this.listItemTemplate(data);
    IconHelper.setImage(item.querySelector('.icon'), data.icon);
    this.el.appendChild(item);

    return item;
  }

  listItemTemplate({ name, author }) {
    var string = `
      <img class="icon" />
      <div flex class="description">
        <p class="name">${capitalize(name)}</p>
        <p class="author">${author}</p>
      </div>
      <i class="launch-app" data-icon="forward-light"></i>`;
    return string;
  }

}
