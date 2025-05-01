export function FormError({ error }: { error?: string | null }) {
    if (error) {
        return <div className="text-red-400">{error}</div>;
    }
    return <></>;
}
