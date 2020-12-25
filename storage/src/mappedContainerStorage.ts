import {
  StorageKeyConverter,
  ContainerStorage,
  ContainerItemStorage,
} from './types';

export const createMappedContainerStorage = <TPrimaryKey, TForeignKey>(
  keyConverter: StorageKeyConverter<TPrimaryKey, TForeignKey>,
  storage: ContainerStorage<TForeignKey>
): ContainerStorage<TPrimaryKey> => {
  const info = async (key: TPrimaryKey) => {
    return storage.info(await keyConverter.to(key));
  };

  const exists = async (key: TPrimaryKey) => {
    return storage.exists(await keyConverter.to(key));
  };

  const create = async (key: TPrimaryKey) => {
    return storage.create(await keyConverter.to(key));
  };

  const deleteContainer = async (key: TPrimaryKey) => {
    return storage.delete(await keyConverter.to(key));
  };

  const parent = async (key: TPrimaryKey) => {
    const foreignKey = await storage.parent(keyConverter.to(key));
    return foreignKey ? await keyConverter.from(foreignKey) : null;
  };

  const children = async (key: TPrimaryKey) => {
    const foreignKeys = await storage.children(keyConverter.to(key));
    return Promise.all(
      foreignKeys.map(async (f) => await keyConverter.from(f))
    );
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

export const createMappedContainerItemStorage = <
  TContainerKey,
  TPrimaryItemKey,
  TForeignItemKey
>(
  itemKeyConverter: StorageKeyConverter<TPrimaryItemKey, TForeignItemKey>,
  storage: ContainerItemStorage<TContainerKey, TForeignItemKey>
): ContainerItemStorage<TContainerKey, TPrimaryItemKey> => {
  const items = async (key: TContainerKey) => {
    const foreignKeys = await storage.items(key);
    return Promise.all(
      foreignKeys.map(async (f) => await itemKeyConverter.from(f))
    );
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
