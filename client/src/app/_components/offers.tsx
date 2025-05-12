import { Offer } from '@/app/_components/offer';
import styles from '../style.module.css';

export function Offers() {
    return (
        <div className={`${styles.offers} self-start`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {Array.from({ length: 60 }, () => (
                    <Offer key={Math.random()} />
                ))}
            </div>
        </div>
    );
}
