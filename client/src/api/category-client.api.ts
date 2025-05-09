import { IQueryPanelTable } from '@/types/query.interface';
import { setQuery } from '@/lib/set-query';
import { myFetch } from '@/api/main.api';
import { CreateCategory } from '@/types/category.interface';

const getCategories = async (query?: IQueryPanelTable) => {
    return myFetch(`/categories${setQuery(query)}`);
};

const deleteCategory = async (id: string) => {
    return myFetch(`/categories/${id}`, {
        method: 'DELETE',
    });
};

const createCategory = async (data: CreateCategory) => {
    return myFetch(`/categories`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
export { getCategories, deleteCategory, createCategory };
