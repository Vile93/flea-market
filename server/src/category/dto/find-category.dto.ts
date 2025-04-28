import { Category } from '@prisma/client';
import { isOrder } from 'src/common/decorators/is-order.decorator';
import { isSearch } from 'src/common/decorators/is-search.decorator';
import { FindDto } from 'src/common/dto/find.dto';
import { keys } from 'ts-transformer-keys';

@isOrder(keys<Category>())
@isSearch(keys<Category>())
export class FindCategoryDto extends FindDto {}
