export interface IDictionaryItemInfo {
    alias: string[];
    options: string[];
    required: boolean;
    handler: (value: string) => Promise<void>;
}
