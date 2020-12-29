import { StorageKeyConverter, ContainerStorage, ContainerItemStorage } from './types';
export declare const createMappedContainerStorage: <TPrimaryKey, TForeignKey>(keyConverter: StorageKeyConverter<TPrimaryKey, TForeignKey>, storage: ContainerStorage<TForeignKey>) => ContainerStorage<TPrimaryKey>;
export declare const createMappedContainerItemStorage: <TContainerKey, TPrimaryItemKey, TForeignItemKey>(itemKeyConverter: StorageKeyConverter<TPrimaryItemKey, TForeignItemKey>, storage: ContainerItemStorage<TContainerKey, TForeignItemKey>) => ContainerItemStorage<TContainerKey, TPrimaryItemKey>;
