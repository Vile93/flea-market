export interface Region {
    id: string;
    name: string;
    location_id: number;
}

export interface CreateRegion {
    name: string;
    location_id: number;
}

export type UpdateRegion = Partial<CreateRegion>;
