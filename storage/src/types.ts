// -------------------- Storage  --------------------//

/**
 * Describes storage meta-data for an item or container.
 * Any or all properties will be undefined when the storage implementation does not support them.
 */
export type StorageInfo = {
  /**
   * The date/time it was created.
   */
  created?: Date;

  /**
   * The date/time it was last modified.
   */
  modified?: Date;

  /**
   * The date/time it was last accessed.
   */
  accessed?: Date;

  /**
   * The size in bytes.
   */
  size?: bigint;
};

/**
 * Provides storage for an item.
 * @template TKey The type of key used to identify the item.
 * @template TItem The type of the item.
 */
export type Storage<TKey, TItem> = {
  /**
   * Gets storage information for the item.
   */
  info: (key: TKey) => Promise<StorageInfo>;
  /**
   * Returns true if the item exists; false otherwise.
   */
  exists: (key: TKey) => Promise<boolean>;
  /**
   * Loads the item from storage.
   */
  load: (key: TKey) => Promise<TItem>;
  /**
   * Saves the item to storage; allocating new storage as necessary.
   */
  save: (key: TKey, item: TItem) => Promise<void>;
  /**
   * Deletes the item from storage; no-op if item does not exist.
   */
  delete: (key: TKey) => Promise<void>;
};

// -------------------- Mapped Storage  --------------------//

/**
 * Converts between primary and foreign storage keys.
 * Typically, primary keys are used by the caller and foreign keys used by the underlying implementation.
 * @template TPrimaryKey The type of primary key used to locate items.
 * @template TForeignKey The type of foreign key used to locate items.
 */
export type StorageKeyConverter<TPrimaryKey, TForeignKey> = {
  to: (primary: TPrimaryKey) => TForeignKey;
  from: (foreign: TForeignKey) => TPrimaryKey;
};

// -------------------- Lockable Storage  --------------------//

/**
 * Represents a lock on an item.
 */
export type StorageLockToken = {
  /**
   * The kind of lock token.
   */
  kind: string;
  /**
   * If defined, allows unlocking from this token.
   */
  unlock?: () => void;
};

/**
 * Provides storage for an item where a lock provides exclusive write access.
 * @template TKey The type of key used to identify the item.
 * @template TItem The type of the item.
 */
export type LockableStorage<TKey, TItem> = {
  /**
   * The kinds of lock tokens this storage implementation supports.
   */
  lockTokenKinds: string[];
  /**
   * Gets storage information for the item.
   */
  info: (key: TKey) => Promise<StorageInfo>;
  /**
   * Returns true if the item exists; false otherwise.
   */
  exists: (key: TKey) => Promise<boolean>;
  /**
   * Returns true if the item is locked; false otherwise.
   */
  locked: (key: TKey) => Promise<boolean>;
  /**
   * Locks the item; fails immediately if already locked.
   */
  lock: (key: TKey) => Promise<StorageLockToken>;
  /**
   * Unlocks the item.
   */
  unlock: (token: StorageLockToken) => Promise<void>;
  /**
   * Waits for the item to be unlocked and then locks it.
   */
  waitForLock: (key: TKey, timeoutMs: number) => Promise<StorageLockToken>;
  /**
   * Loads the item from storage.
   */
  load: (token: StorageLockToken) => Promise<TItem>;
  /**
   * Saves the item to storage; allocating new storage as necessary.
   */
  save: (token: StorageLockToken, item: TItem) => Promise<void>;
  /**
   * Deletes the item from storage; no-op if item does not exist.
   */
  delete: (token: StorageLockToken) => Promise<void>;
};

// -------------------- Singular Storage  --------------------//

/**
 * Provides the location of single storage.
 * @template TKey The type of key used to identify the item.
 */
export type SingularStorageKeyLocator<TKey> = {
  /**
   * Gets the key for the single storage location.
   */
  key: () => TKey;
};

/**
 * Provides storage for an item stored at a single location.
 * Typically, this is something like a configuration file at a well known location.
 * @template TItem The type of the item.
 */
export type SingularStorage<TItem> = {
  /**
   * Gets storage information for the item.
   */
  info: () => Promise<StorageInfo>;
  /**
   * Returns true if the item exists; false otherwise.
   */
  exists: () => Promise<boolean>;
  /**
   * Loads the item from storage.
   */
  load: () => Promise<TItem>;
  /**
   * Saves the item to storage; allocating new storage as necessary.
   */
  save: (item: TItem) => Promise<void>;
  /**
   * Deletes the item from storage; no-op if item does not exist.
   */
  delete: () => Promise<void>;
};

/**
 * Provides storage for an item stored at a singular location where a lock provides exclusive write access.
 * @template TItem The type of the item.
 */
export type LockableSoloStorage<TItem> = {
  tokenKinds: string[];
  /**
   * Gets storage information for the item.
   */
  info: () => Promise<StorageInfo>;
  /**
   * Returns true if the item exists; false otherwise.
   */
  exists: () => Promise<boolean>;
  /**
   * Returns true if the item is locked; false otherwise.
   */
  locked: () => Promise<boolean>;
  /**
   * Locks the item; fails immediately if already locked.
   */
  lock: () => Promise<StorageLockToken>;
  /**
   * Unlocks the item.
   */
  unlock: (token: StorageLockToken) => Promise<void>;
  /**
   * Waits for the item to be unlocked and then locks it.
   */
  waitForLock: (timeoutMs: number) => Promise<StorageLockToken>;
  /**
   * Loads the item from storage.
   */
  load: (token: StorageLockToken) => Promise<TItem>;
  /**
   * Saves the item to storage; allocating new storage as necessary.
   */
  save: (token: StorageLockToken, item: TItem) => Promise<void>;
  /**
   * Deletes the item from storage; no-op if item does not exist.
   */
  delete: (token: StorageLockToken) => Promise<void>;
};

// -------------------- Container Storage  --------------------//

/**
 * Provides storage container management.
 * @template TKey The type of key used to identify the container.
 */
export type ContainerStorage<TKey> = {
  /**
   * Gets storage information for the container.
   */
  info: (key: TKey) => Promise<StorageInfo>;
  /**
   * Returns true if the container exists; false otherwise.
   */
  exists: (key: TKey) => Promise<boolean>;
  /**
   * Creates the container in storage.
   * Some storage implementations may no-op this method
   * and only create the container when an item is saved within.
   */
  create: (key: TKey) => Promise<void>;
  /**
   * Deletes the container from storage; no-op if item does not exist.
   */
  delete: (key: TKey, recursive?: boolean) => Promise<void>;
  /**
   * Returns the parent container; null when a top-level container.
   */
  parent: (key: TKey) => Promise<TKey | null>;
  /**
   * Returns the list of immediate child containers.
   */
  children: (key: TKey) => Promise<TKey[]>;
};

/**
 * Provides storage container management.
 * @template TContainerKey The type of key used to identify the container.
 * @template TItemKey The type of key used to identify the item.
 */
export type ContainerItemStorage<
  TContainerKey,
  TItemKey
> = ContainerStorage<TContainerKey> & {
  /**
   * Returns the list of immediate child items.
   */
  items: (key: TContainerKey) => Promise<TItemKey[]>;
};
