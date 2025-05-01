interface TitleProps {
    name: string;
}

export function Title({ name }: TitleProps) {
    return <div className="text-xl sm:text-2xl font-bold">{name}</div>;
}
