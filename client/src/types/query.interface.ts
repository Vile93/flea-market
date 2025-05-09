export interface IQueryPanelTable {
    skip?: number;
    take?: number;
    orderField?: string | null;
    orderDirection?: 'asc' | 'desc' | null;
    searchField?: string | null;
    searchValue?: string | null;
    typeOfSearchField?: 'number' | 'string' | 'boolean' | null;
}
