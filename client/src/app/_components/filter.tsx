'use client';

import styles from '../style.module.css';
import { Button } from '@/components/ui/button';
import { CategoriesAndLocations } from '@/types/categories-locations.interface';
import { Categories } from '@/app/_components/categories';
import { Locations } from '@/app/_components/locations';
import { Price } from '@/app/_components/price';
import { Search } from '@/app/_components/search';
import { State } from '@/app/_components/state';
import { Sort } from '@/app/_components/sort';
import { Offers } from '@/app/_components/offers';

interface FilterProps {
    data: CategoriesAndLocations;
}

export function Filter({ data }: FilterProps) {
    /*   const [selectedSort, setSelectedSort] = useState<{
        type: string;
        isAsc: boolean;
    } | null>(null); */
    return (
        <div className={`${styles.filter} mt-16`}>
            <div className={`${styles.filters} sticky top-2`}>
                <Categories data={data} />
                <Locations data={data} />
                <Price />
                <State />
                <div className={`flex flex-col`}>
                    <Button className="mt-2 cursor-pointer">Найти</Button>
                    <Button className="mt-2 cursor-pointer" variant={'destructive'}>
                        Сбросить
                    </Button>
                </div>
            </div>
            <Sort className={`${styles.sort}`} />
            <Search className={`${styles.search}`} />
            <Offers className={`${styles.offers}`} />
        </div>
    );
}
