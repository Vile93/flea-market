export interface Type {
    id: string;
    name: string;
    category_id: number;
}

export interface CreateType {
    name: string;
    category_id: number;
}

export type UpdateType = Partial<CreateType>;
