"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMappedContainerItemStorage = exports.createMappedContainerStorage = void 0;
const createMappedContainerStorage = (keyConverter, storage) => {
    const exists = (key) => {
        return storage.exists(keyConverter.to(key));
    };
    const create = (key) => {
        return storage.create(keyConverter.to(key));
    };
    const deleteContainer = (key) => {
        return storage.delete(keyConverter.to(key));
    };
    const parent = (key) => {
        const foreignKey = storage.parent(keyConverter.to(key));
        return foreignKey ? keyConverter.from(foreignKey) : null;
    };
    const children = (key) => {
        const foreignKeys = storage.children(keyConverter.to(key));
        return foreignKeys.map((f) => keyConverter.from(f));
    };
    return {
        exists,
        create,
        delete: deleteContainer,
        parent,
        children,
    };
};
exports.createMappedContainerStorage = createMappedContainerStorage;
const createMappedContainerItemStorage = (itemKeyConverter, storage) => {
    const items = (key) => {
        const foreignKeys = storage.items(key);
        return foreignKeys.map((f) => itemKeyConverter.from(f));
    };
    return {
        exists: storage.exists,
        create: storage.create,
        delete: storage.delete,
        parent: storage.parent,
        children: storage.children,
        items,
    };
};
exports.createMappedContainerItemStorage = createMappedContainerItemStorage;
//# sourceMappingURL=mappedContainerStorage.js.map