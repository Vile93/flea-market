interface BlockInfoProps {
    fieldName: string;
    fieldValue: string | number | boolean;
}

export default function BlockInfo({ fieldName, fieldValue }: BlockInfoProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="font-bold text-lg w-auto sm:w-56">{fieldName}</div>
            <div className="text-lg">{fieldValue}</div>
        </div>
    );
}
