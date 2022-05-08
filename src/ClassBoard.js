export class VirtualKeyBoard {
  constructor(title) {
    this.title = title;
    this.footer = 'Приложение сделано на платформе Windows. Для смены языка нажмите Ctrl + Alt';
  }

  init() {
    let [div, title, footer, textarea] = [
      document.createElement('div'),
      document.createElement('h1'),
      document.createElement('footer'),
      document.createElement('textarea')
    ];
    title.textContent = this.title;
    footer.textContent = this.footer;
    div.classList.add('container');
    title.classList.add('title');
    div.append(title);
    div.append(textarea);
    document.body.append(div);
    document.body.append(footer);
  }

  createEl(obj) {
    let language = localStorage.getItem('lang');
    let div = document.createElement('div');
    div.setAttribute('data-code', obj.code);
    div.classList.add(obj.class);

    if (obj.shiftValue) {
      div.setAttribute('data-shiftValue', obj.shiftValue);
    }

    if (obj.value) {
      div.innerHTML = obj.value;
    } else if (language === 'ru') {
      div.innerHTML = obj.ru;
      if (obj.ru) div.setAttribute('data-lang', obj.en);
    } else if (obj.en) {
      div.innerHTML = obj.en;
      if (obj.ru) div.setAttribute('data-lang', obj.ru);
    }

    return div;
  }

  createContent(arr) {
    let div = document.createElement('div');
    div.classList.add('keywords');
    arr.forEach(item => {
      let i = this.createEl(item);
      div.append(i);
    });
    return div;
  }

  render(arrKey) {
    this.init();
    let [container, textarea] = [
      document.querySelector('.container'),
      document.querySelector('textarea')
    ];
    textarea.focus();
    container.append(this.createContent(arrKey));
  }
}
