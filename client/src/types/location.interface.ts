export interface Location {
    id: string;
    name: string;
}

export interface CreateLocation {
    name: string;
}

export type UpdateLocation = Partial<CreateLocation>;
