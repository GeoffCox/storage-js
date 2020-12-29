import { Storage, SingularStorage, SingularStorageKeyLocator, LockableSoloStorage, LockableStorage } from './types';
export declare const createSingularStorage: <TKey, TItem>(locator: SingularStorageKeyLocator<TKey>, storage: Storage<TKey, TItem>) => SingularStorage<TItem>;
export declare const createLockableSoloStorage: <TKey, TItem>(locator: SingularStorageKeyLocator<TKey>, storage: LockableStorage<TKey, TItem>) => LockableSoloStorage<TItem>;
