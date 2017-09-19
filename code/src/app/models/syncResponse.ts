export class SyncResponse {
    public categories: Array<ItemSyncResponse>;
    public games: Array<ItemSyncResponse>;
}

export class ItemSyncResponse {
    public id: string;
    public offlineId: string;
    public state: ItemState;
    public replacement: any;
}

export enum ItemState {
    Created,
    Updated,
    Deleted
}
