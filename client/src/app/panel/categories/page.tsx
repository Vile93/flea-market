import { serverGetPanelData } from '@/api/server-get-panel-data.api';
import CategoryAddModal from '@/app/panel/categories/_components/category-add-modal';
import CategoryList from '@/app/panel/categories/_components/category-list';
import { columns } from '@/app/panel/categories/_components/columns';
import { CATEGORY_COLUMNS } from '@/constants/panel.constant';
import { Category } from '@/types/category.interface';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Категории',
    description: 'Категории',
};

export default async function Categories() {
    const data = await serverGetPanelData<Category>('categories');
    return (
        <CategoryList
            columns={columns}
            data={data.data}
            totalCount={data.totalCount}
            constantsSearchField={CATEGORY_COLUMNS}
            addModal={<CategoryAddModal />}
        />
    );
}
