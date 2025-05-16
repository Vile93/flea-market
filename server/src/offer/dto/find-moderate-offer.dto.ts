import { Offer } from '@prisma/client';
import { isOrder } from 'src/common/decorators/is-order.decorator';
import { isSearch } from 'src/common/decorators/is-search.decorator';
import { FindDto } from 'src/common/dto/find.dto';
import { keys } from 'ts-transformer-keys';

@isOrder(keys<Omit<Offer, 'status'>>())
@isSearch(keys<Omit<Offer, 'status'>>())
export class FindModerateOfferDto extends FindDto {}
