"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLockableSoloStorage = exports.createSoloStorage = void 0;
const createSoloStorage = (locator, storage) => {
    const key = locator.key();
    const stats = () => {
        return storage.stats(key);
    };
    const exists = () => {
        return storage.exists(key);
    };
    const load = () => {
        return storage.load(key);
    };
    const save = (item) => {
        return storage.save(key, item);
    };
    const deleteItem = () => {
        return storage.delete(key);
    };
    return {
        stats,
        exists,
        load,
        save,
        delete: deleteItem,
    };
};
exports.createSoloStorage = createSoloStorage;
const createLockableSoloStorage = (locator, storage) => {
    const key = locator.key();
    const stats = () => {
        return storage.stats(key);
    };
    const exists = () => {
        return storage.exists(key);
    };
    const locked = () => {
        return storage.locked(key);
    };
    const lock = () => {
        return storage.lock(key);
    };
    const waitForLock = (timeoutMs) => {
        return storage.waitForLock(key, timeoutMs);
    };
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
exports.createLockableSoloStorage = createLockableSoloStorage;
//# sourceMappingURL=soloStorage.js.map