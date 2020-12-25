import {
  Storage,
  SingularStorage,
  SingularStorageKeyLocator,
  LockableSoloStorage,
  LockableStorage,
} from './types';

export const createSingularStorage = <TKey, TItem>(
  locator: SingularStorageKeyLocator<TKey>,
  storage: Storage<TKey, TItem>
): SingularStorage<TItem> => {
  const info = () => {
    return storage.info(locator.key());
  };

  const exists = () => {
    return storage.exists(locator.key());
  };
  const load = () => {
    return storage.load(locator.key());
  };

  const save = (item: TItem) => {
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

export const createLockableSoloStorage = <TKey, TItem>(
  locator: SingularStorageKeyLocator<TKey>,
  storage: LockableStorage<TKey, TItem>
): LockableSoloStorage<TItem> => {
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

  const waitForLock = (timeoutMs: number) => {
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
