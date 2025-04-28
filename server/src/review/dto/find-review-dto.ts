import { Review } from '@prisma/client';
import { findDataOpts } from 'src/common/decorators/find-data-opts.decorator';
import { isOrder } from 'src/common/decorators/is-order.decorator';
import { isSearch } from 'src/common/decorators/is-search.decorator';
import { FindDto } from 'src/common/dto/find.dto';
import { FindOpts } from 'src/common/types/find-opts.interface';
import { keys } from 'ts-transformer-keys';

@isOrder(keys<Pick<Review, 'user_id' | 'createdAt' | 'updatedAt'>>())
@isSearch(keys<Pick<Review, 'user_id'>>())
export class FindReviewDto extends FindDto {
    @findDataOpts()
    data: FindOpts;
}
