const DomNodeCollection = require('./dom_node_collection');

let queue = [];
let loaded = false;

window.$l = (el) => {
  if (el instanceof HTMLElement) {

    return new DomNodeCollection([el]);

  } else if (typeof(el) === 'string'){

    let nodeList = document.querySelectorAll(el);
    let nodeArray = Array.from(nodeList);

    return new DomNodeCollection(nodeArray);
  } else if (typeof(el) === 'function') {
    if (loaded === false) {
      queue.push(el);
    } else {
      el();
    }
  }


};

document.addEventListener('DOMContentLoaded', () => {
  loaded = true;
  queue.forEach((fn) => {
    fn();
  });
});
