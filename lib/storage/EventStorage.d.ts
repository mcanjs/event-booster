declare global {
    interface Document {
        documentMode?: any;
    }
}
export default class EventStorage {
    private storageBrowserTypeManagement;
    private storageNodeElManagement;
    private storageElAttributeManagement;
    private initStorage;
    addStorageItem({ config, eventType, event, withReturnStorage }: {
        config: any;
        eventType: string;
        event: any;
        withReturnStorage?: Boolean;
    }): any;
    clearStorage(): void;
    storageStatus(config: any): void;
}
