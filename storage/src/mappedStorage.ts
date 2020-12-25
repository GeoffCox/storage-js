import { Storage, StorageKeyConverter, LockableStorage } from './types';

export const createMappedStorage = <TPrimaryKey, TForeignKey, TItem>(
  converter: StorageKeyConverter<TPrimaryKey, TForeignKey>,
  storage: Storage<TForeignKey, TItem>
): Storage<TPrimaryKey, TItem> => {
  const info = async (key: TPrimaryKey) => {
    return storage.info(await converter.to(key));
  };

  const exists = async (key: TPrimaryKey) => {
    return storage.exists(await converter.to(key));
  };
  const load = async (key: TPrimaryKey) => {
    return storage.load(await converter.to(key));
  };

  const save = async (key: TPrimaryKey, item: TItem) => {
    return storage.save(await converter.to(key), item);
  };

  const deleteItem = async (key: TPrimaryKey) => {
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

export const createLockableMappedStorage = <TPrimaryKey, TForeignKey, TItem>(
  converter: StorageKeyConverter<TPrimaryKey, TForeignKey>,
  storage: LockableStorage<TForeignKey, TItem>
): LockableStorage<TPrimaryKey, TItem> => {
  const info = async (key: TPrimaryKey) => {
    return storage.info(await converter.to(key));
  };

  const exists = async (key: TPrimaryKey) => {
    return storage.exists(await converter.to(key));
  };

  const locked = async (key: TPrimaryKey) => {
    return storage.locked(await converter.to(key));
  };

  const lock = async (key: TPrimaryKey) => {
    return storage.lock(await converter.to(key));
  };

  const waitForLock = async (key: TPrimaryKey, timeoutMs: number) => {
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
