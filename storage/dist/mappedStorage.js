"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLockableMappedStorage = exports.createMappedStorage = void 0;
const createMappedStorage = (converter, storage) => {
    const stats = (key) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.stats(yield converter.to(key));
    });
    const exists = (key) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.exists(yield converter.to(key));
    });
    const load = (key) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.load(yield converter.to(key));
    });
    const save = (key, item) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.save(yield converter.to(key), item);
    });
    const deleteItem = (key) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.delete(yield converter.to(key));
    });
    return {
        stats,
        exists,
        load,
        save,
        delete: deleteItem,
    };
};
exports.createMappedStorage = createMappedStorage;
const createLockableMappedStorage = (converter, storage) => {
    const stats = (key) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.stats(yield converter.to(key));
    });
    const exists = (key) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.exists(yield converter.to(key));
    });
    const locked = (key) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.locked(yield converter.to(key));
    });
    const lock = (key) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.lock(yield converter.to(key));
    });
    const waitForLock = (key, timeoutMs) => __awaiter(void 0, void 0, void 0, function* () {
        return storage.waitForLock(yield converter.to(key), timeoutMs);
    });
    return {
        tokenKinds: storage.tokenKinds,
        stats,
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
exports.createLockableMappedStorage = createLockableMappedStorage;
//# sourceMappingURL=mappedStorage.js.map