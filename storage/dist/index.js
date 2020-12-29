/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMappedContainerItemStorage": () => /* reexport safe */ _mappedContainerStorage__WEBPACK_IMPORTED_MODULE_1__.createMappedContainerItemStorage,
/* harmony export */   "createMappedContainerStorage": () => /* reexport safe */ _mappedContainerStorage__WEBPACK_IMPORTED_MODULE_1__.createMappedContainerStorage,
/* harmony export */   "createLockableMappedStorage": () => /* reexport safe */ _mappedStorage__WEBPACK_IMPORTED_MODULE_2__.createLockableMappedStorage,
/* harmony export */   "createMappedStorage": () => /* reexport safe */ _mappedStorage__WEBPACK_IMPORTED_MODULE_2__.createMappedStorage,
/* harmony export */   "createLockableSoloStorage": () => /* reexport safe */ _singularStorage__WEBPACK_IMPORTED_MODULE_3__.createLockableSoloStorage,
/* harmony export */   "createSingularStorage": () => /* reexport safe */ _singularStorage__WEBPACK_IMPORTED_MODULE_3__.createSingularStorage
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types.ts");
/* harmony import */ var _mappedContainerStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mappedContainerStorage */ "./src/mappedContainerStorage.ts");
/* harmony import */ var _mappedStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mappedStorage */ "./src/mappedStorage.ts");
/* harmony import */ var _singularStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./singularStorage */ "./src/singularStorage.ts");






/***/ }),

/***/ "./src/mappedContainerStorage.ts":
/*!***************************************!*\
  !*** ./src/mappedContainerStorage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMappedContainerStorage": () => /* binding */ createMappedContainerStorage,
/* harmony export */   "createMappedContainerItemStorage": () => /* binding */ createMappedContainerItemStorage
/* harmony export */ });
const createMappedContainerStorage = (keyConverter, storage) => {
    const info = async (key) => {
        return storage.info(await keyConverter.to(key));
    };
    const exists = async (key) => {
        return storage.exists(await keyConverter.to(key));
    };
    const create = async (key) => {
        return storage.create(await keyConverter.to(key));
    };
    const deleteContainer = async (key) => {
        return storage.delete(await keyConverter.to(key));
    };
    const parent = async (key) => {
        const foreignKey = await storage.parent(keyConverter.to(key));
        return foreignKey ? await keyConverter.from(foreignKey) : null;
    };
    const children = async (key) => {
        const foreignKeys = await storage.children(keyConverter.to(key));
        return Promise.all(foreignKeys.map(async (f) => await keyConverter.from(f)));
    };
    return {
        info,
        exists,
        create,
        delete: deleteContainer,
        parent,
        children,
    };
};
const createMappedContainerItemStorage = (itemKeyConverter, storage) => {
    const items = async (key) => {
        const foreignKeys = await storage.items(key);
        return Promise.all(foreignKeys.map(async (f) => await itemKeyConverter.from(f)));
    };
    return {
        info: storage.info,
        exists: storage.exists,
        create: storage.create,
        delete: storage.delete,
        parent: storage.parent,
        children: storage.children,
        items,
    };
};


/***/ }),

/***/ "./src/mappedStorage.ts":
/*!******************************!*\
  !*** ./src/mappedStorage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMappedStorage": () => /* binding */ createMappedStorage,
/* harmony export */   "createLockableMappedStorage": () => /* binding */ createLockableMappedStorage
/* harmony export */ });
const createMappedStorage = (converter, storage) => {
    const info = async (key) => {
        return storage.info(await converter.to(key));
    };
    const exists = async (key) => {
        return storage.exists(await converter.to(key));
    };
    const load = async (key) => {
        return storage.load(await converter.to(key));
    };
    const save = async (key, item) => {
        return storage.save(await converter.to(key), item);
    };
    const deleteItem = async (key) => {
        return storage.delete(await converter.to(key));
    };
    return {
        info,
        exists,
        load,
        save,
        delete: deleteItem,
    };
};
const createLockableMappedStorage = (converter, storage) => {
    const info = async (key) => {
        return storage.info(await converter.to(key));
    };
    const exists = async (key) => {
        return storage.exists(await converter.to(key));
    };
    const locked = async (key) => {
        return storage.locked(await converter.to(key));
    };
    const lock = async (key) => {
        return storage.lock(await converter.to(key));
    };
    const waitForLock = async (key, timeoutMs) => {
        return storage.waitForLock(await converter.to(key), timeoutMs);
    };
    return {
        lockTokenKinds: storage.lockTokenKinds,
        info,
        exists,
        locked,
        lock,
        unlock: storage.unlock,
        waitForLock,
        load: storage.load,
        save: storage.save,
        delete: storage.delete,
    };
};


/***/ }),

/***/ "./src/singularStorage.ts":
/*!********************************!*\
  !*** ./src/singularStorage.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSingularStorage": () => /* binding */ createSingularStorage,
/* harmony export */   "createLockableSoloStorage": () => /* binding */ createLockableSoloStorage
/* harmony export */ });
const createSingularStorage = (locator, storage) => {
    const info = () => {
        return storage.info(locator.key());
    };
    const exists = () => {
        return storage.exists(locator.key());
    };
    const load = () => {
        return storage.load(locator.key());
    };
    const save = (item) => {
        return storage.save(locator.key(), item);
    };
    const deleteItem = () => {
        return storage.delete(locator.key());
    };
    return {
        info,
        exists,
        load,
        save,
        delete: deleteItem,
    };
};
const createLockableSoloStorage = (locator, storage) => {
    const info = () => {
        return storage.info(locator.key());
    };
    const exists = () => {
        return storage.exists(locator.key());
    };
    const locked = () => {
        return storage.locked(locator.key());
    };
    const lock = () => {
        return storage.lock(locator.key());
    };
    const waitForLock = (timeoutMs) => {
        return storage.waitForLock(locator.key(), timeoutMs);
    };
    return {
        tokenKinds: storage.lockTokenKinds,
        info,
        exists,
        locked,
        lock,
        unlock: storage.unlock,
        waitForLock,
        load: storage.load,
        save: storage.save,
        delete: storage.delete,
    };
};


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// -------------------- Storage  --------------------//



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=index.js.map