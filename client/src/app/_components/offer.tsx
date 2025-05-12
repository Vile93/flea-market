import { MapPin } from 'lucide-react';

export function Offer() {
    return (
        <div key={Math.random()}>
            <div className="aspect-square w-full bg-black dark:bg-white rounded-xl"></div>
            <div className="mt-2">Заголовок</div>
            <div className="flex gap-2 text-sm items-center">
                <MapPin width={16} /> Минская, город
            </div>
        </div>
    );
}
