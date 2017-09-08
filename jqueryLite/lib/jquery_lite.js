/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map