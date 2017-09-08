class DomNodeCollection {
  constructor(elementArray) {
    this.elementArray = elementArray;
  }

  each(cb) {
    this.elementArray.forEach(cb);
  }

  html(str) {
    if (str === undefined) { // when not given an argument
      return this.elementArray[0].innerHTML;
    } else {
      this.elementArray.forEach((el) => {
        el.innerHTML = str;
      });
    }
  }

  empty() {
    this.elementArray.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(arg) {
    if (typeof(arg) === 'string') {
      this.elementArray.forEach((el) => {
        el.innerHTML += arg; // append a string on
      });
    } else {
      this.elementArray.forEach((el) => {
        el.innerHTML += arg.outerHTML;
      });
    }
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.each( node => node.setAttribute(key, val));
    } else {
      return this.elementArray[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass));
  }

  children() {
    let holder = [];
    this.each(node => holder.push(node.children));
    return new DomNodeCollection(holder);
  }

  parent() {
    let holder = [];
    this.each(node => holder.push(node.parentNode));
    return new DomNodeCollection(holder);
  }

  find(selector) {
    let result = [];
    this.each(node => {
      let found = node.querySelectorAll(selector);
      result = result.concat(found);
    });
    return result;
  }

  remove() {
    this.each(node => {
      node.parentNode.removeChild(node);
    });
  }

  on(type, callback) {
    this.each(node => {
      node.addEventListener(type, callback);
      node['callback'] = callback;
    });
  }

  off(type) {
    this.each(node => {
      node.removeEventListener(type, node['callback']);
    });
  }
}

module.exports = DomNodeCollection;
