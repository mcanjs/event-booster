import StorageInterface from './EventStorage.interface';
export default class EventStorage {
    constructor(config: StorageInterface);
    static InitRelatedStorage(): void;
    localStorage(): void;
    sessionStorage(): void;
}
