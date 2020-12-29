import { Storage, StorageKeyConverter, LockableStorage } from './types';
export declare const createMappedStorage: <TPrimaryKey, TForeignKey, TItem>(converter: StorageKeyConverter<TPrimaryKey, TForeignKey>, storage: Storage<TForeignKey, TItem>) => Storage<TPrimaryKey, TItem>;
export declare const createLockableMappedStorage: <TPrimaryKey, TForeignKey, TItem>(converter: StorageKeyConverter<TPrimaryKey, TForeignKey>, storage: LockableStorage<TForeignKey, TItem>) => LockableStorage<TPrimaryKey, TItem>;
