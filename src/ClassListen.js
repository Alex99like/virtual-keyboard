import { arrKey } from './arrKey';

export class ListenKey {
  constructor(textarea, keyboard) {
    this.textarea = document.querySelector(textarea);
    this.keyboard = document.querySelector(keyboard);
    this.boolUp = true;
    this.fnKey = ['ShiftRight', 'ShiftLeft', 'CapsLock', 'ControlRight', 'ControlLeft', 'AltLeft', 'AltRight', 'MetaLeft'];

    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.addActive(e);
      this.enterText(e);
      this.shiftKey(e);
      this.capsLK(e);
      this.translate(e);
      this.capsBool = false;
    });
    window.addEventListener('keyup', (e) => {
      this.removeActive(e);
      this.shiftKey(e);
      this.capsBool = true;
    });

    this.keyboard.addEventListener('mousedown', (e) => {
      this.clickKey(e);
      this.addActive(e.target.dataset);
      this.shiftKey(e.target.dataset);
      this.clickShift(e.target.dataset);
      this.capsLK(e.target.dataset);
      this.translate(e);
    });

    this.keyboard.addEventListener('mouseup', (e) => {
      this.shiftKey(e.target.dataset);
      this.clickShift(e);
      this.removeActive(e.target.dataset);
    });
  }

  translate(event) {
    this.language = localStorage.getItem('lang');

    let langSym = document.querySelectorAll('[data-lang]');
    if (event.ctrlKey && event.altKey) {
      if (this.language === 'en') {
        localStorage.setItem('lang', 'ru');
      } else {
        localStorage.setItem('lang', 'en');
      }

      for (let key of langSym) {
        let [value, lang] = [
          key.textContent,
          key.dataset.lang
        ];
        key.textContent = lang;
        key.dataset.lang = value;
      }
      if (this.boolUp) {
        this.lowerCase();
      } else {
        this.upperCase();
      }
    }
  }

  addActive(event) {
    if (!arrKey.find((item) => event.code === item.code)) return;
    let item = document.querySelector(`[data-code=${event.code}]`);
    item.classList.add('active');
  }

  removeActive(event) {
    if (!arrKey.find((item) => event.code === item.code)) return;
    let item = document.querySelector(`[data-code=${event.code}]`);
    setTimeout(() => item.classList.remove('active'), 150);
  }

  enterText(event) {
    let text = this.textarea;
    let key = document.querySelector(`[data-code=${event.code}]`);
    this.checkKey(text, key, event);
  }

  checkKey(area, elem, event) {
    if (!arrKey.find((item) => event.code === item.code
          && !this.fnKey.includes(event.code))) return;
    let [count, val] = [area.selectionEnd, area.value.split('')];
    switch (event.code) {
      case 'Backspace':
        val.splice(count - 1, 1);
        area.value = val.join('');
        area.selectionEnd = count - 1;
        break;
      case 'Enter':
        val.splice(count, 0, '\n');
        area.value = val.join('');
        area.selectionEnd = count + 1;
        break;
      case 'Delete':
        val.splice(count, 1);
        area.value = val.join('');
        area.selectionEnd = count;
        break;
      case 'Space':
        val.splice(count, 0, ' ');
        area.value = val.join('');
        area.selectionEnd = count + 1;
        break;
      case 'Tab':
        val.splice(count, 0, '  ');
        area.value = val.join('');
        area.selectionEnd = count + 4;
        break;
      default:
        val.splice(count, 0, elem.textContent);
        area.value = val.join('');
        area.selectionEnd = count + 1;
    }
  }

  clickKey(event) {
    let text = this.textarea;
    let key = event.target;
    if (event.target.hasAttribute('data-code')) {
      this.checkKey(text, key, event.target.dataset);
    }
  }

  shiftKey(event) {
    if (this.shiftBool) return;
    if (event.code !== 'ShiftLeft' && event.code !== 'ShiftRight') return;

    if (event.shiftKey) {
      this.replace();
      if (this.boolUp) {
        this.upperCase();
        this.boolUp = false;
      } else {
        this.lowerCase();
        this.boolUp = true;
      }
    } else {
      this.replace();
      if (this.boolUp) {
        this.upperCase();
        this.boolUp = false;
      } else {
        this.lowerCase();
        this.boolUp = true;
      }
    }
  }

  capsLK(event) {
    let active = document.querySelector(`[data-code=${event.code}]`);
    if (event.code !== 'CapsLock' || !this.capsBool) return;
    if (this.boolUp) {
      this.upperCase();
      this.boolUp = false;
    } else {
      this.lowerCase();
      this.boolUp = true;
    }
    active.classList.toggle('addActive');
  }

  clickShift(event) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      if (this.boolUp) {
        this.lowerCase();
      } else {
        this.upperCase();
      }
    }
  }

  upperCase() {
    let arrSym = document.querySelectorAll('.key');
    for (let sym of arrSym) {
      sym.textContent = sym.textContent.toUpperCase();
    }
  }

  lowerCase() {
    let arrSym = document.querySelectorAll('.key');
    for (let sym of arrSym) {
      sym.textContent = sym.textContent.toLowerCase();
    }
  }

  replace() {
    let arrItem = document.querySelectorAll('[data-shiftValue]');
    for (let item of arrItem) {
      let [value, shiftValue] = [
        item.textContent, item.dataset.shiftvalue
      ];
      item.textContent = shiftValue;
      item.dataset.shiftvalue = value;
    }
  }

  void() {
    this.capsBool = true;
  }
}
