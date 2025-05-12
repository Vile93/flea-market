export interface Location {
    id: string;
    name: string;
    region_id: number;
}

export interface CreateLocation {
    name: string;
}

export type UpdateLocation = Partial<CreateLocation>;
