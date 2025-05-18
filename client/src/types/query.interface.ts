export interface IQueryPanelTable {
    skip?: number;
    take?: number;
    orderField?: string | null;
    orderDirection?: 'asc' | 'desc' | null;
    searchField?: string | null;
    searchValue?: string | null;
    typeOfSearchField?: 'number' | 'string' | 'boolean' | null;
}

export interface OfferQuery {
    search?: string;
    priceFrom?: string;
    priceTo?: string;
    type_id?: string;
    region_id?: string;
    type?: string;
    take?: string;
    skip?: string;
}
