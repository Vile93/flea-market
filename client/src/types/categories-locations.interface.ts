import { Category } from './category.interface';
import { Location } from './location.interface';
import { Region } from './region.interface';
import { Type } from './type.interface';

export interface CategoriesAndLocations {
    categories: (Category & { Type: Type[] })[];
    locations: (Location & { Region: Region[] })[];
}
