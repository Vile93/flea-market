import { ISearchField } from '@/types/search-field.interface';

export const PANEL_TITLES = [
    { title: 'Пользователи', path: '/panel/users' },
    { title: 'Отзывы', path: '/panel/reviews' },
    { title: 'Категории', path: '/panel/categories' },
    { title: 'Типы', path: '/panel/types' },
    { title: 'Локации', path: '/panel/locations' },
    { title: 'Регионы', path: '/panel/regions' },
];

export const PANEL_TABLE_PAGINATION = {
    START_TAKE: 10,
    START_SKIP: 0,
};

export const CATEGORY_COLUMNS: ISearchField[] = [
    { field: 'id', typeOfSearchField: 'number', russianName: 'Айди' },
    { field: 'name', typeOfSearchField: 'string', russianName: 'Название' },
];

export const CATEGORY_ADD_COLUMNS = [{ field: 'name', russianName: 'Имя', typeOfInput: 'input', type: 'text' }];

export const TYPE_COLUMNS: ISearchField[] = [
    { field: 'id', typeOfSearchField: 'number', russianName: 'Айди' },
    { field: 'name', typeOfSearchField: 'string', russianName: 'Название' },
    { field: 'category_id', typeOfSearchField: 'number', russianName: 'Айди категории' },
];

export const LOCATION_COLUMNS: ISearchField[] = [
    { field: 'id', typeOfSearchField: 'number', russianName: 'Айди' },
    { field: 'name', typeOfSearchField: 'string', russianName: 'Название' },
];

export const REGION_COLUMNS: ISearchField[] = [
    { field: 'id', typeOfSearchField: 'number', russianName: 'Айди' },
    { field: 'name', typeOfSearchField: 'string', russianName: 'Название' },
];

export const USER_COLUMNS: ISearchField[] = [
    { field: 'id', typeOfSearchField: 'number', russianName: 'Айди' },
    { field: 'name', typeOfSearchField: 'string', russianName: 'Имя' },
    { field: 'surname', typeOfSearchField: 'string', russianName: 'Фамилия' },
    { field: 'username', typeOfSearchField: 'string', russianName: 'Логин' },
    { field: 'email', typeOfSearchField: 'string', russianName: 'Email' },
    { field: 'phone', typeOfSearchField: 'string', russianName: 'Телефон' },
    { field: 'is_verified', typeOfSearchField: 'boolean', russianName: 'Верифицирован' },
    { field: 'avatar_path', typeOfSearchField: 'string', russianName: 'Путь к аватарке' },
];

export const REVIEW_COLUMNS: ISearchField[] = [
    { field: 'id', typeOfSearchField: 'number', russianName: 'Айди' },
    { field: 'rating', typeOfSearchField: 'number', russianName: 'Оценка' },
    { field: 'content', typeOfSearchField: 'string', russianName: 'Текст отзыва' },
    { field: 'user_id', typeOfSearchField: 'number', russianName: 'Айди пользователя' },
    { field: 'product_id', typeOfSearchField: 'number', russianName: 'Айди продукта' },
];
