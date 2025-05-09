import { serverGetCategories } from '@/api/category.api';
import CategoryList from '@/app/panel/categories/_components/category-list';
import { columns } from '@/app/panel/categories/_components/columns';
import { CATEGORY_COLUMNS, PANEL_TABLE_PAGINATION } from '@/constants/panel.constant';
import DataTableAddModal from '@/app/panel/categories/_components/data-table-add-modal';

export default async function Categories() {
    const data = await serverGetCategories({
        take: PANEL_TABLE_PAGINATION.START_TAKE,
        skip: PANEL_TABLE_PAGINATION.START_SKIP,
    });
    return (
        <CategoryList
            columns={columns}
            data={data.data}
            totalCount={data.totalCount}
            constantsSearchField={CATEGORY_COLUMNS}
            addModal={<DataTableAddModal />}
        />
    );
}
