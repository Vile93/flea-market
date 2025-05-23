export interface Category {
    id: number;
    name: string;
}

export interface CreateCategory {
    name: string;
}

export type UpdateCategory = Partial<CreateCategory>;
